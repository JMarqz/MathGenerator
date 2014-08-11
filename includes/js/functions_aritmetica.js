// SUMAS
function sumas(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Crear Array con números aleatorios
	var sumas = crearArray(nEjercicios, nTerm, nMax, nMin);
	/*
	var sumas = new Array();

	for(var i=0; i<nEjercicios; i++){
		sumas.push(new Array());

		for(var j=0; j<nTerm; j++){
			var randomNum1 = aleatorio(nMax,nMin);

			sumas[i].push(randomNum1);
		}
	}
	*/

	// Generar Sumas
	var problemasSumas = "";
	var resultadoEjercicio = 0;
	
	for (var i=0; i<sumas.length; i++) {
		for(var j=0; j<sumas[i].length; j++){
			var tmp = sumas[i][j];
			resultadoEjercicio += tmp;

			if (j<sumas[i].length-1) {
				// Sin respuestas
				problemasSumas += tmp + " + ";
			} else{
				if (respuestas) {
					// Con respuestas
					problemasSumas += tmp + " (R: " + resultadoEjercicio + ")" + "\n";
				} else{
					problemasSumas += tmp + "\n";
				}
			}
		}
		resultadoEjercicio = 0;
	};
	
	document.getElementById("resultado").value = problemasSumas;
}

