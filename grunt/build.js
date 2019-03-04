module.exports = function (grunt) {
    //#region [ Registration ]

    grunt.registerTask("app-build", build);

    //#endregion


    //#region [ Tasks ]

    /**
     * Build task.
     * 
     * @param {string} configuration Build configuration.
     */
    function build(configuration) {
        var version = grunt.config("package").version;

        grunt.log.writeln("Building \"" + configuration.toUpperCase() + "\" version \"" + version + "\"");

        // List of tasks
        var tasks = [
            "clean:wwwroot",
            "clean:dependencies",
            "copy:dependencies",
            "rename:dependencies",
            "jshint",
            "copy:img",
            "copy:css",
            "copy:js",
            "copy:config",
            "webfont",
            "less",
            "csslint",
            "concat:css",
            "clean:css",
            "copy:index",
            "copy:callback"
        ];

        // Set up dynamic parameters
        switch(configuration.toUpperCase()) {
            case "DEBUG":
                grunt.config("configuration", "Debug");
                grunt.config("homepage", "http://localhost:8020/");
                break;
            case "RELEASE":
                grunt.config("configuration", "Release");
                grunt.config("homepage", "http://localhost:8021/");
                grunt.config("jshint.options.debug", false);

                tasks.push("cssmin");
                tasks.push("clean:cssmin");
                tasks.push("rename:cssmin");
                tasks.push("requirejs:release");
                tasks.push("clean:components");
                break;
            default:
                grunt.fail.fatal("Unknown build configuration '" + configuration.toUpperCase() + "'.");
            break;
        }

        // Run tasks
        grunt.task.run.apply(grunt.task, tasks);
    }    

    //#endregion
};