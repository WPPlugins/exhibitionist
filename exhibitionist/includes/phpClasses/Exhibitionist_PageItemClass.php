<?php
class Exhibitionist_PageItemClass{
	var $html = "";
	var $Exhibitionist_Options = "";
	function Exhibitionist_PageItemClass($shortCodeAttributes){
		
		global $post;
		$postID = $post->ID;
		$title = $post->post_title;
		$pageLink = $post->guid;
		$rndID = rand(1,9999999999999999);
		//if shortcode 
		if (isset($shortCodeAttributes['postid'])){$postID = $shortCodeAttributes['postid'];}
		
		
		include("Exhibitionist_JSClass.php");
		$JSOptions = new Exhibitionist_JS($shortCodeAttributes,"divObject$rndID.Exhibitionist.optionsArray");
		
		$gallerySwapImageSpeed = "0";
		
		//Global settings
		$JSOptions->addVar("enquireFormEnable","","check");
		$siteURL = get_option("siteurl");
		$JSOptions->addVar("enquireFormPostTo","","text",$siteURL.Exhibitionist_PATH."Exhibitionist_Mail.php");
		$JSOptions->addVar("pageURL","","text",$post->guid);
		$JSOptions->addVar("pageName","","text",$post->post_title);
		
		$mainImageSize = $JSOptions->addVar("largeImageSize","","text");
		$galleryMode = $JSOptions->addVar("navigator","","text");
		$JSOptions->addVar("imageHorizontelAlignment","","text");
		$JSOptions->addVar("imageVerticalAlignment","","text");
		$JSOptions->addVar("imageHolderLock","","check");
		$JSOptions->addVar("imageTitleEnable","","check");
		$JSOptions->addVar("imageTitleObjectType","","text");
		$JSOptions->addVar("imageTitleObjectClass","","text");
		$JSOptions->addVar("imageTitleTextAlign","","text");
		$JSOptions->addVar("imageCaptionEnable","","check");
		$JSOptions->addVar("imageCaptionObjectType","","text");
		$JSOptions->addVar("imageCaptionTextAlign","","text");
		$JSOptions->addVar("imageCaptionObjectClass","","text");
		
		switch ($galleryMode){
			case "slideshow":
				$JSOptions->addVar("effect","Slideshow","text");
				$JSOptions->addVar("effectTime","Slideshow","int");
				$JSOptions->addVar("imageHolderLock","Slideshow","check");
				
				$JSOptions->addVar("swapImageSpeed","Slideshow","int");
			break;
			case "compactCaptionController":
				$JSOptions->addVar("effect","CompactCaption","text");
				$JSOptions->addVar("effectTime","CompactCaption","int");
				$JSOptions->addVar("imageHolderLock","CompactCaption","check");
				
			break;
			case "thumbnailCaptionController":
				$JSOptions->addVar("effect","InlineThumbnail","text");
				$JSOptions->addVar("effectTime","InlineThumbnail","int");
				
				$JSOptions->addVar("thumbnailPadding","InlineThumbnail","int");
				$JSOptions->addVar("thumbnailCentering","InlineThumbnail","check");
				$JSOptions->addVar("thumbnailCenteringYOnly","InlineThumbnail","check");
				$JSOptions->addVar("imageHolderLock","InlineThumbnail","check");
				
			break;
			case "gridThumbnailController":
				$JSOptions->addVar("effect","Grid","text");
				$JSOptions->addVar("effectTime","Grid","int");
				
				$JSOptions->addVar("thumbnailPadding","Grid","int");
				$JSOptions->addVar("thumbnailCentering","Grid","check");
				$JSOptions->addVar("gridWidthGrid","Grid","int");
				$JSOptions->addVar("gridWithUseImageGrid","Grid","check");
				$JSOptions->addVar("imageHolderLock","Grid","check");
				
				if (isset($shortCodeAttributes["gridmodecentering"])){$galleryGridModeCentering = $shortCodeAttributes["gridmodecentering"];}
			break;
		}
		$attachments = get_children(array(	'post_parent' => $postID,
											'post_status' => 'inherit',
											'post_type' => 'attachment',
											'post_mime_type' => 'image',
											'order' => 'ASC',
											'orderby' => 'menu_order',
											));
		$imagesJS = "";
		if ($attachments){
			foreach ($attachments as $attachment_id => $attachment){
				
				$imageArray = wp_get_attachment_image_src($attachment_id,$mainImageSize);
				$imgURL = $imageArray[0];
				$imgWidth = $imageArray[1];
				$imgHeight = $imageArray[2];
				$thumbArray = wp_get_attachment_image_src($attachment_id,"thumbnail");
				$thumbURL = $thumbArray[0];
				$thumbWidth = $thumbArray[1];
				$thumbHeight = $thumbArray[2];
				
				$title = $attachment->post_title;
				$caption = $attachment->post_excerpt;
				$description = $attachment->post_content;
				$description = str_replace("\r","<br/>",$description);
				$description = str_replace("\n","<br/>",$description);
				$imagesJS.="divObject$rndID.Exhibitionist.addImage('$imgURL',$imgWidth,$imgHeight,'$thumbURL',$thumbWidth,$thumbHeight,'$caption','$description','$title');\r\n";
			}
			
			/*
			VP_VITL_Gallery.galleryMode =
				slideshow
				compactCaptionController
				thumbnailCaptionController
				gridThumbnailController
				
			divObject.VP_VITL_Gallery.galleryEffect = 
				crossfade
				default
				fadeInOut
				
			divObject.VP_VITL_Gallery.galleryEffectSpeed = 
			The time it takes to do a transition between images
				30 to infinity
				
			divObject.VP_VITL_Gallery.gallerySwapImageSpeed = 
			The time taken to change from 1 image to the next in slideshow mode
			NOTE: 	This time is exclusive of the transition time, so if you want 500ms transition and 1000ms wait then
					tthis must be 1500ms
				30 to infinity
			
			*/
			$jsOptionsArray = $JSOptions->getJSArray();
			
			
			$this->html.="
<div id='Exhibitionist_$rndID'>
	<div id='enquiryLink_$rndID'></div>
	<div id='enquiryContainer_$rndID' style='	z-index: 1;
												position:absolute;
												display:none;
												background-color:#FFFFFF;
												color:#000000;
												margin:10px;
												padding:10px;
												border:2px solid black;
												'>
		Your Name:<br/>
		<div><input type='text' id='Exhibitionist_enquirtFormName_$rndID' name='Exhibitionist_enquirtFormName_$rndID' style='width:300px;'></input></div>
		Your E-Mail Address:<br/>
		<div><input type='text' id='Exhibitionist_enquirtFormEmail_$rndID' name='Exhibitionist_enquirtFormEmail_$rndID' style='width:300px;'></input></div>
		Inquiry Message:<br/>
		<div><textarea  id='Exhibitionist_enquirtFormBody_$rndID' name='Exhibitionist_enquirtFormBody_$rndID' style='width:300px;height:100px'></textarea></div>
		Image of inquiry:<br/>
		<img id='Exhibitionist_enquirtFormImage_$rndID' src=''></img><br/>
		<br/>
		<div style='display:inline;'><input type='submit' onclick='document.getElementById(\"Exhibitionist_$rndID\").Exhibitionist.inquiryForm.submitMessage()' value='Submit Inquiry'></input>
		<a href='#' onclick='{	var container = document.getElementById(\"enquiryContainer_$rndID\");
								container.style.display = \"none\";
								container.onScreen = false;
								return false;
					}'>Cancel</a></div>
	</div>
	<div id='imageContainer_$rndID' style='z-index: -1;width:100%;'></div>
</div>
<div id='debugOutput_$rndID'></div>
<script>
	divObject$rndID = document.getElementById('Exhibitionist_$rndID');
	divObject$rndID.Exhibitionist = new Exhibitionist;
	$jsOptionsArray
	divObject$rndID.Exhibitionist.init($rndID);
	$imagesJS
	divObject$rndID.Exhibitionist.start();
</script>
";
			//start the gallery in this object
			
		}else{
			$this->html.="This page has no images.";
		}
	}
	function override($a1=array(),$v1="",$a2=array(),$v2="",$a3=array(),$v3=""){
		if ((isset($a3[$v3]))&&($a3[$v3] != "null")&&($a3[$v3] != "")){
			return $a3[$v3];
		}elseif ((isset($a2[$v2]))&&($a2[$v2] != "null")&&($a2[$v2] != "")){
			return $a2[$v2];
		}elseif ((isset($a1[$v1]))&&($a1[$v1] != "null")&&($a1[$v1] != "")){
			return $a1[$v1];
		}
	}
}

?>