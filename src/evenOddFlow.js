import {Node,Flow} from "pocketflow";


class GraphNode extends Node{
    prep(shared){
        return shared.entrada;
    }
    exec(entrada) {
        if (typeof entrada !== "string") {
            throw new Error("entrada must be a string");
        }

        const pares = entrada.split(";");
        let diccionario = {};

        // 1. Inicializar todos los nodos en 0
        for (let par of pares) {
            const nodo = par.split(":")[0];
            diccionario[nodo] = 0;
        }

        // 2. Contar conexiones
        for (let par of pares) {
            const [izquierda, derecha] = par.split(":");

            // conexiones salientes
            diccionario[izquierda] += derecha.length;

            // conexiones entrantes
            for (let letra of derecha) {
                if (diccionario.hasOwnProperty(letra)) {
                    diccionario[letra] += 1;
                }
            }
        }

        // 3. Formatear salida
        const clavesOrdenadas = Object.keys(diccionario).sort();
        const linea = clavesOrdenadas.map(clave => `${clave}: ${diccionario[clave]}`);
        return linea.join(" ");
    }

    post(shared, prepRes, execRes){
        shared.result = execRes;
        return null; // Fin el flujo
    }
}

export function buildGraphFlow(){
    return new Flow(new GraphNode());
}
