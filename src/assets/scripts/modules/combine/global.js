/**
 * @file Global site module.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
 var bb = bb ? bb : {};
 (function ($) {
  $.extend(bb, {
    /**
     * Site global related methods.
     * @namespace Global
     */
     global: {
      bb: null,
      $images: $('img'),
      $gists: $('[data-gist]'),
      $emoji:  $('.emoji'),
      setGlobal: function (bb) {
        var self = this;

        self.bb = bb;
      },
      /**
      * Initialises Global module.
      * @function init
      * @memberof Global
      */
      init: function () {
        var self = this;

        self.bindEvents();
        self.appendGists();
        self.setEmojis();
        // self.syntaxHighlight();
        self.lazyImages();
      },
      /**
      * Appends GitHub gists after pageReady.
      * @function appendGist
      * @memberof Global
      * @see {@link https://www.chrispoulter.com/blog/post/loading-gists-asynchronously}
      */
      appendGists: function () {
        var self = this;

        self.$gists.each(function () {
          var $element = $(this),
          id = $element.attr('data-gist');

          $element.html('<p>Loading Gist...</p>');

          $.ajax({
            url: 'https://gist.github.com/' + id + '.json',
            dataType: 'jsonp',
            cache: true,
            success: function (data) {
              if (data && data.div) {
                if (!$('link[href="' + data.stylesheet + '"]').length) {
                  self.bb.settings.$head.append('<link rel="stylesheet" href="' + data.stylesheet + '"' + ' />');
                }
                $element.html(data.div);
              }
            },
            error: function () {
              $element.html('<p>Gist Load Failed</p>');
            }
          });
        });
      },
      /**
      * Sets emoji images in post content.
      * @function setEmojis
      * @memberof Global
      * @see {@link http://www.emoji-cheat-sheet.com}
      */
      setEmojis: function () {
        var self = this;

        self.$emoji.each(function(i, d){
          $(d).emoji();
        });
      },
      /**
      * Initialises syntax highlighting plugin.
      * @function syntaxHighlight
      * @memberof Global
      * @see {@link https://highlightjs.org}
      */
      syntaxHighlight: function () {
        hljs.initHighlightingOnLoad();
      },
      /**
      * Lazy Loading Images via jQuery plugin
      * @function lazyImages
      * @memberof Global
      * @see {@link http://luis-almeida.github.io/unveil}
      */
      lazyImages: function () {
        var self = this;

        self.$images.unveil(400);
      }
    }
  });
  $.subscribe('setGlobal', function (event, bb) {
    bb.global.setGlobal(bb);
  });
  $.subscribe('pageReady', function () {
    bb.global.init();
  });
}(jQuery));
