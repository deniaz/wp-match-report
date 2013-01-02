<?php
/**
 * @package WordPress
 * @subpackage Football Stats
 */

/**
 * Plugin Name: Football Stats
 * Plugin URI: http://projects.cheekyowl.com/football-stats
 * Description: Yet another awesome Cheeky Project
 * Version: 0.1a
 * Author: Robert Vogt <robert@cheekyowl.com>
 * Author URI: http://www.cheekyowl.com
 * License: GPLv3
 */

define('FOOTBALL_STATS_VERSION', '0.1-alpha');
define('FOOTBALL_STATS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('FOOTBALL_STATS_PLUGIN_PATH', plugin_dir_path(__FILE__));

require_once "classes/bootstrap.php";
require_once "classes/metabox.php";
require_once "classes/formationbox.php";
require_once "classes/eventbox.php";

$app = new Bootstrap();

function stats($data)
{
	$data = json_decode($data);

	echo "<div id=\"foootball-stats\">";
	echo "<div class=\"match-box\"><div class=\"logo left {$data->{'team-1'}->logo->path}\"><p class=\"inv\">{$data->{'team-1'}->name}</p></div><div class=\"logo right {$data->{'team-2'}->logo->path}\"><p class=\"inv\">{$data->{'team-2'}->name}</p></div><h1>{$data->game_info->result}</h1></div>";
	echo "<p class=\"park\"><strong>{$data->game_info->stadium}</strong> - {$data->game_info->crowd_ref}</p>";
	echo "<table id=\"event-table\">";
	foreach ($data->game_info->events as $event)
	{
		if ($event->team == 'team-1')
		{
			echo "<tr><td class=\"left\"><span>{$event->player}</span> <i class=\"action {$event->action}\"> </i></td><td class=\"mid\">{$event->time}</td><td class=\"right\"></td></tr>";
		}
		else if ($event->team == 'team-2')
		{
			echo "<tr><td class=\"left\"></td><td class=\"mid\">{$event->time}</td><td class=\"right\"><span>{$event->player}</span>  <i class=\"action {$event->action}\"> </i></td></tr>";
		}
	}
	echo "</table>";
	echo "<div id=\"pitch\">";
	$counter = 0;
	echo "<div id=\"pitch-team-1\">";
	foreach ($data->{'team-1'}->players as $player)
	{
		echo "<div class=\"player\" style=\"background: {$data->{'team-1'}->colors->foreground}; border-color:{$data->{'team-1'}->colors->background}; left: {$player->position->left}; top: {$player->position->top};\"><p>{$player->number}</p></div>";

		if ($counter === 10)
		{
			break;
		}
		$counter++;
	}
	echo "</div>";

	echo "<div id=\"pitch-team-2\">";
	$counter = 0;
	foreach ($data->{'team-2'}->players as $player)
	{
		echo "<div class=\"player\" style=\"background: {$data->{'team-2'}->colors->foreground}; border-color:{$data->{'team-2'}->colors->background}; left: {$player->position->left}; top: {$player->position->top};\"><p>{$player->number}</p></div>";

		if ($counter === 10)
		{
			break;
		}
		$counter++;
	}
	echo "</div>";
	echo "</div>";
	echo "<div id=\"team-sheet-1\">";
	echo "<ul class=\"starting\">";
	$counter = 0;
	foreach ($data->{'team-1'}->players as $player)
	{
		$actions = "";
		if (sizeof($player->events) > 0)
		{
			$actions = " <i class=\"action";
			foreach ($player->events as $event)
			{
				$actions = $actions . " {$event->action}";
			}
			$actions = $actions . "\"> </i>";
		}

		if ($counter <= 10)
		{
			echo "<li><strong>{$player->number}</strong> {$player->first_name} <strong>{$player->last_name}</strong>{$actions}</li>";
		}
		else
		{
			echo "<li>{$player->number} {$player->first_name} {$player->last_name}{$actions}</li>";
		}
		if ($counter === 10)
		{
			echo "</ul>";
			echo "<ul class=\"subs\">";
		}
		$counter++;
	}
	echo "</ul>";
	echo "</div>";
	echo "<div id=\"team-sheet-2\">";
	echo "<ul class=\"starting\">";
	$counter = 0;
	foreach ($data->{'team-2'}->players as $player)
	{
		$actions = "";
		if (sizeof($player->events) > 0)
		{
			$actions = "";
			foreach ($player->events as $event)
			{
				$actions = $actions . " <i class=\"action {$event->action}\"> </i>";
			}
		}

		if ($counter <= 10)
		{
			echo "<li>{$actions} <strong>{$player->number}</strong> <span>{$player->first_name}</span> <strong>{$player->last_name}</strong></li>";
		}
		else
		{
			echo "<li>{$actions} {$player->number} <span>{$player->first_name}</span> {$player->last_name}</li>";
		}
		if ($counter === 10)
		{
			echo "</ul>";
			echo "<ul class=\"subs\">";
		}
		$counter++;
	}
	echo "</ul>";
	echo "</div>";
	echo "<div class=\"clear\"></div>";
	echo "</div>";
}