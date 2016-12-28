var app = angular.module("MorseTranslator",[]);

app.controller('ctrl', ['$scope', function($scope){
	$scope.morseArea = "...\n---\n...";

	$scope.$watch("morseArea",function(morseCode){
		$scope.alphabetArea = translate(morseCode);
	});

	$scope.isValidCode = function(event){
		var keyCode = event.keyCode || event.which;
		var keyAllowed = [13,8,116,36,35,37,39,38,40];
		
		if(keyAllowed.indexOf(keyCode)===-1 && event.key!=="-" &&  event.key!=="." && event.key!=="|" && !isCopy_Paste(event)){
			event.preventDefault();
		}	
	}
}]);