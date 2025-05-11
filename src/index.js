require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

// Aumentar el timeout de todas las solicitudes a 1 hora (3600000 ms)
// Esto es útil para evitar que las solicitudes se cierren antes de que se complete el procesamiento
// de la campaña, especialmente si hay muchos registros o si el procesamiento es lento.
// Sin embargo, ten en cuenta que esto puede hacer que el servidor mantenga conexiones abiertas
// durante mucho tiempo, lo que podría afectar el rendimiento si hay muchas solicitudes simultáneas.
app.use((req, res, next) => {
  res.setTimeout(300000, () => { // 5 minutos de espera
    console.log('La solicitud ha sido cerrada por el servidor');
    res.status(408).send('Request Timeout');
  });
  next();
});

app.use("/api", require("./routes/send"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 API escuchando en http://localhost:${PORT}`)
);
