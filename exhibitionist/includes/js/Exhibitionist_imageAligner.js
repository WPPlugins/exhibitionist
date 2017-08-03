function Exhibitionist_imageAligner(){
	this.exhibitionist;
	this.init = function(exhibitionist){
		this.exhibitionist = exhibitionist;
		//set horizontal alignment
		for (imageObjectNum in this.exhibitionist.imagesArray){
			this.exhibitionist.trace("Image Aligner : Padding Image "+imageObjectNum+" Horizontaly");
			var imageObject = exhibitionist.imagesArray[imageObjectNum];
			if (imageObject.alignable){
				imageObject.holder.style.width = this.exhibitionist.widestWidth+"px";
				var padding = (this.exhibitionist.widestWidth - imageObject.imageWidth);
				switch(this.exhibitionist.optionsArray['imageHorizontelAlignment']){
					case"center":
						imageObject.setHorizontalPadding((0.5*padding),(0.5*padding));
					break;
					case"left":
						imageObject.setHorizontalPadding(0,padding);
					break;
					case"right":
						imageObject.setHorizontalPadding(padding,0);
					break;
				}
			}
			
		}
		// set the position table cell where big image should be
		switch(exhibitionist.optionsArray['imageHorizontelAlignment']){
			case "left":
				exhibitionist.bigImageHolder = exhibitionist.imageTableBodyRow1Cell1;
			break;
			case "center":
				exhibitionist.bigImageHolder = exhibitionist.imageTableBodyRow1Cell2;
			break;
			case "right":
				exhibitionist.bigImageHolder = exhibitionist.imageTableBodyRow1Cell3;
			break;
		}
		
		//set vertical alignment
		if (exhibitionist.optionsArray['imageHolderLock'] == true){
			for (imageObjectNum in this.exhibitionist.imagesArray){
				this.exhibitionist.trace("Image Aligner : Padding Image "+imageObjectNum+" Vertically");
				var imageObject = exhibitionist.imagesArray[imageObjectNum];
				if (imageObject.alignable){
					imageObject.holder.style.height = 	exhibitionist.heighestHeight+
														imageObject.title.displayHeight+
														imageObject.caption.displayHeight+
														"px";
					
					var padding = (exhibitionist.heighestHeight - imageObject.imageHeight);
					switch(exhibitionist.optionsArray['imageVerticalAlignment']){
						case"center":
							imageObject.setVerticalPadding((0.5*padding),(0.5*padding));
						break;
						case"top":
							imageObject.setVerticalPadding(0,padding);
						break;
						case"bottom":
							imageObject.setVerticalPadding(padding,0);
						break;
					}
				}
				
			}
		}
	}
}