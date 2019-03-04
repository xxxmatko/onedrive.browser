(function (root, factory) {
    if ((typeof define === "function") && define.amd) {
        define([], factory);
    } 
    else {
        root.odauth = factory();
    }
}(typeof self !== "undefined" ? self : this, function () {
    //#region [ Fields ]

    var instance;
    var global = (function() { return this; })();
    var doc = global.document;

    //#endregion


    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    var Model = function (args) {
        console.log("Odauth()");

        this.clientId = "";
        this.redirectUri = "";
        this.scopes = "";
        this.authServiceUri = "";
        this.origin = "";

        this.isSignedIn = false;
        this.token = "";
    };

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Init function.
     * 
     * @param {object} args Initialization arguments.
     * @param {function} resolve Function to resolve the promise.
     * @param {function} reject Function to reject the promise.
     */
    Model.prototype._init = function(args, resolve, reject) {
        this.origin = args.origin;
        this.clientId = args.clientId;
        this.redirectUri = args.redirectUri;
        this.scopes = args.scopes;
        this.authServiceUri = args.authServiceUri;
        this.token = this._getToken();

        if (this.token) {
            this.isSignedIn = true;
            resolve(this);
            return;
        }

        this.isSignedIn = false;
        resolve(this);
    };


    /**
     * Sign in function.
     * 
     * @param {function} resolve Function to resolve the promise.
     * @param {function} reject Function to reject the promise.
     */
    Model.prototype._signIn = function(resolve, reject) {
        var url = this.authServiceUri 
            + "?client_id=" + this.clientId
            + "&response_type=token" 
            + "&redirect_uri=" + encodeURIComponent(this.redirectUri);
        
        if (this.scopes) {
            url = url + "&scope=" + encodeURIComponent(this.scopes);
        }

        console.warn("TODO : resourceUri???");
        // if (this.resourceUri) {
        //     url = url + "&resource=" + encodeURIComponent(this.resourceUri);
        // }
    
        var popup = this._popup(url, resolve, reject);
        if (!popup) {
            reject("Failed to pop up auth window.");
            return;
        }
        popup.focus();

        var origin = this.origin;
        global.addEventListener("message", (function(e) {
            if (e.origin !== origin) {
                return;
            }
            popup.close();
            this.isSignedIn = true;
            resolve(this);
        }).bind(this), { capture: false, once: false });
    };


    /**
     * Shows popup window.
     * 
     * @param {string} url Url for the popup window.
     */
    Model.prototype._popup = function(url) {
        var width = 525;
        var height = 525;
        var screenX = global.screenX;
        var screenY = global.screenY;
        var outerWidth = global.outerWidth;
        var outerHeight = global.outerHeight;
  
        var left = screenX + Math.max(outerWidth - width, 0) / 2;
        var top = screenY + Math.max(outerHeight - height, 0) / 2;
  
        var features = [
            "width=" + width,
            "height=" + height,
            "top=" + top,
            "left=" + left,
            "status=no",
            "resizable=yes",
            "toolbar=no",
            "menubar=no",
            "scrollbars=yes"
        ];
    
        return global.open(url, "oauth", features.join(","));
    };


    /**
     * Gets token from cookie.
     */
    Model.prototype._getToken = function() {
        var cookies = doc.cookie;
        var name = "odauth=";
        var start = cookies.indexOf(name);
        if (start >= 0) {
            start += name.length;
            var end = cookies.indexOf(";", start);
            if (end < 0) {
                end = cookies.length;
            }
            else 
            {
                console.warn("TODO : postCookie???");
                var postCookie = cookies.substring(end);
            }

            var value = cookies.substring(start, end);
            return value;
        }
      
        return "";
    };


    /**
     * Sets token to cookie.
     * 
     * @param {string} token Token.
     * @param {number} expire Expires in seconds.
     */
    Model.prototype._setCookie = function(token, expire) {
        var expiration = new Date();
        expiration.setTime(expiration.getTime() + expire * 1000);
        var cookie = "odauth=" + token +"; path=/; expires=" + expiration.toUTCString();
      
        if (doc.location.protocol.toLowerCase() == "https") {
            cookie = cookie + ";secure";
        }
      
        doc.cookie = cookie;
    };    

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Authentication callback.
     */
    Model.prototype.authCallback = function() {
        if (!global.location.hash) {
            console.warn("TODO : postmessage to parent that it failed");
            return;
        }
        
        // Get the response
        var response = global.location.hash.substring(1);
        response = "{" + response.replace(/([^=]+)=([^&]+)&?/g, '"$1":"$2",').slice(0,-1) + "}";
        response = JSON.parse(response, function(key, value) { 
            return key === "" ? value : decodeURIComponent(value); 
        });
          
        var token = response["access_token"];
        var expire = parseInt(response["expires_in"]);
        if (token)
        {
            this._setCookie(token, expire);
            global.opener.postMessage({
                token: token
            });
        }
    };


    /**
     * Challenges authentication.
     */
    Model.prototype.signIn = function() {
        return new Promise(this._signIn.bind(this));
    };


    /**
     * Initialize the api.
     * 
     * @param {object} args Initialization arguments.
     */
    Model.prototype.init = function(args) {
        return new Promise(this._init.bind(this, args));
    };

    //#endregion

    return (instance = new Model());
}));