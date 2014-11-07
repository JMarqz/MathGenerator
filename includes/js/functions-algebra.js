// FACTORIALES
function factoriales(){
	var nEjercicios = document.getElementById("ejercicios").value;
	var nMax = document.getElementById("numero-max").value;
	var nMin = document.getElementById("numero-min").value;
	var respuestas = $("#respuestas").is(":checked");
	
	var resultadoEjercicio = 1;
	var problemas = "";

	// Generando problemas
	for(var i=0; i<nEjercicios; i++){
		var tmp = aleatorio(nMax,nMin); // Número al azar

		problemas += tmp + "!";

		if (respuestas) { // Mostrando respuestas
			for(var j=tmp; j>=1; j--){
				resultadoEjercicio *= j; // Generando respuesta
			}

			problemas += " | R: [" + limitarDecimales(resultadoEjercicio) + "]"; // Mostrando las respuestas
		}

		problemas += "<br>";
		resultadoEjercicio = 1;
	}

	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
}


// EXPONENCIALES
function exponenciales(){
	var nEjercicios = document.getElementById("ejercicios").value;
	var nMin = document.getElementById("base-min").value;
	var nMax = document.getElementById("base-max").value;
	var respuestas = $("#respuestas").is(":checked");
	var permitirCerosExp = $("#ceros-exp").is(":checked");
	var tipoExp = $('input[name=tipo-exponentes]:checked').val();
	
	var problemas = "";
	var resultadoEjercicio = 1;
	var exp = 1;

	// Generando el número de ejercicios
	for(var i=0; i<nEjercicios; i++){
		var tmp = aleatorio(nMax,nMin);

		// No permitir los 0's en los ejercicios
		if (tmp == 0) {
			i--;
			continue;
		}

		// Exponentes
		exp = seleccionarExponentes(tipoExp, permitirCerosExp);

		if (!isNaN(exp)) {
			// Exponentes mostrados correctamente
			resultadoEjercicio = Math.pow(tmp,exp);
		
			problemas += tmp + "<sup>" + exp + "</sup>";

			if (respuestas) {
				problemas += " | R: [" + limitarDecimales(resultadoEjercicio) + "]";
			}

			problemas += "<br>";
			$("#botones").removeClass("ocultar");
			document.getElementById("resultado").innerHTML = problemas;

		} else{
			// Se necesita habilitar los ceros
			errorExponentes();
		}
	}
	
	cambiarColorBarraEstado();
}


// SUMAS ALGEBRAICAS
function sumasAlgebraicas(){
	// Variables generales
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerminos = document.getElementById("nTerminos").value;
	var valTipoExp = $('input[name=exponentes]:checked').val();
	var respuestas = $("#respuestas").is(":checked");
	var nLiterales = document.getElementById("nLiterales").value;

	var problemas = "";
	var suma = 0;
	var exponentesCorrectos = true;


	// Generar los ejercicios
	for(var i=0; i<nEjercicios; i++){
		
		// Elegir las literales para todo el ejercicio
		var literalesElegidas = literalesElegidasAleatorias(nLiterales);

		// Crear exponentes para todo el ejercicio
		var exponentesElegidos = [];

		for(var e=0; e<nLiterales; e++){
			var expTmp = seleccionarExponentes(valTipoExp, false);

			if (isNaN(expTmp)) {
				exponentesCorrectos = false;
			} else{
				exponentesElegidos[exponentesElegidos.length] = parseInt(expTmp);
			}
		}

		if (exponentesCorrectos) {
			// Crear los términos
			for(var j=0; j<nTerminos; j++){
				var nAleatorio = aleatorio(nMin, nMax);
				var numTruncado = "";

				if (nAleatorio == 0) {
					j--; // Eliminar los 0's de los problemas
					continue;
				} else{
					if (j==0) {
						numTruncado = truncarNumero(nAleatorio);
					} else{
						numTruncado = truncarNumeroCuerpo(nAleatorio);
					}

					problemas += numTruncado;
					suma += nAleatorio;

					// Agregar Literales y exponentes
					for(var k=0; k<nLiterales; k++){
						problemas += literalesElegidas[k] + "<sup>" + truncarExponente(exponentesElegidos[k]) + "</sup>";
					}
				}
			}

			// Resultados 
			if (respuestas) {
				problemas += " | R: [" + truncarNumero(suma);

				// Agregar Literales y exponentes a las respuestas
				if (suma != 0) {
					for(var k=0; k<nLiterales; k++){
						problemas += literalesElegidas[k] + "<sup>" + truncarExponente(exponentesElegidos[k]) + "</sup>";
					}
				}

				problemas += "]";
			};

			problemas += "<br>";
			suma = 0;

			document.getElementById("resultado").innerHTML = problemas;
		} else{
			// Exponentes incorrectos
			errorExponentes();
		}
	}

	cambiarColorBarraEstado();
}


