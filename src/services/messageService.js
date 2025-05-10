require('dotenv').config();
const client = require('../config/whatsappClient');

const MIN_DELAY = Number(process.env.MIN_DELAY_MS) || 7000;   // 7-15 s por defecto
const MAX_DELAY = Number(process.env.MAX_DELAY_MS) || 15000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Convierte “3001234567” → “573001234567@c.us”
 */
const toWaId = (raw) => {
  const onlyNums = raw.replace(/\D+/g, '');
  return onlyNums.startsWith('57') ? `${onlyNums}@c.us` : `57${onlyNums}@c.us`;
};

/**
 * Envía mensajes uno a uno con retardo aleatorio.
 * Devuelve un resumen de éxitos/errores.
 */
async function sendCampaign(registros, baseMessage) {
  const report = { ok: [], error: [] };

  for (const reg of registros) {
    const id = toWaId(reg.telefono);
    const personalized = baseMessage.replace('{{nombre}}', reg.nombre.trim());

    try {
      await client.sendMessage(id, personalized);
      report.ok.push({ telefono: reg.telefono, nombre: reg.nombre });
      console.log(`✓ Enviado a ${reg.nombre} (${reg.telefono})`);
    } catch (err) {
      report.error.push({ telefono: reg.telefono, reason: err.message });
      console.error(`✗ Error con ${reg.telefono}: ${err.message}`);
    }

    // Retardo antispam
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY);
    await sleep(delay);
  }
  return report;
}

module.exports = { sendCampaign };