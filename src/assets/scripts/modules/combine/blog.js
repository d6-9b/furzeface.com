/**
 * @file Blog module.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
var ff = ff ? ff : {};
(function($) {
	$.extend(ff, {
		/**
		 * Blog related methods.
		 * @namespace Blog
		 */
		blog: {
			/**
			 * Initialises Blog module.
			 * @function init
			 * @memberof Blog
			 */
			init: function() {
				var self = this;

				self.$minsToRead = $('#mins_to_read');
				self.$gists = $('[data-gist]');
				self.$postContent = $('#post');
				self.$blogHeadings = self.$postContent.find('h2, h3'); // Using .find() is quicker than child CSS selectors y’know!

				self.minsToRead();
				self.appendGists();
				self.headingsPermalink();
			},
			/**
			 * Sets minutes to read on blog posts.
			 * @function minsToRead
			 * @memberof Blog
			 * @see {@link http://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension}
			 */
			minsToRead: function() {
				var self = this;

				// Average WPM from Wikipedia
				var wordsPerMinute = 180,
					// Get length of the post
					postText = self.$postContent.text().split(' ').length,
					// Calculate and round up
					minsToRead = Math.round(postText / wordsPerMinute);

				// Populate element in banner
				self.$minsToRead.text(minsToRead + ' min read').show();
			},
			/**
			 * Appends GitHub gists after pageReady.
			 * @function appendGist
			 * @memberof Blog
			 * @see {@link https://www.chrispoulter.com/blog/post/loading-gists-asynchronously}
			 */
			appendGists: function() {
				var self = this;

				// Don't want to do it if no Gists
				if (!self.$gists.length) {
					return false;
				}

				self.$gists.each(function() {
					var $element = $(this),
						id = $element.attr('data-gist');

					$element.html('<p>Loading Gist&hellip;</p>');

					$.ajax({
						url: 'https://gist.github.com/' + id + '.json',
						dataType: 'jsonp',
						cache: true,
						success: function(data) {
							if (data && data.div) {
								if (!$('link[href="' + data.stylesheet + '"]').length) {
									ff.settings.$head.append('<link rel="stylesheet" href="' + data.stylesheet + '"' + ' />');
								}
								$element.html(data.div);
							}
						},
						error: function() {
							$element.html('<p>Gist Load Failed</p>');
						}
					});
				});
			},
			/**
			 * Appends permalink to headings on a blog post.
			 * @function headingsPermalink
			 * @memberof Blog
			 */
			headingsPermalink: function() {
				var self = this;

				// Don't want to do it if no headings
				if (!self.$blogHeadings.length) {
					return false;
				}

				// Loop headings on blog post
				$.each(self.$blogHeadings, function() {
					var heading = $(this),
						id = heading.attr('id'),
						text = heading.text(),
						permalink;

					// If there isn't already an id, create one from content
					if (!id) {
						id = ff.utilities.slugify(text);
						heading.attr('id', id);
					}

					// Create and append permalink to heading
					permalink = '<a href="#' + id + '" class="icon-internal permalink" title="Permalink for this section"></a>';
					heading.append(permalink);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		// Initialise on blog posts
		if (ff.settings.$body.hasClass('page-post')) {
			ff.blog.init();
		}
	});
}(jQuery));