// MULTIPLICACIONES ALGEBRAICAS
function multiplicacionesAlgebraicas(){
	// Variables generales
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerminos = document.getElementById("nTerminos").value;
	var valTipoExp = $('input[name=exponentes]:checked').val();
	var respuestas = $("#respuestas").is(":checked");
	var nLiterales = document.getElementById("nLiterales").value;

	var problemas = "";
	var resultado = 1;
	var exponentesCorrectos = true;
	

	// Generar los ejercicios
	for(var i=0; i<nEjercicios; i++){
		var sumaExponentes = [0,0];

		// Elegir las literales para todo el ejercicio
		var literalesElegidas = literalesElegidasAleatorias(nLiterales);

		// Crear los términos
		for(var j=0; j<nTerminos; j++){
			var nAleatorio = aleatorio(nMin, nMax);
			var numTruncado = "";

			if (nAleatorio == 0) {
				j--; // Eliminar los 0's de los problemas
				continue;
			} else{
				numTruncado = truncarNumero(nAleatorio);

				problemas += numTruncado;
				resultado *= nAleatorio;

				// Agregar Literales y exponentes
				for(var k=0; k<nLiterales; k++){
					problemas += literalesElegidas[k];

					var expTmp = seleccionarExponentes(valTipoExp, false);

					if (isNaN(expTmp)) {
						exponentesCorrectos = false;
					} else{
						problemas += "<sup>" + truncarExponente(parseInt(expTmp)) + "</sup>";
						sumaExponentes[k] += parseInt(expTmp);
					}
				}

				if(j<nTerminos-1){
					problemas += "*";
				}
			}
		}

		if (exponentesCorrectos) {
			// Resultados 
			if (respuestas) {
				var numTmp = limitarDecimales(resultado);

				problemas += " | R: [" + truncarNumero(numTmp);

				if (numTmp.indexOf('x10') != -1) {
					problemas += " ";
				}

				// Agregar Literales y exponentes a las respuestas
				if (resultado != 0) {
					for(var k=0; k<nLiterales; k++){
						if (sumaExponentes[k] != 0) {
							problemas += literalesElegidas[k];

							if (sumaExponentes[k] != 1) {
								problemas += "<sup>" + sumaExponentes[k] + "</sup>";
							}
						}
					}
				}

				problemas += "]";
			}

			problemas += "<br>";
			resultado = 1;

			document.getElementById("resultado").innerHTML = problemas;
		} else{
			errorExponentes();
		}
	}

	cambiarColorBarraEstado();
}


