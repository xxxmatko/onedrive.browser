module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("concat", {
        css: {
            src: [
                "wwwroot/css/materialize.css",
                "wwwroot/css/appicons.css",
                "wwwroot/css/site.css",
                "wwwroot/css/components/app.css"
            ],
            dest: "wwwroot/css/site.css"
        }   
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-concat");

    //#endregion
};