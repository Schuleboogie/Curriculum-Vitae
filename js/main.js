$(document).ready(function() {
	Site.start();
});

var Site = (function() {
	var preview;;
	var logoPopup;

	function start() {
		preview = $('div.preview');
		logoPopup = false;
		// Add logo popup after scrolling past header in mobile
		$(window).scroll(function() {
			if ($(this).scrollTop() > $('header').height() + 50 && !logoPopup) {
				var returnLogo = $('<div id="popup-logo"></div>');
				returnLogo.append($('section#image img').clone());
				returnLogo.append($('section#text h1').clone());
				returnLogo.append($('<i class="fa fa-arrow-up" aria-hidden="true"></i>'));
				returnLogo.click(function(e) {
					e.preventDefault();
					scrollDown('0');
				});
				$('main').prepend(returnLogo);
				logoPopup = true;
			}
			else if ($(this).scrollTop() < $('header').height() + 50 && logoPopup) {
				$('#popup-logo').slideUp(200, function() { $(this).remove(); });
				logoPopup = false;
			}
		});
		preview.on('click', openPreview);
		preview.on('mouseenter', hover);
		preview.on('mouseleave', hoverLeave);
	}
	// Scroll down to specified position
	function scrollDown(position) {
		$('html, body').animate({
			scrollTop: position
		}, 1000);
	}
	function openPreview(e) {
		e.stopPropagation();
		// Remove previous previews
		removePreviews();
		// Create preview by cloning preview and appending on top of page
		var newPreview = $(this).clone();
		newPreview.append($('<i class="fa fa-times" aria-hidden="true"></i>'));
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
