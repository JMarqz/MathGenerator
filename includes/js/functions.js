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
	window.plugins.clipboard.copy(
		texto,
		function(){ // Success
			navigator.notification.alert("Se ha copiado al portapapeles exitosamente", null, "Mensaje", "Ok");
		},
		function(){ // Error
			navigator.notification.alert("Ocurrió un error al copiar en el portapapeles", null, "Error", "Ok");
		});
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
	        	navigator.notification.alert("¡Este servicio no está disponible en tu dispositivo!", null, 'Error', 'Ok');
	        }
	    }
	);
}





/////////////////////////////////////////////////////////////
/////				FUNCIONES ARITMÉTICA				/////
/////////////////////////////////////////////////////////////
// SUMAS
function sumas(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Crear Array con números aleatorios
	var matrizSumas = crearArray(nEjercicios, nTerm, nMax, nMin);

	// Generar Sumas
	var problemas = "";
	var resultadoEjercicio = 0;
	
	for (var i=0; i<matrizSumas.length; i++) {
		for(var j=0; j<matrizSumas[i].length; j++){
			var tmp = matrizSumas[i][j];
			resultadoEjercicio += tmp;

			if (j<matrizSumas[i].length-1) {
				// Sin respuestas
				problemas += tmp + " + ";
			} else{
				if (respuestas) {
					// Con respuestas
					problemas += tmp + " (R: " + resultadoEjercicio + ")" + "\n";
				} else{
					problemas += tmp + "\n";
				}
			}
		}
		resultadoEjercicio = 0;
	};
	
	document.getElementById("resultado").value = problemas;
}


// RESTAS
function restas(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var respuestas = $("#respuestas").is(":checked");
	var tipoResultados = $('input[name="radio-resultados"]:checked').val();


	// Crear Array con números aleatorios
	var matrizRestas = new Array();

	for(var i=0; i<nEjercicios; i++){
		matrizRestas.push(new Array());

		for(var j=0; j<2; j++){
			switch(tipoResultados){
				case '1':
					// Todos los resultados
					var randomNum1 = aleatorio(nMax,nMin);
					matrizRestas[i].push(randomNum1);
				break;
				case '2':
					// Resultados positivos incluyendo 0
					if (j==0) {
						var randomNum1 = aleatorio(nMax,nMin);
						matrizRestas[i].push(randomNum1);
					} else{
						randomNum1 = aleatorio(matrizRestas[i][0],nMin);
						matrizRestas[i].push(randomNum1);
					}
				break;
				case '3':
					// Resultados positivos excluyendo 0
					if (j==0) {
						var randomNum1 = aleatorio(nMax,nMin);
						matrizRestas[i].push(randomNum1);
					} else{
						if (matrizRestas[i][0]!=1) {
							randomNum1 = aleatorio(matrizRestas[i][0]-1,nMin);
							matrizRestas[i].push(randomNum1);
						} else{
							matrizRestas[i].push(0);
						}					
					}
				break;
				case '4':
					// Solo resultados negativos
					if (nMax==1) {
						nMax = 2;
					};
					if (j==0) {
						var randomNum1 = aleatorio(nMax-1,nMin);
						matrizRestas[i].push(randomNum1);
					} else{
						randomNum1 = aleatorio(nMax,matrizRestas[i][0]);
						if (randomNum1 > matrizRestas[i][0]) {
							matrizRestas[i].push(randomNum1);
						} else{
							j--;
						}
					}
				break;
			}
		}
	}
	
	// Generar Restas
	var problemas = "";
	var resultadoEjercicio = 1;
	
	for (var i=0; i<matrizRestas.length; i++) {
		for(var j=0; j<matrizRestas[i].length; j++){
			var tmp = matrizRestas[i][j];
			
			if (j==0) {
				resultadoEjercicio = tmp;
			} else{
				resultadoEjercicio -= tmp;
			}

			if (j<matrizRestas[i].length-1) {
				// Sin respuestas
				problemas += tmp + " - ";
			} else{
				if (respuestas) {
					// Con respuestas
					problemas += tmp + " (R: " + resultadoEjercicio + ")" + "\n";
				} else{
					problemas += tmp + "\n";
				}
			}
		}
		resultadoEjercicio = 1;
	};
	
	document.getElementById("resultado").value = problemas;
}


// MULTIPLICACIONES
function multiplicaciones(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Crear Array con números aleatorios
	var matrizMultiplicaciones = crearArray(nEjercicios, nTerm, nMax, nMin);

	// Generar Multiplicaciones
	var problemas = "";
	var resultadoEjercicio = 1;
	
	for (var i=0; i<matrizMultiplicaciones.length; i++) {
		for(var j=0; j<matrizMultiplicaciones[i].length; j++){
			var tmp = matrizMultiplicaciones[i][j];
			resultadoEjercicio *= tmp;

			if (j<matrizMultiplicaciones[i].length-1) {
				// Sin respuestas
				problemas += tmp + " * ";
			} else{
				if (respuestas) {
					// Con respuestas
					problemas += tmp + " (R: " + resultadoEjercicio + ")" + "\n";
				} else{
					problemas += tmp + "\n";
				}
			}
		}
		resultadoEjercicio = 1;
	};
	
	document.getElementById("resultado").value = problemas;
}


