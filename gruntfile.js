module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.initConfig({
        package: grunt.file.readJSON("package.json"),
        homepage: "<HOMEPAGE>",
        configuration: "<CONFIGURATION>"
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadTasks("grunt");

    //#endregion
};