# 🧠 Autonomous Operator (Hackathon)

Sistema multi-agente autónomo que analiza campañas de e-commerce, toma decisiones financieras y ejecuta acciones de marketing sin intervención humana.

---

## 🚀 Flujo del Sistema

1. **Analyst Agent**

   * Lee `datos_tienda.json`
   * Calcula ROAS (Ingresos / Gasto)

2. **Operator Agent**

   * Toma decisiones basadas en ROAS
   * Persiste acciones en base de datos (memoria del sistema)

3. **Creative Agent**

   * Detecta campaña perdedora
   * Genera nuevos ángulos de venta
   * Output estructurado usando JSON Schema (Tool Calling)

---

## 🧩 Arquitectura

* Separación por agentes
* Orquestación tipo pipeline
* Persistencia de estado (DB)
* Retry system para robustez

---

## 🛠️ Tecnologías

* Node.js + TypeScript
* LLM API (OpenAI / Gemini)
* SQLite / PostgreSQL (Supabase ready)
* JSON Schema (Structured Output)

---

## ⚙️ Setup

```bash
git clone https://github.com/TU_USUARIO/autonomous-operator.git
cd autonomous-operator
npm install
cp .env.example .env
```

Agregar API KEY en `.env`

```bash
npm run dev
```

---

## 📦 Output del Sistema

El sistema devuelve:

* 📊 Análisis de campañas (ROAS)
* 🧾 Decisiones persistidas en DB
* 🎯 Estrategias de marketing (JSON estructurado)

---

## 🔥 Highlights Técnicos

* ✅ Multi-agent orchestration
* ✅ Persistencia real (memoria)
* ✅ Tool Calling con JSON Schema (sin texto libre)
* ✅ Manejo de errores con retries
* ✅ Código modular y escalable

---

## 🎥 Demo

(Agregar link de Loom)

---

## 📌 Notas

El sistema está diseñado para ser fácilmente desplegable en entornos serverless como Cloudflare Workers (adaptando la capa de DB).

---

## 👨‍💻 Autor

Agustín Suárez
