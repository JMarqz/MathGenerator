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

		if (respuestas) { // Mostrando respuestas
			for(var j=tmp; j>=1; j--){
				resultadoEjercicio *= j; // Generando respuesta
			}
			problemas += tmp + "!" + " R: [" + resultadoEjercicio + "]"; // Mostrando las respuestas
		} else{
			problemas += tmp + "!";
		}
		problemas += "<br>";
		resultadoEjercicio = 1;
	}

	document.getElementById("resultado").innerHTML = problemas;
}


// EXPONENCIALES EXPONENTE FIJO
function exponenciales(){
	var nEjercicios = document.getElementById("ejercicios").value;
	var nMin = document.getElementById("base-min").value;
	var nMax = document.getElementById("base-max").value;
	var respuestas = $("#respuestas").is(":checked");
	var tipoExp = $('input[name=tipo-exponentes]:checked').val();
	
	var problemas = "";
	var resultadoEjercicio = 1;
	var exp = 1;

	// Generando el número de ejercicios
	for(var i=0; i<nEjercicios; i++){
		var tmp = aleatorio(nMax,nMin);
		
		// Tipo de exponentes
		if (tipoExp == 0) {
			exp = document.getElementById("exponente-fijo").value;
		} else{
			var nExpMin = document.getElementById("exp-min").value;
			var nExpMax = document.getElementById("exp-max").value;
			exp = aleatorio(nExpMax,nExpMin);
		}

		resultadoEjercicio = Math.pow(tmp,exp);

		if (respuestas) {
			problemas += tmp + "<sup>" + exp + "</sup>" + " R: [" + resultadoEjercicio + "]";
		} else{
			problemas += tmp + "<sup>" + exp + "</sup>";
		}
		problemas += "<br>";
	}
	
	document.getElementById("resultado").innerHTML = problemas;
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

	var literales = ['a', 'b', 'p', 'r', 'u', 'v', 'x', 'y'];
	var literalesPar = [
		['a', 'b'],		
		['p', 'r'],
		['u', 'v'],
		['x', 'y']
	];

	var problemas = "";
	var suma = 0;


	// Generar los ejercicios
	for(var i=0; i<nEjercicios; i++){
		
		// Elegir las literales para todo el ejercicio
		var literalesElegida = [];
		var seleccionAleatoria = aleatorio(0, literales.length-1);
		var seleccionAleatoriaPar = aleatorio(0, literalesPar.length-1);

		for(var l=0; l<nLiterales; l++){
			var literalTmp = "";

			switch(nLiterales){
				case 1: literalTmp = literales[seleccionAleatoria]; break;
				default: literalTmp = literalesPar[seleccionAleatoriaPar][l];
			}
			
			literalesElegida[literalesElegida.length] = literalTmp;
		}
		

		// Crear exponentes para todo el ejercicio
		var exponentesElegidos = [];

		for(var e=0; e<nLiterales; e++){
			var expTmp = "";

			if (valTipoExp == 0){
				expTmp = document.getElementById("exponente").value;
			}else{
				var expMax = document.getElementById("rango-exp-max").value;
				var expMin = document.getElementById("rango-exp-min").value;
				var expAleatorio = aleatorio(expMin, expMax);
				expTmp = expAleatorio;
			}

			exponentesElegidos[exponentesElegidos.length] = parseInt(expTmp);
		}

		// Crear los términos
		for(var j=0; j<nTerminos; j++){
			var nAleatorio = aleatorio(nMin, nMax);
			var numTruncado = "";

			if (nAleatorio == 0) {
				j--; // Eliminar los 0's de los problemas
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
					problemas += literalesElegida[k] + "<sup>" + truncarExponente(exponentesElegidos[k]) + "</sup>";
				}
			}
		}

		// Resultados 
		if (respuestas) {
			problemas += " R: [" + truncarNumero(suma);

			// Agregar Literales y exponentes a las respuestas
			if (suma != 0) {
				for(var k=0; k<nLiterales; k++){
					problemas += literalesElegida[k] + "<sup>" + truncarExponente(exponentesElegidos[k]) + "</sup>";
				}
			}

			problemas += "]";
		};

		problemas += "<br>";
		suma = 0;
	}

	document.getElementById("resultado").innerHTML = problemas;
}


// EXPRESIONES ALGEBRAICAS EXPONENTE FIJO
function multiplicacionesAlgebraicas(){
	// Variables generales
	var nEjercicios = document.getElementById("nEjercicios").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerminos = document.getElementById("nTerminos").value;
	var valTipoExp = $('input[name=exponentes]:checked').val();
	var respuestas = $("#respuestas").is(":checked");
	var nLiterales = document.getElementById("nLiterales").value;

	var literales = ['a', 'b', 'p', 'r', 'u', 'v', 'x', 'y'];
	var literalesPar = [
		['a', 'b'],		
		['p', 'r'],
		['u', 'v'],
		['x', 'y']
	];

	var problemas = "";
	var numTruncado = "";
	var resultado = 1;
	

	// Generar los ejercicios
	for(var i=0; i<nEjercicios; i++){
		var sumaExponentes = [0,0];

		// Elegir las literales para todo el ejercicio
		var literalesElegida = [];
		var seleccionAleatoria = aleatorio(0, literales.length-1);
		var seleccionAleatoriaPar = aleatorio(0, literalesPar.length-1);

		for(var l=0; l<nLiterales; l++){
			var literalTmp = "";

			switch(nLiterales){
				case 1: literalTmp = literales[seleccionAleatoria]; break;
				default: literalTmp = literalesPar[seleccionAleatoriaPar][l];
			}
			
			literalesElegida[literalesElegida.length] = literalTmp;
		}

		// Crear los términos
		for(var j=0; j<nTerminos; j++){
			var nAleatorio = aleatorio(nMin, nMax);

			if (nAleatorio == 0) {
				j--; // Eliminar los 0's de los problemas
			} else{
				numTruncado = truncarNumero(nAleatorio);

				problemas += numTruncado;
				resultado *= nAleatorio;

				// Agregar Literales y exponentes
				for(var k=0; k<nLiterales; k++){
					problemas += literalesElegida[k];

					var expTmp = 0;
					if (valTipoExp == 0) {
						expTmp = document.getElementById("exponente").value;
					} else{
						var expMax = document.getElementById("rango-exp-max").value;
						var expMin = document.getElementById("rango-exp-min").value;
						var expAleatorio = aleatorio(expMin, expMax);
						expTmp = expAleatorio;
					}

					problemas += "<sup>" + truncarExponente(parseInt(expTmp)) + "</sup>";
					sumaExponentes[k] += parseInt(expTmp);
				}

				if(j<nTerminos-1){
					problemas += "*";
				}
			}
		}

		// Resultados 
		if (respuestas) {
			problemas += " R: [" + truncarNumero(resultado);

			// Agregar Literales y exponentes a las respuestas
			if (resultado != 0) {
				for(var k=0; k<nLiterales; k++){
					problemas += literalesElegida[k] + "<sup>" + sumaExponentes[k] + "</sup>"
				}
			}

			problemas += "]";
		};

		problemas += "<br>";
		resultado = 1;
	}

	document.getElementById("resultado").innerHTML = problemas;
}