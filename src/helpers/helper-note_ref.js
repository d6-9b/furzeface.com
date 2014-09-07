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
    * // returns <sup><span id="note-1"><a href="#note-1-ref">^</a></span></sup>
    * Handlebars.helpers.note(1);
    * @returns {string} note
    */
    var note = [];

    note.push('<sup>');
    note.push('<span id="note-' + index + '">');
    note.push('<a href="#note-' + index + '-ref">^</a>');
    note.push('</span>');
    note.push('</sup>');

    return note.join('');
  });
};
