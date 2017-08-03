<?php
include_once "includes/adminClasses.php";
$Exhibitionist_MenuItemsArray = array();
include_once "adminMenu.php";
?>


<?php
//prep the vars for settings
$page = $_GET['page'];
$subPage = $_GET['subPage'];
$save = $_GET['save'];
if ($save == "true"){
	foreach ($Exhibitionist_MenuItemsArray as $k => $menuItemClass){
		if ($subPage == $k){
			$menuItemClass->setOptions();
		}
	}
}
?>
<div class='wrap'>
	<h2 style="vertical-align:middle;">
		<img style="display:inline;" src="<?php echo Exhibitionist_FULL_PATH;?>includes/images/logo50x49.png"></img>
		<?php _e('Exhibitionist Settings','Exhibitionist'); ?>
	</h2>
	<div class="bkgndc tablenav ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" style="padding: 3px 8px 0pt; vertical-align: middle;">
		<?php
		foreach ($Exhibitionist_MenuItemsArray as $k => $menuItemClass){
			print "<a href='?page=$page&subPage=$k'>";
			print "	<span class='button-secondary'>".$menuItemClass->buttonName."</span>";
			print "</a>";
		}
		?>
	</div>
	<?php
	print "<form method='post' action='?page=$page&subPage=$subPage&save=true'>";
	foreach ($Exhibitionist_MenuItemsArray as $k => $menuItemClass){
		if ($subPage == $k){
			print "<h2>".$menuItemClass->buttonName." Settings</h2>";
			$menuItemClass->makeHTML();
			echo $menuItemClass->html;
		}
	}
	?>
	<p class="submit">
		<input class="button-primary" type="submit" value="Save Changes" name="Submit"/>
	</p>
	</form>
</div>
