module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("copy", {
        dependencies: {
            options: {
                process: function (content, srcpath) {
                    switch(srcpath.split("/").pop().toLowerCase()) {
                        case "materialize.js":
                            return "(function (root, factory) {\n\
                                        if (typeof (define) === 'function' && define.amd) {\n\
                                            define(['jquery'], factory);\n\
                                        }\n\
                                        else {\n\
                                            factory(root.jQuery);\n\
                                        }\n\
                                    }(typeof (self) !== 'undefined' ? self : this, function (jQuery) {\n"
                                        + content +
                                        "return M;\n\
                                    }));";
                        default:
                            return content;
                    }
                }
            },                
            files: [{
                expand: true,
                flatten: true,
                cwd: "node_modules/",
                src: [
                    "jquery/dist/jquery.js",
                    "materialize-css/dist/js/materialize.js",
                    "requirejs/require.js",
                    "requirejs-text/text.js",
                    "knockout/build/output/knockout-latest.debug.js",
                    "knockout.validation/dist/knockout.validation.js",
                    "i18next/dist/umd/i18next.js"
                ],
                dest: "js/libs/",
                filter: "isFile"
            }, {
                expand: true,
                flatten: true,
                cwd: "node_modules/",
                src: [
                    "materialize-css/dist/css/materialize.css"
                ],
                dest: "css/",
                filter: "isFile" 
            }]
        },
        img: {
            files: [{
                expand: true,
                cwd: "img/",
                src: ["**"],
                dest: "wwwroot/img/",
                filter: "isFile"
            }]
        },
        css: {
            files: [{
                expand: true,
                cwd: "css/",
                src: ["**"],
                dest: "wwwroot/css/",
                filter: "isFile"
            }]
        },
        js: {
            files: [{
                expand: true,
                cwd: "js/",
                src: ["**", "!**/*.less", "!config.*.js"],
                dest: "wwwroot/js/",
                filter: "isFile"
            }]
        },
        config: {
            options: {
                process: function (content, srcpath) {
                    return content
                        .replace(/\{version\}/g, grunt.config("package").version)
                        .replace(/\{homepage\}/g, grunt.config("homepage"))
                        .replace(/\{cacheBust\}/g, new Date().getTime());
                }
            },            
            files: [{
                expand: true,
                src: ["config.<%= configuration %>.js"],
                cwd: "js/",
                filter: "isFile",
                rename: function () {
                    return "wwwroot/js/config.js";
                }
            }]
        },
        index: {
            options: {
                process: function (content, srcpath) {
                    return content
                        .replace(/\{version\}/g, grunt.config("package").version)
                        .replace(/\{homepage\}/g, grunt.config("homepage"))
                        .replace(/\{cacheBust\}/g, new Date().getTime());
                }
            },
            files: [{
                expand: true,
                src: ["index.<%= configuration %>.html"],
                rename: function () {
                    return "wwwroot/index.html";
                }
            }]
        }        
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-copy");

    //#endregion
};