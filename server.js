// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const OpenAI = require('openai');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// app.post('/traducir', async (req, res) => {
//   try {
//     const { texto } = req.body;

//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", "content": "You are a helpful assistant that translates Spanish to English." },
//         { role: "user", "content": texto },
//       ],
//     });

//     const textoTraducido = chatCompletion.choices[0].message.content;

//     res.json({ textoTraducido });
//   } catch (error) {
//     console.error('Error al traducir:', error.message);
//     res.status(500).json({ error: 'Error al traducir el texto' });
//   }
// });

// const PORT = process.env.PORT || 5000; // Cambiar a otro puerto, por ejemplo, 5000
// app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/traducir', async (req, res) => {
  try {
    const { texto, idiomaDestino } = req.body; // Recibir idiomaDestino

    // Validar idiomaDestino (opcional, pero recomendado)
    const idiomasSoportados = ['en', 'fr', 'de', 'it', 'pt', 'ja', 'ru', 'zh', 'ar', 'hi']; // Ejemplo
    if (!idiomasSoportados.includes(idiomaDestino)) {
      return res.status(400).json({ error: 'Idioma no soportado' });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are a helpful assistant that translates Spanish to ${idiomaDestino}.` 
        },
        { role: "user", content: texto },
      ],
    });

    const textoTraducido = chatCompletion.choices[0].message.content;

    res.json({ textoTraducido });
  } catch (error) {
    console.error('Error al traducir:', error.message);
    res.status(500).json({ error: 'Error al traducir el texto' });
  }
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
