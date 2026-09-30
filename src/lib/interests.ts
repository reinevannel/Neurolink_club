/**
 * Centres d'intérêt (hyperfixations possibles).
 * Chaque intérêt peut faire pousser une plante dans le jardin.
 */
export const INTERESTS = [
  { id: "astronomy", fr: "Astronomie", en: "Astronomy", plant: "flower" as const },
  { id: "music", fr: "Musique", en: "Music", plant: "succulent" as const },
  { id: "nature", fr: "Nature", en: "Nature", plant: "fern" as const },
  { id: "art", fr: "Art créatif", en: "Creative art", plant: "tree" as const },
  { id: "coding", fr: "Programmation", en: "Coding", plant: "mushroom" as const },
  { id: "reading", fr: "Lecture", en: "Reading", plant: "fern" as const },
  { id: "gaming", fr: "Jeux vidéo", en: "Gaming", plant: "mushroom" as const },
  { id: "trains", fr: "Trains", en: "Trains", plant: "tree" as const },
  { id: "maps", fr: "Cartographie", en: "Maps", plant: "flower" as const },
  { id: "animals", fr: "Animaux", en: "Animals", plant: "succulent" as const },
] as const;

export type InterestId = (typeof INTERESTS)[number]["id"];
export type PlantType = (typeof INTERESTS)[number]["plant"];
