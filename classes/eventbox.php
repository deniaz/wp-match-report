<?php

class EventBox extends MetaBox
{
	protected function enqueue()
	{
		add_action('admin_enqueue_scripts', function(){

            wp_enqueue_style(
                'football-events-css',
                FOOTBALL_STATS_PLUGIN_URL . 'css/events.css',
                array(),
                FOOTBALL_STATS_VERSION,
                'all'
                );
        });
	}

	protected function getTemplatePath()
	{
		return "templates/event_editor.php";
	}

	public function saveMetaBox()
	{
	}
}