function Exhibitionist_slideshowController(){
	this.playing = false;
	this.exhibitionist;
	this.imageCount = 0;
	this.currentImage = 0;
	this.transitionController;
	this.changeImageDelay = 4000;
	this.galleryEffectSpeedStep = 0.01;
	this.init = function(exhibitionist){
		this.exhibitionist = exhibitionist;
		this.exhibitionist.trace("Slideshow: Begining initalisation");
		this.changeImageDelay = this.exhibitionist.optionsArray['swapImageSpeed'];
		this.imageCount = this.exhibitionist.imageCount;
		
		this.transitionController = new Exhibitionist_transitionController;
		this.exhibitionist.trace("Slideshow: Initalising transition ontroller");
		this.transitionController.init(exhibitionist);
	}
	this.start = function(){
		this.exhibitionist.trace("Slideshow: Starting");
		this.transitionController.changeImage(this.exhibitionist.imagesArray[this.currentImage]);
		this.playing = true;
		var self = this;
		setTimeout(function(){
			self.nextImage();
		},this.changeImageDelay);
		
	}
	this.stop = function(){
		this.exhibitionist.trace("Slideshow: Stopping");
		this.playing = false;
	}
	this.nextImage = function(){
		lastImage = this.currentImage;
		this.currentImage++;
		if (this.currentImage >= this.imageCount){
			this.currentImage = 0;
		}
		this.exhibitionist.trace("Slideshow: Changing to image "+this.currentImage);
		this.transitionController.changeImage(this.exhibitionist.imagesArray[this.currentImage]);
		if (this.playing == true){
			var self = this;
			setTimeout(function(){
				self.nextImage();
			},this.changeImageDelay);
		}
	}
}


function Exhibitionist_compactCaptionController(){
	this.exhibitionist;
	this.imageCount = 0;
	this.currentImage = 0;
	this.transitionController;
	this.changeImageDelay = 4000;
	this.galleryEffectSpeedStep = 0.01;
	this.init = function(exhibitionist){
		this.exhibitionist = exhibitionist;
		this.exhibitionist.trace("Compact Caption: Begining initalisation");
		this.changeImageDelay = exhibitionist.gallerySwapImageSpeed;
		this.imageCount = exhibitionist.imageCount;
		this.transitionController = new Exhibitionist_transitionController;
		this.exhibitionist.trace("Compact Caption: Initalising Transition Controller");
		this.transitionController.init(exhibitionist);
		//modify the image objects captions with the next and back buttons
		this.exhibitionist.trace("Compact Caption: Modifing image captions");
		for (imageObjectNum in this.exhibitionist.imagesArray){
			this.exhibitionist.trace("Compact Caption: Modifing image caption from array "+imageObjectNum);
			var imageObject = exhibitionist.imagesArray[imageObjectNum];
			imageObject.caption.innerHTML = "";
			var captionContainer = document.createElement(exhibitionist.optionsArray['imageCaptionObjectType']);
			captionContainer.setAttribute('class', exhibitionist.optionsArray['imageCaptionObjectClass']);
			var captionText = document.createTextNode(imageObject.caption.text);
			
			var self = this;
			
			var back = document.createElement('a');
			var backText = document.createTextNode(parseHTMLText("<"));
			back.appendChild(backText);
			back.href="#";
			back.onclick = function(){
				self.lastImage();
				return false;
			}
			
			var next = document.createElement('a');
			var nextText = document.createTextNode(parseHTMLText(">"));
			next.appendChild(nextText);
			next.href="#";
			next.onclick = function(){
				self.nextImage();
				return false;
			}
			
			var pageNumberTextNode = document.createTextNode((parseInt(imageObjectNum) + 1) + " of " + this.imageCount);
			var spacer = document.createTextNode(" ");
			
			
			captionContainer.appendChild(back);
			captionContainer.appendChild(pageNumberTextNode);
			captionContainer.appendChild(next);
			captionContainer.appendChild(spacer);
			if (exhibitionist.optionsArray['imageCaptionEnable']){
				captionContainer.appendChild(captionText);
			}
			
			exhibitionist.container.appendChild(captionContainer);
			imageObject.caption.displayHeight = captionContainer.offsetHeight;
			exhibitionist.container.removeChild(captionContainer);
			
			imageObject.caption.appendChild(captionContainer);
			
		}
	}
	this.start = function(){
		this.exhibitionist.trace("Compact Caption: Being Started");
		this.transitionController.changeImage(this.exhibitionist.imagesArray[this.currentImage]);
	}
	this.nextImage = function(){
		this.exhibitionist.trace("Compact Caption: Going to next image");
		this.currentImage++;
		if (this.currentImage >= this.imageCount){
			this.currentImage = 0;
		}
		this.transitionController.changeImage(this.exhibitionist.imagesArray[this.currentImage]);
	}
	this.lastImage = function(){
		this.exhibitionist.trace("Compact Caption: Going to previous image");
		this.currentImage--;
		if (this.currentImage == -1){
			this.currentImage = (this.imageCount - 1);
		}
		this.transitionController.changeImage(this.exhibitionist.imagesArray[this.currentImage]);
	}
	
}


