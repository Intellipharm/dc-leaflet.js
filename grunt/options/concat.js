module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false,
        banner: '/*!\n * <%= config.pkg.name %> v<%= config.pkg.version %>\n ' +
                '*\n * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *\n */\n'
    },
    bubble: {
        dest: '<%= config.dist %>/bubble-cloud/dc-bubble-cloud.js',
        src: [
            '<%= config.src %>/<%= config.scripts %>/bubble-cloud.js',
        ]
    },
    build: {
        dest: '<%= config.dist %>/dc-addons.js',
        src: [
            '<%= config.src %>/<%= config.scripts %>/utils.js',
            '<%= config.src %>/<%= config.scripts %>/bubble-cloud.js',
        ]
    },
};
