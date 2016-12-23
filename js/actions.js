(function(){
	var inputMorse = document.getElementById("morseInput");
	var ul = document.getElementById("ulCodigo");
	var morseMessage=[];

	function addCode(){
		if(!inputMorse.value.match(/[^.-]/g)){
			morseMessage.push(inputMorse.value);

			var li=document.createElement("li");
			li.innerHTML = "<span style='font-size: x-large;'>"+inputMorse.value+"</span>";
			ul.appendChild(li);

			inputMorse.value="";			
		}
		else{
			alert("Contiene caracteres invalidos, favor de revisar la informacion");
		}

		inputMorse.focus();
	}

	function decodeMorse(){		
		var message ="";
		
		if(!morseMessage.length || inputMorse.value!==morseMessage.join("1")){
			morseMessage = inputMorse.value.split("|");
		}

		for(var x=0;x<morseMessage.length;x++){
			var input = morseMessage[x].split("");
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

		// console.log(message);
		document.getElementById("message").innerHTML = message;
	}

	function isValidCode(event){
		var keyCode = event.keyCode || event.which;
		var keyAllowed = [13,8,116,36,35,37,39];

		if(keyAllowed.indexOf(keyCode)===-1 && event.key!=="-" &&  event.key!=="." && event.key!=="|"){
			event.preventDefault();
		}
		else if(keyCode === 13){
			addCode();
		}		
	}

	function clear(){
		morseMessage=[];
		inputMorse.value="";
		ul.innerHTML = "";
		document.getElementById("message").innerHTML = "";
	}
	inputMorse.addEventListener("keydown",isValidCode);
	document.getElementById("btnTraducir").addEventListener("click",decodeMorse);
	document.getElementById("btnLimpiar").addEventListener("click",clear);

	inputMorse.focus();
})();