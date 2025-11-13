import Algoritmos from "./algoritmos.js";

export default class Util {
  static resolverConcursoTriples(concurso) {
    /**
     * Valida que la entrada del programa, el concurso, sea un string y que no sea nulo
     * En caso de serlo, salta un mensaje de error que se coloca como el texto de salida
     */
    if (!concurso || typeof concurso !== "string") {
      return "Ingresa una cadena válida con el formato del concurso.";
    }

    try {
      /**
       * Aquí se separa la cadena con el metodo ParsearConcurso, lo que devuelve un objeto separado
       * en jugadores y rondas
       */
      const { jugadores, rondas } = Util.parsearConcurso(concurso);

      /**
       * Valida las restricciones del concurso para saber si es un concurso valido
       */
      Util.validarConcurso(jugadores, rondas);

      // Calcular puntos y money balls
      const estadisticas = Util.calcularEstadisticas(rondas);


      // Convertir a arreglo para ordenar
      /**
       * Dichas estadisticas se procesan como un map y en este caso se convierten en un arreglo que contiene tanto
       * la info del jugador como sus estadisticas
       */
      const resultados = Array.from(estadisticas.entries()).map(
        ([player, data]) => ({
          player,
          points: data.points,
          moneyBalls: data.moneyBalls,
        })
      );
      // Función de comparación para ordenar por edad
      /** 
       * Basicamente aquí se establece el criterio por el cual se va a comparar, en el metodo mergeObjetos 
       * se revisa si el campo de comparar da un numero mayor o igual que cero if (compare(left[i], right[j]) <= 0)
       * esto lo hace restando las edades de cada uno de las mitades, dando como resultado 3 posibles casos
       * cuando la resta da negativo, da cero, o da positivo
      */
      const comparar = (a, b) => {
        /** Si los puntos de a y b son distintos, devuelvo la resta de b -a
        * Esto viene siendo de mayor a menor
        * El valor es retornado y se termina la comparativa
        */
        if (b.points !== a.points) return b.points - a.points;

        /**
         * En caso de que se salte el primer If, lo cual significa que 
         * los puntos fueron iguales, entonces se compara por las moneyballs y lo filtra de mayor a menor
         */
        if (b.moneyBalls !== a.moneyBalls)
          return b.moneyBalls - a.moneyBalls;
        /**
         * El localCompare compara las cadenas del nombre del jugador y las ordena alfabeticamente 
         * para el desempate final
         */
        return a.player.localeCompare(b.player);
      };

      // Ordenar con mergeSortObjetos (de tu clase Algoritmos)
      /**
       * Se ordena el arreglo de objetos, dando como resultado un arreglo
       * que cumple con los criterios impuestos en comparar
       */
      const ordenados = Algoritmos.mergeSortObjetos(resultados, comparar);

      // Formatear salida
      return Util.formatearResultados(ordenados);

      // Agarra algún error en caso de presentarse y lo lanza en consola
    } catch (err) {
      return `Error: ${err.message}`;
    }
  }


//-----------------------------------------------------------------------------------

