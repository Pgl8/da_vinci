/**
 * @file
 * Da Vinci Custom Code of the javascript behaviour.
 */

(function ($) {
  Drupal.behaviors.davinciTheme = {
    attach: function (context) {

      // Convert Logo.png to svg with posibility change color.
			$('.site-logo img').each(function(){

				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');
				var imgTitle = $img.attr('alt');

				$.get(imgURL, function(data) {
					// Get the SVG tag, ignore the rest
					var $svg = jQuery(data).find('svg');
					var $svg_title = jQuery(data).find('svg title');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
					}

					// Add replaced image's Title to the new SVG
					if(typeof imgTitle !== 'undefined') {
							$svg_title = $svg_title.text(imgTitle);
					}

					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
					if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
					}

					// Replace image with new SVG
					$img.replaceWith($svg);

				}, 'xml');

			});

    }
  };
})(jQuery);
