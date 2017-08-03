function Exhibitionist_inquiryForm(){
	this.parent;
	this.enquiryLinkContainer;
	this.thumbnailContainer;
	this.inquiryForm;
	this.nameBox;
	this.emailBox;
	this.messageBox;
	this.pageID;
	this.optionsArray = Array();
	this.thumbContainer;
	this.init = function(exhibitionist){
		this.exhibitionist = exhibitionist;
		this.pageID = exhibitionist.pageNumber;
		
		this.enquiryLinkContainer = document.getElementById("enquiryLink_"+this.pageID);
		this.inquiryForm = document.getElementById("enquiryContainer_"+this.pageID);
		this.thumbnailContainer = document.getElementById("Exhibitionist_enquirtFormImage_"+this.pageID);
		if (this.exhibitionist.optionsArray['enquireFormEnable'] == true){
			this.enable();
		}
		this.nameBox = document.getElementById("Exhibitionist_enquirtFormName_"+this.pageID);
		this.emailBox = document.getElementById("Exhibitionist_enquirtFormEmail_"+this.pageID);
		this.messageBox = document.getElementById("Exhibitionist_enquirtFormBody_"+this.pageID);
		this.thumbContainer = document.getElementById("Exhibitionist_enquirtFormImage_"+this.pageID);
	}
	this.enable = function(){
		var enquiryLink = document.createElement('a');
		enquiryLink.href="#";
		inquiryText = document.createTextNode("Inquire about this image");
		enquiryLink.appendChild(inquiryText);
		var self = this;
		enquiryLink.onclick = function(){
			if (self.inquiryForm.onScreen != true){
				self.inquiryForm.onScreen = true;
				self.inquiryForm.style.position = "absolute";
				self.inquiryForm.style.display = "block";
				var thumbnaulURL = 	self.exhibitionist.controller.transitionController.toImageObject.thumbnailURL;
				self.thumbnailContainer.src = thumbnaulURL;
			}else{
				self.inquiryForm.onScreen = false;
				self.inquiryForm.style.display = "none";
			}
			return false;
		}
		this.enquiryLinkContainer.appendChild(enquiryLink);
	}
	this.submitMessage = function(){
		var url = this.exhibitionist.optionsArray['enquireFormPostTo'];
		var name = this.nameBox.value;
		var email = this.emailBox.value;
		var message = this.messageBox.value;
		var thumbLink = this.thumbContainer.src
		var pageName = this.exhibitionist.optionsArray['pageName'];
		var pageURL = this.exhibitionist.optionsArray['pageURL'];
		
		var parameters = "&name="+name+"&email="+email+"&message="+message+"&thumbLink="+thumbLink+"&pageID="+this.pageID+"&pageName="+pageName+"&pageURL="+pageURL;
		http_request = false;
		if (window.XMLHttpRequest) { // Mozilla, Safari,...
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {
				// set type accordingly to anticipated content type
				//http_request.overrideMimeType('text/xml');
				http_request.overrideMimeType('text/html');
			}
		}else if (window.ActiveXObject) { // IE
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){}
			}
		}
		if (!http_request) {
			alert('Cannot create XMLHTTP instance, Enquiries Disabled');
			return false;
		}
		var self = this;
		http_request.parentObject = this;
		http_request.onreadystatechange = this.submitMessageResponder;
		http_request.open('POST', url, true);
		http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http_request.setRequestHeader("Content-length", parameters.length);
		http_request.setRequestHeader("Connection", "close");
		http_request.send(parameters);
	}
	this.submitMessageResponder = function(){
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				result = http_request.responseText;
				if (result == "success"){
					alert("Message sent successfully.");
					this.parentObject.messageBox.value="";
					this.parentObject.inquiryForm.onScreen = false;
					this.parentObject.inquiryForm.style.display = "none";
				}else{
					alert(result+"\r\n"+"Please try again.");
				}
			}else{
				alert('There was a problem with the request.');
			}
		}
	}
}