/**
 * @file Returns a note link for within posts.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */

 module.exports.register = function (Handlebars, options, params)  {
  /**
  * Handlebars helpers.
  * @namespace Handlebars.helpers
  */
  Handlebars.registerHelper('note', function (index, options) {
    /**
    * Return a note  link.
    * @function note
    * @memberof Handlebars.helpers
    * @param {string} index - note number
    * @example
    * // returns <sup><a href="#note-1" id="note-1-ref">*</a></sup>
    * Handlebars.helpers.note(1);
    * @returns {string} html
    */
    var html = [];

    html.push('<sup>');
    html.push('<a href="#note-' + index + '" id="note-' + index + '-ref">*</a>');
    html.push('</sup>');

    return html.join('');
  });
};
