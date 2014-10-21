// CONVERSIÓN DE GRADOS A RADIANES
function grados_radianes(){
	var nEjercicios = document.getElementById("ejercicios").value;
	var nMax = document.getElementById("base-max").value;
	var nMin = document.getElementById("base-min").value;
	var respuestas = $("#respuestas").is(":checked");

	var problemas = "";

	for(var i=0; i<nEjercicios; i++){
		var grados = aleatorio(nMax,nMin);

		problemas += grados + "˚";

		if (respuestas) {
			var radianes = new Fraction(grados, 180);

			problemas += " R: [";

			if (radianes != 1) {
				 problemas += radianes; // QUE ONDA CON LOS 0's
			}

			problemas += "π]";
		}

		problemas += "<br>";
	}

	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
}


// CONVERSIÓN DE GRADOS A RADIANES
function radianes_grados(){
	var nEjercicios = document.getElementById("ejercicios").value;
	var nMax = document.getElementById("base-max").value;
	var nMin = document.getElementById("base-min").value;
	var respuestas = $("#respuestas").is(":checked");

	var problemas = "";

	for(var i=0; i<nEjercicios; i++){
		/////////////////////////////////////////////////////////
		// Crear fracción que su RESULTADO esté entre nMin y nMax
		//var radianNumerador = aleatorio(180,1);
		//var radianDenominador = aleatorio(radianNumerador * nMax,0);
		var radianDenominador = aleatorio(180,nMin);
		var radianNumerador = aleatorio(radianDenominador * nMax,nMin);
		// Crear fracción que su RESULTADO esté entre nMin y nMax
		/////////////////////////////////////////////////////////

		console.log("numerador: " + radianNumerador);
		console.log("denominator: " + radianDenominador);

		if (radianDenominador == 0) {
			i--; // Evitar fracciones dividadas por 0
			// || radianDenominador < radianNumerador*6
			continue;
		}

		var radianes = new Fraction(radianNumerador, radianDenominador);

		if (radianes != 1) {
			problemas += radianes;
		}

		if (radianes != 0) {
			problemas += "π";
		}

		problemas += " rad";

		if (respuestas) {
			var grados = radianes.multiply(180);
			var resultado = grados.numerator / grados.denominator;
			resultado = numeral(resultado).format('0,0.[00]');

			problemas += " R: [" + resultado + "˚]";
		}

		problemas += "<br>";
	}

	document.getElementById("resultado").innerHTML = problemas;
	cambiarColorBarraEstado();
}










