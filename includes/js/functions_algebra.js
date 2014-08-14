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

	// Mostrando las respuestas
	for(var i=0; i<arrayExpFijo.length; i++){
		var tmp = arrayExpFijo[i];
		if (respuestas) {
			problemas += tmp + "^" + nExp + "R: (" + Math.pow(tmp,nExp) + ")";
		} else{
			problemas += tmp + "^" + nExp;
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
		if (respuestas) {
			var expVarTmp = aleatorio(nExpMax,nExpMin);
			var resultadoEjercicio = Math.pow(tmp,expVarTmp);

			problemas += tmp + "^" + expVarTmp + "R: (" + resultadoEjercicio + ")";
		} else{
			problemas += tmp + "^" + expVarTmp;
		}
		problemas += "\n";
	}

	document.getElementById("resultado").value = problemas;
}






