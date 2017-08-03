<?php
$path = substr(dirname(__FILE__),0,strpos(dirname(__FILE__),'wp-content'));

include($path . 'wp-config.php');
include($path . 'wp-admin/includes/admin.php');
$output = "";
$testPass = true;
$email = $_POST['email'];
$message = $_POST['message'];
$name = $_POST['name'];
$thumbLink = $_POST['thumbLink'];
$pageID = $_POST['pageID'];
$pageURL = $_POST['pageURL'];
$pageName = $_POST['pageName'];

if ($email == "")	{$output.="E-Mail is empty.\r\n";	$testPass=false;};
if ($message == "")	{$output.="Message is empty.\r\n";	$testPass=false;};
if ($name == "")	{$output.="Name is empty.\r\n";		$testPass=false;};

if ($testPass){
	$blogname = get_option('blogname');
	$options = get_option('VP_VITL_Gallery');
	$message = str_replace("\r","<br/>",$message);
	$message = str_replace("\n","<br/>",$message);
	$message = str_replace("<br/><br/>","<br/>",$message);
	$message = <<<EOF
<html>
<body>
<b>You have recieved a inquiry from $blogname</b><br/>
<b>Name:</b> $name<br />
<b>Email:</b> <a href='mailto://$email'>$email</a><br />
<b>Page image viewed on:</b> <a href='$pageURL'>$pageName</a><br/>
<b>Image inquited:</b><br/>
<a><img src='$thumbLink' /></a><br />

<b>Message Body Follows:</b><br/>
$message
</body>
</html>
EOF;
	$to = $options['enquiryEmail'];
	$from = $email;
	$subject = "Image Inquiry From $blogname";
	$headers.= 	"Content-type: text/html\n".
				"From: $from\n".
				"Date: ".date("n/d/Y H:i (eP)",time())."\n".
				"".
				"";
	if (mail($to, $subject, $message, $headers)){	
		$output.="success";
	}else{	
		$output.="Message Failed to send.";
	}
}
echo $output;
die();
?>