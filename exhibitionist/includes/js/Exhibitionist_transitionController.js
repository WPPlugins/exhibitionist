function Exhibitionist_transitionController(){
	this.transitionStep = 0.5;
	this.exhibitionist;
	this.toImageObject;
	this.fromImageObject;
	this.stillWorking = false;
	this.fromImageObject = null;
	this.init = function(exhibitionist){
		this.exhibitionist = exhibitionist;
		this.transitionStep = this.exhibitionist.galleryEffectSpeedStep;
	}
	//handels what transition function to use
	this.changeImage = function(toImageObject){
		if (this.stillWorking == false){
			if (this.fromImageObject != toImageObject){
				this.stillWorking = true;
				this.toImageObject = toImageObject;
				switch (this.exhibitionist.optionsArray['effect']){
					case "default":
						this.defaultTransition();
					break;
					case "fadeInOut":
						this.transitionStep = this.exhibitionist.galleryEffectSpeedStep * 2;
						this.fadeInOutTransition();
					break;
					case "crossfade":
						this.crossfadeTransition();
					break;
				}
			}
		}
		return false;
	}
	//the default transition function.
	this.defaultTransition = function(){
		this.toImageObject.setOpacity(100);
		this.exhibitionist.bigImageHolder.appendChild(this.toImageObject.holder);
		if (this.fromImageObject != null){
			this.exhibitionist.bigImageHolder.removeChild(this.fromImageObject.holder);		
		}
		this.fromImageObject = this.toImageObject;
		this.stillWorking = false;
		return;
	}
	//the fade in out transition
	this.fadeInOutTransition = function(){
		//if it is the first image we just add it and fase in
		if (this.fromImageObject == null){
			this.toImageObject.setOpacity(0);
			this.toImageObject.setPosition("relative");
			this.exhibitionist.bigImageHolder.appendChild(this.toImageObject.holder);
			self = this;
			this.toImageObject.onFadedIn = function(){
				self.fromImageObject = self.toImageObject;
				self.stillWorking = false;
			}
			this.toImageObject.fadeIn(this.transitionStep);
		}else{
			this.fromImageObject.fadeOut(this.transitionStep);
			var self = this;
			this.fromImageObject.onFadedOut = function(){
				self.exhibitionist.bigImageHolder.removeChild(self.fromImageObject.holder);
				self.toImageObject.setOpacity(0);
				self.exhibitionist.bigImageHolder.appendChild(self.toImageObject.holder);
				self.toImageObject.onFadedIn = function(){
					self.fromImageObject = self.toImageObject;
					self.stillWorking = false;
				}
				self.toImageObject.fadeIn(self.transitionStep);
			}
		}
		return;
	}
	// the crossfade transition
	this.crossfadeTransition = function(){
		this.toImageObject.setOpacity(0);
		this.toImageObject.setPosition("relative");
		this.exhibitionist.bigImageHolder.appendChild(this.toImageObject.holder);
		this.toImageObject.fadeIn(this.transitionStep);
		var self = this;
		this.toImageObject.onFadedIn = function(){
			self.stillWorking = false;
		}
		if (this.fromImageObject != null){
			this.fromImageObject.setPosition("absolute");
			this.fromImageObject.fadeOut(this.transitionStep);
			var self = this;
			this.fromImageObject.onFadedOut = function(){
				self.exhibitionist.bigImageHolder.removeChild(self.fromImageObject.holder);
				self.fromImageObject = self.toImageObject;
			}
		}else{
			this.fromImageObject = this.toImageObject;
		}
		return;
	}
}