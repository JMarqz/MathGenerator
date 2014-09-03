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
					problemas += tmp + " (R: " + resultadoEjercicio + ")" + "<br>";
				} else{
					problemas += tmp + "<br>";
				}
			}
		}
		resultadoEjercicio = 0;
	};
	
	//document.getElementById("resultado").value = problemas;
	$("#resultado").append(problemas);
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
					problemas += tmp + " (R: " + resultadoEjercicio + ")" + "<br>";
				} else{
					problemas += tmp + "<br>";
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