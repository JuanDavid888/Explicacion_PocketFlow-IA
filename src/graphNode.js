import { Node, Flow } from "pocketflow";

class GraphNode extends Node {

    prep(shared) {
        if (typeof shared.casos !== "number" || !Array.isArray(shared.entradas)) {
            throw new Error("shared debe tener 'casos' como number y 'entradas' como string");
        }

        for (const entrada of shared.entradas) {
            if (typeof entrada !== "string") {
                throw new Error("Cada entrada debe ser un string");
            }
        }

        return {
            casos: shared.casos,
            entradas: shared.entradas
        };
    }

    exec({casos, entradas}) {
        let resultados = [];

        for (let i = 0; i < casos; i++) {
            const entrada = entradas[i];
            const pares = entrada.split(";");

            let diccionario = {};

            // 1. Inicializar nodos
            for (let par of pares) {
                const nodo = par.split(":")[0];
                diccionario[nodo] = 0;
            }

            // 2. Contar conexiones
            for (let par of pares) {
                const [izquierda, derecha = ""] = par.split(":");

                // salientes
                diccionario[izquierda] += derecha.length;

                // entrantes
                for (let letra of derecha) {
                    if (diccionario.hasOwnProperty(letra)) {
                        diccionario[letra] += 1;
                    }
                }
            }

            // 3. Formatear salida
            const clavesOrdenadas = Object.keys(diccionario).sort();
            const linea = clavesOrdenadas.map(
                clave => `${clave}: ${diccionario[clave]}`
            );

            resultados.push(linea.join(" "));
        }

        return resultados;
    }

    post(shared, prepRes, execRes) {
        shared.resultados = execRes;
        return null;
    }
}

export function buildGraphFlow() {
    return new Flow(new GraphNode());
}
