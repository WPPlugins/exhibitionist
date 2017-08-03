function Exhibitionist(){
	var startDate = new Date();
	this.scriptStartTime = startDate.getTime();
	this.container;
	this.captionContainer;
	this.imagesArray = Array;
	this.imageCount = 0;
	this.controller;
	this.bigImageHolder;
	this.heighestHeight = 0;
	this.widestWidth = 0;
	this.heighestThumbHeight = 0;
	this.enquiryContainer;
	this.pageNumber = 0;
	this.optionsArray = Array();
	this.galleryEffectStepTime = 30;
	this.debug = false;
	
	this.imageTableBodyRow1Cell1 = document.createElement('td');
	this.imageTableBodyRow1Cell1.width = "33.333%";
	this.imageTableBodyRow1Cell1.style.verticalAlign = "top";
	this.imageTableBodyRow1Cell1.style.position = "relative";
	this.imageTableBodyRow1Cell1.style.overflow = "visible";
	
	this.imageTableBodyRow1Cell2 = document.createElement('td');
	this.imageTableBodyRow1Cell2.width = "33.333%";
	this.imageTableBodyRow1Cell2.style.verticalAlign = "top";
	this.imageTableBodyRow1Cell2.style.position = "relative";
	this.imageTableBodyRow1Cell2.style.overflow = "visible";
	
	this.imageTableBodyRow1Cell3 = document.createElement('td');
	this.imageTableBodyRow1Cell3.width = "33.333%";
	this.imageTableBodyRow1Cell3.style.verticalAlign = "top";
	this.imageTableBodyRow1Cell3.style.position = "relative";
	this.imageTableBodyRow1Cell3.style.overflow = "visible";
	
	this.init = function(id){
		this.pageNumber = id;
		this.container = document.getElementById("Exhibitionist_"+id);
		this.tableContainer = document.getElementById("imageContainer_"+id);
		this.galleryEffectSpeedStep = 100 / (this.optionsArray['effectTime'] / this.galleryEffectStepTime);
		this.inquiryForm = new Exhibitionist_inquiryForm;
		this.inquiryForm.init(this);
		var imageTable = document.createElement('table');
		    imageTable.width = "100%";
			imageTable.border = 0;
			imageTable.cellPadding = 0;
			imageTable.cellSpacing = 0;
		var imageTableBody = document.createElement('tbody');
		var imageTableBodyRow1 = document.createElement('tr');
		
		
		imageTableBodyRow1.appendChild(this.imageTableBodyRow1Cell1);
		imageTableBodyRow1.appendChild(this.imageTableBodyRow1Cell2);
		imageTableBodyRow1.appendChild(this.imageTableBodyRow1Cell3);
		imageTableBody.appendChild(imageTableBodyRow1);
		imageTable.appendChild(imageTableBody);
		this.tableContainer.appendChild(imageTable);
	}
	this.addImage = function(imageURL,imageWidth,imageHeight,thumbURL,thumbWidth,thumbHeight,caption,description,title){
		if (this.heighestHeight < imageHeight){
			this.heighestHeight = imageHeight;
		}
		if (this.widestWidth < imageWidth){
			this.widestWidth = imageWidth;
		}
		if (this.heighestThumbHeight < thumbHeight){
			this.heighestThumbHeight = thumbHeight;
		}
		this.image = new Exhibitionist_imageObject;
		this.image.init(this,imageURL,imageWidth,imageHeight,thumbURL,thumbWidth,thumbHeight,caption,description,title);
		this.imagesArray[this.imageCount] = this.image;
		this.imageCount++;
	}
	this.start = function(){
		this.trace("Selecting Navigator");
		switch (this.optionsArray['navigator']){
			case "slideshow":
				this.controller = new Exhibitionist_slideshowController;
				this.trace("Slideshow Selected");
			break;
			case "compactCaptionController":
				this.controller = new Exhibitionist_compactCaptionController;
				this.trace("Compact Caption Selected");
			break;
			case "thumbnailCaptionController":
				this.controller = new Exhibitionist_thumbnailCaptionController;
				this.trace("Thumbnail Caption Selected");
			break;
			case "gridThumbnailController":
				this.controller = new Exhibitionist_gridThumbnailController;
				this.trace("Grid Thumbnail Selected");
			break;
		}
		this.trace("Initalising Navigator");
		this.controller.init(this);
		
		this.trace("Initalising Image Aligner");
		this.imageAligner = new Exhibitionist_imageAligner;
		this.imageAligner.init(this);
		
		this.trace("Starting Navigator");
		this.controller.start();
	}
	this.trace = function(text){
		if (this.debug == true){
			debugObject = document.getElementById("debugOutput_"+this.pageNumber);
			var d = new Date();
			var runTime = d.getTime() - this.scriptStartTime;
			debugObject.innerHTML = debugObject.innerHTML +"T"+runTime+": "+ text + "<br/>\r\n";
		}
	}
}

function parseHTMLText(text){
	var returnString = ""
	for (characterPos in text){
		var character = text[characterPos];
		switch (character){
			case "<":
				character = "&lt;";
			break;
			case ">":
				character = "&gt;";
			break;
		}
		text[characterPos] = character;
		
	}
	return text;
}