module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("jshint", {
        options: {
            browser: true,
            devel: true,
            debug: true,
            multistr: true,
            sub: true,
            laxbreak: true,
            undef: true,
            globals: {
                define: true,
                require: true,
                module: true,
                DateFormat: true,
                Waves: true,
                jQuery: true,
                Promise: true,
                self: true
            }
        },
        src: [
            "gruntfile.js",
            "grunt/**/*.js",
            "js/**/*.js",
            "!js/libs/*.js"
        ]    
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-jshint");

    //#endregion
};