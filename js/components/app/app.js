define([
    "text!./app.html",
    "module",
    "knockout",
    "jquery",
    "my/odauth"
], function (view, module, ko, $, api) {
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
        this.files = ko.observableArray([]);
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
        this.listFiles();
    };


    /**
     * Event handler for the disconnect event.
     */
    Model.prototype._onDisconnect = function() {
        this.isConnecting(false);
        this.isConnected(false);
    };

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Gets formated size.
     * 
     * @param {number} size Size in bytes.
     */
    Model.prototype._size = function(size) {
        if(typeof(size) === "undefined") {
            return "";
        }

        var s = parseInt(size);
        var unit = " B";

        if((s / 1024) > 1) {
            unit = " KB";
            s = s / 1024;
        }

        if((s / 1024) > 1) {
            unit = " MB";
            s = s / 1024;
        }
        
        return s.toFixed(2) + unit;
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
	 * Lists files.
	 */
    Model.prototype.listFiles = function () {
        if(!this.isConnected()) {
            return;
        }

        var $this = this;

        $.ajax({
            url: cnf.apiUrl + "me/drives",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + api.token
            },
            accept: "application/json;odata.metadata=none"
        }).then(function(data) {
            if(!data) {
                return "";
            }

            if ((data.value instanceof Array) && data.value.length) {
                return data.value[0].id;
            }

            return "";
        }).then(function(data) {
            if(!data) {
                throw "Unable to get drive id.";
            }
            
            // Get my files
            return $.ajax({
                url: cnf.apiUrl + "drives/" + data + "/root/children?expand=thumbnails",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + api.token
                },
                accept: "application/json;odata.metadata=none"
            });
        }).then(function(data) {
            data.value.forEach(function(f) {
                $this.files.push(f);
            });

            // Get files shared with me
            return $.ajax({
                url: cnf.apiUrl + "me/drive/sharedWithMe?expand=thumbnails",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + api.token
                },
                accept: "application/json;odata.metadata=none"
            });
        }).then(function(data) {
            data.value.forEach(function(f) {
                $this.files.push(f);
            });
        })
        .catch(function(ex) {
            console.error("App : listFiles() : ", ex);
        });
    }; 


    /**
     * Downloads file.
     * 
     * @param {object} f File to download.
     */
    Model.prototype.downloadFile = function(f) {
        console.info(f);
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