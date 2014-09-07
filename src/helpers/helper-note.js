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
    * @returns {string} note
    */
    var note = [];

    note.push('<sup>');
    note.push('<a href="#note-' + index + '" id="note-' + index + '-ref">*</a>');
    note.push('</sup>');

    return note.join('');
  });
};
