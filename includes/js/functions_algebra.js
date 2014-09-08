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
			problemas += tmp + "!" + " R: [" + resultadoEjercicio + "]";
		} else{
			problemas += tmp + "!";
		}
		problemas += "<br>";
		resultadoEjercicio = 1;
	}

	document.getElementById("resultado").innerHTML = problemas;
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

	// Mostrando las respuestas
	for(var i=0; i<arrayExpFijo.length; i++){
		var tmp = arrayExpFijo[i];
		if (respuestas) {
			problemas += tmp + "<sup>" + nExp + "</sup>" + " R: [" + Math.pow(tmp,nExp) + "]";
		} else{
			problemas += tmp + "<sup>" + nExp + "</sup>";
		}
		problemas += "<br>";
	}
	
	document.getElementById("resultado").innerHTML = problemas;
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
		var resultadoEjercicio = Math.pow(tmp,expVarTmp);

		if (respuestas) {
			problemas += tmp + "<sup>" + expVarTmp + "</sup>" + " R: [" + resultadoEjercicio + "]";
		} else{
			problemas += tmp + "<sup>" + expVarTmp + "</sup>";
		}
		problemas += "<br>";
	}

	document.getElementById("resultado").innerHTML = problemas;
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


// EXPRESIONES ALGEBRAICAS EXPONENTE FIJO
function exprAlgFijo(){
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nExp = document.getElementById("exponente").value;
	var nLiterales = document.getElementById("nLiterales").value;
	var nTerminos = document.getElementById("nTerminos").value;
	var respuestas = $("#respuestas").is(":checked");

	var literales = ['a', 'b', 'p', 'r', 'u', 'v', 'x', 'y'];
	var literalesPar = [
		['a', 'b'],		
		['p', 'r'],
		['u', 'v'],
		['x', 'y']
	];

	var problemas = "";
	var numTruncado = "";
	var suma = 0;


	//Creando problemas
	for(var i=0; i<nEjercicios; i++){
		
		// Una literal
		if (nLiterales == 1) {
			var seleccionLiteral = aleatorio(0,literales.length-1);
			var literal = literales[seleccionLiteral];

			// Crear 'n' términos
			for(var j=0; j<nTerminos; j++){
				var nAleatorio = aleatorio(nMin, nMax);
				var exponenteTruncado = truncarExponente(parseInt(nExp));

				if (nAleatorio == 0) {
					j--; // Eliminar los 0's de los problemas
				} else{
					if (j==0) {
						numTruncado = truncarNumero(nAleatorio);
					} else{
						numTruncado = truncarNumeroCuerpo(nAleatorio);
					}

					problemas += numTruncado + literal + "<sup>" + exponenteTruncado + "</sup>";
				}

				suma += nAleatorio;

				// Seperación de líneas y resultados
				if (j == nTerminos-1) {
					if (respuestas) {
						var respuestaTMP = truncarNumero(suma);

						if (suma != 0) {
							problemas += " R: [" + respuestaTMP + literal + "<sup>" + exponenteTruncado + "</sup>" + "]";
						} else{
							problemas += " R: [" + respuestaTMP + "]";
						}
					}
					problemas += "<br>";
					suma = 0;
				}
			}

		} else{
			// Dos literales
			var seleccionLiteralPar = aleatorio(0,literalesPar.length-1);
			var literal1 = literalesPar[seleccionLiteralPar][0];
			var literal2 = literalesPar[seleccionLiteralPar][1];

			for(var j=0; j<nTerminos; j++){
				var nAleatorio = aleatorio(nMin, nMax);
				var exponenteTruncado = truncarExponente(parseInt(nExp));

				if (nAleatorio == 0) {
					j--;
				} else{
					if (j==0) {
						numTruncado = truncarNumero(nAleatorio);
					} else{
						numTruncado = truncarNumeroCuerpo(nAleatorio);
					}
					problemas += numTruncado + literal1 + "<sup>" + exponenteTruncado + "</sup>" + literal2 + "<sup>" + exponenteTruncado + "</sup>";
				}

				suma += nAleatorio;

				// Resultados
				if (j == nTerminos-1) {
					if (respuestas) {
						var respuestaTMP = truncarNumero(suma);

						if (suma != 0) {
							problemas += " R: [" + respuestaTMP + literal1 + "<sup>" + exponenteTruncado + "</sup>" + literal2 + "<sup>" + exponenteTruncado + "</sup>" + "]";
						} else{
							problemas += " R: [" + respuestaTMP + "]";
						}
					}
					problemas += "<br>";
					suma = 0;
				}
			}
		}
	}

	document.getElementById("resultado").innerHTML = problemas;
}


