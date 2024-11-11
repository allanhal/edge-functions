import { GoogleGenerativeAI } from "@google/generative-ai";

// api/hello.js
export default async function handler(req, res) {
  const { image } = req.body;
  if (image) {
    try {
      const result = await longMethod({ image });
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.send("No image!");
  }
}

const longMethod = async ({ image }) => {
  const API_KEY = process.env.GEMINI_API_KEY || "";

  try {
    // https://github.com/google-gemini/generative-ai-js
    const genAI = new GoogleGenerativeAI(API_KEY || "");
    const model = genAI.getGenerativeModel({
      // Choose a Gemini model.
      model: "gemini-1.5-flash",
    });
    const prompt =
      "Quero o número da leitura de água, eu quero apenas o número, sem nenhum texto. Caso não tenha encontrado um valor, retorne 0.";
    const imageParam = {
      inlineData: {
        data: image,
        mimeType: "image/png",
      },
    };

    const result = await model.generateContent([prompt, imageParam]);

    const resposta = result.response.text();

    // console.log("resposta", resposta);

    let respostaNumero = 0;

    try {
      respostaNumero = Number(resposta);
    } catch (error) {
      respostaNumero = 0;
    }

    return {
      resposta: respostaNumero,
    };
  } catch (error) {
    return error;
  }
};
