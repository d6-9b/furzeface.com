/**
 * @file Blog module.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
 var ff = ff ? ff : {};
 (function ($) {
  $.extend(ff, {
    /**
     * Blog related methods.
     * @namespace Blog
     */
     blog: {
      ff: null,
      $postContent: null,
      $minsToRead: $('#mins_to_read'),
      setGlobal: function (ff) {
        var self = this;

        self.ff = ff;
      },
      /**
      * Initialises Blog module.
      * @function init
      * @memberof Blog
      */
      init: function () {
        var self = this;

        self.minsToRead();
      },
      /**
      * Sets minutes to read on blog posts.
      * @function minsToRead
      * @memberof Blog
      * @see {@link http://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension}
      */
      minsToRead: function () {
        var self = this;
        self.$postContent = $('.post-content');

        // Average WPM from Wikipedia
        var wordsPerMinute = 180,
        // Get length of the post
        postText = self.$postContent.text().split(' ').length,
        // Calculate and round up
        minsToRead = Math.round(postText / wordsPerMinute);

        // Populate element in banner
        self.$minsToRead.text(minsToRead + ' min read');
      }
    }
  });
  $.subscribe('setGlobal', function (event, ff) {
    ff.blog.setGlobal(ff);
  });
  $.subscribe('pageReady', function () {
    ff.blog.init();
  });
}(jQuery));
