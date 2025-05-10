const express = require("express");
const router = express.Router();
const { sendCampaign } = require("../services/messageService");

const BASE_MESSAGE = `
*¡Volvió la campaña de condonación de multas en BibloRed, {{nombre}}!* ¿Tienes libros vencidos? ¡En BibloRed puedes devolverlos sin multas!

Puedes hacer entrega de materiales que tengas vencidos de meses y años anteriores en las Bibliotecas más cercanas a tu casa, Bibloestaciones en el sistema Transmilenio, buzones de las Bibliotecas y solicitando el servicio de devolución a domicilio.

Recuerda que el material que sea devuelto no generará multa, puedes agendar su recogida a domicilio.
📍 Programa aquí: biblored.gov.co/servicios-a-domicilio
📞 (601) 580 3070 ext. 2000

¡No pierdas esta oportunidad!
📚 ¡Dale un final feliz a tus libros vencidos!
`;

router.post("/send", async (req, res) => {
  try {
    const registros = req.body; // Se espera [{ nombre, telefono }, ...]
    if (!Array.isArray(registros) || registros.length === 0) {
      return res
        .status(400)
        .json({ error: "Cuerpo POST debe ser array no vacío" });
    }

    const summary = await sendCampaign(registros, BASE_MESSAGE);
    res.json(summary);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Fallo interno" });
  }
});

module.exports = router;
