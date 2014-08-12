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


// MULTIPLICACIONES
function multiplicaciones(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Crear Array con números aleatorios
	var matrizMultiplicaciones = crearArray(nEjercicios, nTerm, nMax, nMin);

	// Generar Sumas
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

