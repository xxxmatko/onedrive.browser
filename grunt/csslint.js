module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("csslint", {
        options: {
            "fallback-colors": false,
            "order-alphabetical": false,
            "qualified-headings": false,
            "box-model": false,
            "overqualified-elements": false,
            "display-property-grouping": false,
            "important": false
        },
        src: [
            "wwwroot/css/**/*.css",
            "!wwwroot/css/materialize.css",
            "!wwwroot/css/appicons.css",
            "!wwwroot/css/**/*.min.css"
        ]    
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-csslint");

    //#endregion
};