function Exhibitionist_imageObject(){
	this.VP_VITL_Gallery;
	this.defaultStepTime = 30;
	this.description = "";
	this.opacityPercent = 0;
	this.exhibitionist;
	this.image = new Image();
	this.holder = document.createElement('div');
	this.holder.setAttribute('id', "imageHolder");
	this.holder.style.overflow = "visible";
	this.holderHolder = document.createElement('div');
	this.holderHolder.setAttribute('id', "imageHolderHolder");
	this.title = document.createElement('div');
	this.title.setAttribute('id', "imageTitle");
	this.title.displayHeight = 0;
	
	this.caption = document.createElement('div');
	this.caption.setAttribute('id', "imageCaption");
	this.caption.displayHeight = 0;
	
	this.fadeInComplete = false;
	this.fadeOutComplete = false;
	this.onFadedOut = function(){};
	this.onFadedIn = function(){};
	this.alignable = false;
	this.init = function(exhibitionist,imageURL,imageWidth,imageHeight,thumbnailURL,thumbWidth,thumbHeight,caption,description,title){
		this.alignable = true;
		this.exhibitionist = exhibitionist;
		this.thumbnailURL = thumbnailURL;
		this.thumbnailWidth = thumbWidth;
		this.thumbnailHeight = thumbHeight;
		this.imageWidth = imageWidth;
		this.imageHeight = imageHeight;
		
		if (exhibitionist.optionsArray['imageTitleEnable'] == true){
			var objectType = exhibitionist.optionsArray['imageTitleObjectType'];
			var objectClass = exhibitionist.optionsArray['imageTitleObjectClass'];
			var objectAlign = exhibitionist.optionsArray['imageTitleTextAlign'];
			this.title.text = title;
			this.title.innerHTML = "<"+objectType+" class='"+objectClass+"'>"+this.title.text+"<"+objectType+">";
			this.title.style.textAlign = objectAlign;
			exhibitionist.container.appendChild(this.title);
			this.title.displayHeight = this.title.offsetHeight;
			exhibitionist.container.removeChild(this.title);
		}
		this.holderHolder.appendChild(this.title);
		
		this.image.src = imageURL;
		this.image.width =imageWidth;
		this.image.height = imageHeight;
		this.holderHolder.appendChild(this.image);
		
		if (exhibitionist.optionsArray['imageCaptionEnable'] == true){
			var objectType = exhibitionist.optionsArray['imageCaptionObjectType'];
			var objectClass = exhibitionist.optionsArray['imageCaptionObjectClass'];
			var objectAlign = exhibitionist.optionsArray['imageCaptionTextAlign'];
			this.caption.text = caption
			this.caption.innerHTML = "<"+objectType+" class='"+objectClass+"'>"+this.caption.text+"<"+objectType+">";
			exhibitionist.container.appendChild(this.caption);
			this.caption.displayHeight = this.caption.offsetHeight;
			exhibitionist.container.removeChild(this.caption);
		}
		this.holderHolder.appendChild(this.caption);
		
		this.holder.appendChild(this.holderHolder);
		this.setOpacity(0);
		this.holder.style.zoom = 1;
	}
	this.setHorizontalPadding = function(left,right){
		this.holderHolder.style.paddingLeft = left+"px";
		this.holderHolder.style.paddingRight = right+"px";
	}
	this.setVerticalPadding = function(top,bottom){
		this.holderHolder.style.paddingTop = top+"px";
		this.holderHolder.style.paddingBottom = bottom+"px";
	}
	this.setPosition = function(position){
		this.holder.style.position = position;
	}
	this.initUsingObject = function(object){
		this.holder.appendChild(object);
		this.setOpacity(0);
		this.holder.style.zoom = 1;
	}
	this.setOpacity = function(number){
		this.opacityPercent = number;
		this.holder.style.opacity = (this.opacityPercent * 0.01);
		this.holder.style.filter = "alpha(opacity = "+number+")";
	}
	this.increaseOpacity = function(number){
		if (this.opacityPercent < 100){
			this.opacityPercent = this.opacityPercent + number;
			this.setOpacity(this.opacityPercent);
		}
	}
	this.decreaseOpacity = function(number){
		if (this.opacityPercent > 0){
			this.opacityPercent = this.opacityPercent - number;
			this.setOpacity(this.opacityPercent);
		}
	}
	this.fadeIn = function(step){
		this.fadeInComplete = false;
		if (this.opacityPercent < 100){
			this.increaseOpacity(step);
			var self = this;
			setTimeout(function(){
				self.fadeIn(step);
			},this.defaultStepTime);
		}else{
			this.fadeInComplete = true;
			this.onFadedIn();
		}
	}
	this.fadeOut = function(step){
		this.fadeOutComplete = false;
		if (this.opacityPercent > 0){
			this.decreaseOpacity(step);
			var self = this;
			setTimeout(function(){
				self.fadeOut(step);
			},this.defaultStepTime);
		}else{
			this.fadeOutComplete = true;
			this.onFadedOut();
		}
	}
}