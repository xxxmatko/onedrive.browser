define([
    "module",
    "knockout",
    "i18next",
    "resources"
], function (module, ko, i18next, resources) {
    //#region [ Fields ]

    var instance = null;

    //#endregion
    

    //#region [ Constructor ]

    /**
	 * Constructor.
     * 
     * @param {object} args Arguments.
	 */
    var Model = function (args) {
        console.log("I18n()");

        this._elements = [];
        this._callbacks = [];
        this._i18n = i18next;
        this._language = ko.observable("");

        this.language = ko.pureComputed({
            read: this._getLanguage.bind(this),
            write: this._setLanguage.bind(this)
        });

        // Initialization of i18next
        i18next.init({
            lng: args.language,
            resources: resources
        });

        this.language(args.language);
    };

    //#endregion


    //#region [ Getters, Setters ]

    /**
     * Gets language.
     */
    Model.prototype._getLanguage = function () {
        return this._language();
    };


    /**
     * Sets language.
     * 
     * @param {string} value Language.
     */
    Model.prototype._setLanguage = function (value) {
        i18next
            .changeLanguage(value)
            .then(this._onLanguageChanged.bind(this, value));        
    };

    //#endregion


    //#region [ Event Handlers ]

    /**
     * Event handler for the language changed event.
     * 
     * @param {string} value Language.
     */
    Model.prototype._onLanguageChanged = function (value) {
        this._language(value);
        this._callbacks.forEach(function (c) {
            return c.call(undefined);
        });
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Return value in set language.
     * 
     * @param {string|Array} keys One key as a String or multiple keys as an Array of String.
     * @param {object} options Custom options.
     */
    Model.prototype.t = function () {
        var args = Array.prototype.slice.call(arguments);
        var $this = this;

        return ko.computed(function () {
            // To auto-update this computed observable on language changes
            $this.language(); 
            return i18next.t.apply(i18next, args);
        });        
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("~I18n()");

        this.language.dispose();
    };    

    //#endregion

    return instance ? instance : (instance = new Model(module.config() || {}));
});