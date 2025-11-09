import Util from "./util.js";

const input = document.getElementById("concurso-input");
const btnProcesar = document.getElementById("btn-procesar");
const btnLimpiar = document.getElementById("btn-limpiar");
const btnCargarEjemplo = document.getElementById("btn-ejemplo");
const salida = document.getElementById("salida-texto");
const ejemploPrueba = 'Jordan,Kobe,LeBron--Jordan:1 0 1 1 0*Jordan:0 1 1 0 1*Jordan:1 1 0 1 1*Jordan:0 1 1 0 1*Jordan:1 1 1 1 1*Kobe:1 0 1 0 1*Kobe:1 1 1 1 1*Kobe:0 0 1 0 1*Kobe:1 1 1 0 0*Kobe:0 1 0 1 1*LeBron:1 1 0 1 0*LeBron:1 0 1 1 1*LeBron:0 1 1 0 1*LeBron:1 1 1 1 0*LeBron:0 0 1 1 1';

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
