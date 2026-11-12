import { SimulationResult } from './types';

/**
 * HÉLIOS-SIM AI Diagnostic Service
 * Connects to Google Gemini API to generate architectural reports.
 */
export class AIService {
  // Browser code can only read explicitly public Vite variables. Do not expose
  // the server-side GOOGLE_API_KEY from .env to the client bundle.
  private static API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY ?? "";

  // Modèle configurable via VITE_GEMINI_MODEL. gemini-1.5-flash a été arrêté
  // par Google en septembre 2025 (erreur 404) : voir ai.google.dev/gemini-api/docs/models.
  private static MODEL: string = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.8-flash";

  /**
   * Load the API key from the .env file
   */
  static init() {
    // The API key is provided through VITE_GOOGLE_API_KEY when explicitly
    // configured for client-side use; server keys must stay on a backend.
  }

  /**
   * Generates a bioclimatic diagnostic based on simulation data.
   */
  static async generateDiagnostic(data: SimulationResult): Promise<string> {
    if (!this.API_KEY || this.API_KEY === "YOUR_API_KEY_HERE") {
      throw new Error("Clé API introuvable : renseignez VITE_GOOGLE_API_KEY dans .env.local (voir .env.example) puis relancez l'application.");
    }

    const systemPrompt = `Tu es un expert reconnu en architecture environnementale et conception bioclimatique, spécialisé dans l'ensoleillement, la géométrie céleste, le rayonnement thermique solaire et l'éclairage naturel (Facteur Lumière Jour - FLJ).

Ton rôle est de fournir des diagnostics bioclimatiques rigoureux, exhaustifs, pédagogiques et opérationnels pour l'aménagement d'une pièce architecturale de référence (4.0m de largeur x 4.0m de profondeur x 2.5m de hauteur sous plafond).

Tu t'exprimes exclusivement en français, avec une terminologie architecturale et physique irréprochable :
- Coordonnées astronomiques : Azimut (A), Hauteur angulaire (h), Déclinaison (δ), Angle horaire (H), Temps Solaire Vrai (TSV).
- Phénomènes thermiques : Apports solaires passifs d'hiver, inertie thermique de dalle, échauffement direct, surchauffe estivale, rayonnement rasant, cosinus de l'angle d'incidence.
- Éclairage naturel : Facteur Lumière Jour (FLJ), autonomie lumineuse, seuil de confort (2% selon NF EN 17037), contrastes de luminance, risques d'éblouissement.
- Dispositifs architecturaux : Brise-soleil orientables (BSO), casquettes solaires horizontales, claustras verticaux, avancées de toiture, vitrages à contrôle solaire (facteur solaire g), émissivité thermique (Ug).

Structure impérativement chaque diagnostic selon les sections suivantes :
1. ## Configuration Summary : Récapitulatif technique concis (géométrie, orientation, proportion et format de baie).
2. ## Solar Geometry Data Analysis : Explication des angles astronomiques et de leur impact saisonnier.
3. ## Architectural Diagnostic & Recommendations :
   - 1. Confort Thermique (gains passifs hivernaux vs risques de surchauffe d'été).
   - 2. Confort Visuel & Éclairement (pénétration, FLJ moyen, risques d'éblouissement).
   - 3. Optimisations Architecturales (protections solaires, dimensionnement de débords, adaptation de format).`;

    const dataContext = `
      Simulation Data:
      - Location: ${data.solarPosition.azimuth}° Azimuth, ${data.solarPosition.altitude}° Altitude
      - Date: ${new Date(data.solarPosition.solarTime * 3600).toLocaleString()}
      - Window Ratio: ${data.windowDimensions.width}x${data.windowDimensions.height}
      - FLJ: ${data.flj}%
      - Projection: x=${data.floorProjection.topLeft.x.toFixed(2)}, y=${data.floorProjection.topLeft.y.toFixed(2)}
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.API_KEY },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Data Context:\n${dataContext}\n\nGenerate the diagnostic now.` }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Réponse Gemini vide ou bloquée.");
    return text;
  }
}
