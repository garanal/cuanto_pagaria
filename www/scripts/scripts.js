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
  if (!validarCampo(valor, "el valor del crédito")) return;
  if (!validarCampo(cuotas, "el número de cuotas")) return;  
  if (!validarCampo(tasa, "la tasa de interés")) return;    
  if (cuotas == 1) {
  	window.alert("Las compras a una sola cuota no generan intereses");
  	return;
  }
  
  // Quita los separadores del valor
  var posSeparador = valor.indexOf(",");
  while (posSeparador >= 0) {
	valor = valor.replace(",","");
	posSeparador = valor.indexOf(",");
  }
  
  
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
function validarCampo(dato, nombre) {
  if (dato.trim() == "" || parseInt(dato) == 0) {
  	window.alert("Debes ingresar " + nombre);
  	return false;
  }
  return true;
}

/*
// Fecha: Marzo de 2018
// Autor: Giovany Arana Loaiza
// Correo: garanal78@gmail.com
//
// Función que toma un número y le da formato insertando en tiempo real 
// cifras cada tres cifras separadores cada tres cifras. Se creó pensando
// en dar formato a campos numéricos en formularios web para que se vea
// el formato del número mientras el usuario digita en el y de esa manera
// se más fácil leer el valor.
//
// Es importante tener en cuenta que para usar el número, luego de que el
// haya terminado de ingresarlo, deben quitarse los separadores convertir
// la cadena en un valor numérico.
// 
// La función toma dos parámetros:
// 	- valor: Es el número al que se le desea dar formato.
//	- longMaxima: Es la longitud máxima que se desea tener incluyendo
//    dígitos y separadores. Usando 0 se omite este límite.
*/
function formatearValor(valor, longMaxima) {

	var longValor = valor.length;
	
	// Valida la longitud máxima del número incluyendo los separadores.
	// Si el parámetro longMaxima es igual a cero se omite la validación.
	if (longMaxima > 0) {
		if (longValor > longMaxima) {
			window.alert("El valor es demasiado alto.");
			return valor.substring(0, valor.length - 1);
		}			
	}
	
	// Retira los separadores que tenga el número tomado del formulario.
	var posSeparador = valor.indexOf(",");
	while (posSeparador >= 0) {
		valor = valor.replace(",","");
		posSeparador = valor.indexOf(",");
	}
	
	// Se toma nuevamente la longitud, luego de quitar los separadores
	longValor = valor.length;
	
	// No hace nada si el número es menor o igual a tres dígitos
	if (longValor <= 3) return valor;
	
	// Se calculan los grupos de tres cifras que tiene el número
	var gruposDeTres = Math.trunc(longValor / 3);
	if (((longValor / 3) - gruposDeTres) > 0) gruposDeTres++;
	
	// Pone los separadores al número
	var separadores = 0;
	var posicion = -1;
	while (separadores < gruposDeTres - 1) {
		posicion += 4;
		valor = valor.substring(0, valor.length - posicion) 
			+ "," 
			+ valor.substring(valor.length - posicion, valor.length)
		separadores++;
	};
	
	// Si no hay que aplicar más separadores termina la función
	return valor;
}

// Esta función toma el número del campo de entrada en el formulario
// y lo remplaza por el número con separadores utilizando la función
// formatearValor()
function darFormato() {
	// Se toma el número desde el formulario
	var numSinFormato = document.getElementById("valor_credito").value;
	// Se valida que el valor no sea nulo ni vacío
	if (numSinFormato == null || numSinFormato == "") return;
	// Se da formato al número
	var numConFormato = formatearValor(numSinFormato, 15);
	// Se regresa el número al formulario, ya con separadores
	document.getElementById("valor_credito").value = numConFormato;
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