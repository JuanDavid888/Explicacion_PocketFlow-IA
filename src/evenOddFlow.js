import {Node,Flow} from "pocketflow";

/*
 * Nodo único:
 - 1. Leer shared.number.
 - 2. Calcular si es par/impar.
 - 3. Guardar shared.result.
*/

class EvenOddNode extends Node{
    prep(shared){
        return shared.number;
    }
    exec(number){
        if(typeof number !== "number"){
            throw new Error("number must be a number");
        }
        return number % 2 === 0 ? "even":"odd";
    }

    post(shared, prepRes, execRes){
        shared.result = execRes;
        return null; // Fin el flujo
    }
}

export function buildEvenOddFlow(){
    return new Flow(new EvenOddNode());
}

/*
 ### RESUMEN ###
 1. "shared" es una "mochila" de datos que viaja por el flujo
 2. "prep" tomará la entrada.
 3. "exec" resolverá el algoritmo.
 4. "post" guardará el resultado.
 5. "return null" significará que "no hay siguiente paso".
*/