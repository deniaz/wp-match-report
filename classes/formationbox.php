<?php

class FormationBox extends MetaBox
{
	protected function enqueue()
	{
		add_action('admin_enqueue_scripts', function(){

            wp_enqueue_style(
                'football-editor-css',
                FOOTBALL_STATS_PLUGIN_URL . 'css/formation.css',
                array(),
                FOOTBALL_STATS_VERSION,
                'all'
                );

            wp_enqueue_script(
                'fs-editor',
                FOOTBALL_STATS_PLUGIN_URL . 'js/editor.js',
                array('jquery', 'jquery-ui-draggable'),
                FOOTBALL_STATS_VERSION,
                true
                );

            wp_enqueue_script(
                'fs-team',
                FOOTBALL_STATS_PLUGIN_URL . 'js/team.js',
                array('fs-editor'),
                FOOTBALL_STATS_VERSION,
                true
                );

            wp_enqueue_script(
                'fs-player',
                FOOTBALL_STATS_PLUGIN_URL . 'js/player.js',
                array('fs-editor', 'fs-team'),
                FOOTBALL_STATS_VERSION,
                true
                );

            wp_enqueue_script(
                'fs-bootstrap',
                FOOTBALL_STATS_PLUGIN_URL . 'js/bootstrap.js',
                array('fs-editor', 'fs-player', 'fs-team', 'jquery'),
                FOOTBALL_STATS_VERSION,
                true
                );
        });
	}

	protected function getTemplatePath()
	{
		return "templates/formation_editor.php";
	}
}