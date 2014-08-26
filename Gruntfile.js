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
		watch: {
			css: {
				files: ['css/**/*.scss', 'css/**/*.css'],
				tasks: ['sass']
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('watch-all', ['watch']);
    grunt.registerTask('watch-css', ['watch:css']);
};
