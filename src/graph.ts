import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import * as fs from "fs";
import { SqliteSaver } from "@langchain/langgraph-checkpoint-sqlite";
import { guardarAccion } from "./db.js";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",   // ← más liviano, mejor para pruebas
  temperature: 0,
  apiKey: process.env.GEMINI_API_KEY,
});

const StateAnnotation = Annotation.Root({
  campañas: Annotation<any[]>,
  analisis: Annotation<string>,
  decisiones: Annotation<any[]>,
  creative: Annotation<any>,
});

// ==================== AGENTE ANALISTA ====================
const analistaNode = async (state: any) => {
const rawData = fs.readFileSync("datos_tienda.json", "utf-8");
const cleanData = rawData.replace(/^\uFEFF/, ''); // Remueve BOM si existe
const data = JSON.parse(cleanData);
  
  const prompt = `Eres un analista financiero de e-commerce.
Analiza estas campañas y calcula el ROAS (Return On Ad Spend) = Ingresos / Gasto para cada una.

Campañas: ${JSON.stringify(data.campañas, null, 2)}`;



  const response = await llm.invoke(prompt);
  
  return {
    campañas: data.campañas,
    analisis: response.content as string,
  };
};

// ==================== AGENTE OPERADOR ====================
const operadorSchema = z.object({
  decisiones: z.array(z.object({
    campaignId: z.string(),
    action: z.enum(["pausar", "subir_presupuesto", "mantener"]),
    reason: z.string(),
  })),
});

const operadorNode = async (state: any) => {
  const structuredLlm = llm.withStructuredOutput(operadorSchema);
  
  const prompt = `Basado en este análisis de campañas:

${state.analisis}

Decide qué acción tomar para cada campaña. 
Ejemplos:
- Si ROAS < 1 → pausar
- Si ROAS > 3 → subir_presupuesto
- Si ROAS entre 1 y 3 → mantener

Devuelve SOLO el JSON estructurado.`;

  const result = await structuredLlm.invoke(prompt);

  // Guardar en base de datos
  result.decisiones.forEach((dec: any) => {
    guardarAccion(dec.campaignId, dec.action, dec.reason);
  });

  return { decisiones: result.decisiones };
};

// ==================== AGENTE CREATIVO ====================
const creativeSchema = z.object({
  product: z.string(),
  angles: z.array(z.string()).length(3),
});

const creativoNode = async (state: any) => {
  const perdedora = state.campañas.find((c: any) => c.id === "C2");

  const structuredLlm = llm.withStructuredOutput(creativeSchema);

  const prompt = `Producto: ${perdedora.producto}

Genera exactamente 3 nuevos ángulos de venta (copywriting) potentes y persuasivos para relanzar este producto.

Devuelve SOLO el JSON con el formato solicitado.`;

  const result = await structuredLlm.invoke(prompt);

  console.log("\n🎉 JSON ESTRUCTURADO FINAL (Agente Creativo):");
  console.dir(result, { depth: null });

  return { creative: result };
};

// ==================== GRAFO ====================
const graph = new StateGraph(StateAnnotation)
  .addNode("analista", analistaNode)
  .addNode("operador", operadorNode)
  .addNode("creativo", creativoNode)
  .addEdge(START, "analista")
  .addEdge("analista", "operador")
  .addEdge("operador", "creativo")
  .addEdge("creativo", END);

const checkpointer = SqliteSaver.fromConnString("./checkpoints.db");

export const app = graph.compile({ checkpointer });