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
      // Cached jQuery objs
      $images: $('img'),
      $emoji:  $('.emoji'),
      $notes: $('.note'),
      $noteRefs: $('.note-ref'),
      // Configuration
      // originalFontSize: parseFloat(ff.settings.$html.css('font-size')),
      // resizeCount: 0,
      /**
      * Initialises Global module.
      * @function init
      * @memberof Global
      */
      init: function () {
        var self = this;

        // self.$textResizer = $('#text_resizer');

        self.bindEvents();
        self.setEmojis();
        // self.syntaxHighlight();
        self.lazyImages();

        ff.utilities.svgToPng();
      },
      /**
      * Binds Global module events.
      * @function bindEvents
      * @memberof Global
      */
      bindEvents: function () {
        var self = this;

        // self.$textResizer.on('click', function (e) {
        //   e.preventDefault();

        //   self.enlargeText();
        // });

        self.$noteRefs.on('click', function () {
          self.backToNote($(this));
        });

        self.$notes.on('click', function () {
          self.focusNote($(this));
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
          var fontSize = parseFloat(ff.settings.$html.css('font-size')) * 1.1;
          // Sets new font size
          ff.settings.$html.css('font-size', fontSize);
        } else {
          // Else reset font size
          ff.settings.$html.css('font-size', self.originalFontSize);
          // And reset counter
          self.resizeCount = 1;
        }
      },
      /**
      * Note reference navigation.
      * @function toNoteRef
      * @memberof Global
      */
      focusNote: function ($note) {
        var noteId = $note.attr('href'),
        $noteRef = $(noteId);

        $noteRef.focus();
      },
      /**
      * Note navigation.
      * @function backToNote
      * @memberof Global
      */
      backToNote: function ($noteRef) {
        var noteRefId = $noteRef.attr('id'),
        $note = $(noteRefId);

        $note.focus();
      }
    }
  });
$.subscribe('pageReady', function () {
  ff.global.init();
});
}(jQuery));
