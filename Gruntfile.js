/**
 * @file Gruntfile
 * @version 3.0.0
 * @author {@link https://github.com/furzeface Daniel Furze}
 */

module.exports = function(grunt) {
  'use strict';
  /* jshint camelcase: false */

  // @todo: Use grunt-newer

  // Reads package.json and dynamically loads all Grunt tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies', pattern: ['assemble', 'grunt-*']});

  // Time all the things
  require('time-grunt')(grunt);

  // Go!
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),
    meta: {
      banner: '/* <%= pkg.name %> :: Latest build: <%= grunt.template.today(\'dd/mm/yyyy, h:MM:ss TT\') %> */\n'
    },
    config: {
      // Component settings
      bower: '<%= bowerrc.directory %>',
      // Src settings
      src: 'src',
      srcAssets: 'assets',
      srcStyles: 'styles',
      srcSass: 'sass',
      srcScripts: 'scripts',
      srcTemp: 'temp',
      srcImages: 'images',
      srcFonts: 'fonts',
      // Dist settings
      dist: 'dist',
      distStyles: 'styles',
      distScripts: 'scripts',
      distTemp: 'temp',
      distImages: 'images',
      distFonts: 'fonts',
      distDocs: 'docs',
      distJsDocs: 'jsdocs',
      distSassDocs: 'sassdocs',
      mainCss: 'main.css',
      // Misc settings
      helpers: 'helpers'
    },

    // Watchers
    watch: {
      html: {
        files: [
          '<%= config.src %>/{data,pages,partials,layouts}/**/*.{hbs,yml,json}'
        ],
        tasks: [
          'build_html'
        ]
      },
      styles: {
        files: [
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.srcSass %>/*.scss'
        ],
        tasks: [
          'build_styles',
          'modernizr'
        ]
      },
      scripts: {
        files: [
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/**/*.js',
        ],
        tasks: [
          'build_scripts',
          'modernizr'
        ]
      },

      // @todo: Image watchers

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/<%= config.distAssets %>/{,*/}*.css',
          '<%= config.dist %>/<%= config.distAssets %>/{,*/}*.js',
          '<%= config.dist %>/<%= config.distAssets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Project tasks
    todo: {
      options: {
        colophon: true,
        file: 'TODO.md',
        marks: [{
                name: 'todo',
                pattern: /@(todo)/i,
                color: 'blue'
            }],
            title: '[<%= pkg.title%> TODO list:](<%= pkg.homepage %>)',
          usePackage: true
      },
      all: [
        // '<%= config.src %>/**/*.{hbs,html,js,scss,txt}', // @todo: Reimplement this
        'Gruntfile.js'
      ]
    },

    devUpdate: {
      force: {
        options: {
          updateType: 'force',
          reportUpdated: false,
          semver: false,
          packages: {
            devDependencies: true,
            dependencies: true
          },
          packageJson: './package.json'
        }
      }
    },

    jsdoc: {
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/combine/*.js',
          '<%= config.src %>/<%= config.helpers %>/helper-*.js'
        ],
        options: {
          destination: '<%= config.dist %>/<%= config.distDocs %>/<%= config.distJsDocs %>',
          template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
          configure: '.jsdoc.conf.json'
        }
      }
    },

    sassdoc: {
      main: {
        src: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.srcSass %>/',
        dest: '<%= config.dist %>/<%= config.distDocs %>/<%= config.distSassDocs %>'
      }
    },

    // Local server task
    connect: {
      options: {
        port: 8008,
        livereload: 35730,
        useAvailablePort: true,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    // Build tasks
    assemble: {
      options: {
        assets: '<%= config.dist %>',
        copyrightYear: '2014',
        data: [
          '<%= config.src %>/data/*.{json,yml}',
          'package.json',
        ],
        flatten: false,
        helpers: [
          '<%= config.src %>/<%= config.helpers %>/helper-*.js'
        ],        images: '<%= config.distImages %>',
        layout: false,
        mainCss: '<%= config.mainCss %>',
        partials: [
          '<%= config.src %>/partials/**/*.hbs',
          '<%= config.src %>/layouts/**/*.hbs'
        ],
        styles: '<%= config.distStyles %>',
        scripts: '<%= config.distScripts %>',
        temp: '<%= config.distTemp %>',
        timestamp: '<%= grunt.template.today("mmm dS yyyy, h:MMtt Z") %>'
      },
      pages: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/pages/',
          src: '**/*.hbs',
          dest: '<%= config.dist %>/',
          rename: function(dest, src) {
            var filename = src;

            if (src.substring(0, 1) === '_') {
              // If prefixed with _
              filename = dest + src.substring(1);
              // Filename = filename without _
            } else if(src.indexOf('/') !== -1) {
              // If in a subdirectory
              var index = null,
              splitSrc = src.split('/');
              filename = dest;

              for (index = 0; index < splitSrc.length; ++index) {
                filename = filename + splitSrc[index];

                if (src.indexOf('.hbs')) {
                  filename = filename + '/';
                }
              }
            } else {
              // Else it's a top level page - create a directory and index file for it. eg: about/index.html
              filename = dest + src.replace('.hbs', '') + '/index';
            }
            return filename;
          }
        }]
      }
    },

    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>/',
            src: ['**'],
            dest: '<%= config.dist %>/<%= config.distImages %>/'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcFonts %>/',
            src: ['**'],
            dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.distFonts %>/'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcTemp %>/',
            src: ['**'],
            dest: '<%= config.dist %>/<%= config.distTemp %>/'
          }
        ]
      },
      scripts: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/',
            src: ['*.js'],
            dest: '<%= config.dist %>/<%= config.distScripts %>/'
          }
        ]
      },
      styles: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/',
            src: ['*.css'],
            dest: '<%= config.dist %>/<%= config.distStyles %>/'
          }
        ]
      },
      sassface: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/sassface/src',
            src: ['**/*'],
            dest: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.srcSass %>'
          }
        ]
      }
    },

    clean: {
      sassface: [
        '<%= config.bower %>/sassface'
      ],
      production: [
        '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>.map'
      ],
      html: [
        '<%= config.dist %>/*.html'
      ],
      scripts: [
        '<%= config.dist %>/<%= config.distScripts %>'
      ],
      styles: [
        '<%= config.dist %>/<%= config.distStyles %>'
      ],
      everything: [
        '<%= config.dist %>'
      ]
    },


    // HTML tasks
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true
        },
        expand: true,
        cwd: '<%= config.dist %>',
        src: [
          '*.html',
        ],
        dest: '<%= config.dist %>'
      }
    },


    // Style tasks
    sass: {
      main: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>': '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.srcSass %>/sassface.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'last 2 version'
        ]
      },
      main: {
        expand: true,
        flatten: true,
        src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>',
        dest: '<%= config.dist %>/<%= config.distStyles %>/'
      }
    },

    cmq: {
      main: {
        expand: true,
        cwd: '<%= config.dist %>/<%= config.distStyles %>/',
        src: ['<%= config.mainCss %>'],
        dest: '<%= config.dist %>/<%= config.distStyles %>/'
      }
    },

    cssmin: {
      options: {
        banner: '<%= meta.banner %>',
        noAdvanced: true
      },
      main: {
        src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>',
        dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>'
      }
    },


    // Script tasks
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/**/*.js',
        'Gruntfile.js'
      ]
    },

    concat: {
      jquery: {
        src: [
          '<%= config.bower %>/jquery/dist/jquery.js'
        ],
        dest: '<%= config.dist %>/<%= config.distScripts %>/jquery.js'
      },

      scripts: {
        src: [
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/plugins/combine/*.js',
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/combine/*.js',
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/_init.js'
        ],
        dest: '<%= config.dist %>/<%= config.distScripts %>/scripts.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        preserveComments: 'some',
        mangle: true
      },
      jquery: {
        src: '<%= config.dist %>/<%= config.distScripts %>/jquery.js',
        dest: '<%= config.dist %>/<%= config.distScripts %>/jquery.js'
      },
      scripts: {
        src: '<%= config.dist %>/<%= config.distScripts %>/scripts.js',
        dest: '<%= config.dist %>/<%= config.distScripts %>/scripts.js'
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      scripts: [
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/**/*.js'
      ]
    },

    // Misc build tasks
    modernizr: {
      dist: {
        'devFile': '<%= config.bower %>/modernizr/modernizr.js',
        'outputFile': '<%= config.dist %>/<%= config.distScripts %>/modernizr.js',
        'parseFiles': true,
        'files': {
          'src': [
            '<%= config.dist %>/<%= config.distStyles %>/*.css',
            '<%= config.dist %>/<%= config.distScripts %>/*.js'
          ]
        },
        'extra' : {
          'shiv' : true,
          'printshiv' : false,
          'load' : true,
          'mq' : false,
          'cssclasses' : true
        },
        'extensibility' : {
          'addtest' : false,
          'prefixed' : false,
          'teststyles' : false,
          'testprops' : false,
          'testallprops' : false,
          'hasevents' : false,
          'prefixes' : false,
          'domprefixes' : false
        }
      }
    },

    // @todo: Imagemin task
    // @todo: Responsive images task


    // Deployment tasks

    // @todo: robots.txt task
    // @todo: sitemap task

    humans_txt: {
      options: {
        commentStyle: 'u',
        content: {
          'team': [{
            'Design, development': '<%= pkg.author.name %>',
            'Site': '<%= pkg.author.url %>',
            'Twitter': '@furzeface',
            'Location': 'Manchester, UK'
          }],
          'thanks': [
            {
            }
          ],
          'site': [ {
              'Version': '<%= pkg.version %>',
              'Site Url': '<%= pkg.homepage %>',
              'Keywords': '<%= pkg.keywords %>',
              'Language': 'English',
              'Technology': 'Assemble, Bower, Grunt, JavaScript, Node, Sass, Yeoman'
            }
          ]
        },
      },
      site: {
        dest: '<%= config.dist %>/humans.txt'
      },
    },

    zip: {
      deploy: {
        cwd: '<%= config.dist %>/',
        src: [
          '<%= config.dist %>/**/*'
        ],
        dest: 'dist.zip'
      }
    }

    // @todo: AWS Deploy task


  });

  // Setup task - called after npm install.
  grunt.registerTask('setup', [
    'copy:sassface',
    'clean:sassface'
  ]);

  // Build tasks.
  grunt.registerTask('build_html', [
    'clean:html',
    'assemble',
    'copy:assets'
  ]);

  grunt.registerTask('build_scripts', [
    'clean:scripts',
    'jscs',
    'jshint',
    'concat:jquery',
    'concat:scripts',
    'copy:scripts'
  ]);

  grunt.registerTask('build_styles', [
    'clean:styles',
    'sass',
    'autoprefixer',
    'cmq',
    'copy:styles',
    'copy:assets'
  ]);

  grunt.registerTask('build_dev', [
    'build_html',
    'build_scripts',
    'build_styles',
    'modernizr'
  ]);

  grunt.registerTask('build_docs', [
    'todo',
    'jsdoc',
    'sassdoc'
  ]);

  grunt.registerTask('build_production', [
    'build_dev',
    'cssmin',
    'uglify',
    'htmlmin',
    'clean:production'
  ]);

  // Default task.
  grunt.registerTask('default', [
    'server'
  ]);

  // Local server task.
  grunt.registerTask('server', [
    'clean:everything',
    'build_dev',
    'build_docs',
    'connect:livereload',
    'watch'
  ]);

  // Deploy task.
  grunt.registerTask('deploy', [
    'build_production',
    'humans_txt',
    'zip:deploy'
    // 'aws_deploy'
  ]);
};