function Exhibitionist_thumbnailCaptionController(){
	this.exhibitionist;
	this.thumbnailPadding = 0;
	this.init = function(exhibitionist){
		this.exhibitionist = exhibitionist;
		this.exhibitionist.trace("Inline Thumbnail: Begining initalisation");
		this.imageCount = this.exhibitionist.imageCount;
		this.thumbnailPadding = this.exhibitionist.optionsArray['thumbnailPadding'];
		this.thumbnailCentering = this.exhibitionist.optionsArray['thumbnailCentering'];
		this.thumbnailCenteringYOnly = this.exhibitionist.optionsArray['thumbnailCenteringYOnly'];
		
		this.transitionController = new Exhibitionist_transitionController;
		this.exhibitionist.trace("Inline Thumbnail: Initalising Transition Controller");
		this.transitionController.init(exhibitionist);
	
		this.thumbnailMask = document.createElement('div');
		this.thumbnailMask.id = "Exhibitionist_thumbnailMask";
		this.thumbnailMask.style.overflowX = "scroll";
		this.thumbnailMask.style.overflowY = "hidden";
		
		this.thumbnailMask.style.height = (exhibitionist.heighestThumbHeight + 16) + "px";
		
		this.thumbnailHolder = document.createElement('div');
		this.thumbnailHolder.id = "Exhibitionist_thumbnailHolder";
		this.thumbnailHolder.style.height = this.thumbnailMask.style.height;
		this.thumbnailHolder.totalWidth = 0;
		
		this.exhibitionist.trace("Inline Thumbnail: Adding thumbnails");
		for (imageObjectNum in this.exhibitionist.imagesArray){
			this.exhibitionist.trace("Inline Thumbnail: Adding thumbnail for image "+imageObjectNum);
			var imageObject = exhibitionist.imagesArray[imageObjectNum];
			
			var thumbnailContainer = document.createElement('a');
			thumbnailContainer.style.display = "inline";
			thumbnailContainer.href = "#";
			thumbnailContainer.style.paddingLeft = this.thumbnailPadding+"px";
			thumbnailContainer.style.paddingRight = this.thumbnailPadding+"px";
			
			var thWidth = imageObject.thumbnailWidth;
			var thHeight = imageObject.thumbnailHeight;
			if (thWidth > thHeight){
				var paddingTopBottom = ((thWidth - thHeight) / 2);
				var paddingLeftRight = 0;
			}else{
				if (this.thumbnailCenteringYOnly == true){
					var paddingLeftRight = 0;
				}else{
					var paddingLeftRight = ((thHeight - thWidth) / 2);
				}
				var paddingTopBottom = 0;
			}
			this.thumbnailHolder.totalWidth = 	this.thumbnailHolder.totalWidth + 
												imageObject.thumbnailWidth +
												this.thumbnailPadding +
												this.thumbnailPadding;
			var thumbnail = new Image();
			thumbnail.width = imageObject.thumbnailWidth;
			thumbnail.height = imageObject.thumbnailHeight;
			thumbnail.src = imageObject.thumbnailURL;
			if (this.thumbnailCentering == true){
				thumbnail.style.padding = paddingTopBottom+"px "+paddingLeftRight+"px "+paddingTopBottom+"px "+paddingLeftRight+"px";
			}
			
			thumbnailContainer.number = imageObjectNum;
			var self = this;
			thumbnailContainer.onclick = function(){
				self.exhibitionist.trace("Inline Thumbnail: Changing to image "+this.number);
				self.transitionController.changeImage(self.exhibitionist.imagesArray[this.number]);
				return false;
			}
			thumbnailContainer.appendChild(thumbnail);
			this.thumbnailHolder.appendChild(thumbnailContainer);
		}
		this.thumbnailHolder.style.width = this.thumbnailHolder.totalWidth+"px";
		this.thumbnailMask.appendChild(this.thumbnailHolder);
		exhibitionist.container.appendChild(this.thumbnailMask);
	}
	this.start = function(){
		this.exhibitionist.trace("Inline Thumbnail: Starting");
		this.transitionController.changeImage(this.exhibitionist.imagesArray[0]);
	}
}

