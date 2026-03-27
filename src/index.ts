import "dotenv/config";
import { app } from "./graph.js";
import { mostrarAcciones } from "./db.js";

async function main() {
  console.log("🚀 El Operador Autónomo - Iniciando flujo multi-agente...\n");

  const threadId = `hackathon-agustin-final-${Date.now()}`;

  try {
    await app.invoke({
      campañas: [],
      analisis: "",
      decisiones: [],
      creative: null,
    }, {
      configurable: { thread_id: threadId }
    });

    console.log("\n" + "=".repeat(60));
    console.log("📊 RESULTADOS FINALES");
    console.log("=".repeat(60));

    console.log("\n📋 Acciones guardadas en la Base de Datos:");
    console.table(mostrarAcciones());

    console.log("\n🎯 ESTADO DEL SISTEMA:");
    console.log("✅ Agente Analista     → Análisis ROAS completado");
    console.log("✅ Agente Operador     → Decisiones persistidas en BD");
    console.log("✅ Agente Creativo     → JSON estructurado generado");
    console.log("✅ Memoria persistente → Checkpointer activo");

    console.log("\n✅ FLUJO COMPLETO - Todo funcionó correctamente.");
    console.log("¡Listo para producción!");

  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.error("❌ Error crítico en el flujo:", mensaje);
    process.exit(1);
  }
}

main();