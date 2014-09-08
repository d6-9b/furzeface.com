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
      aws: {
        //credentials: grunt.file.readJSON('.aws.json'),
        bucket: 'daniel.furzeface.com',
        bucketStatic: 'furzeface-cdn',
        region: 'eu-west-1' // Ireland
      },
      // Component settings
      bower: '<%= bowerrc.directory %>',
      // Src settings
      src: 'src',
      srcAssets: 'assets',
      srcStyles: 'styles',
      srcSass: 'sass',
      srcScripts: 'scripts',
      srcImages: 'images',
      srcFonts: 'fonts',
      // Dist settings
      dist: 'dist',
      distStyles: 'styles',
      distScripts: 'scripts',
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
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.srcSass %>/**/*.scss'
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
      images: {
        files: [
          '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>/**/*.{png,jpg,gif}'
        ],
        tasks: [
          // 'responsive_images',
          'imagemin'
        ],
        options: {
          spawn: false
        }
      },
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
              // If in a subdirectory: blog/post-title.hbs
              var index = null,
              splitSrc = src.split('/'); // ['blog', 'post-title.hbs']
              filename = dest; // 'dist/'

              for (index = 0; index < splitSrc.length; ++index) {
                filename = filename + splitSrc[index];
                // 'dist/blog/post-title'

                if (src.indexOf('.hbs')) {
                  // Replace the extension
                  filename = filename.replace('.hbs', '') + '/';
                }
              }
              // Create an index file for it: blog/post-title/index.html
              filename = filename + 'index';
            } else {
              // Else it's a top level page - create a directory and index file for it: about/index.html
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
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcFonts %>/',
            src: [
              '**'
            ],
            dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.distFonts %>/'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>',
            src: [
              '**/*'
            ],
            dest: '<%= config.dist %>/<%= config.distImages %>/'
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
      docs: [
        '<%= config.dist %>/<%= config.distDocs %>'
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
          '**/*.html',
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


    // Image tasks
    responsive_images: {
      options: {
        engine: 'im',
        separator: '--',
        sizes: [
        {
          name: 'small',
          width: 250
        },
        {
          name: 'medium',
          width: 750
        },
        {
          name: 'large',
          width: 1440
        }]
      },
      main: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>/',
          src: [
            '**/*.{gif,jpg,jpeg,png}'
          ],
          dest: '<%= config.src %>/<%= config.srcImages %>/'
        }]
      },
    },

    imagemin: {
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>/',
            src: [
              '**/*.{gif,jpg,jpeg,png}',
              '!emojis' // @todo exclude these
            ],
            dest: '<%= config.dist %>/<%= config.distImages %>/'
          }
        ]
      }
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


    // Deployment tasks
    sitemap: {
      options: {
        changefreq: 'weekly',
        pattern: '**/*.html'
        // @todo: excludes
      },
      site: {
        siteRoot: '<%= config.dist %>/'
      }
    },

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

    robotstxt: {
      site: {
        dest: '<%= config.dist %>/',
        policy: [
          {
            ua: '*',
            disallow: '<%= config.distDocs %>'
          },
          {
            sitemap: [
              '<%= pkg.homepage %>/sitemap.xml'
            ]
          },
          {
            host: '<%= pkg.homepage %>'
          }
        ]
      }
    },

    s3: {
      options: {
        accessKeyId: '<%= config.aws.credentials.accessKeyId %>',
        secretAccessKey: '<%= config.aws.credentials.secretAccessKey %>',
        region: '<%= config.aws.region %>'
      },
      site: {
        options: {
          bucket: '<%= config.aws.bucket %>'
        },
        cwd: 'dist/',
        src: '**/*'
      },
      static: {
        options: {
          bucket: '<%= config.aws.bucketStatic %>'
        },
        cwd: 'static', // @todo: targets for static assets
        src: '**'
      }
    }

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

  grunt.registerTask('build_images', [
    // 'responsive_images',
    //'imagemin', // @todo: put back in when emojis excluded
    'copy:images'
  ]);

  grunt.registerTask('build_docs', [
    'todo',
    'clean:docs',
    'jsdoc',
    'sassdoc'
  ]);


  // Task aliases.
  grunt.registerTask('build_dev', [
    'build_html',
    'build_images',
    'build_scripts',
    'build_styles',
    'modernizr'
  ]);

  grunt.registerTask('build_production', [
    'build_dev',
    'cssmin',
    'uglify',
    'htmlmin',
    'humans_txt',
    'sitemap',
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
    /*'s3:site',
    's3:static'*/
  ]);
};
