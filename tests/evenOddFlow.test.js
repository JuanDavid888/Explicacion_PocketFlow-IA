import { buildGraphFlow } from "../src/evenOddFlow";

describe("GraphNode (PocketFlow)", () =>{
    test("Nodo 1", async ()=>{
        const flow = buildGraphFlow(); // Creación del flujo
        const shared =  {entrada: "A:B;B:C;C:AB"};

        await flow.run(shared);

        expect(shared.result).toBe("A: 2 B: 3 C: 3");
    });
})