  /**
   * Divide la cadena de entrada en jugadores y rondas
   * Formato: "J1,J2,...--J1:0 1 1 0 1*J2:1 0 1 0 1*..."
   */
  static parsearConcurso(cadena) {
    /**
     * Separa la cadena recibida cada que encuentra --
     */
    const partes = cadena.split("--");
    console.log(partes);
    /**
     * Valida que las partes en que se dividió la cadena sean exactamente 2
     * pues en la logica del concurso de triples solo puede haber un --
     * que separe los jugadores de las puntuaciones
     */
    if (partes.length !== 2) {
      throw new Error('Debe haber exactamente un separador "--"');
    }

    /**
     * Crea un objeto de la primera parte del arreglo que vienen siendo los jugadores
     * los cuales se separan por , entonces queda cada jugador inicial como un espacio
     * del arreglo
     */
    const jugadores = partes[0]
    // Aquí se separa la cadena por la coma ","
      .split(",")
      /**
       * El map va por cada posición del arreglo aplicando la funcion .trim()
       * que lo que hace es quitar los espacios vacios en el nombre
       */
      .map((j) => j.trim())

      /**
       *  Despues de haberles quitado los espacios vacios
       * los filtra por tamaño para evitar que se presenten espacios que están vacios
       */
      .filter((j) => j.length > 0);
    console.log(jugadores)

    /**
     * En caso de no se encuentre jugadores, el sistema lanza un error
     * aclarando que no se encontraron jugadores
     * Esto lo hace midiendo el largo de los jugadores iniciales y lo compara con 0, ya que 
     * en caso de ser cero es que el arreglo está vacio
     */
    if (jugadores.length === 0) {
      throw new Error("No se encontraron jugadores en la primera parte.");
    }

    /**
     * La segunda parte que son las rondas, las separa mediante los * que indican
     * la separación entre las puntuaciones individuales de cierto jugador con sus
     * dichos puntos
     */
    const rondas = partes[1]
    // Aquí se separa la cadena por los asteriscos "*"
      .split("*")
      /**
       * El map va por cada posición del arreglo aplicando la funcion .trim()
       * que lo que hace es quitar los espacios vacios en la ronda
       */
      .map((r) => r.trim())
      /**
       *  Despues de haberles quitado los espacios vacios
       * los filtra por tamaño para evitar que se presenten espacios que están vacios
       */
      .filter((r) => r.length > 0)
      /**
       * Basicamente por cada parte del arreglo resultante, va separando dicha parte en dos
       * una que va antes del : y otra que va despues, que quedan guardadas en [nombre, tirosStr] respectivamente
       */
      .map((bloque) => {
        const [nombre, tirosStr] = bloque.split(":");
        // Valida que no falte dicho apartado, sino tira error
        if (!nombre || !tirosStr) {
          throw new Error(`Formato inválido en el bloque: "${bloque}"`);
        }

        const tiros = tirosStr
        /**
         * Basicamente a tirosStr se le quitan los espacios del inicio y del final con el .trim()
         */
          .trim()
          /**
           * A lo cual luego se separan los datos donde hayan uno o mas espacios
           * esto se hace con el .split(/\s+/)
           * por ejemplo, si hay una cadena así "1 0         1 0    1", el output
           * viene siendo algo como ["1", "0", "1", "0", "1"]
           */
          .split(/\s+/)
          /**
           * Luego se mapea cada resultado del nuevo arreglo, de tal manera que
           * se convierte cada valor de la cadena a un numero en caso de ser posible
           */
          .map((x) => {
            const n = Number(x);
            /**
             * En caso de no ser un resultado esperado (0 o 1)
             * el sistema invalida la accitón soltando un mensaje de error
             */
            if (n !== 0 && n !== 1)
              throw new Error(`Valor inválido de lanzamiento '${x}'`);
            return n;
          });
          console.log(nombre, tiros);
          /**
           * Por ultimo se crea un objeto que contiene los jugadores que participaron
           * y los tiros realizados por dicho jugador
           * 
           * Entonces rondas queda como el valor de dicho objeto
           */
        return { player: nombre.trim(), balls: tiros };
      });

    /**
     * En caso de que el largo de las rondas sea 0, se le avusa al usuario que no se encontraron ni rondas ni 
     * lanazamientos pues no tiene sentido seguir con la ejecución del programa si no hay valores a evaluar
     */
    if (rondas.length === 0)
      throw new Error("No se encontraron rondas de lanzamientos.");
    console.log(jugadores, rondas, 'jugadores y rondas');

    // Retorna un objeto con todos los jugadores y los objetos de rondas
    return { jugadores, rondas };
  }


//-----------------------------------------------------------------------------------



