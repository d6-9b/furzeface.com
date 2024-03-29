/**
 * @file Gruntfile
 * @version 3.0.0
 * @author {@link https://github.com/furzeface Daniel Furze}
 */

 module.exports = function(grunt) {
  'use strict';
  /* jshint camelcase: false */

  // Reads package.json and dynamically loads all Grunt tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies', pattern: ['assemble', 'assemble-*', 'grunt-*']});

  // Time all of the things
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
      srcImages: 'images',
      srcFonts: 'fonts',
      mainSass: 'furzeface.scss',
      // Dist settings
      dist: 'dist',
      distAssets: '_assets',
      distStyles: 'styles',
      distScripts: 'scripts',
      distImages: 'images',
      distFonts: 'fonts',
      distDocs: 'docs',
      distJsDocs: 'jsdocs',
      distSassDocs: 'sassdocs',
      mainCss: 'main.css',
      // Misc settings
      gruntfile: 'Gruntfile.js',
      helpers: 'helpers'
    },

    // Watchers
    watch: {
      gruntfile: {
        files: [
        '<%= config.gruntfile %>'
        ],
        tasks: [
        'jshint:gruntfile'
        ]
      },
      html: {
        files: [
        '<%= config.src %>/{data,pages,partials,layouts,helpers}/**/*.{hbs,js,json,yml}'
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
        'build_styles'/*,
        'modernizr'*/
        ]
      },
      scripts: {
        files: [
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/**/*.js',
        ],
        tasks: [
        'build_scripts'/*,
        'modernizr'*/
        ]
      },
      images: {
        files: [
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>/**/*.{png,jpg,gif}'
        ],
        tasks: [
        'build_images_dev'
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
        '<%= config.dist %>/**/*.html',
        '<%= config.dist %>/<%= config.distAssets %>/**/*.css',
        '<%= config.dist %>/<%= config.distAssets %>/**/*.js',
        '<%= config.dist %>/<%= config.distAssets %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
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
      '<%= config.src %>/**/*.{hbs,html,txt}',
      '.travis.yml',
      '<%= config.gruntfile %>'
      ]
    },

    devUpdate: {
      report: {
        options: {
          updateType: 'report'
        }
      },
      prompt: {
        options: {
          updateType: 'prompt'
        }
      },
      force: {
        options: {
          updateType: 'force'
        }
      }
    },

    // Documentation tasks
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
        assetsUrl: function () {
          // Production flag set on CI deploy task
          if (grunt.option('production')) {
            return 'http://furzeface.com/_assets';
          } else {
            return '/_assets';
            // @todo Return dynamically built local URL for assetsUrl
            // return 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/_assets';
          }
        },
        copyrightYear: '<%= grunt.template.today(\'yyyy\') %>',
        data: [
        '<%= config.src %>/data/*.{json,yml}',
        'package.json',
        ],
        flatten: false,
        helpers: [
        '<%= config.src %>/<%= config.helpers %>/helper-*.js'
        ],
        images: '<%= config.distImages %>',
        layout: false,
        mainCss: '<%= config.mainCss %>',
        partials: [
        '<%= config.src %>/partials/**/*.hbs',
        '<%= config.src %>/layouts/**/*.hbs'
        ],
        plugins: [
        'assemble-related-pages'
        ],
        production: '<%= grunt.option(\'production\')%>',
        styles: '<%= config.distStyles %>',
        scripts: '<%= config.distScripts %>',
        temp: '<%= config.distTemp %>',
        timestamp: '<%= grunt.template.today(\'mmm dS yyyy, h:MMtt Z\') %>'
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

    // @todo test out grunt-wiredep for assets
    // wiredep: {
    //   dist: {
    //     options: {
    //     },
    //     src: [
    //     'dist/**/*.html'
    //     ]
    //   }
    // },
    // @todo test out deployment and references to bower_components
    // @todo test out usemin for assets

    copy: {
      fonts: {
        files: [
        {
          expand: true,
          cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcFonts %>',
          src: [
          '**/*'
          ],
          dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distFonts %>/'
        }]
      },
      images: {
        files: [
        {
          expand: true,
          cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>',
          src: [
          '**/*'
          ],
          dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distImages %>/'
        }
        ]
      },
      scripts: {
        files: [
        {
          expand: true,
          cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/plugins',
          src: ['*.js'],
          dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/'
        }
        ]
      }
    },

    clean: {
      // Cleans artifacts
      production: [
      '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/<%= config.mainCss %>.map',
      '<%= config.dist %>/<%= config.distAssets %>/<%= config.distFonts %>/furzeface/selection.json'
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
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
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
          '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/<%= config.mainCss %>': '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.srcSass %>/<%= config.mainSass %>'
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
        src: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/<%= config.mainCss %>',
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/'
      }
    },

    combine_mq: {
      main: {
        expand: true,
        cwd: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/',
        src: ['<%= config.mainCss %>'],
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/'
      }
    },

    px_to_rem: {
      main: {
        options: {
          base: 16,
          fallback: false,
          fallback_existing_rem: false,
          ignore: []
        },
        files: [
        {
          expand: true,
          flatten: true,
          src: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/<%= config.mainCss %>',
          dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/'
        }
        ]
      }
    },

    cssmin: {
      options: {
        banner: '<%= meta.banner %>',
        noAdvanced: true
      },
      main: {
        src: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/<%= config.mainCss %>',
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/<%= config.mainCss %>'
      }
    },


    // Script tasks
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
      '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/**/*.js'
      ],
      gruntfile: [
      '<%= config.gruntfile %>'
      ]
    },

    concat: {
      jquery: {
        src: [
        '<%= config.bower %>/jquery/dist/jquery.js'
        ],
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/jquery.js'
      },

      scripts: {
        src: [
        // from Bower components
        '<%= config.bower %>/jquery-tiny-pubsub/dist/ba-tiny-pubsub.min.js',
        '<%= config.bower %>/picturefill/dist/picturefill.min.js',
        '<%= config.bower %>/jquery-unveil/jquery.unveil.min.js',
        // plugins
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/plugins/combine/*.js',
        // combined scripts
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/modules/combine/*.js',
        // initialise all modules afterwards
        '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/_init.js'
        ],
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/scripts.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        preserveComments: 'some',
        mangle: true
      },
      jquery: {
        src: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/jquery.js',
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/jquery.js'
      },
      scripts: {
        src: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/scripts.js',
        dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/scripts.js'
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
          '!emojis/*.png'
          ],
          dest: '<%= config.dist %>/<%= config.distAssets %>/<%= config.distImages %>/'
        }
        ]
      }
    },


    // Misc build tasks
    modernizr: {
      dist: {
        'devFile': '<%= config.bower %>/modernizr/modernizr.js',
        'outputFile': '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/modernizr.js',
        'parseFiles': true,
        'files': {
          'src': [
          '<%= config.dist %>/<%= config.distAssets %>/<%= config.distStyles %>/*.css',
          '<%= config.dist %>/<%= config.distAssets %>/<%= config.distScripts %>/*.js'
          ]
        },
        'extra': {
          'shiv': true,
          'printshiv': false,
          'load': true,
          'mq': false,
          'cssclasses': true,
          'touch': true
        },
        'extensibility': {
          'addtest': false,
          'prefixed': false,
          'teststyles': false,
          'testprops': false,
          'testallprops': false,
          'hasevents': false,
          'prefixes': false,
          'domprefixes': false
        }
      }
    },


    // Production tasks
    cachebust: {
      default_options: {
        files: [
        {
          expand: true,
          cwd: 'dist/',
          src: [
          '**/*.html'
          ],
          dest: 'dist/'
        }
        ]
      }
    },

    xml_sitemap: {
      site: {
        options: {
          changefreq: 'weekly',
          dest: '<%= config.dist %>/',
          fileName: 'sitemap',
          siteRoot: 'http://furzeface.com/',
          priority: '0.5'
        },
        files: [
        {
          expand: true,
          cwd: '<%= config.dist %>/',
          src: [
          '**/*.html',
          '!docs/**/*.html'
          ]
        }
        ]
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

    // Post deploy tasks
    checkPages: {
      deploy: {
        options: {
          pageUrls: [
          'http://furzeface.com',
          'http://furzeface.com/about',
          'http://furzeface.com/blog',
          'http://furzeface.com/blog/2',
          'http://furzeface.com/blog/3',
          'http://furzeface.com/toolkit'
          ],
          checkLinks: true,
          onlySameDomainLinks: true,
          noLocalLinks: true,
          linksToIgnore: []
        }
      }
    }

  });

  // Build tasks.
  grunt.registerTask('build_html', [
    'assemble'/*,
    'wiredep'*/
    ]);

  grunt.registerTask('build_styles', [
    'sass',
    'newer:autoprefixer',
    'newer:combine_mq',
    'newer:px_to_rem'
    ]);

  grunt.registerTask('build_scripts', [
    'newer:jshint',
    'newer:concat:jquery',
    'newer:concat:scripts',
    'copy:scripts'
    ]);

  grunt.registerTask('build_images_dev', [
    // 'responsive_images', @todo: Add resp img task back in
    'newer:imagemin',
    'copy:images'
    ]);

  grunt.registerTask('build_images', [
    'copy:images'
    ]);

  grunt.registerTask('build_fonts', [
    'copy:fonts'
    ]);

  grunt.registerTask('build_docs', [
    'todo',
    'clean:docs',
    'jsdoc'/*,
    'sassdoc'*/
    ]);


  // Task aliases.
  grunt.registerTask('build_dev', [
    'build_html',
    'build_images',
    'build_scripts',
    'build_styles',
    'build_fonts'/*,
    'modernizr'*/
    ]);

  grunt.registerTask('build_production', [
    // build tasks
    // 'build_docs',
    'build_dev',
    // production build tasks
    'cssmin',
    'uglify',
    'htmlmin',
    'humans_txt',
    'robotstxt',
    'xml_sitemap',
    'clean:production'
    ]);

  // Default task.
  grunt.registerTask('default', [
    'serve'
    ]);

  grunt.registerTask('serve', [
   'clean:everything',
    // 'build_docs',
    'build_dev',
    'connect:livereload',
    'watch'
    ]);

  // Deploy task.
  grunt.registerTask('deploy', [
    'build_production'
    ]);

  // Post deploy task.
  grunt.registerTask('post_deploy', [
    'checkPages'
    ]);
};
