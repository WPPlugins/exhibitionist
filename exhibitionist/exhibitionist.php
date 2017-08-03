<?php
/*
Plugin Name: Exhibitionist - Testing
Plugin URI: 
Description: Image Exhibition (Gallery) Plugin.
Author: Leon Valkenborg
Requires at least: 2.7
Tested up to: 2.8
Version: 0.1.0001
Author URI: http://wordpress.vitl.co.nz/index.php/exhibitionist/
*/
class Exhibitionist{
	function Exhibitionist(){
		add_action('admin_menu', array($this,'Exhibitionist_addSettingMenuItem'),1,0);
		
		register_activation_hook(__FILE__, array($this,"Exhibitionist_install"));
		
		add_shortcode('Exhibitionist', array($this,'Exhibitionist_processPageItem'),1,2);
		wp_enqueue_script( 'Exhibitionist_Main', Exhibitionist_PATH."includes/js/Exhibitionist.js");
		wp_enqueue_script( 'Exhibitionist_Controllers', Exhibitionist_PATH."includes/js/Exhibitionist_Controllers.js");
		wp_enqueue_script( 'Exhibitionist_imageObject', Exhibitionist_PATH."includes/js/Exhibitionist_imageObject.js");
		wp_enqueue_script( 'Exhibitionist_transitionController', Exhibitionist_PATH."includes/js/Exhibitionist_transitionController.js");
		wp_enqueue_script( 'Exhibitionist_inquiryForm', Exhibitionist_PATH."includes/js/Exhibitionist_inquiryForm.js");
		wp_enqueue_script( 'Exhibitionist_imageAligner', Exhibitionist_PATH."includes/js/Exhibitionist_imageAligner.js");
	}
	function Exhibitionist_processPageItem($shortCodeAttributes,$x){
		print_r($x);
		include_once "includes/phpClasses/Exhibitionist_PageItemClass.php";
		$pageItem = new Exhibitionist_PageItemClass($shortCodeAttributes);
		return $pageItem->html;
	}
	function Exhibitionist_addSettingMenuItem(){
		add_options_page("Exhibitionist", "Exhibitionist" , 8, __FILE__, array($this,'Exhibitionist_optionsMenu'));
	}
	function Exhibitionist_optionsMenu(){
		include_once "wp-admin/admin.php";
	}
	function Exhibitionist_install(){
		print "<script>alert('test!');</script>";
		print "installoing Exhibitionist";
		include_once "wp-admin/install.php";
	}
}

define ('Exhibitionist_FOLDER', 	basename(dirname(__FILE__)));
define ('Exhibitionist_PATH',		'/wp-content/plugins/' . Exhibitionist_FOLDER . '/' );
define ('Exhibitionist_FULL_PATH',	get_option("siteurl").Exhibitionist_PATH);
define ('Exhibitionist_TMP', 		dirname(__FILE__));

$Exhibitionist = new Exhibitionist;
?>