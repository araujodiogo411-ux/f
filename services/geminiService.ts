import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Genre, AgeRating, MovieRecommendation } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const movieSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The title of the movie in Portuguese." },
    originalTitle: { type: Type.STRING, description: "The original title of the movie." },
    year: { type: Type.INTEGER, description: "Release year." },
    director: { type: Type.STRING, description: "Director's name." },
    plot: { type: Type.STRING, description: "A short summary of the plot in Portuguese (max 2 sentences)." },
    ageRating: { type: Type.STRING, description: "The age classification (L, 10, 12, 14, 16, 18)." },
    genre: { type: Type.STRING, description: "The primary genre." },
    verdict: { 
      type: Type.STRING, 
      enum: ["Excellent", "Good", "Average", "Bad"],
      description: "Qualitative assessment of the movie based on critics and audience score." 
    },
    verdictText: { type: Type.STRING, description: "A short phrase like 'Aclamado pela crítica' or 'Decepção de bilheteria'." },
    reasoning: { type: Type.STRING, description: "Why is it good or bad? (In Portuguese)" }
  },
  required: ["title", "originalTitle", "year", "plot", "ageRating", "genre", "verdict", "verdictText", "reasoning"],
};

export const getMovieRecommendation = async (
  selectedGenre: Genre,
  selectedAge: AgeRating
): Promise<MovieRecommendation> => {
  
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Aja como um especialista em cinema.
    Eu preciso de uma recomendação de filme.
    
    Critérios:
    - Gênero: ${selectedGenre}
    - Classificação Indicativa desejada: ${selectedAge}
    
    Instruções:
    1. Escolha um filme aleatório que se encaixe nesses critérios. Tente variar, não escolha sempre os mais óbvios, mas garanta que seja um filme existente.
    2. Se a classificação for "18 Anos", certifique-se de que o conteúdo é realmente maduro. Se for "Livre", garanta que é seguro para crianças.
    3. Determine se o filme é BOM ou RUIM baseado na recepção geral (IMDb, Rotten Tomatoes).
    4. Retorne os dados estritamente em JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: movieSchema,
        temperature: 1.1, // Higher temperature for more variety/randomness
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as MovieRecommendation;
    } else {
      throw new Error("No text returned from Gemini.");
    }
  } catch (error) {
    console.error("Error fetching movie recommendation:", error);
    throw new Error("Falha ao consultar o oráculo de filmes. Tente novamente.");
  }
};