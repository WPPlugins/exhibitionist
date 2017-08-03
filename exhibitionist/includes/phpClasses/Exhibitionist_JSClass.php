<?php
class Exhibitionist_JS{
	var $js = "";
	var $optionsArrayName = "";
	var $optionsPrefix = "Exhibitionist_";
	var $wpOptions = array();
	var $shortCodeAttributes= array();
	var $outputArray = array();
	function Exhibitionist_JS($shortCodeAttributes,$optionsArrayName){
		$this->wpOptions = get_option("Exhibitionist");
		$this->shortCodeAttributes = $shortCodeAttributes;
		$this->optionsArrayName = $optionsArrayName;
	}
	function getVar($option,$suffix){
		if (isset($this->shortCodeAttributes[strtolower($option)])){
			$value = $this->shortCodeAttributes[$option];
		}elseif(($this->wpOptions[$option.$suffix] != "") && (($this->wpOptions[$option.$suffix] != "null"))){
			$value = $this->wpOptions[$option.$suffix];
		}else{
			$value = $this->wpOptions[$option];
		}
		return $value;
	}
	function addVar($option,$suffix,$type,$forceValue = false){
		if ($forceValue != false){
			$value = $forceValue;
		}else{
			$value = $this->getVar($option,$suffix);
		}
		$preEditValue = $value;
		switch($type){
			case "int":
				$value = intval($value);
			break;
			case "text":
				$value = "'$value'";
			break;
			case "bool":
				$value = $value;
			break;
			case "check":
				if ($value == "on"){
					$value = "true";
				}else{
					$value = "false";
				}
			break;
		}
		$this->outputArray[$option] = $value;
		return $preEditValue;
	}
	function getJSArray(){
		foreach ($this->outputArray as $k => $v){
			$this->js.= $this->optionsArrayName."['".$k."'] = ".$v.";\r\n";
		}
		return $this->js;
	}
}

?>