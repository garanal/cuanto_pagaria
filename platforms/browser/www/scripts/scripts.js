var valor;
var cuotas;
var tasa;
var interes;
var valorTotal;

function revisar() {
  // Obtiene los valores del formulario
  valor = document.getElementById("valor_credito").value; 
  cuotas = document.getElementById("cantidad_cuotas").value;
  tasa = document.getElementById("tasa_interes").value;
  
  // Valida los valores del formulario
  if (!validar(valor, "el valor del crédito")) return;
  if (!validar(cuotas, "el número de cuotas")) return;  
  if (!validar(tasa, "la tasa de interés")) return;  
  
  // Arma el URL de la página resultado con las variables
  pagina = "resultado.html?";
  pagina += "valor=" + valor;
  pagina += "&cuotas=" + cuotas;
  pagina += "&tasa=" + tasa;
  pagina = pagina.substring(0,pagina.length);
  
  // Redirecciona a la página de resultado
  location.href=pagina;
}

// Valida que dato no esté vacío ni valga 0
function validar(dato, nombre) {
  if (dato.trim() == "" || parseInt(dato) == 0) {
  	window.alert("Debes ingresar " + nombre);
  	return false;
  }
  return true;
}

function tomarValores() {
	// Toma los valores pasados por la página index
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("&");
	for (i=0; i<arrVariables.length; i++) {
	  arrVariableActual = arrVariables[i].split("=");
	  if (isNaN(parseFloat(arrVariableActual[1])))
		eval(arrVariableActual[0]+"='"+unescape(arrVariableActual[1])+"';");
	  else
		eval(arrVariableActual[0]+"="+arrVariableActual[1]+";");
	}	
}

function calcular() {
	// Toma los valores ingresados en la página index
	tomarValores();
	
	// Abono a capital por cada cuota
	var capitalCuota = valor / cuotas;
	
	// Valor del interés a pagar
	interes = 0;
	for (i = 1; i <= cuotas; i++) {
		interes += (valor - (capitalCuota * (i-1))) * (tasa / 100);
	}
	
	// Valor total a pagar al final
	valorTotal = valor + interes;	
}

function limpiar() {
  // Limpia el formulario
  document.getElementById("valor_credito").value = ""; 
  document.getElementById("cantidad_cuotas").value = "";
  document.getElementById("tasa_interes").value = "";
}

function regresar() {
	window.history.back();
}

function formatearMiles(numero) {
	
	var numTexto = numero.toString();
	//document.write("numTexto = " + numTexto + "<br>");	 
	var decimales = "";
	var numFinal = "";
	
	// Busca el punto decimal en el texto
	var ubicacionPunto = numTexto.indexOf(".");
	
	// Si hay punto decimal guarda dos decimales y deja solo la parte entera
	if (ubicacionPunto >= 0) {
		decimales = numTexto.substr(ubicacionPunto, 3);
		numTexto = numTexto.substring(0, ubicacionPunto);
	} else {
		decimales = ".00";
	}
	
	//document.write("numTexto = " + numTexto + "<br>");	 
	
	var longNumero = numTexto.length;
	
	// Si la parte entera tiene menos de tres cifras retorna el número adicionando
	// los decimales si los hay.
	if (longNumero <= 3) {
		return numTexto + decimales;
	}
	
	// Da formato al número con separadores de miles
	do {
		numFinal = "," + numTexto.substr(longNumero - 3, 3) + numFinal;
		longNumero -= 3;
	} while (longNumero >= 3);	
	
	// Si quedo parte del número lo adiciona. Si no, quita la coma que quedó al inicio
	if (longNumero > 0) {
		numFinal = numTexto.substr(0, longNumero) + numFinal;
	} else {
		numFinal = numFinal.substring(1, numFinal.length);
	}
	
	return numFinal + decimales;

}