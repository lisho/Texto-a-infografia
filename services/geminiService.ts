
import { GoogleGenAI, Type, GenerateContentRequest } from "@google/genai";
import { SlidePoint } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    description: "Un array que contiene exactamente tres versiones diferentes de la diapositiva.",
    items: {
        type: Type.ARRAY,
        description: "Un array de 6 puntos clave para una única versión de la diapositiva.",
        items: {
            type: Type.OBJECT,
            properties: {
                title: {
                    type: Type.STRING,
                    description: 'Un título corto y atractivo para el punto clave.'
                },
                description: {
                    type: Type.STRING,
                    description: 'Un resumen conciso del punto clave (1-2 frases).'
                },
                icon: {
                    type: Type.STRING,
                    description: "El nombre del icono más apropiado de la lista: 'briefing', 'brainstorm', 'meeting', 'marketing', 'social', 'results', o 'default'."
                },
            },
            required: ['title', 'description', 'icon'],
        },
    }
};


export const generateSlideFromText = async (text: string): Promise<SlidePoint[][]> => {
    try {
        const prompt = `
Eres un experto en resumen de documentos y diseño de presentaciones.
Analiza el siguiente texto y genera TRES versiones distintas de una diapositiva de resumen. Cada versión debe contener exactamente 6 puntos o etapas clave. La totalidad del texto generado (títulos y descripciones) debe estar en español.

- **Versión 1:** Un resumen directo, paso a paso, del proceso principal.
- **Versión 2:** Un resumen centrado en los resultados, beneficios o conclusiones más impactantes mencionados en el texto.
- **Versión 3:** Una interpretación más creativa o metafórica de los conceptos clave, adecuada para una visión general de alto nivel.

Para cada punto de cada versión, proporciona un título corto y atractivo y una descripción concisa (1-2 frases).
Además, elige el icono más adecuado de esta lista: 'briefing', 'brainstorm', 'meeting', 'marketing', 'social', 'results'. Si ninguno encaja perfectamente, usa 'default'.

Devuelve tu respuesta como un array JSON válido que contenga tres arrays anidados (uno para cada versión), siguiendo el esquema proporcionado. No incluyas ningún otro texto, explicaciones o formato markdown.

Aquí está el texto para analizar:
---
${text}
---
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonString = response.text.trim();
        const data = JSON.parse(jsonString);

        if (!Array.isArray(data) || data.length !== 3 || !data.every(Array.isArray)) {
            throw new Error("La API no devolvió una estructura válida de tres versiones de diapositivas.");
        }

        return data as SlidePoint[][];

    } catch (error) {
        console.error("Error al generar la diapositiva desde el texto:", error);
        if (error instanceof Error) {
            throw new Error(`Fallo al generar la diapositiva: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido mientras se generaba la diapositiva.");
    }
};
