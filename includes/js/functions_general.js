
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
	$("#exp-fijos").show();
	$("#exp-var").hide();

	$("#ejemplo").html("De la forma: " + expr);
}

function expVariables(expr){
	$("#exp-var").show();
	$("#exp-fijos").hide();

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
	var tmp = "";

	switch(num){
		case 1: tmp = ""; break;
		case -1: tmp = "-"; break;
		default: tmp = num; break;
	}

	return tmp;
}

// TRUNCAR NÚMEROS EN EL CUERPO DEL PROBLEMA
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
function limitarDecimales(numeroAtruncar){
	var resultadoStr = numeroAtruncar.toString();
	var arrResultado = resultadoStr.split(".");
	var decimales = arrResultado[1];

	if (decimales.length > 4) {
		return numeroAtruncar.toFixed(4);
	} else{
		return numeroAtruncar;
	}
}


// SELECCIONAR EXPONENTES
function seleccionarExponentes(tipoExponente){
	var exp = 0;

	switch (tipoExponente){
		case 0:
			exp = document.getElementById("exponente-fijo").value;
			break;
		case 1:
			var nExpMin = document.getElementById("exp-min").value;
			var nExpMax = document.getElementById("exp-max").value;
			exp = aleatorio(nExpMax,nExpMin);
		break;
	}

	return exp;
}


// COPIAR
function copiar(){
	var texto = document.getElementById("resultado").innerHTML;
	texto = texto.replace(/<br>/g, "\n");
	
	var map = '⁰¹²³⁴⁵⁶⁷⁸⁹';
	//var mapNegativos = ['⁰','ˉ¹','­ˉ²','­ˉ³','­ˉ⁴','­ˉ⁵','­ˉ⁶','­ˉ⁷','ˉ⁸','­ˉ⁹'];
	/*
	var copiar = texto.replace(/<sup>(\d*)<\/sup>/g, function (_, digits) {
	    return Array.prototype.map.call(digits, function (digit) {
	    	//console.log("digito:" + (+digit));
	    	console.log("# exp: " + map.charAt(+digit));
	        return map.charAt(+digit);
	    }).join('');
	});
	*/
	
	var copiar = texto.replace(/<sup>(\-*(\d*))<\/sup>/g, function (str, digits){
		//var exp = "";
		//var cont = 0;
		return Array.prototype.map.call(digits, function (digit) {
			/*
			console.log("str :" + str);
			console.log("digits: " + digits);
			console.log("digits-length: " + digits.length);
			console.log("digit: " + digit);
			*/
			var exp = "";
			
			if (digit != '-') {
				exp += map.charAt(digit);
				//cont++;
			} else {
				exp += "ˉ";
				//cont++;
			}

			/*if (cont == digits.length) {
				console.log("# exp: " + exp);
				return exp;
			};*/
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

