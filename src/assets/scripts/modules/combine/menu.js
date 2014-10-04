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
     $toggleMenu: null,
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

      self.bindEvents();
    },
    /**
    * Binds Menu module events.
    * @function bindEvents
    * @memberof Menu
    */
    bindEvents: function () {
      var self = this;

      self.$toggleMenu = $('.toggle-menu');

      self.$toggleMenu.on('click.menu', function (e) {
        e.preventDefault();

        if (self.ff.settings.$html.hasClass(self.menuInClass)) {
          self.closeMenu();
        } else {
          self.openMenu();
        }
      });
    },
    /**
    * Adds CSS class to <html>, opening menu.
    * @function openMenu
    * @memberof Menu
    */
    openMenu: function () {
      var self = this;

      self.ff.settings.$html.addClass(self.menuInClass).removeClass(self.ff.search.searchInClass);
    },
    /**
    * Removes CSS class from <html>, closing menu.
    * @function closeMenu
    * @memberof Menu
    */
    closeMenu: function () {
      var self = this;

      self.ff.settings.$html.removeClass(self.menuInClass);
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
