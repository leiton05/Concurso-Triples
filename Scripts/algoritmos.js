export default class Algoritmos {
    // Complejidad: O(n log n)
    static mergeSort(A, p = 0, r = A.length - 1, compare = (a, b) => a - b) {
    if (p < r) {
        const q = Math.floor((p + r) / 2);
        Algoritmos.mergeSort(A, p, q, compare);
        Algoritmos.mergeSort(A, q + 1, r, compare);
        Algoritmos.merge(A, p, q, r, compare);
    }
    return A; // Devuelve el mismo arreglo ya ordenado
    }

    //complejidad: O(n)
    static merge(A, p, q, r, compare) {
        const n1 = q - p + 1;
        const n2 = r - q;

        // Crear arreglos temporales L y R
        const L = new Array(n1 + 1);
        const R = new Array(n2 + 1);

        for (let i = 0; i < n1; i++) L[i] = A[p + i];
        for (let j = 0; j < n2; j++) R[j] = A[q + 1 + j];

        // Sentinelas (Infinity)
        L[n1] = Infinity;
        R[n2] = Infinity;

        let i = 0;
        let j = 0;

        for (let k = p; k <= r; k++) {
            if (compare(L[i], R[j]) <= 0) {
            A[k] = L[i];
            i++;
            } else {
            A[k] = R[j];
            j++;
            }
        }
    }

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

    // Complejidad: O(n)
    static busquedaLineal(A, valor, campo = null) {
        for (let i = 0; i < A.length; i++) {
            const elemento = campo ? A[i][campo] : A[i];
            if (elemento === valor) {
            return i; // Encontrado, devuelve el índice
            }
        }
        return -1; // No encontrado
    }
}
