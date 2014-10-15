/**
 * @file Menu module
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
 var ff = ff ? ff : {};
 (function ($) {
   $.extend(ff,{
    /**
    * Menu methods.
    * @namespace Menu
    */
    menu: {
     ff: null,
     fadeDuration: 100,
     menuInClass: 'menu-in',
     setGlobal: function (ff) {
      var self = this;
      self.ff = ff;
    },
    /**
    * Initialises menu namespaced methods
    * @function init
    * @memberof Menu
    */
    init: function () {
      var self = this;

      self.$openMenu = $('#menu-open');
      self.$closeMenu = $('#menu-close');
      self.$menuOverlay = $('#menu-overlay');

      self.bindEvents();
    },
    /**
    * Binds Menu module events.
    * @function bindEvents
    * @memberof Menu
    */
    bindEvents: function () {
      var self = this;

      self.$openMenu.on('click', function (e) {
        e.preventDefault();

        self.openMenu();
      });

      self.$closeMenu.on('click', function (e) {
        e.preventDefault();

        self.closeMenu();
      });
    },
    /**
    * Adds CSS class to <html>, opening menu.
    * @function openMenu
    * @memberof Menu
    */
    openMenu: function () {
      var self = this;

      self.$menuOverlay.fadeIn(self.fadeDuration);
      self.ff.utilities.lockScroll();
    },
    /**
    * Removes CSS class from <html>, closing menu.
    * @function closeMenu
    * @memberof Menu
    */
    closeMenu: function () {
      var self = this;

      self.$menuOverlay.fadeOut(self.fadeDuration);
      self.ff.utilities.unlockScroll();
    }
  }
});
$.subscribe('setGlobal', function (event, ff) {
  ff.menu.setGlobal(ff);
});
$.subscribe('pageReady', function () {
  ff.menu.init();
});
}(jQuery));
