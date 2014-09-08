/**
 * @file Returns an HTML link from markdown syntax.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */

 module.exports.register = function (Handlebars, options, params)  {
  /**
  * Handlebars helpers.
  * @namespace Handlebars.helpers
  */
  Handlebars.registerHelper('link', function (link, options) {
    /**
    * Return an <html> link - helps converting my old content over.
    * @function link
    * @memberof Handlebars.helpers
    * @param {string} emoji - emoji name
    * @example
    * // returns <a href="http://caniuse.com">Can I Use</a>
    * Handlebars.helpers.link('[Can I Use](http://caniuse.com)');
    * @returns {string} html
    */
    var html = [],
    linkText = link.split('](')[0].replace('[', ''),
    href = link.split('](')[1].replace(')', '');

      console.log(link.split(']('));

    html.push('<a href="' + href + '">' + linkText + '</a>');

    return new Handlebars.SafeString(html.join(''));
  });
};
