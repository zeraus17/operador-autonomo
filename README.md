# 🧠 Autonomous Operator

### Sistema multi-agente que toma decisiones de negocio y ejecuta marketing automáticamente

> Un operador autónomo capaz de analizar campañas de e-commerce, decidir qué hacer y generar nuevas estrategias de venta sin intervención humana.

---

## 🚀 ¿Qué hace este proyecto?

Este sistema simula un **equipo completo de growth**:

* 📊 Analiza campañas (ROAS)
* 🧾 Decide acciones automáticamente
* 🎯 Genera nuevas estrategias de marketing
* 💾 Guarda decisiones como memoria persistente

---

## ⚙️ Cómo funciona

### 1. Analyst Agent

* Lee `datos_tienda.json`
* Calcula ROAS (Ingresos / Gasto)

### 2. Operator Agent

* Toma decisiones basadas en performance
* Persiste acciones en base de datos

### 3. Creative Agent

* Detecta campañas perdedoras
* Genera nuevos ángulos de venta usando LLM
* Output estructurado con JSON Schema (Tool Calling)

---

## 🧩 Arquitectura

* 🧠 Multi-agent system
* 🔁 Orquestación tipo pipeline
* 💾 Persistencia de estado (memoria real)
* 🛡️ Sistema de retries para robustez
* 📦 Outputs estructurados (sin texto libre)

---

## 🛠️ Tecnologías

* Node.js + TypeScript
* LLM API (Gemini / OpenAI)
* SQLite / PostgreSQL (Supabase-ready)
* JSON Schema (Structured Output)

---

## ⚙️ Setup

```bash
git clone https://github.com/zeraus17/operador-autonomo.git
cd autonomous-operator
npm install
```

### 🔐 Configurar API Key

```bash
copy .env.example .env
```

Editar `.env`:

```env
GEMINI_API_KEY=tu_api_key
```

> ⚠️ Este proyecto requiere una API key propia (no incluida por seguridad)

---

## ▶️ Ejecutar

```bash
npm run dev
```

---

## 📦 Output del sistema

* 📊 Análisis de campañas (ROAS)
* 🧾 Decisiones persistidas en DB
* 🎯 Estrategias de marketing en JSON estructurado

---

## 🔥 Highlights técnicos

* ✅ Multi-agent orchestration real
* ✅ Persistencia (memoria del sistema)
* ✅ Tool Calling con JSON Schema
* ✅ Manejo de errores con retries
* ✅ Arquitectura modular y escalable

---

## 🎥 Demo

👉 (Agregar Loom acá)

---

## 🧠 Visión

Este proyecto apunta a sistemas autónomos capaces de operar negocios digitales con mínima intervención humana.

---

## 👨‍💻 Autor

Agustín Suárez
