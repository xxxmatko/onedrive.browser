define([
    "text!./app.html",
    "module",
    "knockout",
    "my/odauth"
], function (view, module, ko, api) {
    //#region [ Fields ]

    var global = (function() { return this; })();
    var cnf = module.config();

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
        this.isConnected = ko.observable(false);
    };

    //#endregion


    //#region [ Event Handlers ]

    /**
     * Event handler for the init event.
     */
    Model.prototype._onInit = function() {
        if(!api.isSignedIn) {
            api.signIn().then(this._onInit.bind(this));
            return;
        }

        this.isConnecting(false);
        this.isConnected(true);
    };


    /**
     * Event handler for the disconnect event.
     */
    Model.prototype._onDisconnect = function() {
        this.isConnecting(false);
        this.isConnected(false);
    };

    //#endregion


    //#region [ Methods : Public ]
    
    /**
     * Connects to OneDrive.
     */
    Model.prototype.connect = function() {
        this.isConnecting(true);
        this.isConnected(false);
        
        api.init({
            origin: cnf.origin,
            clientId: cnf.clientId,
            redirectUri: cnf.redirectUri,
            scopes: cnf.scopes.join(" "),
            authServiceUri: cnf.authServiceUri
        }).then(this._onInit.bind(this));
    };


    /**
     * Disconnects from OneDrive.
     */
    Model.prototype.disconnect = function() {
        api.signOut().then(this._onDisconnect.bind(this));
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