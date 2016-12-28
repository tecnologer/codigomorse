var app = angular.module("MorseTranslator",[]);

app.controller('ctrl', ['$scope', function($scope){
	$scope.morseArea = "...\u0020---\u0020...";
	var isFromMorse = false;
	var isFromAlphabet = false;

	$scope.$watch("morseArea",function(morseCode){
		if(isFromAlphabet){
			isFromAlphabet = false;
			return;	
		} 		
		isFromMorse = true;
		$scope.alphabetArea = translate(morseCode);
	});

	$scope.$watch("alphabetArea",function(message){
		if(isFromMorse){
			isFromMorse = false;
			return;	
		}
		
		isFromAlphabet = true;
		$scope.morseArea = translateFromMorse(message);
	});

	$scope.isValidCode = function(event){
		var keyCode = event.keyCode || event.which;
		var keyAllowed = [13,8,116,36,35,37,39,38,40,32,46];
		
		if(keyAllowed.indexOf(keyCode)===-1 && event.key!=="-" &&  event.key!=="." && event.key!=="|" && !isCopy_Paste(event)){
			event.preventDefault();
		}	
	};
}]);