// DIVISIONES ALGEBRAICAS
function divisionesAlgebraicas(){
	// Variables generales
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var valTipoExp = $('input[name=exponentes]:checked').val();
	var respuestas = $("#respuestas").is(":checked");
	var ceros = $("#ceros").is(":checked");
	var nLiterales = document.getElementById("nLiterales").value;

	var problemas = "";
	var numTruncado = "";
	var resultado = 1;
	var exponentesCorrectos = true;
	

	// Generar los ejercicios
	for(var i=0; i<nEjercicios; i++){
		var arregloDivision = [];
		var sumaExponentes = ['',''];

		// Elegir las literales para todo el ejercicio
		var literalesElegidas = literalesElegidasAleatorias(nLiterales);

		// Crear la división, solo 2 términos
		for(var j=0; j<2; j++){
			var nAleatorio = aleatorio(nMin, nMax);

			if (nAleatorio == 0) {
				j--; // Eliminar los 0's
				continue;
			} else{
				numTruncado = truncarNumero(nAleatorio);

				problemas += numTruncado;
				arregloDivision[arregloDivision.length] = nAleatorio;

				// Agregar Literales y exponentes
				for(var k=0; k<nLiterales; k++){
					problemas += literalesElegidas[k];

					var expTmp = seleccionarExponentes(valTipoExp, false);

					if (isNaN(expTmp)) {
						exponentesCorrectos = false;
					} else{
						problemas += "<sup>" + truncarExponente(parseInt(expTmp)) + "</sup>";

						if (sumaExponentes[k] == '') {
							sumaExponentes[k] = expTmp;
						} else{
							sumaExponentes[k] = sumaExponentes[k] - expTmp;
						}
					}
				}

				if(j<1){
					problemas += " / ";
				}
			}

			numerador = arregloDivision[0];
			denominador = arregloDivision[1];
			resultado = numerador / denominador;
		}

		if (exponentesCorrectos) {
			// Resultados 
			if (respuestas) {
				problemas += " | R: [";
				
				var resultadoTmp = limitarDecimales(resultado);

				if (sumaExponentes[0] != 0 || sumaExponentes[1] != 0) {
					problemas += truncarNumero(resultadoTmp);
				} else{
					problemas += resultadoTmp;
				}

				// Agregar Literales y exponentes a las respuestas
				if (resultado != 0) {
					for(var k=0; k<nLiterales; k++){
						if (sumaExponentes[k] != 0) {
							problemas += literalesElegidas[k] + "<sup>" + truncarExponente(sumaExponentes[k]) + "</sup>";
						};
					}
				}

				problemas += "]";
			}

			problemas += "<br>";
			document.getElementById("resultado").innerHTML = problemas;
		} else{
			errorExponentes();
		}
	}

	cambiarColorBarraEstado();
}


////////////////////////
// PRODUCTOS NOTABLES //
////////////////////////

