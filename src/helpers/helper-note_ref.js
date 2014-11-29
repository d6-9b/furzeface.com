/**
 * @file Returns a note back link for within posts.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */

 module.exports.register = function (Handlebars, options, params)  {
  /**
  * Handlebars helpers.
  * @namespace Handlebars.helpers
  */
  Handlebars.registerHelper('note_ref', function (index, options) {
    /**
    * Return a note reference 'back' link.
    * @function note_ref
    * @memberof Handlebars.helpers
    * @param {string} index - note number
    * @example
    * // returns <sup><span id="note-3"><a href="#note-3-ref">***</a></span></sup>
    * Handlebars.helpers.note(3);
    * @example
    * // returns <sup><span id="note-5"><a href="#note-5-ref">*****</a></span></sup>
    * Handlebars.helpers.note(5);
    * @returns {string} note
    */
    var html = [];

    html.push('<sup>');
    html.push('<span id="note-' + index + '">');
    html.push('<a href="#note-' + index + '-ref">');

    for (var i = 1; i <= index; i++) {
      html.push('*');
    }

    html.push('</a>');
    html.push('</span>');
    html.push('</sup>');

    return new Handlebars.SafeString(html.join(''));
  });
};
