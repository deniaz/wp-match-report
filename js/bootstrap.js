(function($) {
	"use strict";

    function Effects() {
        this.tabs = new Tabs();
    };

    function Tabs() {
        this.addListeners();
    };

    Tabs.prototype.addListeners = function() {
        var that = this;
        $('.fs-tabs li a').live('click', function(e) {
            e.preventDefault();
            that.display($(this).attr('href'));
            that.hilite($(this).closest('li'));
        });
    };

    Tabs.prototype.display = function(active) {
        active = $(active);
        if (active.hasClass('team')) {
            $('#teams .team.active').removeClass('active');
        } else if (active.hasClass('event-adder')) {
            $('.event-adder.active').removeClass('active');
        }
        $(active).addClass('active');
    };

    Tabs.prototype.hilite = function(active) {
        $(active).siblings('li.active').removeClass('active');
        $(active).addClass('active');
    };

	$(document).ready(function() {
        var fx = new Effects();

		window.wp = window.wp || {};
		window.wp.fs = window.wp.fs || {};
		window.wp.fs._editor = window.wp.fs._editor || new window.wp.fs.Editor();
	});
})(jQuery);