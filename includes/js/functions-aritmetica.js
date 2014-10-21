// SUMAS
function sumas(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Generar Sumas
	var problemas = "";
	
	for (var i=0; i<nEjercicios; i++) {
		var resultadoEjercicio = 0;

		for(var j=0; j<nTerm; j++){
			var tmp = aleatorio(nMax,nMin);
			resultadoEjercicio += tmp;

			problemas += tmp;

			if (j<nTerm-1) {
				problemas += "+";
			} else{
				if (respuestas) {
					var resultadoTmp = numeral(resultadoEjercicio).format('0,0');
					problemas += " R: [" + resultadoTmp + "]";
				}

				problemas += "<br>";
			}
		}
	};
	
	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
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
		var randomNum1 = 0;

		for(var j=0; j<2; j++){
			switch(tipoResultados){
				case '1':
					// Todos los resultados
					randomNum1 = aleatorio(nMax,nMin);
					matrizRestas[i].push(randomNum1);
				break;
				case '2':
					// Resultados positivos incluyendo 0
					if (j==0) {
						randomNum1 = aleatorio(nMax,nMin);
						matrizRestas[i].push(randomNum1);
					} else{
						randomNum1 = aleatorio(matrizRestas[i][0],nMin);
						matrizRestas[i].push(randomNum1);
					}
				break;
				case '3':
					// Resultados positivos excluyendo 0
					if (j==0) {
						randomNum1 = aleatorio(nMax,nMin);
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
						randomNum1 = aleatorio(nMax-1,nMin);
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

			problemas += tmp;

			if (j<matrizRestas[i].length-1) {
				problemas += " - ";
			} else{
				if (respuestas) {
					problemas += " R: [" + resultadoEjercicio + "]";
				}
				
				problemas += "<br>";
			}
		}
		resultadoEjercicio = 1;
	};
	
	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
}


// MULTIPLICACIONES
function multiplicaciones(){
	var nEjercicios = document.getElementById("number").value;
	var nMax = document.getElementById("rango-max").value;
	var nMin = document.getElementById("rango-min").value;
	var nTerm = document.getElementById("terminos").value;
	var respuestas = $("#respuestas").is(":checked");

	// Generar Multiplicaciones
	var problemas = "";
	var resultadoEjercicio = 1;
	
	for (var i=0; i<nEjercicios; i++) {
		for(var j=0; j<nTerm; j++){
			var tmp = aleatorio(nMax,nMin);

			if (tmp == 0) {
				j--; // Eliminar los 0's del problema
				continue;
			}

			resultadoEjercicio *= tmp;

			problemas += tmp;

			if (j<nTerm-1) {
				problemas += "*";
			} else{
				if (respuestas) {
					problemas += " R: [" + limitarDecimales(resultadoTmp) + "]";
				}
			}
		}

		problemas += "<br>";
		resultadoEjercicio = 1;
	};
	
	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
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
			var randomNum = aleatorio(nMax,nMin);

			if (randomNum == 0) {
				j--; // Eliminar 0's de los problemas
				continue;
			}

			if (resultadosEnteros) {
				if (j==0) {
					matrizDivisiones[i].push(randomNum);
				} else{
					if (matrizDivisiones[i][0]%randomNum == 0) {
						matrizDivisiones[i].push(randomNum);
					} else{
						j--;
					}					
				}
			} else{
				//Resultados con decimales
				matrizDivisiones[i].push(randomNum);
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
			}

			problemas += tmp;

			if (j<matrizDivisiones[i].length-1) {
				problemas += " / ";
			} else{
				if (respuestas) {
					problemas += " R: [" + limitarDecimales(resultadoEjercicio) + "]";
				}

				problemas += "<br>";
			}
		}
		resultadoEjercicio = 1;
	};
	
	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
}