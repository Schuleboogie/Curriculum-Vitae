$(document).ready(function() {
	Site.start();
});

var Site = (function() {
	var preview = $('div.preview');

	function start() {
		preview.on('click', openPreview);
		preview.on('mouseenter', hover);
		preview.on('mouseleave', hoverLeave);
	}
	function openPreview(e) {
		e.stopPropagation();
		// Remove previous previews
		removePreviews();
		// Create preview by cloning preview and appending on top of page
		var newPreview = $(this).clone();
		newPreview.appendTo('section#album');
		newPreview.addClass('previewed');
		newPreview.find('p.blowup').css('display','block');
		// Add event listener for removing preview
		$(document).on('click', removePreviews);
	}
	function removePreviews(e) {
		$('.previewed').each(function() {
			$(this).find('p.blowup').css('display','none');
			$(this).remove();
		});
	}
	function hover(e) {
		var hoverImage = $('<span class=\"hover-image\"><img src=\"img/zoom-icon.png\"></span>');
		$(this).append(hoverImage);
	}
	function hoverLeave(e) {
		$(this).find('span.hover-image').remove();
	}

	return {
		start: start
	};
})();
