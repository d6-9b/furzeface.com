/**
 * @file Global module
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
      setGlobal: function (bb) {
        var self = this;
        self.bb = bb;
      },
      /**
      * Initialises Global module.
      * @function init
      * @memberof Global
      */
      init : function () {
        var self = this;

        self.bindEvents();
        self.appendGist();
      },
      /**
      * Binds global module events
      * @function bindEvents
      * @memberof Global
      */
      bindEvents: function () {
        var self = this;
        self.$emoji = $('.emoji');

        self.$emoji.each(function(i, d){
          $(d).emoji();
        });
      },
      /**
      * Appends GitHub gists after pageReady
      * @function appendGist
      * @memberof Global
      * @see {@link https://www.chrispoulter.com/blog/post/loading-gists-asynchronously}
      */
      appendGist: function () {
        $('[data-gist]').each(function () {
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
                  $('head').append('<link rel="stylesheet" href="' + data.stylesheet + '"' + ' />');
                }
                $element.html(data.div);
              }
            },
            error: function () {
              $element.html('<p>Gist Load Failed</p>');
            }
          });
        });
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
