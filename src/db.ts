import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'acciones.db');
const db = new Database(dbPath);

// Crear tabla de forma segura (sin template literal grande)
db.exec(`
  CREATE TABLE IF NOT EXISTS acciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id TEXT,
    action TEXT,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export function guardarAccion(campaignId: string, action: string, reason: string) {
  const stmt = db.prepare('INSERT INTO acciones (campaign_id, action, reason) VALUES (?, ?, ?)');
  stmt.run(campaignId, action, reason);
  console.log(`✅ Acción guardada en BD: ${action} para ${campaignId}`);
}

export function mostrarAcciones() {
  const stmt = db.prepare('SELECT * FROM acciones ORDER BY created_at DESC');
  return stmt.all();
}