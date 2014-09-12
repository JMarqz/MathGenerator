
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


// ALTERNAR ENTRE EXPONENTES FIJOS Y VARIABLES
function seleccionarTipoExponentes(expr1, expr2){
	$(":radio:eq(0)").click(function(){
		$("#exp-fijos").show();
		$("#exp-var").hide();

		$("#ejemplo").html("De la forma: " + expr1);
	});

	$(":radio:eq(1)").click(function(){
		$("#exp-var").show();
		$("#exp-fijos").hide();

		$("#ejemplo").html("De la forma: " + expr2);
	});
}


// CONVERTIR NÚMEROS AL INICIO DEL PROBLEMA
function truncarNumero(num){
	var tmp = "";

	switch(num){
		case 1: tmp = ""; break;
		case -1: tmp = "-"; break;
		default: tmp = num; break;
	}

	return tmp;
}


// CONVERTIR NÚMEROS EN EL CUERPO DEL PROBLEMA
function truncarNumeroCuerpo(num){
	var tmp = "";

	if (num == 1) {
		tmp = "+";
	} else if(num == -1){
		tmp = "-";
	} else if(num > 1){
		tmp = "+" + num;
	} else {
		tmp = num;
	}

	return tmp;
}

function truncarExponente(numExp){
	var tmp = "";

	switch(numExp){
		case 1: tmp = ""; break;
		default: tmp = numExp; break;
	}

	return tmp;
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
					// Tengo que reemplazar todo lo que esté entre <sup>n</sup>, desde 1-100

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

