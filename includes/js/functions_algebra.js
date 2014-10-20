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

			problemas += " R: [" + limitarDecimales(resultadoEjercicio) + "]"; // Mostrando las respuestas
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
				problemas += " R: [" + limitarDecimales(resultadoEjercicio) + "]";
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
				problemas += " R: [" + truncarNumero(suma);

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

				problemas += " R: [" + truncarNumero(numTmp);

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
				problemas += " R: [";
				
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




