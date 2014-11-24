/**
 * @file Global site module.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
 var ff = ff ? ff : {};
 (function ($) {
  $.extend(ff, {
    /**
     * Site global related methods.
     * @namespace Global
     */
     global: {
      ff: null,
      $images: $('img'),
      $emoji:  $('.emoji'),
      originalFontSize: parseFloat(ff.settings.$html.css('font-size')),
      resizeCount: 0,
      setGlobal: function (ff) {
        var self = this;

        self.ff = ff;
      },
      /**
      * Initialises Global module.
      * @function init
      * @memberof Global
      */
      init: function () {
        var self = this;

        self.bindEvents();

        self.setEmojis();
        // self.syntaxHighlight();
        self.lazyImages();
      },
      /**
      * Binds Global module events.
      * @function bindEvents
      * @memberof Global
      */
      bindEvents: function () {
        var self = this;

        self.$textResizer = $('#text_resizer');

        self.$textResizer.on('click', function (e) {
          e.preventDefault();

          self.enlargeText();
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

        $('.emoji').show();
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
      },
      /**
      * Text enlargement.
      * @function enlargeText
      * @memberof Global
      */
      enlargeText: function () {
        var self = this;

        if (self.resizeCount < 6) {
          // Updates counter
          self.resizeCount = self.resizeCount + 1;
          // Calculates new font size
          var fontSize = parseFloat(self.ff.settings.$html.css('font-size')) * 1.1;
          // Sets new font size
          self.ff.settings.$html.css('font-size', fontSize);
        } else {
          // Else reset font size
          self.ff.settings.$html.css('font-size', self.originalFontSize);
          // And reset counter
          self.resizeCount = 1;
        }
      }
    }
  });
$.subscribe('setGlobal', function (event, ff) {
  ff.global.setGlobal(ff);
});
$.subscribe('pageReady', function () {
  ff.global.init();
});
}(jQuery));
