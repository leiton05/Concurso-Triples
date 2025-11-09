import Algoritmos from "./algoritmos.js";

export default class Util {
  static resolverConcursoTriples(concurso) {
    if (!concurso || typeof concurso !== "string") {
      return "Ingresa una cadena válida con el formato del concurso.";
    }

    try {
      const { jugadores, rondas } = Util.parsearConcurso(concurso);
      Util.validarConcurso(jugadores, rondas);

      // Calcular puntos y money balls
      const estadisticas = Util.calcularEstadisticas(rondas);

      // Convertir a arreglo para ordenar
      const resultados = Array.from(estadisticas.entries()).map(
        ([player, data]) => ({
          player,
          points: data.points,
          moneyBalls: data.moneyBalls,
        })
      );

      // Comparador según reglas: puntos, money balls, nombre
      const comparar = (a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.moneyBalls !== a.moneyBalls)
          return b.moneyBalls - a.moneyBalls;
        return a.player.localeCompare(b.player);
      };

      // Ordenar con mergeSortObjetos (de tu clase Algoritmos)
      const ordenados = Algoritmos.mergeSortObjetos(resultados, comparar);

      // Formatear salida
      return Util.formatearResultados(ordenados);
    } catch (err) {
      return `Error: ${err.message}`;
    }
  }

  /**
   * Divide la cadena de entrada en jugadores y rondas
   * Formato: "J1,J2,...--J1:0 1 1 0 1*J2:1 0 1 0 1*..."
   */
  static parsearConcurso(cadena) {
    const partes = cadena.split("--");
    console.log(partes);
    if (partes.length !== 2) {
      throw new Error('Debe haber exactamente un separador "--"');
    }

    const jugadores = partes[0]
      .split(",")
      .map((j) => j.trim())
      .filter((j) => j.length > 0);
    console.log(jugadores)

    if (jugadores.length === 0) {
      throw new Error("No se encontraron jugadores en la primera parte.");
    }

    const rondas = partes[1]
      .split("*")
      .map((r) => r.trim())
      .filter((r) => r.length > 0)
      .map((bloque) => {
        const [nombre, tirosStr] = bloque.split(":");
        if (!nombre || !tirosStr) {
          throw new Error(`Formato inválido en el bloque: "${bloque}"`);
        }

        const tiros = tirosStr
          .trim()
          .split(/\s+/)
          .map((x) => {
            const n = Number(x);
            if (n !== 0 && n !== 1)
              throw new Error(`Valor inválido de lanzamiento '${x}'`);
            return n;
          });
          console.log(nombre, tiros);

        return { player: nombre.trim(), balls: tiros };
      });

    if (rondas.length === 0)
      throw new Error("No se encontraron rondas de lanzamientos.");
    console.log(jugadores, rondas, 'jugadores y rondas');
    return { jugadores, rondas };
  }



  /**
   * Valida que los jugadores existan y las rondas tengan sentido.
   */
  static validarConcurso(jugadores, rondas) {
    const setJugadores = new Set(jugadores.map((j) => j.toLowerCase()));
    for (const ronda of rondas) {
      if (!setJugadores.has(ronda.player.toLowerCase())) {
        console.warn(
          `Advertencia: el jugador "${ronda.player}" no está en la lista inicial.`
        );
      }
    }
  }



  /**
   * Calcula puntos totales y money balls por jugador.
   */
  static calcularEstadisticas(rondas) {
    const stats = new Map();

    for (const { player, balls } of rondas) {
      console.log(player, balls);
      if (!stats.has(player))
        stats.set(player, { points: 0, moneyBalls: 0 });

      const jugador = stats.get(player);
      

      // Todos los tiros menos el último valen 1 punto si entran
      for (let i = 0; i < balls.length - 1; i++) {
        if (balls[i] === 1) jugador.points += 1;
      }
      

      // Último tiro = money ball (2 puntos si entra)
      const last = balls[balls.length - 1];
      if (last === 1) {
        jugador.points += 2;
        jugador.moneyBalls += 1;
      }
      console.log("Jugadores stats: ", jugador)
    }
    
    return stats;
  }




  /**
   * Da formato al texto final con ranking.
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
