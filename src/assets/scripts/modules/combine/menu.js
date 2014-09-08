/**
 * @file Menu module
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb,{
    /**
    * Menu methods.
    * @namespace Menu
    */
		menu: {
			bb: null,
			$handle: null,
			menuInClass: 'menu-in',
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
      /**
      * Initialises menu namespaced methods
      * @function init
      * @memberof Menu
      */
			init: function () {
				var self = this;

				self.$handle = $('.action-menu');
				self.$handle.on('click.menu', function (event) {
					event.preventDefault();
					if (self.bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
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

				self.bb.settings.$html.addClass(self.menuInClass).removeClass(self.bb.search.searchInClass);
			},
      /**
      * Removes CSS class from <html>, closing menu.
      * @function closeMenu
      * @memberof Menu
      */
			closeMenu: function () {
				var self = this;

				self.bb.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.menu.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.menu.init();
	});
}(jQuery));
