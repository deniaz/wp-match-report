"use strict";

window.wp.fs = window.wp.fs || {};

var $scope = window.wp.fs;

$scope.Player = function(config) {
	this.prefilling = false;
	this.config = config;
	this.is_starting = config.is_starting;
	this.id = config.player_id;

	this.tmp = config.preload;

	this.events = [];

	this.number = 0;
	this.first_name = "";
	this.last_name = "";

	if (this.tmp) {
		this.number = this.tmp.number;
		this.first_name = this.tmp.first_name;
		this.last_name = this.tmp.last_name;

		if (typeof this.config.position !== 'undefined') {
			this.config.position.top = this.tmp.position.top;
			this.config.position.left = this.tmp.position.left;
		}
	}

	this.addListeners();

	if (this.tmp) {
		this.prefill();
	}
};

$scope.Player.prototype.addListeners = function() {
	var that = this;
	this.views = {};
	this.views.sheet = jQuery('#sheet-' + this.config.team_id + ' ul').find("[data-bind='" + 
		this.id + "']");
	this.views.pitch = false;

	/**
	 * Append a draggable div to the pitch, if the player is in the Starting XI
	 */
	if (this.is_starting) {
		jQuery('#formation-editor').append('<div class="player" data-team-id="' + 
			this.config.team_id + '" data-bind="' + this.id + 
			'" style="left:' + this.config.position.left + '; top:' + this.config.position.top + ';"><div class="circle" style="background:' + this.config.colors.foreground + 
			'; border-color:' + this.config.colors.background + ';"><p class="number">' + 
			this.number + '</p></div></div>');
		this.views.pitch = jQuery('#formation-editor').find("[data-bind='" + this.id + 
			"'][data-team-id='" + this.config.team_id + "']");
	}

	/**
	 * Add a option to the event manager
	 */

	 jQuery('#event-table').find("[data-team-id='" + this.config.team_id + "'] select").append(
	 	"<option data-bind=\"" + this.id + "\" disabled>" + this.first_name + " " + 
	 	this.last_name + " </option>"
	 	);

	 this.views.event = jQuery('#event-table').find("[data-team-id='" + this.config.team_id + 
	 	"'] select option[data-bind='" + this.id + "']");

	/**
	 * Listen to all input fields bound to this player
	 */
	this.views.edit = jQuery('#fs-' + this.config.team_id).find("[data-bind='" + this.id + "']");

	this.views.edit.live('change', function() {
		var el = jQuery(this);
		switch (el.attr('data-type')) {
			case 'number':
				that.number = el.val();
				break;
			case 'first_name':
				that.first_name = el.val();
				break;
			case 'last_name':
				that.last_name = el.val();
				break;
			default:
				break;
		}
		that.update();
	});
};

$scope.Player.prototype.addEvent = function(event) {
	var that = this;
	this.events.push(event);
	this.views.sheet.each(function() {
		var el = jQuery(this);

		el.append("<i class=\"action " + event.action + "\"> </i>");
	});
};

$scope.Player.prototype.update = function() {
	var that = this;
	jQuery(this.views.sheet).each(function() {
		var el = jQuery(this);

		el.find("[data-type='number']").text(that.number);
		el.find("[data-type='first_name']").text(that.first_name);
		el.find("[data-type='last_name']").text(that.last_name);

	});

	var el = jQuery(this.views.event);
	if (this.last_name !== "") {
		el.text(this.first_name + " " + this.last_name);
		el.attr('disabled', false);
	} else {
		el.attr('disabled', true);
	}

	jQuery(this.views.pitch).find('p.number').text(that.number);

	if ($scope._editor) {
		$scope._editor.export();
	}
};

$scope.Player.prototype.updateColors = function(colors) {
	var that = this;
	this.config.colors = colors;

	jQuery(this.views.pitch).find('.circle').css({
		'background': that.config.colors.foreground,
		'border-color': that.config.colors.background
	});
};

$scope.Player.prototype.export = function() {
	if (this.prefilling) {
		return;
	}

	var storage = {
		number: this.number,
		last_name: this.last_name,
		first_name: this.first_name,
		events: this.events,
		starting_11: this.is_starting
	};

	if (this.is_starting) {
		storage.position = {
			left: this.views.pitch.css('left'),
			top: this.views.pitch.css('top')
		}
	}

	return storage;
};

$scope.Player.prototype.prefill = function() {
	this.prefilling = true;
	var that = this;

	jQuery(this.tmp.events).each(function() {
		that.addEvent({
			'action': this['action'],
			'time': this['time']
		});
	});

	this.views.edit.each(function() {
		var el = jQuery(this);
		switch (el.attr('data-type')) {
			case 'number':
				el.val(that.number);
				break;
			case 'first_name':
				el.val(that.first_name);
				break;
			case 'last_name':
				el.val(that.last_name);
				break;
			default:
				break;
		}
	});
	this.update();
	this.prefilling = false;
};