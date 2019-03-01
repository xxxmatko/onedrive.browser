define([
    "knockout",
    "my/i18n"
], function (ko, i18n) {
    //#region [ Fields ]

    var Handler = {};
    var doc = (function () { return this; })().document;

    //#endregion


    //#region [ Method : Public ]

    /**
     * This will be called when the binding is first applied to an element.
     * 
     * @param {object} element The DOM element involved in this binding.
     * @param {function} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
     * @param {object} allBindings A JavaScript object that you can use to access all the model values bound to this DOM element.
     * @param {object} viewModel This parameter is deprecated in Knockout 3.x. Use bindingContext.$data or bindingContext.$rawData to access the view model instead.
     * @param {object} albindingContext An object that holds the binding context available to this element’s bindings.
     */
    Handler.init = function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var i = i18n._elements.indexOf(element);
            if (i >= 0) {
                i18n._elements.splice(i, 1);
                i18n._callbacks.splice(i, 1);
            }
        });

        i18n._elements.push(element);
        i18n._callbacks.push(ko.bindingHandlers["i18n"].update.bind(undefined, element, valueAccessor, allBindings, viewModel, bindingContext));
        
        Handler.update(element, valueAccessor, allBindings, viewModel, bindingContext);        
    };


    /**
     * This will be called once when the binding is first applied to an element, and again whenever any observables/computeds that are accessed change.
     * 
     * @param {object} element The DOM element involved in this binding.
     * @param {function} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
     * @param {object} allBindings A JavaScript object that you can use to access all the model values bound to this DOM element.
     * @param {object} viewModel This parameter is deprecated in Knockout 3.x. Use bindingContext.$data or bindingContext.$rawData to access the view model instead.
     * @param {object} albindingContext An object that holds the binding context available to this element’s bindings.
     */
    Handler.update = function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = ko.toJS(valueAccessor());

        if (typeof (value) === "string") {
            element.innerHTML = i18n._i18n.t(value);
            return;
        } 

        if (value.key) {
            element.innerHTML = i18n._i18n.t(value.key, value.options);
            return;
        } 

        for (var attr in value) {
            var options = value[attr];
            var translation;

            if (typeof (options) === "string") {
                translation = i18n._i18n.t(options);
            } 
            else {
                translation = i18n._i18n.t(options.key, ko.toJS(options.options));
            }

            if (attr == "html") {
                element.innerHTML = translation;
            } 
            else {
                var div = doc.createElement("div");
                div.innerHTML = translation;
                element.setAttribute(attr, div.innerText);
                div.remove();
            }
        }
    };

    //#endregion

    ko.bindingHandlers["i18n"] = Handler;
});