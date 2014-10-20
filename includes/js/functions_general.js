
// DEVICEREADY
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);
    StatusBar.backgroundColorByHexString("#FF8000");
    StatusBar.styleLightContent();
}


/* CONFIGURACIONES GLOBALES DE JQUERY MOBILE */
$( document ).on( "mobileinit", function() {
    $.mobile.defaultPageTransition = 'none';
});


// GENERAR NÚMEROS ALEATORIOS
function aleatorio(nMax,nMin){
   	numPosibilidades = nMax - nMin;
   	aleat = Math.random() * numPosibilidades;
   	aleat = Math.round(aleat);
   	
   	return parseInt(nMin) + aleat;
}


// ALTERNAR ENTRE EXPONENTES FIJOS Y VARIABLES
function expFijos(expr){
	$("#exp-fijos").removeClass('ocultar');
	$("#exp-var").addClass("ocultar");

	$("#ejemplo").html("De la forma: " + expr);
}

function expVariables(expr){
	$("#exp-fijos").addClass('ocultar');
	$("#exp-var").removeClass("ocultar");

	$("#ejemplo").html("De la forma: " + expr);
}


// CAMBIAR COLOR DE LA BARRA DE ESTADO
function cambiarColorBarraEstado(){
	StatusBar.backgroundColorByHexString("#FCBC7C");
}

function cerrandoResultados(){
	StatusBar.backgroundColorByHexString("#FF8000");
	$( "#popupDialog" ).popup( "close" );
}


// TRUNCAR NÚMEROS AL INICIO DEL PROBLEMA
function truncarNumero(num){
	var tmp = num;

	if (num.toString().indexOf('.') == -1) {
		if(num == 1){
			tmp = "";
		} else if(num == -1){
			tmp = "-";
		}
	}

	return tmp;
}

// TRUNCAR NÚMEROS EN EL CUERPO DEL PROBLEMA
function truncarNumeroCuerpo(num){
	var tmp = num;

	if (num == 1) {
		tmp = "+";
	} else if(num == -1){
		tmp = "-";
	} else if(num > 1){
		tmp = "+" + num;
	}

	return tmp;
}

// TRUNCAR EXPONENTES
function truncarExponente(numExp){
	var tmp = "";

	switch(numExp){
		case 1: tmp = ""; break;
		default: tmp = numExp; break;
	}

	return tmp;
}


// LITERALES ELEGIDAS
function literalesElegidasAleatorias(numeroLiterales){
	var literales = ['a', 'b', 'p', 'r', 'u', 'v', 'x', 'y'];
	var literalesPar = [
		['a', 'b'],		
		['p', 'r'],
		['u', 'v'],
		['x', 'y']
	];

	// Elegir las literales para todo el ejercicio
	var literalesElegidas = [];
	var seleccionAleatoria = aleatorio(0, literales.length-1);
	var seleccionAleatoriaPar = aleatorio(0, literalesPar.length-1);

	for(var l=0; l<numeroLiterales; l++){
		var literalTmp = "";

		switch(numeroLiterales){
			case 1: literalTmp = literales[seleccionAleatoria]; break;
			default: literalTmp = literalesPar[seleccionAleatoriaPar][l];
		}
		
		literalesElegidas[literalesElegidas.length] = literalTmp;
	}

	return literalesElegidas;
}


// LIMITAR DECIMALES
function limitarDecimales(numeroTruncar){
	var numero = numeroTruncar;
	var contadorCeros = 0;
	
	// Números Enteros
	if (numero % 1 == 0) {
		// Si el número es menor a 9,999,999
		var numStr = numero.toString();
		if (numStr.length <= 7) {
			numero = numeral(numero).format('0,0');
		} else{
			numero = aNotacionCientifica(numero); // Notación Exponencial
		}
	} else{
	// Números con decimales
		var decimalNotacionCientifica = numero.toExponential();
		var arrNumero = decimalNotacionCientifica.split('e');
		var numeros = arrNumero[0];
		var exponente = arrNumero[1];

		// Número con menos de 4 decimales
		if (exponente >= -4) {
			numero = numeral(numero).format('0,0.[0000]');
		} else{
		// Número convertido en Notación científica.
			numero = aNotacionCientifica(numero);
		}
	}
	
	return numero;
}

function aNotacionCientifica (numeroConvertir){
	var numero = numeroConvertir;
	var numeroExponencial = numero.toExponential();
	var arrExponencial = numeroExponencial.split('e');
	var numeros = arrExponencial[0];
	var exponente = arrExponencial[1];

	var arrNumeros = numeros.split('.');
	var enteros = arrNumeros[0];
	var decimales = arrNumeros[1];
	var decimalesMostrar = "";

	for(var i=0; i<decimales.length; i++){
		decimalesMostrar += decimales[i];
		if (i==3) break;
	}

	var notacionCientifica = enteros + "." + decimalesMostrar + "x10<sup>";

	if (exponente>1) {
		notacionCientifica += Math.abs(exponente);
	} else {
		notacionCientifica += exponente;
	}

	notacionCientifica += "</sup>";

	return notacionCientifica;
}


// SELECCIONAR EXPONENTES
function seleccionarExponentes(tipoExponente, permitirCeros){
	var exp = 0;
	var valTipoExp = parseInt(tipoExponente);
	var error = "Error 0xEE00";

	for(var i=0; i<1; i++){
		if (valTipoExp == 0){
			exp = document.getElementById("exponente-fijo").value;
		}else {
			var nExpMin = document.getElementById("exp-min").value;
			var nExpMax = document.getElementById("exp-max").value;
			exp = aleatorio(nExpMax,nExpMin);
		}

		if (!permitirCeros && exp == 0) {
			if(valTipoExp == 0){
				return error;
			} else if(valTipoExp == 1){
				if (nExpMin != 0 || nExpMax != 0) {
					i--;
					continue;
				} else{
					return error;
				}
			}
		}
	}

	return exp;
}


// ERROR DE EXPONENTES
function errorExponentes(){
	var mensajeError = "<p class='centrar error'>No se permiten los 0's como exponentes</p>";
	$("#botones").addClass("ocultar");
	document.getElementById("resultado").innerHTML = mensajeError;
}


// COPIAR
function copiar(){
	var texto = document.getElementById("resultado").innerHTML;
	texto = texto.replace(/<br>/g, "\n");
	var map = '⁰¹²³⁴⁵⁶⁷⁸⁹';
	
	var copiar = texto.replace(/<sup>(\-*(\d*))<\/sup>/g, function (str, digits){
		return Array.prototype.map.call(digits, function (digit) {
			var exp = "";

			if (digit != '-') {
				exp += map.charAt(digit);
			} else {
				//exp += "ˉ";
				exp += "¯";
			}
			return exp;
	    }).join('');
	});

	
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

