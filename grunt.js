/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    wpcss:{
      banner: '/*\n'+
              'Theme Name: <%= pkg.title || pkg.name %> \n'+
              'Theme URI: <%= pkg.homepage %> \n'+
              'Author: <%= pkg.author.name %>\n'+
              'Description: <%= pkg.description %> \n' +
              'Version: <%= pkg.version %> \n'+
              'Licence: <%= _.pluck(pkg.licenses, "type").join(", ") %>'+
              '\n\n'+
              '* This file doesnt contain any CSS, its just to keep the theme \n'+
              '* information, as WordPress requires...\n'+
              '* Stylesheets are located in the "css/" - directory \n'+
              '*/'
    },
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'javascripts/src/**/*.js']
    },
    concat: {
      frontendLib: {
        src: [
          'javascripts/lib/frontend/**/*'
       ],
        dest: 'javascripts/dist/frontend-lib.js'
      },
      frontendScript: {
        src: ['<banner:meta.banner>', 'javascripts/src/theme.js'],
        dest: 'javascripts/dist/theme.dev.js'
      },
      backEndScript: {
        src: ['<banner:meta.banner>', 'javascripts/src/admin.js'],
        dest: 'javascripts/dist/admin.dev.js'
      },
      wpcss: {
        src: ['<banner:wpcss.banner>'],
        dest: 'style.css'
      }
    },
    min: {
      frontendLib: {
        src: ['<config:concat.frontendLib.dest>'],
        dest: 'javascripts/dist/frontend-lib.min.js'
      },
      frontendScript: {
        src: ['<banner:meta.banner>', '<config:concat.frontendScript.dest>'],
        dest: 'javascripts/dist/theme.min.js'
      },
      backEndScript: {
        src: ['<banner:meta.banner>', '<config:concat.backEndScript.dest>'],
        dest: 'javascripts/dist/admin.min.js'
      }
    },
    watch: {
      files: ['javascripts/src/**/*.js'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {},
    compass: {
      dev: {
          src: 'scss',
          dest: 'css',
          linecomments: true,
          forcecompile: true,
          require: 'susy',
          debugsass: false,
          images: 'images',
          relativeassets: true
      },
      prod: {
          src: 'scss',
          dest: 'css',
          linecomments: false,
          outputstyle: 'compressed',
          forcecompile: true,
          require: 'susy',
          debugsass: false,
          images: 'images',
          relativeassets: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-compass');


  grunt.registerTask('default', 'concat compass:dev min');

};