function Exhibitionist_gridThumbnailController(){
	this.exhibitionist;
	this.thumbsNumber = 0;
	this.transitionController;
	this.thumbnailImageObject;
	this.gridModePadding = 5;
	this.gridModeCentering = false;
	this.init = function(exhibitionist){
		var self = this;
		this.exhibitionist = exhibitionist;
		this.exhibitionist.trace("Grid Thumbnail: Begining initalisation");
		this.gridModeCentering = this.exhibitionist.optionsArray['thumbnailCentering'];
		this.gridModePadding = this.exhibitionist.optionsArray['thumbnailPadding'];
		this.imageCount = this.exhibitionist.imageCount;
		this.transitionController = new Exhibitionist_transitionController;
		this.transitionController.init(exhibitionist);
		
		this.thumbnailHolder = document.createElement('div');
		this.thumbnailHolder.id = "thumbnailHolder";
		if (this.exhibitionist.optionsArray['gridWithUseImageGrid'] == true){
			this.thumbnailHolder.style.width = this.exhibitionist.widestWidth+"px";
		}else{
			this.thumbnailHolder.style.width = this.exhibitionist.optionsArray['gridWidthGrid']+"px";
		}
		
		this.exhibitionist.trace("Grid Thumbnail: Adding Thumbnails");
		for (imageObjectNum in this.exhibitionist.imagesArray){
			this.exhibitionist.trace("Grid Thumbnail: Adding thumbnail "+imageObjectNum);
			var imageObject = exhibitionist.imagesArray[imageObjectNum];
			var thumbnailContainer = document.createElement('a');
			thumbnailContainer.style.display = "inline";
			var thWidth = imageObject.thumbnailWidth;
			var thHeight = imageObject.thumbnailHeight;
			if (thWidth > thHeight){
				var paddingTopBottom = ((thWidth - thHeight) / 2);
				var paddingLeftRight = 0;
			}else{
				var paddingLeftRight = ((thHeight - thWidth) / 2);
				var paddingTopBottom = 0;
			}
			
			thumbnailContainer.href = "#";
			thumbnailContainer.number = imageObjectNum;
			thumbnailContainer.onclick = function(){
				self.transitionController.changeImage(self.exhibitionist.imagesArray[this.number]);
				self.exhibitionist.trace("Grid Thumbnail: Changing to image "+this.number);
				return false;
			}
			
			var thumbnail = new Image();
			thumbnail.src = imageObject.thumbnailURL;
			if (this.gridModeCentering == true){
				thumbnail.style.margin = paddingTopBottom+"px "+paddingLeftRight+"px "+paddingTopBottom+"px "+paddingLeftRight+"px";
			}
			thumbnail.style.padding = this.gridModePadding + "px";
			
			thumbnailContainer.appendChild(thumbnail);
			this.thumbnailHolder.appendChild(thumbnailContainer);
		}
		
		this.thumbsNumber = imageObjectNum + 1;
		this.thumbnailImageObject = new Exhibitionist_imageObject;
		this.thumbnailImageObject.initUsingObject(this.thumbnailHolder);
		this.exhibitionist.imagesArray[this.thumbsNumber] = this.thumbnailImageObject;
		
		for (imageObjectNum in this.exhibitionist.imagesArray){
			var imageObject = exhibitionist.imagesArray[imageObjectNum];
			if (imageObject != this.thumbnailImageObject){
				imageObject.holder.onclick = function(){
					self.transitionController.changeImage(self.thumbnailImageObject);
					return false;
				}
			}
		}
		
	}
	this.start = function(){
		this.exhibitionist.trace("Grid Thumbnail: Starting");
		this.transitionController.changeImage(this.thumbnailImageObject);
	}
}