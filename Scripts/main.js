document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('concurso-input');
    const btnProcesar = document.getElementById('btn-procesar');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const salida = document.getElementById('salida-texto');

    const ejemploPrueba = "TEXTO DE PRUEBA";

    btnProcesar.addEventListener('click', () => {
        salida.textContent = ejemploPrueba
    });

    btnLimpiar.addEventListener('click', () => {
        input.value = '';
        salida.textContent = '';
    });
});