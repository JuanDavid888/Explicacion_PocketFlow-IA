import { buildGraphFlow } from "../src/graphNode";

describe("GraphNode (PocketFlow)", () => {

    test("Procesa múltiples grafos correctamente", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 2,
            entradas: [
                "A:BC;B:A;C:",
                "X:YZ;Y:X;Z:Y"
            ]
        };

        await flow.run(shared);

        expect(shared.resultados).toEqual([
            "A: 3 B: 2 C: 1",
            "X: 3 Y: 3 Z: 2"
        ]);
    });

    test("Caso con nodos sin conexiones", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 1,
            entradas: [
                "A:C;B:;C:;D:"
            ]
        };

        await flow.run(shared);

        expect(shared.resultados).toEqual([
            "A: 1 B: 0 C: 1 D: 0"
        ]);
    });

    test("Error si faltan 'casos' o 'entradas'", async () => {
        const flow = buildGraphFlow();

        const shared = {
            entradas: ["A:B"]
        };

        await expect(flow.run(shared)).rejects.toThrow(
            "shared debe tener 'casos' como number y 'entradas' como string"
        );
    });

    test("Error si los casos no son strings", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 1,
            entradas: [1]
        };

        await expect(flow.run(shared)).rejects.toThrow(
            "Cada entrada debe ser un string"
        );
    });

    test("Ignora entradas adicionales si casos es menor", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 1,
            entradas: [
                "A:B;B:",
                "X:Y;Y:"
            ]
        };

        await flow.run(shared);

        expect(shared.resultados).toEqual([
            "A: 1 B: 1"
        ]);
    });

});
