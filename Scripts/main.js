import Util from "./util.js";

const input = document.getElementById("concurso-input");
const btnProcesar = document.getElementById("btn-procesar");
const btnLimpiar = document.getElementById("btn-limpiar");
const btnCargarEjemplo = document.getElementById("btn-ejemplo");
const salida = document.getElementById("salida-texto");
const ejemploPrueba = 'Jordan,Kobe,LeBron,Curry,Durant,Giannis,Luka,Embiid--Jordan:1 0 1 1 0*Jordan:0 1 1 0 1*Jordan:1 1 0 1 1*Kobe:0 1 1 0 1*Kobe:1 1 1 1 1*Kobe:0 0 1 0 1*LeBron:1 0 1 1 0*LeBron:1 1 1 0 1*LeBron:0 1 0 1 1*Curry:1 1 0 1 0*Curry:1 0 1 1 1*Curry:0 1 1 1 1*Durant:1 1 1 1 0*Durant:0 0 1 1 1*Durant:1 1 0 1 1*Giannis:0 1 1 0 1*Giannis:1 1 1 1 1*Giannis:1 0 1 1 0*Luka:0 1 1 0 1*Luka:1 1 0 1 1*Luka:1 1 1 1 1*Embiid:0 1 1 1 0*Embiid:1 0 1 1 1*Embiid:1 1 1 1 0*Jordan:0 1 1 0 1*Kobe:1 0 1 0 1*LeBron:1 1 0 1 1*Curry:0 1 1 1 1*Durant:1 1 1 0 0*Giannis:0 1 1 1 0*Luka:1 0 1 1 1*Embiid:0 0 1 1 1*Jordan:1 1 0 1 1*Kobe:1 1 1 0 1*LeBron:1 0 1 1 0*Curry:1 1 1 1 0*Durant:0 1 1 1 1*Giannis:1 0 0 1 1*Luka:0 1 1 0 1*Embiid:1 1 0 1 0*Jordan:1 0 1 1 1*Kobe:1 1 1 1 1*LeBron:0 1 1 0 1*Curry:1 0 1 1 1*Durant:0 1 0 1 1*Giannis:1 1 1 0 1*Luka:0 1 1 1 0*Embiid:1 0 1 0 1*Jordan:1 1 0 1 1*Kobe:0 0 1 1 1*LeBron:1 1 1 0 0*Curry:0 1 1 1 1*Durant:1 0 1 1 1*Giannis:1 1 0 1 0*Luka:0 1 0 1 1*Embiid:1 1 1 1 1'

btnProcesar.addEventListener("click", procesarConcurso);
btnLimpiar.addEventListener("click", limpiarSalida);
btnCargarEjemplo.addEventListener("click", cargarEjemplo);

function cargarEjemplo() {
    input.value = ejemploPrueba;
}

function limpiarSalida() {
    input.value = "";
    salida.textContent = "";
}

function procesarConcurso() {
    const resultado = Util.resolverConcursoTriples(input.value);
    salida.textContent = resultado;
}
