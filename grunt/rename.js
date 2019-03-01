module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("rename", {
        dependencies: {
            files: [
                { src: ["js/libs/knockout-latest.debug.js"], dest: "js/libs/knockout.js" }
            ]
        },
        cssmin: {
            files: [
                { src: ["wwwroot/css/site.min.css"], dest: "wwwroot/css/site.css" }
            ]
        }
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-rename-util");

    //#endregion
};