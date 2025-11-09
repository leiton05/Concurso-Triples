import Util from "./util.js";

const input = document.getElementById("concurso-input");
const btnProcesar = document.getElementById("btn-procesar");
const btnLimpiar = document.getElementById("btn-limpiar");
const btnCargarEjemplo = document.getElementById("btn-ejemplo");
const salida = document.getElementById("salida-texto");
const ejemploPrueba = 'Ana,Beto,Cami,Diego,Elena,Fer,Gabo,Hugo,Ivan,Juli--Ana:0 1 1 0 1*Beto:1 0 1 1 0*Cami:1 1 0 1 1*Diego:0 1 1 0 1*Elena:1 1 1 1 1*Fer:1 0 0 1 0*Gabo:1 1 0 0 1*Hugo:0 1 1 1 1*Ivan:1 1 1 0 0*Juli:1 1 0 1 1*Ana:1 0 1 1 1*Beto:0 1 0 1 1*Cami:1 1 1 0 1*Diego:0 1 1 1 0*Elena:1 1 0 1 0*Fer:0 1 1 0 1*Gabo:1 0 1 1 0*Hugo:1 1 1 1 0*Ivan:0 1 1 0 1*Juli:1 0 1 1 0';

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
