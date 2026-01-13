import { buildEvenOddFlow } from "../src/evenOddFlow";

describe("EvenOddFlow (PocketFlow)", () =>{
    test("Número par", async ()=>{
        const flow = buildEvenOddFlow(); // Creación del flujo
        const shared =  {number: 4};

        await flow.run(shared);

        expect(shared.result).toBe("even");
    });

    test("Número par", async ()=>{
        const flow = buildEvenOddFlow(); // Creación del flujo
        const shared =  {number: 9};

        await flow.run(shared);

        expect(shared.result).toBe("odd");
    });

    test("Número par", async ()=>{
        const flow = buildEvenOddFlow(); // Creación del flujo
        const shared =  {number: 0};

        await flow.run(shared);

        expect(shared.result).toBe("even");
    });
})

/*
 ### RESUMEN ###
 1. Cada "test()" es un caso de estudio/prueba.
 2. "par", "impar", "cero" son entradas válidas.
 3. "string" será un caso inválido, por lo cual se esperará un error (caso negativo).
*/