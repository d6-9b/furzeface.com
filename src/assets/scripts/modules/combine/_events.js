var ff = ff ? ff : {};
(function ($) {
  $.extend(ff, {
    // functions to run again when ajax content is loaded
    ajaxLoaded: function () {
      var self = this;

      $.publish('ajaxLoaded', self);
    },
    // reusable site loaded function
    pageLoaded: function () {
      var self = this;
      self.settings.$window.on('load', function () {

        $.publish('pageLoaded', self);
      });
    },
    // reusable site ready function
    pageReady: function () {
      var self = this;

      self.pageLoaded();
      $.publish('pageReady', self);
    }
  });
}(jQuery));
