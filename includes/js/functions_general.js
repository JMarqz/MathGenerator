// GENERAR NÚMEROS ALEATORIOS
function aleatorio(nMax,nMin){ 
   	numPosibilidades = nMax - nMin; 
   	aleat = Math.random() * numPosibilidades;
   	aleat = Math.round(aleat);
   	
   	return parseInt(nMin) + aleat;
}


// COPIAR
function copiar(){
	var text = document.getElementById("resultado").value;
	//var text = "Hola";
	window.plugins.clipboard.copy(text);
	//cordova.plugins.clipboard.copy(text);

	alert("Text: \n" + text);
}

function imprimir(){
	var contenido = document.getElementById("resultado").value;

	window.plugin.printer.isServiceAvailable(
	    function (isAvailable) {
	        alert(isAvailable ? 'Service is available' : 'Service NOT available');

	        window.plugin.printer.print(contenido);
	    }
	);
}