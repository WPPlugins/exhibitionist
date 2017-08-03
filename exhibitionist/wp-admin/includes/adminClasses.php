<?php
class Exhibitionist_MenuItem{
	var $buttonName = "unnamed";
	var $html;
	var $settingsArray = array();
	var $settingsArrayPos = 0;
	function addSetting($type,$default,$varName,$text,$extra = array()){
		$this->settingsArray[$this->settingsArrayPos] = array(	"type"=>$type,
																"default"=>$default,
																"varName"=>$varName,
																"text"=>$text,
																"extra"=>$extra
		);
		$this->settingsArrayPos++;
	}
	function setOptions(){
		$currentSettings = get_option("Exhibitionist");
		foreach ($this->settingsArray as $settingArray){
			$varName = $settingArray['varName'];
			$currentSettings[$varName] = $_POST['Exhibitionist_'.$varName];
		}
		update_option("Exhibitionist",$currentSettings);
	}
	function getOption($varName,$default){
		$currentSettings = get_option("Exhibitionist");
		return $currentSettings[$varName];
	}
	function makeHTML(){
		$this->html.="<table cellspacing='0' width='50%'><tbody>\r\n";
		$bgColorAlternate = "#DDDDDD";
		foreach ($this->settingsArray as $setting){
			if ($bgColor == ""){
				$bgColor = $bgColorAlternate;
			}else{
				$bgColor = "";
			}
			$name = $setting['varName'];
			$default = $setting['default'];
			$value = $this->getOption($setting['varName'],$default);
			$text = $setting['text'];
			$extra = $setting['extra'];
			switch ($setting['type']){
				case "number":
					$html="<tr>";
					$html.= "<td style='background-color:$bgColor'>".$text."</td>";
					$html.= "<td style='background-color:$bgColor'><input type='text' name='Exhibitionist_$name' value='$value' /></td>\r\n";
					$html.= "</tr>";
					$this->html.=$html;
				break;
				case "text":
					$html = "<tr>";
					$html.= "<td style='background-color:$bgColor'>".$text."</td>";
					$html.= "<td style='background-color:$bgColor'><input type='text' name='Exhibitionist_$name' value='$value' /></td>\r\n";
					$html.= "</tr>";
					$this->html.=$html;
				break;
				case "dropdown":
					$html = "<tr>";
					$html.= "<td style='background-color:$bgColor'>".$text."</td>";
					$html.= "<td style='background-color:$bgColor'><select name='Exhibitionist_$name'>";
					foreach ($extra as $optionName => $optionValue){
						if ($value == $optionValue){
							$html.= "<option selected value='$optionValue'>$optionName</option>";
						}else{
							$html.= "<option value='$optionValue'>$optionName</option>";
						}
					}
					$html.="</select></td>";
					$html.= "</tr>";
					$this->html.=$html;
				break;
				case "checkbox":
					$html = "<tr>";
					$html.= "<td style='background-color:$bgColor'>".$text."</td>";
					if ($value == true){
						$html.= "<td style='background-color:$bgColor'><input type='checkbox' name='Exhibitionist_$name' checked></td>";
					}else{
						$html.= "<td style='background-color:$bgColor'><input type='checkbox' name='Exhibitionist_$name'></td>";
					}
					$html.= "</tr>";
					$this->html.=$html;
				break;
				case "headding":
					$html = "<tr>";
					$html.= "<td style='background-color:$bgColor'><h3>".$text."</h3></td>";
					$html.= "<td style='background-color:$bgColor'>&nbsp;</td>";
					$html.= "</tr>";
					$this->html.=$html;
				break;
			}
		}
		$this->html.="</tbody></table>\r\n";
	}
}


?>