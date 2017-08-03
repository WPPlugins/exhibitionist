<?php
include_once("includes/adminClasses.php");
include_once("adminMenu.php");

$options = get_option("Exhibitionist");
if ($options == false){
	update_option("Exhibitionist",array());
}
foreach($Exhibitionist_MenuItemsArray as $adminMenuObject){
	foreach ($adminMenuObject->settingsArray as $settingArray){
		$default = $settingArray['default'];
		$varName = $settingArray['varName'];
		if (!(isset($options[$varName]))){
			$options[$varName] = $default;
		}
	}
}
update_option("Exhibitionist",$options);
?>