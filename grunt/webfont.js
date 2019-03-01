module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("webfont", {
        icons: {
            src: "icons/*.svg",
            dest: "wwwroot/fonts",
            destCss: "wwwroot/css",
            options: {
                version: "1.0.0",
                engine: "fontforge",
                font: "appicons",
                hashes: true,
                types: "woff2,woff,ttf,svg",
                template: "grunt/webfont/template.css",
                templateOptions: {
                    baseClass: "appicons",
                    classPrefix: "appicons_"
                },
                relativeFontPath: "../fonts",
                htmlDemo: false,
                ligatures: true,
                fontFamilyName: "AppIcons"
            }
        }       
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-webfont");

    //#endregion
};