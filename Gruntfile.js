module.exports = function (grunt) {
    var bundles,
        matchdep,
        scss,
        coffee;

    /** Get all modules */
    bundles = require("./grunt/bundles");

    scss = require("./grunt/scss");

    coffee = require("./grunt/coffee");

    /** matchdep module goes through all tasks and initialises them so you don't have to use `grunt.loadNpmTasks` */
    matchdep = require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    /** Initialise grunt tasks */
    grunt.initConfig({

        /** Compile CoffeeScript files. */
        coffee: {
            compile: {
                files: coffee
            }
        },

        /** Merge CSS and JS files into bundles. */
        concat: {
            js: {
                src: bundles.js,
                dest: "./public/js/global/bundle.js"
            },
            css: {
                src: bundles.css,
                dest: "./public/css/global/bundle.css"
            }
        },

        /** Minify CSS files. */
        cssmin: {
            dist: {
                src: "./public/css/global/bundle.css",
                dest: "./public/css/global/bundle.min.css"
            }
        },

        /** Uglify JavaScript files. */
        uglify: {
            dist: {
                src: "./public/js/global/bundle.js",
                dest: "./public/js/global/bundle.min.js"
            }
        },

        /** Compile .scss files */
        sass: {
            dist: {
                files: scss
            }
        },

        /** Watch for changes to any public files */
        watch: {
            dist: {
                files: ["./development/**/*.*"],
                tasks: ["build_public"]
            }
        }
    });

    /** Task to run any compilers on the public files */
    grunt.registerTask("build_public", ["sass", "coffee", "concat:js", "uglify", "concat:css", "cssmin"]);

    /** Build everything */
    grunt.registerTask("build", ["build_public"]);
};