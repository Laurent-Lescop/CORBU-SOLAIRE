# HÉLIOS-SIM — Spécification Fonctionnelle & Prompt Système Détaillé

> **Version :** 2.6  
> **Domaine :** Architecture environnementale, géométrie solaire astronomique, simulation bioclimatique et Facteur Lumière Jour (FLJ).  
> **Destinataire :** Architectes, ingénieurs environnementaux, étudiants et concepteurs bioclimatiques.

---

## 1. Rôle et Identité du Modèle d'IA (System Prompt)

```text
Tu es un expert reconnu en architecture environnementale et conception bioclimatique, spécialisé dans l'ensoleillement, la géométrie céleste, le rayonnement thermique solaire et l'éclairage naturel (Facteur Lumière Jour - FLJ).

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
   - 3. Optimisations Architecturales (protections solaires, dimensionnement de débords, adaptation de format).
```

---

## 2. Géométrie Architecturale de Référence (Baseline)

La simulation repose sur une cellule spatiale unitaire standardisée :

| Paramètre | Valeur standard | Note architecturale |
| :--- | :---: | :--- |
| **Largeur ($X$)** | **$4,00\text{ m}$** | Largeur libre de façade |
| **Profondeur ($Y$)** | **$4,00\text{ m}$** | Éloignement par rapport à la paroi vitrée |
| **Hauteur sous plafond ($Z$)** | **$2,50\text{ m}$** | Hauteur sous dalle standard européenne |
| **Surface de dalle ($S_{sol}$)** | **$16,00\text{ m²}$** | $4,0\text{ m} \times 4,0\text{ m}$ |
| **Volume habitable ($V$)** | **$40,00\text{ m³}$** | $16,0\text{ m²} \times 2,5\text{ m}$ |
| **Surface de la paroi vitrée ($S_{mur}$)** | **$10,00\text{ m²}$** | $4,0\text{ m} \times 2,5\text{ m}$ |
| **Hypothèse d'environnement** | **Horizon libre** | Aucun masque solaire lointain, ciel CIE dégagé |
| **Localisation par défaut** | **Nantes, France** | Lat : $47,2184^\circ\text{ N}$, Long : $-1,5536^\circ\text{ O}$ |

---

## 3. Matrice des Proportions et Typologies de Vitrage

L'application permet d'étudier l'impact de trois ratios de vitrage par rapport à la surface du mur (**$10,00\text{ m²}$**), déclinés en quatre formats morphologiques pour chacun :

### A. Taux de 50 % de la paroi — Surface vitrée fixe de $5,00\text{ m²}$ ($S_w / S_{sol} = 31,25\%$)
1. **Carré (1:1)** : $2,24\text{ m} \times 2,24\text{ m}$  
   *Allège : $0,13\text{ m}$ \| Linteau : $0,13\text{ m}$ \| Écoinçons latéraux : $0,88\text{ m}$*
2. **Panoramique (Bandeau 2,5:1)** : $3,57\text{ m} \times 1,40\text{ m}$  
   *Allège : $0,55\text{ m}$ (ou $1,00\text{ m}$ en position haute) \| Linteau : $0,55\text{ m}$ \| Occupe $89\%$ de la largeur*
3. **Vertical (Toute Hauteur 1:1,2)** : $2,04\text{ m} \times 2,45\text{ m}$  
   *Allège : $0,025\text{ m}$ \| Linteau : $0,025\text{ m}$ \| Baie sol-plafond sur $98\%$ de la hauteur*
4. **Vertical Jumelé (2 baies 1:2,3)** : $2 \times (1,05\text{ m} \times 2,38\text{ m})$  
   *Deux lancettes jumelées côte à côte avec trumeau central*

### B. Taux de 33 % de la paroi (1/3) — Surface vitrée fixe de $3,33\text{ m²}$ ($S_w / S_{sol} = 20,8\%$)
*(Optimum bioclimatique standard RE2020)*
1. **Carré (1:1)** : $1,83\text{ m} \times 1,83\text{ m}$
2. **Panoramique (Bandeau 3,3:1)** : $3,33\text{ m} \times 1,00\text{ m}$
3. **Vertical (Toute Hauteur 1:1,7)** : $1,39\text{ m} \times 2,40\text{ m}$
4. **Vertical Jumelé (2 baies 1:3,4)** : $2 \times (0,70\text{ m} \times 2,38\text{ m})$

