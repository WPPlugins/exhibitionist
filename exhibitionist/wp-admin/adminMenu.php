<?php
//Setup Options Arrays
$transitionTypeOptions = array(	"Cross Fade"=>"crossfade",
								"Fade In Out"=>"fadeInOut",
								"No Effect"=>"default"
								);
$transitionTypeOverride = array("No Override"=>"null");
foreach($transitionTypeOptions as $k => $v){
	$transitionTypeOverride[$k] = $v;
}
$navigatorOptionsArray = array(	"Automated Slideshow"=>"slideshow",
								"Compact Caption"=>"compactCaptionController",
								"Inline Thumbnail"=>"thumbnailCaptionController",
								"Grid Thumbnail"=>"gridThumbnailController"
								);
$imageSizesOptions = 	array(	"Full Size"=>"full",
								"Large"=>"large",
								"Medium"=>"medium",
								"Thumbnail"=>"thumbnail"
								);
$horizontalAlinmentOptions = array("Left"=>"left",
									"Center"=>"center",
									"Right"=>"right"
								);
//	General Settings Menu
$MenuItemGeneral = new Exhibitionist_MenuItem;
$MenuItemGeneral->buttonName ="General";
$MenuItemGeneral->addSetting(	"number",
								1000,
								"effectTime",
								"Default Transition Time (ms)"
);
$MenuItemGeneral->addSetting(	"dropdown",
								"default",
								"effect",
								"Default Transition Effect",
								$transitionTypeOptions
);
$MenuItemGeneral->addSetting(	"dropdown",
								"thumbnailCaptionController",
								"navigator",
								"Default Navigator",
								$navigatorOptionsArray
);
$MenuItemGeneral->addSetting(	"dropdown",
								"center",
								"imageHorizontelAlignment",
								"Main Image Horizontal Alignment",
								$horizontalAlinmentOptions
);
$MenuItemGeneral->addSetting(	"dropdown",
								"center",
								"imageVerticalAlignment",
								"Main Image Vertical Alignment",
								array(	"Top"=>"top",
										"Center"=>"center",
										"Bottom"=>"bottom"
								)
);
$MenuItemGeneral->addSetting(	"dropdown",
								"medium",
								"largeImageSize",
								"Wordpress Image Size",
								$imageSizesOptions
);
$MenuItemGeneral->addSetting(	"checkbox",
								"",
								"enquireFormEnable",
								"Enable Image Email Enquiries"
);
$MenuItemGeneral->addSetting(	"text",
								get_option("admin_email"),
								"enquiryEmail",
								"To E-Mail Address"
);
$MenuItemGeneral->addSetting("headding","","","Image Title Settings");
$MenuItemGeneral->addSetting(	"checkbox",
								"on",
								"imageTitleEnable",
								"Enable Image Title"
);
$MenuItemGeneral->addSetting(	"dropdown",
								"center",
								"imageTitleTextAlign",
								"Image Title Alignment",
								$horizontalAlinmentOptions
);
$MenuItemGeneral->addSetting(	"dropdown",
								"h2",
								"imageTitleObjectType",
								"Image Title Container Type",
								array(	"h1"=>"h1",
										"h2"=>"h2",
										"h3"=>"h3",
										"h4"=>"h4",
										"h5"=>"h5",
										"h6"=>"h6",
										"div"=>"div"
								)
);
$MenuItemGeneral->addSetting(	"text",
								"topTitle",
								"imageTitleObjectClass",
								"Image Title Container Class"
);
$MenuItemGeneral->addSetting("headding","","","Image Caption Settings");
$MenuItemGeneral->addSetting(	"checkbox",
								"on",
								"imageCaptionEnable",
								"Enable Image Caption"
);
$MenuItemGeneral->addSetting(	"dropdown",
								"center",
								"imageCaptionTextAlign",
								"Image Caption Alignment",
								$horizontalAlinmentOptions
);
$MenuItemGeneral->addSetting(	"dropdown",
								"h3",
								"imageCaptionObjectType",
								"Image Caption Container Type",
								array(	"h1"=>"h1",
										"h2"=>"h2",
										"h3"=>"h3",
										"h4"=>"h4",
										"h5"=>"h5",
										"h6"=>"h6",
										"div"=>"div"
								)
);
$MenuItemGeneral->addSetting(	"text",
								"",
								"imageCaptionObjectClass",
								"Image Caption Container Class"
);
$Exhibitionist_MenuItemsArray[] = $MenuItemGeneral;

