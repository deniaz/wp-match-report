(function($) {

	var fsTabs = {
		init: function() {
			var that = this;

			if (window.location.hash.length > 0) {
				this.onLoad();
			}

			if ($('nav#fs-nav').length > 0 && $('body').hasClass('single-format-quote')) {
				that.addListeners();
			}
		},
		addListeners: function() {
			$('nav#fs-nav li a').live('click', function() {
				$('nav#fs-nav li.active').removeClass('active');
				$(this).closest('li').addClass('active');

				$('section.fs-content').hide();

				var target = $(this).attr('href').substr(2);

				$('#' + target).show();
			});

			this.hideContent();
		},
		hideContent: function() {
			$('section.fs-content').hide();
			var target = $('nav#fs-nav li.active a').attr('href').substr(2);
			$('#' + target).show();
		},
		onLoad: function() {
			var target = window.location.hash.substr(2);
			$('nav#fs-nav ul li').removeClass('active');
			$('nav#fs-nav ul li a[href="#!' + target + '"]').closest('li').addClass('active');
			$('section.fs-content').hide();
			$('#' + target).show();
		}
	};


	$(document).ready(function() {
		fsTabs.init();
	});
})(jQuery);