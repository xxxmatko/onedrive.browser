module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("clean", {
        wwwroot: [
            "wwwroot/**/*"
        ],
        dependencies: [
            "js/libs/*",
            "css/materialize.css"
        ],
        css: [
            "wwwroot/css/*",
            "!wwwroot/css/site.css"
        ],
        cssmin: [
            "wwwroot/css/*",
            "!wwwroot/css/site.min.css"
        ],
        components: [
            "wwwroot/js/components"
        ]
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-clean");

    //#endregion
};