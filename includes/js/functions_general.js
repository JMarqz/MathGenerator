/////////////////////////////////////////////////////////////
/////				FUNCIONES GENERALES					/////
/////////////////////////////////////////////////////////////
// DEVICEREADY
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 5000);
}


// GENERAR NÚMEROS ALEATORIOS
function aleatorio(nMax,nMin){
   	numPosibilidades = nMax - nMin;
   	aleat = Math.random() * numPosibilidades;
   	aleat = Math.round(aleat);
   	
   	return parseInt(nMin) + aleat;
}


// CREAR ARREGLO CON NÚMEROS ALEATORIO
function crearArray(f, c, nMax, nMin){
	var array = new Array();

	for(var i=0; i<f; i++){
		array.push(new Array());

		for(var j=0; j<c; j++){
			var randomNum1 = aleatorio(nMax,nMin);
			array[i].push(randomNum1);
		}
	}
	return array;
}

// OBTENER EXPONENTE
function exponente(expHTML){
	var exp = "";

	switch(expHTML){
		case '2': exp = "²"; break;
		case '3': exp = "³"; break;
		case '4': exp = "⁴"; break;
		case '5': exp = "⁵"; break;
		case '6': exp = "⁶"; break;
		case '7': exp = "⁷"; break;
		case '8': exp = "⁸"; break;
		case '9': exp = "⁹"; break;
		case '10': exp = "¹⁰"; break;
	}
	
	return exp;
}


// COPIAR
function copiar(){
	var texto = document.getElementById("resultado").value;
	var copiar = texto.replace(/<br>/g, "\n");

	window.plugins.clipboard.copy(
		copiar,
		function(){ // Success
			navigator.notification.alert("Se ha copiado al portapapeles exitosamente", null, "Mensaje", "Ok");
		},
		function(){ // Error
			navigator.notification.alert("Ocurrió un error al copiar en el portapapeles", null, "Error", "Ok");
		});
}


// IMPRIMIR
function imprimir(){
	var imprimir = document.getElementById("resultado").value;
	//var imprimir = contenido.replace(/\n/g, "<br>");

	window.plugin.printer.isServiceAvailable(
	    function (isAvailable) {
	        if (isAvailable) {
	        	window.plugin.printer.print(imprimir);
	        } else{
	        	navigator.notification.alert("¡Este servicio no está disponible en tu dispositivo!", null, 'Error', 'Ok');
	        }
	    }
	);
}

