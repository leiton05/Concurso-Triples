export class Algoritmos {

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
