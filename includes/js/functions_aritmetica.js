// SUMA
function suma(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Crear Array con números aleatorios
	var sumas = new Array();

	for(var i=0; i<nEjercicios; i++){
		sumas.push(new Array());

		for(var j=0; j<nTerm; j++){
			var randomNum1 = aleatorio(nMax,nMin);

			sumas[i].push(randomNum1);
		}
	}

	// Generar Sumas
	var arraySuma = "";
	var resultado = 0;
	
	for (var i=0; i<sumas.length; i++) {
		for(var j=0; j<sumas[i].length; j++){
			var tmp = sumas[i][j];
			resultado += tmp;

			if (j<sumas[i].length-1) {
				// Sin respuestas
				arraySuma += tmp + " + ";
			} else{
				if (respuestas) {
					// Con respuestas
					arraySuma += tmp + " (R: " + resultado + ")" + "<br>";
				} else{
					arraySuma += tmp + "<br>";
				}
			}
		}
	};

	var convertidoHTML = encodeURIComponent(arraySuma);
	var desplegarHTML = decodeURIComponent(convertirHTML);

	document.getElementById("resultado").value = desplegarHTML;
}