"use strict";

window.wp.fs = window.wp.fs || {};

var $scope = window.wp.fs;

$scope.Editor = function() {
	this.prefilling = false;
	this.tmp = jQuery.parseJSON(jQuery('#formation-storage').val());

	this.addTeams();
	this.addListeners();

	this.game_info = {
		result: "0:0",
		events: [],
		stadium: "",
		crowd_ref: ""
	};

	if (this.tmp !== null) {
		this.prefill();
	}
};

$scope.Editor.prototype.addTeams = function() {
	this.teams = [];
	if (this.tmp) {
		this.teams['team-1'] = new $scope.Team({
			team_id:  'team-1',
			positions: this.defaultPositions['team-1'],
			preload: this.tmp['team-1']
		});
		
		this.teams['team-2'] = new $scope.Team({
			team_id:  'team-2',
			positions: this.defaultPositions['team-2'],
			preload: this.tmp['team-2']
		});
	} else {
		this.teams['team-1'] = new $scope.Team({
			team_id:  'team-1',
			positions: this.defaultPositions['team-1']
		});
		
		this.teams['team-2'] = new $scope.Team({
			team_id:  'team-2',
			positions: this.defaultPositions['team-2']
		});
	}
};

$scope.Editor.prototype.addListeners = function() {
	var that = this;

	jQuery('.event-adder i').live('click', function(e) {
		e.preventDefault();
		that.selectEvent(jQuery(this));
	});

	jQuery('.fs-add-event').live('click', function(e) {
		e.preventDefault();

		var wrap = jQuery('.event-adder.active'),
			player_name = wrap.find('select').val(),
			player_id = wrap.find('select option:selected').attr('data-bind'),
			min = wrap.find('.event-min').val(),
			team = wrap.attr('data-team-id'),
			type = wrap.find('i:not(.inactive)').attr('data-action');

		that.addEvent({
			'team': team,
			'player_id': player_id,
			'player_name': player_name,
			'min': min,
			'type': type
		});
	});

	jQuery('.team-logo .logo-selection').change(function() {
		var el = jQuery(this);

		that.changeLogo({
			side: el.attr('data-side'),
			logo: el.val(),
			team: el.parent().attr('data-team-id'),
			name: el.find('option:selected').text()
		});
	})

	jQuery('#match-result textarea').change(function() {
		that.changeResult(jQuery(this).val());
	})

	jQuery('#stadium').change(function() {
		that.game_info.stadium = jQuery(this).val();
		that.export();
	});

	jQuery('#stadium-game-info').change(function() {
		that.game_info.crowd_ref = jQuery(this).val();
		that.export();
	});

	jQuery('#event-table table tr').live('dblclick', function() {
		jQuery(this).remove();
	});
};

$scope.Editor.prototype.selectEvent = function(el) {
	el.siblings('i').each(function() {
		if (!jQuery(this).hasClass('inactive')) {
			jQuery(this).addClass('inactive');
		}
	});

	el.removeClass('inactive');
};

$scope.Editor.prototype.addEvent = function(config) {
		var html = "";
		if (config.team == 'team-1') {
			html = '<tr><td class="left"><span class="event-item">' + config.player_name + '</span> <i class="action ' + config.type + '"> </i></td><td class="center">' + config.min + '</td><td class="right"></td></tr>';
		} else if (config.team == 'team-2') {
			html = '<tr><td class="left"></td><td class="center">' + config.min + '</td><td class="right"><span class="event-item">' + config.player_name + '</span> <i class="action ' + config.type + '"> </i></td></tr>';
		}

		jQuery('#event-table table').append(html);

		/**
		 * Tell the player about the event
		 */

		if (!this.prefilling) {
			this.teams[config.team].players[config.player_id].addEvent({
			action: config.type,
			time: config.min
		});
		}

		/**
		 * Keep track of global events
		 */

		this.game_info.events.push({
			action: config.type,
			time: config.min,
			player: config.player_name,
			'team':  config.team
		});

		this.export();
};

