module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	    sass: {
			dist: {
				options: { 
					quiet : true,
					style: 'compact'
				},
				files: {
					'css/style.css': 'css/style.scss' // 'destination': 'source'
				}
			}
		},
		concat: {
	        prod : {
	        	src : [
	                'js/klp/src/klp.volunteer-initial.js',
	                'js/klp/src/klp.volunteer-map.js',
	                'js/klp/src/klp.volunteer-confirm.js'
	            ],
	            dest : 'js/klp/klp.js'
	        }
	    },
	    uglify : {
	    	prod: {
	        	options: {
					sourceMap: false,
					compress: {
						drop_console: false
					}
				},
	            files: {
	                'js/klp/klp.min.js' : [ 'js/klp/klp.js' ]
	            }
	        }
	    },
		watch: {
			css: {
				files: ['css/**/*.scss', 'css/**/*.css'],
				tasks: ['sass']
			},
			js: {
				files: ['js/klp/src/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'sass']);
    grunt.registerTask('watch-all', ['watch']);
    grunt.registerTask('watch-css', ['watch:css']);
    grunt.registerTask('watch-js', ['watch:js']);
};