### C. Taux de 25 % de la paroi (1/4) — Surface vitrée fixe de $2,50\text{ m²}$ ($S_w / S_{sol} = 15,6\%$)
*(Protection thermique renforcée contre les surchauffes d'été)*
1. **Carré (1:1)** : $1,58\text{ m} \times 1,58\text{ m}$
2. **Panoramique (Bandeau 3,9:1)** : $3,12\text{ m} \times 0,80\text{ m}$
3. **Vertical (Toute Hauteur 1:2,3)** : $1,05\text{ m} \times 2,38\text{ m}$
4. **Vertical Jumelé (2 baies 1:4,1)** : $2 \times (0,55\text{ m} \times 2,27\text{ m})$

---

## 4. Modèle Mathématique & Algorithmes de Calcul

### 4.1. Position Solaire Astronomique (Algorithme NOAA)
Pour un jour de l'année $d \in [1, 365]$ et une heure solaire $t \in [0, 24]$ :
- **Déclinaison solaire ($\delta$) :**
  $$\delta = 23{,}45^\circ \cdot \sin\left(\frac{360^\circ}{365} \cdot (d - 80)\right)$$
- **Angle horaire ($H$) :**
  $$H = (t - 12) \cdot 15^\circ$$
- **Hauteur solaire ($h$) :**
  $$\sin(h) = \sin(\phi) \cdot \sin(\delta) + \cos(\phi) \cdot \cos(\delta) \cdot \cos(H)$$
- **Azimut solaire ($A$) (convention $0^\circ = \text{Nord}, 90^\circ = \text{Est}, 180^\circ = \text{Sud}, 270^\circ = \text{Ouest}$) :**
  $$\cos(A) = \frac{\sin(h) \cdot \sin(\phi) - \sin(\delta)}{\cos(h) \cdot \cos(\phi)}$$
  *(Calcul sécurisé par fonction `atan2` avec quadrant correct)*

### 4.2. Pénétration Solaire Théorique
Pour une tête de fenêtre située à une hauteur $z_{high}$ au-dessus du sol :
$$D = z_{high} \cdot \tan(90^\circ - h) = \frac{z_{high}}{\tan(h)}$$

### 4.3. Projection Vectorielle de la Tache Solaire sur la Dalle
Pour chaque coin de fenêtre $(x_w, z_w)$ sur le plan du mur :
- Azimut relatif de l'incidence : $\theta_{rel} = A_{soleil} - A_{mur}$
- Condition d'exposition directe : $h > 0{,}5^\circ$ et $\cos(\theta_{rel}) > 0$
- Coordonnées de projection au sol $(x_f, y_f)$ :
  $$y_f = z_w \cdot \cos(\theta_{rel}) \cdot \cot(h)$$
  $$x_f = x_w - z_w \cdot \sin(\theta_{rel}) \cdot \cot(h)$$

### 4.4. Facteur Lumière Jour (FLJ) Moyen Estimé
Selon la formule de corrélation simplifiée CSTB / BRE :
$$\text{FLJ}_{moyen} \approx \frac{S_w \cdot \tau_{v} \cdot \theta}{S_{totale} \cdot (1 - R)}$$
- Pour $50\%$ de vitrage ($5,00\text{ m²}$) : $\text{FLJ} \approx 2{,}8\%$ *(Lumière abondante)*
- Pour $33\%$ de vitrage ($3,33\text{ m²}$) : $\text{FLJ} \approx 1{,}9\%$ *(Équilibre optimal)*
- Pour $25\%$ de vitrage ($2,50\text{ m²}$) : $\text{FLJ} \approx 1{,}4\%$ *(Éclairement doux)*

---

## 5. Architecture de l'Interface Utilisateur (UI High Density)

L'application adopte une charte graphique **High Density** inspirée des logiciels de CAO/BIM professionnels (ArchiCAD, Revit, Dialux) :

### 5.1. Header de Contrôle & Télémesure
- Titre : `HÉLIOS-SIM v2.6 | Moteur de Calcul Bioclimatique`
- Badges d'état : Localisation active, statut temps réel actif, modèle astronomique NOAA.

### 5.2. Barre Latérale de Configuration (Sidebar)
1. **Localisation & Orientation :**
   - Villes préréglées (Nantes, Paris, Marseille, Strasbourg, Brest, Nice, Toulouse).
   - Mode coordonnées libres (Latitude / Longitude personnalisées).
   - Sélecteur d'orientation cardinale (Sud, Est, Ouest, Nord, Sud-Est, Sud-Ouest) + Curseur d'azimut libre de $0^\circ$ à $360^\circ$.
2. **Vitrage : Surface & Proportions :**
   - Sélecteur de proportion : **$50\%$**, **$33\%$**, **$25\%$** de la paroi.
   - Sélecteur de typologie : *Carré*, *Panoramique*, *Vertical*, *Vertical Jumelé*.
   - Position sur la paroi : *Centrée*, *Gauche*, *Droite*, *Haute*, *Basse*.
   - **Élévation de Façade Interactive :** Vue de face $4{,}0\text{ m} \times 2{,}5\text{ m}$ avec cotes millimétrées (largeur, hauteur, allège, linteau) et ratio en direct.
   - Fiche technique volumétrique (volume, surfaces, taux d'ouverture sol).
3. **Temporel & Saisons :**
   - Préréglages saisonniers rapides (Solstice d'Hiver, Équinoxe de Printemps, Solstice d'Été, Équinoxe d'Automne).
   - Date précise (calendrier) et heure solaire (06:00 à 19:00).
   - Zone de note architecturale libre pour enrichir le prompt de diagnostic.
   - Bouton d'action : `Lancer le Diagnostic Expert (IA Gemini)`.

### 5.3. Espace Central de Simulation Multi-Vues
- **Sélecteur de mode d'affichage :**
  - `Vue 3D Volumétrique` : Modélisation spatiale 3D interactive complète.
  - `Plan 2D Sol` : Projection cartésienne de la dalle avec quadrillage métrique et contour de la tache.
  - `Double Vue (3D + 2D)` : Affichage synchrone côte-à-côte.
- **Fonctionnalités de la Vue 3D (Three.js WebGL) :**
  - Héliodon céleste 3D : arc solaire de la journée avec repères horaires (08h, 10h, 12h, 14h, 16h, 18h).
  - Éclairage directionnel temps réel avec ombres portées douces (PCF Soft Shadows).
  - Faisceau solaire volumétrique doré traversant la fenêtre.
  - Calques activables : Faisceau solaire, Arc Héliodon, Murs translucides, Échelle humaine ($1{,}75\text{ m}$) & bureau, Carte FLJ au sol en fausses couleurs.
  - Plafond commutable : *Ouvert*, *Semi-transparent*, *Fermé*.
  - Préréglages caméra : *Isométrie*, *Perspective intérieure (hauteur des yeux $1{,}40\text{ m}$)*, *Coupe façade*, *Vue zénithale*.
  - Timeline d'animation horaire avec bouton Lecture/Pause et vitesses 1x, 2x, 4x.
- **Cartographie Saisonnier ASCII Art :**
  - Matrices $4 \times 4$ de la dalle pour midi solaire ($12\text{h}$) à chaque saison (`[*]` soleil direct, `[.]` ombre, `[W]` mur vitré).
- **Tableau Astronomique des 4 Moments Clés :**
  - 12 configurations testées (4 saisons $\times$ 3 heures clés : 09:00, 12:00, 16:00) avec altitude, azimut et statut de pénétration.
  - Clic interactif sur chaque ligne pour charger instantanément la simulation en 3D.
- **Rapport de Diagnostic Architectural :**
  - Diagnostic rédigé en direct par le modèle `gemini-2.5-flash` ou le moteur heuristique autonome.
  - Badge de traçabilité (Gemini 2.5 Flash vs Algorithme autonome).

---

## 6. Schéma de Données de l'API (`/api/diagnostic`)

```json
{
  "location": {
    "name": "Nantes",
    "lat": 47.2184,
    "lng": -1.5536
  },
  "orientation": {
    "label": "Sud (Recommandé Bioclimatique)",
    "azimuth": 180
  },
  "windowRatio": {
    "percentage": "33%",
    "area": "3.33 m²",
    "ratioLabel": "33 % de la paroi"
  },
  "windowFormat": {
    "label": "Panoramique (Bandeau)",
    "dimensions": "3.33m × 1.00m (3.33 m²)"
  },
  "windowPosition": {
    "label": "Centrée (Standard)"
  },
  "date": "2026-03-21",
  "time": "12:00",
  "solarGeometryTable": [
    {
      "moment": "Solstice d'Été (21 Juin)",
      "heure": "12:00",
      "hauteur": "66.2°",
      "azimut": "180.0°",
      "statut": "Pénétration faible (1.05m)"
    }
  ],
  "customPrompt": "Projet de bureau d'études nécessitant un fort confort visuel sur écran."
}
```

---

## 7. Exemple de Diagnostic Bioclimatique Généré

```markdown
## Configuration Summary
La pièce étudiée (4.0m x 4.0m x 2.5m) est implantée à Nantes et dispose d'une façade vitrée orientée plein Sud (Azimut 180°). La baie adopte une proportion de 33 % de la paroi (3.33 m²) au format Panoramique bandeau (3.33m x 1.00m), positionnée au centre de la paroi.

## Solar Geometry Data Analysis
À cette latitude (47.2° N) et plein Sud, le soleil culmine à 66.2° au solstice d'été et descend à 19.3° au solstice d'hiver à midi. L'angle d'incidence est idéalement perpendiculaire en hiver et très rasant en été, créant une régulation thermique naturelle favorable.

## Architectural Diagnostic & Recommendations
### 1. Confort Thermique & Taux de Vitrage (33%)
Le choix d'un ratio de 33 % (3.33 m²) est exemplaire : il respecte les recommandations de sobriété de la RE2020. En hiver, les apports solaires pénètrent profondément (jusqu'à 4.5m) et chauffent la masse de la dalle. En été, le soleil haut limite l'échauffement direct sur ce vitrage vertical.

### 2. Confort Visuel & Éclairement
Le format bandeau horizontal (3.33m de large) diffuse la lumière de manière remarquablement homogène sur toute la largeur de la pièce. Le FLJ moyen d'environ 1.9 % assure un niveau d'éclairage naturel confortable tout en évitant les éblouissements violents causés par les baies toute hauteur.

### 3. Optimisations Architecturales
- **Protection solaire :** Installer un débord de toit horizontal ou un auvent de 65 cm suffira à intercepter 100 % des rayons directs du 15 mai au 15 août.
- **Occultation :** Prévoir des stores vénitiens extérieurs orientables (BSO) pour gérer les apports aux équinoxes (avril et septembre).
```