// DIVISIONES
function divisiones(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var respuestas = $("#respuestas").is(":checked");
	var resultadosEnteros = $("#resultados_enteros").is(":checked");

	// Crear Array con números aleatorios
	var matrizDivisiones = new Array();

	for(var i=0; i<nEjercicios; i++){
		matrizDivisiones.push(new Array());

		for(var j=0; j<2; j++){
			// Sólo resultados enteros
			if (resultadosEnteros) {
				if (j==0) {
					var randomNum1 = aleatorio(nMax,nMin);
					matrizDivisiones[i].push(randomNum1);
				} else{
					var randomNumTmp = aleatorio(nMax,nMin);

					if (matrizDivisiones[i][0]%randomNumTmp == 0) {
						matrizDivisiones[i].push(randomNumTmp);
					} else{
						j--;
					}					
				}
			} else{
			//Resultados con punto decimal
				var randomNum1 = aleatorio(nMax,nMin);
				matrizDivisiones[i].push(randomNum1);
			}
		}
	}
	
	// Generar Divisiones
	var problemas = "";
	var resultadoEjercicio = 1;
	
	for (var i=0; i<matrizDivisiones.length; i++) {
		for(var j=0; j<matrizDivisiones[i].length; j++){
			var tmp = matrizDivisiones[i][j];
			
			if (j==0) {
				resultadoEjercicio = tmp;
			} else{
				resultadoEjercicio /= tmp;
				
				if(!resultadosEnteros){
					if (resultadoEjercicio % 1 != 0) {
						resultadoEjercicio = resultadoEjercicio.toFixed(4);
					}					
				}
			}

			if (j<matrizDivisiones[i].length-1) {
				// Sin respuestas
				problemas += tmp + " / ";
			} else{
				if (respuestas) {
					// Con respuestas
					problemas += tmp + " (R: " + resultadoEjercicio + ")" + "\n";
				} else{
					problemas += tmp + "\n";
				}
			}
		}
		resultadoEjercicio = 1;
	};
	
	document.getElementById("resultado").value = problemas;
}





/////////////////////////////////////////////////////////////
/////				FUNCIONES ÁLGEBRA					/////
/////////////////////////////////////////////////////////////
// FACTORIALES
function factoriales(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var respuestas = $("#respuestas").is(":checked");
	var resultadoEjercicio = 1;

	var arrayFactorial = new Array();
	var problemas = "";

	// Creando arreglo con los números factoriales y sus respuestas
	for(var i=0; i<nEjercicios; i++){
		var numAleatorio = aleatorio(nMax,nMin);
		arrayFactorial.push(numAleatorio);
	}

	// Mostrando resultados
	for(var i=0; i<arrayFactorial.length; i++){
		var tmp = arrayFactorial[i];

		if (respuestas) {
			for(var j=tmp; j>=1; j--){
				resultadoEjercicio *= j;
			}
			problemas += tmp + "!" + " R: (" + resultadoEjercicio + ")";			
		} else{
			problemas += tmp + "!";
		}
		problemas += "\n";
		resultadoEjercicio = 1;
	}

	document.getElementById("resultado").value = problemas;
}


// EXPONENCIALES EXPONENTE FIJO
function expFijo(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nExp = document.getElementById("exponente").value;
	var respuestas = $("#respuestas").is(":checked");
	
	var arrayExpFijo = new Array();

	// Generando los números
	for(var i=0; i<nEjercicios; i++){
		var numAleatorio = aleatorio(nMax,nMin);
		arrayExpFijo.push(numAleatorio);
	}

	var problemas = "";
	var resultadoEjercicio = 1;
	var exp = exponente(nExp);

	// Mostrando las respuestas
	for(var i=0; i<arrayExpFijo.length; i++){
		var tmp = arrayExpFijo[i];
		if (respuestas) {
			//problemas += tmp + "^" + exp + "R: (" + Math.pow(tmp,nExp) + ")";
			problemas += tmp + exp + " R: (" + Math.pow(tmp,nExp) + ")";
		} else{
			//problemas += tmp + "^" + exp;
			problemas += tmp + exp;
		}
		problemas += "\n";
	}

	document.getElementById("resultado").value = problemas;
}


// EXPONENCIALES EXPONENTE VARIABLE
function expVariable(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nExpMin = document.getElementById("exp-min").value;
	var nExpMax = document.getElementById("exp-max").value;
	var respuestas = $("#respuestas").is(":checked");
	
	var arrayExpFijo = new Array();

	// Generando los números
	for(var i=0; i<nEjercicios; i++){
		var numAleatorio = aleatorio(nMax,nMin);
		arrayExpFijo.push(numAleatorio);
	}

	var problemas = "";

	// Mostrando las respuestas
	for(var i=0; i<arrayExpFijo.length; i++){
		var tmp = arrayExpFijo[i];
		var expVarTmp = aleatorio(nExpMax,nExpMin);

		if (respuestas) {
			var resultadoEjercicio = Math.pow(tmp,expVarTmp);
			problemas += tmp + "^" + expVarTmp + " R: (" + resultadoEjercicio + ")";
		} else{
			problemas += tmp + "^" + expVarTmp;
		}
		problemas += "\n";
	}

	document.getElementById("resultado").value = problemas;
}