$scope.Editor.prototype.changeLogo = function(config) {
	if (config.side === 'left') {
		jQuery('#logo-team-1').css({
			'background-image': "url('/wp-content/plugins/football-stats/img/logos-sprite.png')",
			'background-position': '0px -' + this.bgMap[config.logo] + 'px'
		});

	} else if (config.side === 'right') {
		jQuery('#logo-team-2').css({
			'background-image': "url('/wp-content/plugins/football-stats/img/logos-sprite.png')",
			'background-position': '340px -' + this.bgMap[config.logo]+ 'px'
		});
	}

	this.teams[config.team].setLogo({
		'logo': config.logo,
		'side': config.side,
		'team_name': config.name
	});

	this.export();
};

$scope.Editor.prototype.changeResult = function(result) {
	this.game_info.result = result;
	this.export();
};

$scope.Editor.prototype.export = function() {
	if (this.prefilling) {
		return;
	}
	console.log("Export...");
	var storage = {};
	storage.game_info = this.game_info;

	storage['team-1'] = this.teams['team-1'].export();
	storage['team-2'] = this.teams['team-2'].export();

	jQuery('#formation-storage').val(JSON.stringify(storage));
};

$scope.Editor.prototype.prefill = function() {
	this.prefilling = true;
	var that = this;
	jQuery('#match-result textarea').val(this.tmp.game_info.result).change();
	jQuery('#stadium').val(this.tmp.game_info.stadium);
	jQuery('#stadium-game-info').val(this.tmp.game_info.crowd_ref);

	this.changeLogo({
			side: this.tmp['team-1'].logo.side,
			logo: this.tmp['team-1'].logo.path,
			team: 'team-1',
			name: this.tmp['team-1'].name
		});

	jQuery('#logo-team-1 select option:selected').removeAttr('selected');
	jQuery('#logo-team-1 select').find('[value="' + this.tmp['team-1'].logo.path + '"]').attr('selected', true);

	this.changeLogo({
			side: this.tmp['team-2'].logo.side,
			logo: this.tmp['team-2'].logo.path,
			team: 'team-2',
			name: this.tmp['team-2'].name
		});

	jQuery('#logo-team-2 select option:selected').removeAttr('selected');
	jQuery('#logo-team-2 select').find('[value="' + this.tmp['team-2'].logo.path + '"]').attr('selected', true);

	jQuery('#match-result textarea').change(function() {
		that.changeResult(jQuery(this).val());
	})

	jQuery(this.tmp.game_info.events).each(function() {
		that.addEvent({
			'team': this.team,
			'player_id': 0,
			'player_name': this.player,
			'min': this.time,
			'type': this.action
		});
	});

	this.prefilling = false;
};

$scope.Editor.prototype.bgMap = {
	'fcb': 0,
	'fcsg': 255,
	'gcz': 510,
	'fcs': 765,
	'yb': 1015,
	'ls': 1270,
	'fcl': 1525,
	'fct': 1780,
	'fcz': 2035,
	'sfc': 2290,
	'fca': 2545
};

$scope.Editor.prototype.defaultPositions = {
	'team-1': {
		0: {
			left: '5px',
			top: '160px'
		},
		1: {
			left: '90px',
			top: '40px'
		},
		2: {
			left: '75px',
			top: '115px'
		},
		3: {
			left: '75px',
			top: '215px'
		},
		4: {
			left: '90px',
			top: '285px'
		},
		5: {
			left: '170px',
			top: '100px'
		},
		6: {
			left: '170px',
			top: '230px'
		},
		7: {
			left: '190px',
			top: '25px'
		},
		8: {
			left: '190px',
			top: '300px'
		},
		9: {
			left: '265px',
			top: '115px'
		},
		10: {
			left: '265px',
			top: '215px'
		}
	},
	'team-2': {
		0: {
			left: '580px',
			top: '160px'
		},
		1: {
			left: '520px',
			top: '40px'
		},
		2: {
			left: '535px',
			top: '115px'
		},
		3: {
			left: '535px',
			top: '215px'
		},
		4: {
			left: '520px',
			top: '300px'
		},
		5: {
			left: '435px',
			top: '100px'
		},
		6: {
			left: '435px',
			top: '240px'
		},
		7: {
			left: '415px',
			top: '25px'
		},
		8: {
			left: '415px',
			top: '315px'
		},
		9: {
			left: '335px',
			top: '115px'
		},
		10: {
			left: '335px',
			top: '215px'
		}
	}
};
