/*
* @file Menu module
* @version 1.0.0
* @author {@link http://github.com/furzeface Daniel Furze}
*/
var ff = ff ? ff : {};
(function ($) {
  $.extend(ff, {
  /**
  * Menu methods.
  * @namespace Menu
  */
  menu: {
    // Configuration
    fadeDuration: 100,
    /**
    * Initialises menu namespaced methods
    * @function init
    * @memberof Menu
    */
    init: function () {
      var self = this;

      self.$openMenu = $('#navigation__open');
      self.$closeMenu = $('#navigation__close, #navigation__close--bottom');
      self.$menuOverlay = $('#navigation-site');

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
    * Adds CSS class to <html>, opening menu. Focuses on first close menu button.
    * @function openMenu
    * @memberof Menu
    */
    openMenu: function () {
      var self = this;

      self.$menuOverlay.fadeIn(self.fadeDuration);
      $('#navigation__close').focus();
      ff.utilities.lockScroll();
    },
    /**
    * Removes CSS class from <html>, closing menu. Focus on open menu button.
    * @function closeMenu
    * @memberof Menu
    */
    closeMenu: function () {
      var self = this;

      self.$menuOverlay.fadeOut(self.fadeDuration);
      self.$openMenu.focus();
      ff.utilities.unlockScroll();
    }
  }
});
$.subscribe('pageReady', function () {
  ff.menu.init();
});
}(jQuery));
