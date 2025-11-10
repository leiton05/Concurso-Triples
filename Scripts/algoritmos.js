export default class Algoritmos {
    // Complejidad: O(n log n)
    static mergeSortObjetos(arr, compare = (a, b) => a - b) {
        if (!Array.isArray(arr) || arr.length <= 1) return arr;

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        // Llamadas recursivas
        const sortedLeft = Algoritmos.mergeSortObjetos(left, compare);
        const sortedRight = Algoritmos.mergeSortObjetos(right, compare);

        return Algoritmos.mergeObjetos(sortedLeft, sortedRight, compare);
        }

    static mergeObjetos(left, right, compare) {
        const result = [];
        let i = 0;
        let j = 0;

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