//Slideshow Settings Menu
$MenuItemSlideshow = new Exhibitionist_MenuItem;
$MenuItemSlideshow->buttonName ="Slideshow";
$MenuItemSlideshow->addSetting(	"number",
								"2000",
								"swapImageSpeed",
								"Slideshow Image Display Time (ms)"
);
$MenuItemSlideshow->addSetting("checkbox",
							"",
							"imageHolderLockSlideshow",
							"Lock height to largest image<br/>(Required for vertical alignment)"
);
$MenuItemSlideshow->addSetting("headding","","","Slideshow Overrides");
$MenuItemSlideshow->addSetting(	"number",
								"",
								"effectTimeSlideshow",
								"Override Transition Time (ms)"
);
$MenuItemSlideshow->addSetting(	"dropdown",
								"null",
								"effectSlideshow",
								"Override Transition Type",
								$transitionTypeOverride
);
$Exhibitionist_MenuItemsArray[] = $MenuItemSlideshow;


// Compact Caption Settings Menu
$MenuItemCompactCaption = new Exhibitionist_MenuItem;
$MenuItemCompactCaption->addSetting("checkbox",
							"",
							"imageHolderLockCompactCaption",
							"Lock height to largest image<br/>(Required for vertical alignment)"
);
$MenuItemCompactCaption->buttonName ="Compact Caption";
$MenuItemCompactCaption->addSetting("headding","","","Compact Caption Overrides");
$MenuItemCompactCaption->addSetting("number",
									"",
									"effectTimeCompactCaption",
									"Override Transition Time (ms)"
);
$MenuItemCompactCaption->addSetting("dropdown",
									"null",
									"effectCompactCaption",
									"Override Transition Type",
									$transitionTypeOverride
);
$Exhibitionist_MenuItemsArray[] = $MenuItemCompactCaption;


//Inline Thumbnail Settings Menu
$MenuItemThumbnailCaption = new Exhibitionist_MenuItem;
$MenuItemThumbnailCaption->buttonName ="Inline Thumbnail";
$MenuItemThumbnailCaption->addSetting("number",
									5,
									"thumbnailPaddingInlineThumbnail",
									"Thumbnail Padding (px)"
);
$MenuItemThumbnailCaption->addSetting("checkbox",
									"",
									"thumbnailCenteringInlineThumbnail",
									"Center Images to longest image dimention"
);
$MenuItemThumbnailCaption->addSetting("checkbox",
									"",
									"thumbnailCenteringYOnlyInlineThumbnail",
									"Only center on the Y axis"
);
$MenuItemThumbnailCaption->addSetting("checkbox",
							"",
							"imageHolderLockInlineThumbnail",
							"Lock height to largest image<br/>(Required for vertical alignment)"
);
$MenuItemThumbnailCaption->addSetting("headding","","","Inline Thumbnail Overrides");
$MenuItemThumbnailCaption->addSetting("number",
									"",
									"effectTimeInlineThumbnail",
									"Override Transition Time (ms)"
);
$MenuItemThumbnailCaption->addSetting("dropdown",
									"null",
									"effectInlineThumbnail",
									"Override Transition Type",
									$transitionTypeOverride
);
$Exhibitionist_MenuItemsArray[] = $MenuItemThumbnailCaption;

// Grid Mode Settings
$MenuItemGridThumbnail = new Exhibitionist_MenuItem;
$MenuItemGridThumbnail->buttonName ="Grid Thumbnail";
$MenuItemGridThumbnail->addSetting(	"number",
									5,
									"thumbnailPaddingGrid",
									"Grid Padding (px)"
);
$MenuItemGridThumbnail->addSetting(	"checkbox",
									"",
									"thumbnailCenteringGrid",
									"Center Images to longest image dimention"
);
$MenuItemGridThumbnail->addSetting(	"checkbox",
									"",
									"gridWithUseImageGrid",
									"Use widest image with for grid"
);
$MenuItemGridThumbnail->addSetting("number",
									500,
									"gridWidthGrid",
									"Grid Width(px)"
);
$MenuItemGridThumbnail->addSetting("checkbox",
							"",
							"imageHolderLockGrid",
							"Lock height to largest image <br/>(Required for vertical alignment)"
);
$MenuItemGridThumbnail->addSetting("headding","","","Grid Thumbnail Overrides");
$MenuItemGridThumbnail->addSetting("number",
									"",
									"effectTimeGrid",
									"Override Transition Time (ms)"
);
$MenuItemGridThumbnail->addSetting("dropdown",
									"null",
									"effectGrid",
									"Override Transition Type",
									$transitionTypeOverride
);
$Exhibitionist_MenuItemsArray[] = $MenuItemGridThumbnail;
?>