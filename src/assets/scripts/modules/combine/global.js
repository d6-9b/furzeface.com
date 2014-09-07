var bb = bb ? bb : {};
(function ($) {
  $.extend(bb, {
    global: {
      bb: null,
      setGlobal: function (bb) {
        var self = this;
        self.bb = bb;
      },
      init : function () {
        var self = this;

        self.bindEvents();
      },
      bindEvents: function () {
        // var self = this;

        $('.emoji').each(function(i, d){
          $(d).emoji();
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
