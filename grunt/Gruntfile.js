module.exports = function (grunt) {
    var cwd, bundles, matchdep, scss;

    cwd = process.cwd();

    grunt.file.setBase("../");

    bundles = require("./bundles");

    scss = require("./scss");

    matchdep = require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        concat: {
            js: {
                src: bundles.js,
                dest: "./public/js/bundle.js"
            },
            css: {
                src: bundles.css,
                dest: "./public/css/bundle.css"
            }
        },

        cssmin: {
            dist: {
                src: "./public/css/bundle.css",
                dest: "./public/css/bundle.min.css"
            }
        },

        /** Uglify JS */
        uglify: {
            dist: {
                src: "./public/js/bundle.js",
                dest: "./public/js/bundle.min.js"
            }
        },

        /** Compile .sass files */
        sass: {
            dist: {
                files: scss
            }
        },

        /** Watch for changes to any public files */
        watch: {
            dist: {
                options: {
                    cliArgs: ["--gruntfile", require("path").join(cwd, "Gruntfile.js")]
                },
                files: ["./development/**/*.*"],
                tasks: ["build_public"]
            }
        }
    });

    /** Task to run any compilers on the public files */
    grunt.registerTask("build_public", ["sass", "concat:js", "uglify", "concat:css", "cssmin"]);

    /** Build everything */
    grunt.registerTask("build", ["build_public"]);
};