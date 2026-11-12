# CORBU-SOLAIRE — HÉLIOS-SIM

Simulateur d'ensoleillement pour une **cellule de référence de 4 × 4 × 2,5 m** (16 m², 40 m³) percée d'une baie sur une façade de 4 × 2,5 m. Il montre où la tache solaire tombe sur la dalle selon la ville, l'orientation, la proportion et la typologie de la baie, la date et l'heure solaire.

Application React + Three.js (Vite, TypeScript). Tout le calcul se fait dans le navigateur.

## Ce que fait l'application

- **Implantation** : ville de référence (Nantes par défaut) et orientation de la façade.
- **Baie vitrée** : part de la façade (50 %, 33 % ou 25 %), typologie (carré, panoramique, vertical, vertical jumelé) et position sur la façade.
- **Temps solaire** : date et heure ; position du soleil (hauteur, azimut) et projection de la tache solaire sur la dalle.
- Vue 3D de la cellule et plan 2D du sol avec le contour de la tache.
- Facteur Lumière Jour moyen estimé (formule simplifiée).

La spécification fonctionnelle complète, y compris les fonctions prévues, est dans [`PROMPT_SPECIFICATION.md`](PROMPT_SPECIFICATION.md).

## Lancer l'application

Prérequis : [Node.js](https://nodejs.org) (version LTS).

Sous Windows, double-cliquez sur **`start.bat`** : il vérifie Node.js, installe les dépendances au premier lancement, démarre le serveur et ouvre le navigateur.

Ou en ligne de commande :

```bash
npm install
npm run dev
```

| Commande | Rôle |
| :-- | :-- |
| `npm run dev` | Serveur de développement (port 5173 par défaut) |
| `npm run build` | Vérification TypeScript puis construction dans `dist/` |
| `npm run preview` | Sert la version construite |

## Diagnostic IA (Gemini)

Le service `src/core/AIService.ts` sait interroger l'API Gemini, mais il n'est pas encore relié à l'interface. Pour l'utiliser, copiez `.env.example` en `.env.local` et renseignez `VITE_GOOGLE_API_KEY`. Cette clé est visible dans le code livré au navigateur : réservez-la à un usage local.

## Structure

```
src/
  core/         calcul solaire, géométrie de la baie, moteur de simulation, service Gemini
  components/   scène 3D, plan 2D, carte
  App.tsx       interface
```

## Limites

Horizon dégagé, ciel clair, pas de masques proches. Les résultats sont des aides à la conception, pas un calcul réglementaire.
