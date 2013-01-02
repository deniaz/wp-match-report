<?php

class Bootstrap
{
	public function __construct()
	{
		$formation = new FormationBox(
			'football-stats-formation',
			'Football Stats Formation'
			);

		$events = new EventBox(
			'football-match-events',
			'Match Events'
			);

		add_action('wp_enqueue_scripts', array(&$this, 'registerFrontStyles'));
	}

	public function registerFrontStyles()
	{
		wp_enqueue_style(
            'front-css',
            FOOTBALL_STATS_PLUGIN_URL . 'css/front.css',
            array(),
            FOOTBALL_STATS_VERSION,
            'all'
            );

		wp_enqueue_script(
			'front-js',
			FOOTBALL_STATS_PLUGIN_URL . 'js/footballstats.js',
			array('jquery'),
			FOOTBALL_STATS_VERSION,
			true
			);
	}
}