  /**
   * Valida que los jugadores existan y las rondas tengan sentido.
   */
  static validarConcurso(jugadores, rondas) {
  /**
   * Restricción que valida que la cantidad minima de jugadores debe de ser de 3
   * esto lo hace sacando la longitud del arreglo y comparando en caso de que sea menor que 3
   */
    if (jugadores.length < 3) {
      throw new Error(`Debe haber al menos 3 jugadores (n≥3). Se encontraron ${jugadores.length}.`);
    }

    // Agrupar rondas por jugador para determinar m y p
    /**
     * Se crea el objeto en el que se almacenará la relación de cada jugador con sus tiros
     */
    const rondasPorJugador = {};
    /** 
     * Recorre cada ronda realizada y lo que hace es 
     */
    for (const ronda of rondas) {
      /**
       * Cuando se recorra un jugador por primera vez, creará un espacio en memoria para sus anotaciones
       * tal que cuando luego vuelva a pasar una ronda de el, ya no sea necesario crear un nuevo arreglo
       * con su nombre para luego guardar sus rondas
       * por lo que se salta el if y sin mas se le pushea su ronda
       */
      if (!rondasPorJugador[ronda.player]) {
        /**
         * Aquí se setea un espacio en memoria nuevo (un arreglo) que se vincula con la clave
         * de ronda.player, por lo que si entra por ejemplo "Kobe" por primera vez, el if returna un undefined pues no encuentra ningún array que sea
         * rondaPorJugador["Kobe"] por lo que salta a la linea de abajo y en ese momento se asigna un nuevo array
         * el cual se asocia a la clave de "Kobe" quedando algo así
         * "Kobe": [], donde dentro de este arreglo se guardan las rondas
         */
        rondasPorJugador[ronda.player] = [];
      }
      /**
       * Se guarda la ronda de tiros que está actualmente siendo iterada en 
       * el espacio en memoria de dicho jugador
       */
      rondasPorJugador[ronda.player].push(ronda);
    }

    // Verificar cada jugador
    for (const [nombre, intentos] of Object.entries(rondasPorJugador)) {
      /**
       * Restricción que valida que la cantidad minima de intentos debe de ser de 5
       * esto lo hace sacando la longitud del arreglo y comparando en caso de que sea menor que 5
       */
      if (intentos.length < 5) {
        throw new Error(
          `El jugador "${nombre}" tiene solo ${intentos.length} posiciones (m≥5).`
        );
      }

      /**
       * Restricción que valida que la cantidad minima de rondas debe de ser de 5
       * esto lo hace sacando la longitud del arreglo y comparando en caso de que sea menor que 5
       */
      for (const [i, ronda] of intentos.entries()) {
        if (ronda.balls.length < 5) {
          throw new Error(
            `En la posición ${i + 1} del jugador "${nombre}" hay solo ${ronda.balls.length} balones (p≥5).`
          );
        }
      }
    }

    // Verificar que todos los jugadores en rondas existan en la lista inicial
    // Crea un arreglo de los jugadores en minuscula
    const setJugadores = new Set(jugadores.map((j) => j.toLowerCase()));
    /**
     * Itera por cada ronda buscando si hay jugadores que tuvieron rondas pero que
     * no estuvieron en la lista inicial
     * a lo que el sistema no salta error, pues no sabíamos si era posible o no
     * así que solo pusimos una advertencia
     */
    for (const ronda of rondas) {
      if (!setJugadores.has(ronda.player.toLowerCase())) {
        console.warn(
          `Advertencia: el jugador "${ronda.player}" no está en la lista inicial.`
        );
      }
    }
  }


//-----------------------------------------------------------------------------------

  /**
   * Calcula puntos totales y money balls por jugador.
   */
  static calcularEstadisticas(rondas) {
    const stats = new Map();

    for (const { player, balls } of rondas) {
      console.log(player, balls);
      /**
       * En caso de que el Map de estadisticas no contenga al jugador
       * crea una clave valor con el jugador donde se setean sus puntos como 0
       * esto inicializa los puntos del jugador para posteriormente irlos contando
       */
      if (!stats.has(player))
        stats.set(player, { points: 0, moneyBalls: 0 });

      /**
       * Extrae la información del espacio de ese jugador en estadisticas
       * basicamente esto copia el valor en memoria, y al apuntar a dicho valor
       * al afectar jugador tambien se cambia el player, pues ambos apuntan al mismo espacio en memoria
       */
      const jugador = stats.get(player);
      

      // Todos los tiros menos el último valen 1 punto si entran
      /**
       * Se van sumando de a un punto por cada balon encestado en la ronda, con la exepción de que 
       * en este caso no alcanza a llegar al ultimo valor del arreglo
       */
      for (let i = 0; i < balls.length - 1; i++) {
        if (balls[i] === 1) jugador.points += 1;
      }
      

      // Último tiro = money ball (2 puntos si entra)
      /**
       * Aquí se cuenta unicamente el ultimo tiro lanzado, tal que cuando sea encestado
       * al jugador se le sume 2 puntos y se registra su moneyBall
       */
      const last = balls[balls.length - 1];
      if (last === 1) {
        jugador.points += 2;
        jugador.moneyBalls += 1;
      }
      console.log("Jugadores stats: ", jugador)
    }
    /**
     * Al completar las iteraciones, se retorna las estadisticas finales contenidas
     * en la constante stats
     */
    return stats;
  }


//-----------------------------------------------------------------------------------

  /**
   * Da formato al texto final con ranking.
   * 
   * Ingresa la lista ordenada de las estadisticas
   */
  static formatearResultados(lista) {
    return lista
      .map(
        (item, i) =>
          `${i + 1}) ${item.player} ${item.points}p ${item.moneyBalls}m`
      )
      .join("\n");
  }
}
