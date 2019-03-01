define([
    "text!./app.html",
    "knockout"
], function (view, ko) {
    //#region [ Fields ]

    var global = (function() { return this; })();

    //#endregion
    
    
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    var Model = function (args) {
        console.log("App()");

        this.lang = args.lang;
        this.isConnecting = ko.observable(false);
    };

    //#endregion


    //#region [ Methods : Public ]
    
    /**
     * Connects to OneDrive.
     */
    Model.prototype.connect = function() {
        this.isConnecting(true);
        console.info("connect");
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("~App()");
    };

    //#endregion


    //#region [ Methods : Static ]

    /**
	 * Factory method.
	 *
	 * @param {object} params Parameters.
     * @param {object} componentInfo Component into.
     * @returns {object} Instance of the model.
	 */
    Model.createViewModel = function (params, componentInfo) {
        params.element = componentInfo.element; 
        
        return (global.app = new Model(params));
    };

    //#endregion

    return {
        viewModel: { createViewModel: Model.createViewModel },
        template: view
    };
});