// EXPRESIONES ALGEBRAICAS EXPONENTE VARIABLE - normal: 178 lineas, breve: 112
function exprAlgVariable(){
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var expMax = document.getElementById("rango-exp-max").value;
	var expMin = document.getElementById("rango-exp-min").value;
	var nLiterales = document.getElementById("nLiterales").value;
	var nTerminos = document.getElementById("nTerminos").value;
	var respuestas = $("#respuestas").is(":checked");

	var literales = ['a', 'b', 'p', 'r', 'u', 'v', 'x', 'y'];
	var literalesPar = [
		['a', 'b'],		
		['p', 'r'],
		['u', 'v'],
		['x', 'y']
	];

	var problemas = "";
	var suma = 0;


	//Creando problemas
	for(var i=0; i<nEjercicios; i++){
		// Una literal
		if (nLiterales == 1) {
			var seleccionLiteral = aleatorio(0,literales.length-1);
			var literal = literales[seleccionLiteral];
			var expAleatorio = aleatorio(expMin, expMax);

			// Crear 'n' términos
			for(var j=0; j<nTerminos; j++){
				var nAleatorio = aleatorio(nMin, nMax);
				var exponenteTruncado = truncarExponente(expAleatorio);

				// Exponentes mayores cuadráticos o mayores
				if (nAleatorio == 0) {
					j--; // Eliminar los 0's de los problemas
				} else {
					if (j==0) {
						tmp = truncarNumero(nAleatorio);
					} else{
						tmp = truncarNumeroCuerpo(nAleatorio);
					}

					problemas += tmp + literal + "<sup>" + exponenteTruncado + "</sup>";
				}

				suma += nAleatorio;

				// Seperación de líneas y resultados
				if (j == nTerminos-1) {
					if (respuestas) {
						var respuestaTMP = truncarNumero(suma);

						if (suma != 0) {
							problemas += " R: [" + respuestaTMP + literal + "<sup>" + exponenteTruncado + "</sup>" + "]";
						} else{
							problemas += " R: [" + respuestaTMP + "]";
						}
					}
					problemas += "<br>";
					suma = 0;
				}
			}

		} else{
			// Dos literales
			var seleccionLiteralPar = aleatorio(0,literalesPar.length-1);
			var literal1 = literalesPar[seleccionLiteralPar][0];
			var literal2 = literalesPar[seleccionLiteralPar][1];
			var expAleatorio_1 = truncarExponente(aleatorio(expMin, expMax));
			var expAleatorio_2 = truncarExponente(aleatorio(expMin, expMax));


			for(var j=0; j<nTerminos; j++){
				var nAleatorio = aleatorio(nMin, nMax);

				if (nAleatorio == 0) {
					j--;
				} else{
					if (j==0) {
						tmp = truncarNumero(nAleatorio);
					} else{
						tmp = truncarNumeroCuerpo(nAleatorio);
					}

					problemas += tmp + literal1 + "<sup>" + expAleatorio_1 + "</sup>" + literal2 + "<sup>" + expAleatorio_2 + "</sup>";
				}

				suma += nAleatorio;

				// Resultados
				if (j == nTerminos-1) {
					var respuestaTMP = truncarNumero(suma);

					if (respuestas) {
						if (suma != 0) {
							problemas += " R: [" + respuestaTMP + literal1 + "<sup>" + expAleatorio_1 + "</sup>" + literal2 + "<sup>" + expAleatorio_2 + "</sup>" + "]";
						} else{
							problemas += " R: [" + respuestaTMP + "]";
						}
					}
					problemas += "<br>";
					suma = 0;
				}
			}
		}
	}

	document.getElementById("resultado").innerHTML = problemas;
}
