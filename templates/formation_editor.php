<?php
	$data = trim($data);
?>
<div class="inside">
	<div id="formation-editor">
		<p class="inv">
			Unfortunately, this feature is not accessible.
		</p>
	</div>
	<div id="teams">
		<ul class="fs-tabs">
			<li class="active">
				<a href="#fs-team-1">
					Team 1
				</a>
			</li>
			<li>
				<a href="#fs-team-2">
					Team 2
				</a>
			</li>
		</ul>
		<div id="fs-team-1" class="team active" data-team-id="team-1">
			
			<div class="colors">
				<label for="color-1">Color 1</label>
				<input placeholder="#000000" type="text" class="color-1" /><br />
				<label for="color-2">Color 2</label>
				<input placeholder="#FFFFFF" type="text" class="color-2" />
			</div>
			<hr />

			<?php
				for ($i = 0; $i < 18; $i++)
				{
					if ($i === 11)
					{
						echo "<hr />";
					}
					include FOOTBALL_STATS_PLUGIN_PATH . "templates/player_edit.php";
				}
			?>
		</div>

		<div id="fs-team-2" class="team" data-team-id="team-2">
			<div class="colors">
				<label for="color-1">Color 1</label>
				<input placeholder="#FFFFFF" type="text" class="color-1" /><br />
				<label for="color-2">Color 2</label>
				<input placeholder="#000000" type="text" class="color-2" />
			</div>
			<hr />

			<?php
				for ($i = 0; $i < 18; $i++)
				{
					if ($i === 11)
					{
						echo "<hr />";
					}
					include FOOTBALL_STATS_PLUGIN_PATH . "templates/player_edit.php";
				}
			?>
		</div>
	</div>
	<div class="clear"></div>
	<div id="squad-sheets">
		<div class="squad-sheet" id="sheet-team-1">
			<ul class="starting-11">
				<?php
				for ($i = 0; $i < 11; $i++)
				{
					echo "<li data-bind=\"{$i}\"><strong data-type=\"number\"></strong> <span data-type=\"first_name\"></span> <strong data-type=\"last_name\"></strong></li>";
				}
			?>
			</ul>
			<ul class="subs">
				<?php
				for ($i = 11; $i < 18; $i++)
				{
					echo "<li data-bind=\"{$i}\"><span data-type=\"number\"></span> <span data-type=\"first_name\"></span> <span data-type=\"last_name\"></span></li>";
				}
			?>
			</ul>
		</div>
		<div class="squad-sheet" id="sheet-team-2">
			<ul class="starting-11">
				<?php
				for ($i = 0; $i < 11; $i++)
				{
					echo "<li data-bind=\"{$i}\"><strong data-type=\"number\"></strong> <span data-type=\"first_name\"></span> <strong data-type=\"last_name\"></strong></li>";
				}
			?>
			</ul>
			<ul class="subs">
				<?php
				for ($i = 11; $i < 18; $i++)
				{
					echo "<li data-bind=\"{$i}\"><span data-type=\"number\"></span> <span data-type=\"first_name\"></span> <span data-type=\"last_name\"></span></li>";
				}
			?>
			</ul>
		</div>
	</div>
	<div class="clear"></div>
	<textarea id="formation-storage" name="football-stats-formation"><?php echo $data; ?></textarea>
</div>