// GENERAR NÚMEROS ALEATORIOS
function aleatorio(nMax,nMin){ 
   	numPosibilidades = nMax - nMin; 
   	aleat = Math.random() * numPosibilidades;
   	aleat = Math.round(aleat);
   	
   	return parseInt(nMin) + aleat;
}


// COPIAR
function copiar(valor){
	var text = document.getElementById(valor).value;
	window.plugins.copy(text);
}