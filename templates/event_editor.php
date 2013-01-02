<?php
	$teams = array(
		array(
			'tag' => 'fcb',
			'name' => 'FC Basel'
			),
		array(
			'tag' => 'fcsg',
			'name' => 'FC St. Gallen'
			),
		array(
			'tag' => 'gcz',
			'name' => 'Grasshopper'
			),
		array(
			'tag' => 'fcs',
			'name' => 'FC Sion'
			),
		array(
			'tag' => 'yb',
			'name' => 'BSC YB'
			),
		array(
			'tag' => 'ls',
			'name' => 'Lausanne-Sport'
			),
		array(
			'tag' => 'fcl',
			'name' => 'FC Luzern'
			),
		array(
			'tag' => 'fct',
			'name' => 'FC Thun'
			),
		array(
			'tag' => 'fcz',
			'name' => 'FC Zürich'
			),
		array(
			'tag' => 'sfc',
			'name' => 'Servette FC'
			),
		array(
			'tag' => 'fca',
			'name' => 'FC Aarau'
			)
		);

	$actions = array(
		'booking',
		'sendoff',
		'direct-sendoff',
		'sub-off',
		'sub-on',
		'goal'
		);
?>

<div class="inside">
	<div id="result-editor">
		<p class="inv">
			Unfortunately, this feature is not accessible.
		</p>
		<div id="logo-team-1" class="team-logo" data-team-id="team-1">
			<select class="logo-selection" data-side="left">
				<option>Choose Team Logo...</option>
				<?php
				foreach ($teams as $team)
				{
					echo "<option value=\"{$team['tag']}\">{$team['name']}</option>";
				}
				?>
			</select>
		</div>
		<div id="logo-team-2" class="team-logo" data-team-id="team-2">
			<select class="logo-selection" data-side="right">
				<option>Choose Team Logo...</option>
				<?php
				foreach ($teams as $team)
				{
					echo "<option value=\"{$team['tag']}\">{$team['name']}</option>";
				}
				?>
			</select>
		</div>
		<div id="match-result">
			<textarea>0:0</textarea>
		</div>
	</div>
	<div id="event-table">
		<table>
		</table>
		<div class="clear"></div>
		<div class="new-event">
			<div>
				<ul class="fs-tabs">
					<li class="active">
						<a href="#fs-event-add-1">
							Team 1
						</a>
					</li>
					<li>
						<a href="#fs-event-add-2">
							Team 2
						</a>
					</li>
				</ul>

				<div id="fs-event-add-1" class="event-adder active" data-team-id="team-1">
					<?php 
					foreach ($actions as $action)
					{
						echo "<i class=\"action inactive {$action}\" data-action=\"{$action}\"> </i> ";
					}
					?>
					<select>
						<option disabled>Select Player...</option>
					</select>
					<br />
					<input type="text" size="2" class="event-min" /> <span>min</span>
					<div class="clear"></div>
					<input type="button" class="button fs-add-event" value="Add">
				</div>
				<div id="fs-event-add-2" class="event-adder" data-team-id="team-2">
					<?php 
					foreach ($actions as $action)
					{
						echo "<i class=\"action inactive {$action}\" data-action=\"{$action}\"> </i> ";
					}
					?>
					<select>
						<option disabled>Select Player...</option>
					</select>
					<br />
					<input type="text" size="2" class="event-min" /> <span>min</span>
					<div class="clear"></div>
					<input type="button" class="button fs-add-event" value="Add">
				</div>
			</div>
		</div>
	</div>
	<div class="clear" style="height: 10px;"></div>
	<div class="game-info">
		<input type="text" placeholder="Wembley Stadium" id="stadium" /> -
		<input type="text" placeholder="70,000 spectators (78%) - Ref Howard Webb" id="stadium-game-info" />
	</div>
</div>