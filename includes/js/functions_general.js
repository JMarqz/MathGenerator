// GENERAR NÚMEROS ALEATORIOS
function aleatorio(nMax,nMin){ 
   	numPosibilidades = nMax - nMin; 
   	aleat = Math.random() * numPosibilidades;
   	aleat = Math.round(aleat);
   	
   	return parseInt(nMin) + aleat;
}


// COPIAR
function copiar(){
	var texto = document.getElementById("resultado").value;
	window.plugins.clipboard.copy(texto);

	alert("¡Copiado con éxito!");
}

function imprimir(){
	var contenido = document.getElementById("resultado").value;

	window.plugin.printer.isServiceAvailable(
	    function (isAvailable) {
	        if (isAvailable) {
	        	window.plugin.printer.print(contenido);
	        } else{
	        	alert("¡Lo sentimos, pero este servicio no está disponible en tu dispositivo!");
	        }
	    }
	);
}