// FACTOR COMÚN
function factorComun(){
	
	//////////////////////////////////////////////////
	//	DEJAR SOLO UNA LITERAL ??					//
	//	NO REPETIR EXPONENTES DE LAS LITERALES 		//
	//	DEJAR RESPUESTAS POR DEFAULT (NO ELEGIR)	//
	//////////////////////////////////////////////////


	// Variables generales
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var expMin = document.getElementById("exp-min").value;
	var expMax = document.getElementById("exp-max").value;
	var valTipoExp = $('input[name=exponentes]:checked').val();
	//var respuestas = $("#respuestas").is(":checked");
	var nTerminos = document.getElementById("nTerminos").value;
	var nLiterales = document.getElementById("nLiterales").value;

	var problemas = "";
	var respuestas = true;
	var exponentesCorrectos = true;

	for(var i=0; i<nEjercicios; i++){
		// 1) Crear factor común
		var factorComun_numero = aleatorio(nMax, nMin);
		var factorComun_exponente = aleatorio(expMax-1, expMin);
		var exponentesFactorComun = [];
		var cont = 0;

		if (factorComun_numero == 0 || factorComun_exponente == 0) {
			i--; // Eliminar los 0's del ejercicio
			continue;
		} else{
			var literalesElegidas = literalesElegidasAleatorias(nLiterales);
			var factorComun = truncarNumero(factorComun_numero); 

			for(var j=0; j<nLiterales; j++){
				factorComun += literalesElegidas[j];

				if (factorComun_exponente != 1) {
					factorComun += "<sup>" + factorComun_exponente + "</sup>";
				}
				exponentesFactorComun[exponentesFactorComun.length] = factorComun_exponente;
			}

			// 2) Crear términos a multiplcar con el factor común
			// Creando Multiplos
			var multiploMaximo = nMax / factorComun_numero;
			var multiploMinimo = nMin / factorComun_numero;

			// Truncando los múltiplos
			if (multiploMinimo%1!=0 && multiploMinimo < 0) {
				multiploMinimo = Math.ceil(multiploMinimo);
			} else if(multiploMinimo%1!=0 && multiploMinimo > 0){
				multiploMinimo = Math.floor(multiploMinimo);
			}

			if (multiploMaximo%1!=0 && multiploMaximo < 0) {
				multiploMaximo = Math.ceil(multiploMaximo);
			} else if(multiploMaximo%1!=0 && multiploMaximo > 0){
				multiploMaximo = Math.floor(multiploMaximo);
			}
			
			// Creando los términos a multiplcar con el factor común
			var arrTerminos = [];
			var arrExponentesProblema = [];
			var resultado = "";

			// Términos
			for(var k=0; k<nTerminos; k++){
				var multiploAzar = aleatorio(multiploMaximo, multiploMinimo);

				if (multiploAzar == 0) {
					k--; // Eliminar 0's de los múltiplo
				} else{
					arrTerminos[arrTerminos.length] = multiploAzar;

					/*
					if (k==0) {
						resultado += truncarNumero(multiploAzar);
					} else{
						resultado += truncarNumeroCuerpo(multiploAzar);
					}
					*/
					if (multiploAzar > 0) {
						resultado += "+" + multiploAzar;
					} else{
						resultado += multiploAzar;
					}

					// Crear una variable temporal que guarde los exp
					// Crear una variable temporal que guarde las literales
					// Si cumplen las condiciones necesarias las agrego a 'resultado'

					// Literales y Exponentes
					for(var l=0;l<nLiterales; l++){
						var expFCtmp = exponentesFactorComun[l]; // Exponente del FC correspondiente a la literal
						var expAleatorio = aleatorio(expMax-expFCtmp, 0); // Exp aleatorio que al sumar esté en el rango
						//var expProblema = expFCtmp - expAleatorio;

						// Si el exponente de ambas literales es 0, poner el valor numérico normal

						arrExponentesProblema[arrExponentesProblema.length] = expAleatorio;

						if (expAleatorio != 0) {
							resultado += literalesElegidas[l];
						}

						if (expAleatorio > 1) {
							resultado += "<sup>" + expAleatorio + "</sup>";
						}
					}
				}
			}

			console.log("terminos: " + arrTerminos);
			console.log("exp:" + arrExponentesProblema);
			console.log(literalesElegidas);
			console.log("--------------------");
			
			// 3) Crear problemas
			for(var k=0; k<nTerminos; k++){
				var valor = factorComun_numero * arrTerminos[k]
				
				if (k==0) {
					problemas += truncarNumero(valor);
				} else{
					problemas += truncarNumeroCuerpo(valor);
				}

				// Literales y exponentes
				for (var j=0; j<nLiterales; j++) {
					// Literales
					problemas += literalesElegidas[j];

					// Exponentes
					var sumaExponentes = factorComun_exponente + arrExponentesProblema[cont];
					if (sumaExponentes > 1) {
						problemas += "<sup>" + sumaExponentes + "</sup>";
					}
					cont++;
				}
			}

			if (respuestas) {
				problemas += " | R: (" + factorComun + ")(" + resultado + ")";
			}

			problemas += "<br>";
		}

		// OTRA POSIBLE MANERA DE HACERLO
		// Generar los números del problema (num) [Crear arreglo con los números] ->
		// Obtener el máximo común divisor (mcd) [Importar arreglo]
		// : http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
		
		// Ir dividiendo num/mcd para los términos
		// ¿Literales? ¿Exponentes?
	}

	// OBTENER VALOR MÍNIMO
	var arrTmp = [45, 0, 0.1, 1.2, -90, 2, 45.09, -3.5, 4, 5, -41];
	var minimum = 0;
	var maximum = 0;

	for(var ls=0; ls<arrTmp.length; ls++){
		if (ls==0) {
			minimum = arrTmp[ls];
			maximum = arrTmp[ls];
		} else{
			minimum = Math.min(minimum, arrTmp[ls]);
			maximum = Math.max(maximum, arrTmp[ls]);
		}
	}
	console.log("max: " + maximum);
	console.log("min: " + minimum);

	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
}


