"use strict";

window.wp.fs = window.wp.fs || {};

var $scope = window.wp.fs;

$scope.Team = function(config) {
	this.prefilling = false;
	this.id = config.team_id;
	this.name = "N/A";

	this.tmp = config.preload;

	this.config = config;

	this.colors = {
		foreground: '#000000',
		background: '#ffffff'
	};

	this.logo = {
		path: "",
		side: ""
	};

	this.addListeners();
	this.addPlayers();

	if (this.tmp) {
		this.prefill();
	}
};

$scope.Team.prototype.addListeners = function() {
	var that = this;
	jQuery('#fs-' + this.id).find('.color-1, .color-2').change(function() {
		var el = jQuery(this);
		if (el.val().length === 4 || el.val().length === 7) {
			if (el.hasClass('color-1')) {
				that.colors.foreground = el.val();
			} else if (el.hasClass('color-2')) {
				that.colors.background = el.val();
			}
		}

		jQuery(that.players).each(function() {
			this.updateColors(that.colors);
		});
	});
};

$scope.Team.prototype.addPlayers = function() {
	this.players = [];

	for (var i = 0; i < 18; i++) {
		if (this.tmp) {
			this.players[i] = new $scope.Player({
				player_id: i,
				'is_starting': (i < 11),
				team_id: this.id,
				colors: this.colors,
				position: this.config.positions[i],
				preload: this.tmp.players[i]
			});
		} else {
			this.players[i] = new $scope.Player({
				player_id: i,
				'is_starting': (i < 11),
				team_id: this.id,
				colors: this.colors,
				position: this.config.positions[i]
			});
		}
	}

	jQuery('#formation-editor .player').draggable({
		stop: function(e, ui) {
			$scope._editor.export();
		}
	});
};

$scope.Team.prototype.setLogo = function(config) {
	this.name = config.team_name;
	this.logo.path = config.logo;
	this.logo.side = config.side;

	if ($scope._editor) {
		$scope._editor.export();
	}
};

$scope.Team.prototype.export = function() {
	if (this.prefilling) {
		return;
	}

	var storage = {
		name: this.name,
		colors: this.colors,
		logo: this.logo,
		players: []
	};

	jQuery(this.players).each(function() {
		storage.players.push(this.export());
	});

	return storage;
};

$scope.Team.prototype.prefill = function() {
	this.prefilling = true;
	this.colors.foreground = this.tmp.colors.foreground;
	this.colors.background = this.tmp.colors.background;

	jQuery('#fs-' + this.id + ' input.color-1').val(this.colors.foreground).change();
	jQuery('#fs-' + this.id + ' input.color-2').val(this.colors.background).change();
	this.prefilling = false;
};