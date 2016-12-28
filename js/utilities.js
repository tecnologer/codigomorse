function translate(morseCode) {
    var message = "";
    var mmCopy = [];

    if (morseCode)
        mmCopy = morseCode.split(/\||\n|\s/g);

    for (var x = 0; x < mmCopy.length; x++) {
        if (mmCopy[x] !== "") {
            var input = mmCopy[x].split("");
            var possChar = [];

            var morseAux = _MORSE_CODE_;
            for (var i = 0; i < input.length; i++) {
                if (input[i] === ".") {
                    morseAux = morseAux && morseAux.left;
                } else if (input[i] === "-") {
                    morseAux = morseAux && morseAux.rigth;
                }
                else if(input[i]==="/"){
                    morseAux.data = " ";
                    break;
                }


                if (morseAux) {
                    possChar.push(morseAux.data);
                } else {
                    break;
                }
            }

            message += morseAux && morseAux.data || JSON.stringify(possChar).replace(/["]/g, "");
        }
    }

    return message;
}

function isCopy_Paste(e){
	return e.ctrlKey && (e.key==="c" || e.key==="v" || e.key==="x" || e.key==="z" || e.key==="e" || e.key==="a");
}

function translateFromMorse(code){
    message = "";

    var inputMessage = code.split("").map(function(key){
        return key.toUpperCase();
    });
    for(var i=0;i<inputMessage.length;i++){
        var key = inputMessage[i];
        message+= _ALPHABET_[key]+"\u0020";
    }
    
    return message;
}