// BINOMIO AL CUADRADO
function binomioCuadrado(){
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var expMin = document.getElementById("exp-min").value;
	var expMax = document.getElementById("exp-max").value;
	//var respuestas = $("#respuestas").is(":checked"); // ¿?
	
	var respuestas = true;
	var nLiterales = 1;
	var problemas = "";

	//////////////////////////////////////////////////
	//	DEJAR SOLO UNA LITERAL ??					//
	//	NO REPETIR EXPONENTES DE LAS LITERALES 		//
	//	DEJAR RESPUESTAS POR DEFAULT (NO ELEGIR)	//
	//////////////////////////////////////////////////

	for(var i=0; i<nEjercicios; i++){
		// Crear los dos valores del binomio
		var val1 = aleatorio(nMax, nMin);
		var val2 = aleatorio(nMax, nMin);

		var arrExponentes = [];

		if (val1==0 || val2==0) {
			i--; //Eliminar los 0's
			continue;
		}

		// Creo las literales
		var literalesElegidas = literalesElegidasAleatorias(nLiterales);

		// Creo los exponentes para cada literal
		for(var e=0; e<literalesElegidas.length; e++){
			var expTmp = aleatorio(expMax, expMin);

			if(e==1){
				var tmp = arrExponentes[arrExponentes.length-1];
				if (tmp != expTmp) {
					arrExponentes[arrExponentes.length] = expTmp;
				} else{
					e--;
				}
			} else{
				arrExponentes[arrExponentes.length] = expTmp;
			}
		}

		console.log(arrExponentes);

		// Primer término
		for(var e=0; e<nLiterales; e++){
			if (arrExponentes[e] != 0) {
				if (e==0) {
					problemas += truncarNumero(val1*val1);
				}
				problemas += literalesElegidas[e];

				var expTmp = arrExponentes[e];
				problemas += "<sup>" + expTmp*2 + "</sup>";
			}
		}

		// Segundo término
		for(var e=0; e<nLiterales; e++){
			if (arrExponentes[e] != 0) {
				if (e==0) {
					var tmp = 2*(val1*val2);
					problemas += truncarNumeroCuerpo(tmp);
				}
				problemas += literalesElegidas[e];

				if (arrExponentes[e]>1) {
					problemas += "<sup>" + arrExponentes[e] + "</sup>";
				}
			}
		}

		// Tercer término
		for(var e=0; e<nLiterales; e++){
			if (arrExponentes[e] != 0) {
				if (e==0) {
					problemas += truncarNumeroCuerpo(val2*val2);
				}
				problemas += literalesElegidas[e];

				var expTmp = arrExponentes[e];
				problemas += "<sup>" + expTmp*2 + "</sup>";
			}
		}

		// RESPUESTAS
		// Primer término
		var resultado = " | R: (" + truncarNumero(val1);
		for(var e=0; e<nLiterales; e++){
			if (arrExponentes[e] != 0) {
				resultado += literalesElegidas[e];

				var expTmp = arrExponentes[e];
				if (expTmp > 1) {
					resultado += "<sup>" + expTmp + "</sup>";
				}
			}
		}

		// Segundo término
		resultado += truncarNumeroCuerpo(val2);
		for(var e=0; e<nLiterales; e++){
			if (arrExponentes[e] != 0) {
				resultado += literalesElegidas[e];

				var expTmp = arrExponentes[e];
				if (expTmp > 1) {
					resultado += "<sup>" + expTmp + "</sup>";
				}
			}
		}

		resultado += ")<sup>2</sup>";

		if (respuestas) {
			problemas += resultado;
		}
		
		problemas += "<br>";
	}

	document.getElementById("resultado").innerHTML = problemas;
	//cambiarColorBarraEstado();
}
















