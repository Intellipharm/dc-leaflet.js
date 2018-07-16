module.exports = function (grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'jshint:src',
        'jshint:tests',
        'jshint:grunt',
        'jscs:src',
        'jscs:tests',
        'jscs:grunt',
        // 'karma:build',
        'clean:build',
        'concat',
        'uglify:build',
        'notify:buildComplete'
    ]);
};
