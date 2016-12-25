var app = angular.module("MorseTranslator",[]);

app.controller('ctrl', ['$scope', function($scope){
	$scope.morseArea = "...\n---\n...";

	$scope.$watch("morseArea",function(morseCode){
		var message ="";
		var mmCopy=[];

		if(morseCode)
			mmCopy = morseCode.split(/\||\n/g);
		
		// mmCopy = mmCopy.concat(morseMessage);

		for(var x=0;x<mmCopy.length;x++){
			if(mmCopy[x]!==""){
				var input = mmCopy[x].split("");
				var possChar = [];

				var morseAux = _MORSE_CODE_;
				for(var i=0;i<input.length;i++){
					if(input[i]==="."){
						morseAux = morseAux && morseAux.left;
					}
					else if(input[i]==="-"){
						morseAux = morseAux && morseAux.rigth;
					}


					if(morseAux){
						possChar.push(morseAux.data);
					}
					else{
						break;
					}
				}

				message+= morseAux && morseAux.data || JSON.stringify(possChar).replace(/["]/g,"");
			}
		}

		// console.log(message);
		// document.getElementById("message").innerHTML = message;
		$scope.alphabetArea = message;
	});
}]);