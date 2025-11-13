export default class Algoritmos {
    // Complejidad: O(n log n)
    static mergeSortObjetos(arr, compare = (a, b) => a - b) {
        // Caso base donde valida la longitud del arreglo de entrada
        if (!Array.isArray(arr) || arr.length <= 1) return arr;

        // Basicamente el algoritmo busca la mitad del arreglo y la convierte en un entero
        // Tal que luego puede separar dicho arreglo original en 2 partes iguales
        // Luego retorna cada parte
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);


        // Llamadas recursivas
        /* Se llama una y otra vez el metodo hasta que la longitud de cada parte sea
        *  de longitud = 1
        Cuando esto pasa, el sistema por fin retorna valores a las constantes SortedLeft y SortedRight
        lo cual permite seguir el codigo hasta mergeObjetos
        */
        const sortedLeft = Algoritmos.mergeSortObjetos(left, compare);
        const sortedRight = Algoritmos.mergeSortObjetos(right, compare);
        /* Aquí se llama el mergeObjetos el cual comparará ambos elementos de n de largo 
        y devuelve el arreglo ordenado
        */
        return Algoritmos.mergeObjetos(sortedLeft, sortedRight, compare);
        }

    static mergeObjetos(left, right, compare) {
        /**
         * Establece constantes que sirven para la evaluación de los elementos a comparar
         */
        const result = [];
        let i = 0;
        let j = 0;
        /**
         * Se crea un ciclo while el cual solo se ejecuta cuando se cumple dicha condición
         * Cada que se ejecuta una comparasión el valor de i sube 1, haciendo que en la siguiente iteración
         * puede que ya la condición no se cumpla, o que el if no se cumpla tampoco
         * 
         * Esto lo que logra es que en result se vayan colocando los elementos dependiendo del compare
         * tal que el result va quedando ordenado en base a los criterios de compare
         * y una vez ordenados, el while se detiene
         */
        while (i < left.length && j < right.length) {
            if (compare(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
            } else {
            result.push(right[j]);
            j++;
            }
        }

        // Agregar los elementos restantes (si los hay)
        while (i < left.length) {
            result.push(left[i]);
            i++;
        }

        while (j < right.length) {
            result.push(right[j]);
            j++;
        }

        return result;
        }
}
