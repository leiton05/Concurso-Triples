🏀 Concurso de Triples - Frontend Dinámico

Aplicativo web desarrollado como parte de la tarea final del curso Estructuras de Datos y Algoritmos 1 (EDyA1). Simula el Concurso de Triples de la NBA, procesando los intentos de varios jugadores y generando un ranking dinámico según puntaje y cantidad de money balls encestados.


🚀 Tecnologías utilizadas

- JavaScript (lógica y procesamiento)
- HTML (estructura del frontend)
- CSS (estilos visuales)
- Node.js (entorno de desarrollo local, sin backend)


📂 Estructura del proyecto

CONCURSOTRIPLES/
├── Public/
│   ├── index.html
│   └── Styles/
│       └── style.css
├── Scripts/
│   ├── util.js              # Función resolverConcursoTriples(concurso)
│   ├── ui.js                # Renderizado dinámico en el DOM
│   └── main.js              # Controlador de eventos y flujo
├── package.json
└── TareaFinal_EDyA1_2053_3.pdf


📌 Función principal

La lógica del concurso está implementada en util.js mediante la función:

function resolverConcursoTriples(concurso) { ... }
Esta función recibe una cadena con los datos del concurso y retorna el ranking ordenado de jugadores en formato:
- Michael 20p 4m
- Charles 18p 4m
- Scotty 18p 3m


🧪 Ejecución

- Abrir index.html en el navegador.
- Ingresar la cadena del concurso en el campo correspondiente.
- Presionar el botón para evaluar y visualizar el ranking dinámico.


📄 Entrega

Incluye:
- Documento PDF con resumen, pseudocódigo y análisis de complejidad.
- Aplicativo web funcional con datos de prueba.
- Código modular y sin errores de compilación.
