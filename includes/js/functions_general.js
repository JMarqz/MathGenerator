
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


// COPIAR
function copiar(){
	var texto = document.getElementById("resultado").innerHTML;
	var copiar = texto.
					replace(/<br>/g, "\n").
					replace(/<sup>2<\/sup>/g, "²").
					replace(/<sup>3<\/sup>/g, "³").
					replace(/<sup>4<\/sup>/g, "⁴").
					replace(/<sup>5<\/sup>/g, "⁵").
					replace(/<sup>6<\/sup>/g, "⁶").
					replace(/<sup>7<\/sup>/g, "⁷").
					replace(/<sup>8<\/sup>/g, "⁸").
					replace(/<sup>9<\/sup>/g, "⁹").
					replace(/<sup>10<\/sup>/g, "¹⁰");

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
	var imprimir = document.getElementById("resultado").innerHTML;

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

