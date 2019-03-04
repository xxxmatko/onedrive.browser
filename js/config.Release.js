require({
    urlArgs: "v={version}",
    packages: [{
        name: "my",
        location: "/js"
    }, {
        name: "resources",
        location: "/js/resources"
    }],
    paths: {
        "i18next": "/js/libs/i18next",
        "jquery": "/js/libs/jquery",
        "knockout": "/js/libs/knockout",
        "knockout.validation": "/js/libs/knockout.validation",
        "materialize": "/js/libs/materialize",
        "text": "/js/libs/text"
    },
    config: {
        "my/i18n": {
            language: (window.location.href.indexOf("lang=") !== -1) ? window.location.href.split("lang=")[1].substr(0, 2) : document.documentElement.lang || "en"
        },
        "my/components/app/app": {
            apiUrl: "https://graph.microsoft.com/v1.0/",
            origin: "http://localhost:8021",
            clientId: "0e68d12f-a492-487b-8916-4ff9f0493f37",
            redirectUri: "http://localhost:8021/callback.html",
            scopes: [
                "user.read",
                "files.read",
                "files.read.all",
                "sites.read.all"
            ],
            authServiceUri: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"            
        }
    }
}, ["my/main"]);