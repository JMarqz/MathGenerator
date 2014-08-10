// DEVICEREADY
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);
}


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

	//alert("¡Problemas copiados exitosamente!");
	navigator.notification.alert("Problemas copiados al portapapeles", nothing, 'MathGenerator', 'Ok');
}


// IMPRIMIR
function imprimir(){
	var contenido = document.getElementById("resultado").value;
	var imprimir = contenido.replace(/\n/g, "<br>");

	window.plugin.printer.isServiceAvailable(
	    function (isAvailable) {
	        if (isAvailable) {
	        	window.plugin.printer.print(imprimir);
	        } else{
	        	navigator.notification.alert("¡El servicio no está disponible en tu dispositivo!", nothing, 'MathGenerator', 'Ok');
	        }
	    }
	);
}


function nothing(){
	// do nothing
}