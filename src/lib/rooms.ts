/**
 * Catalogue des salons du club.
 * energy: "low" = toujours visible, même batterie faible.
 */
export type RoomEnergy = "low" | "medium";

export interface ClubRoom {
  id: string;
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
  energy: RoomEnergy;
  capacity: number;
  topicFr: string;
  topicEn: string;
  companion: boolean;
}

export const ROOMS: ClubRoom[] = [
  {
    id: "quiet",
    nameFr: "Salon Calme",
    nameEn: "Quiet Lounge",
    descFr: "Texte uniquement. Silence. Rythme lent.",
    descEn: "Text only. Silence. Slow pace.",
    energy: "low",
    capacity: 12,
    topicFr: "Ici on écrit sans se presser. Pas d'obligation de répondre.",
    topicEn: "Write at your own pace. No need to reply.",
    companion: true,
  },
  {
    id: "support",
    nameFr: "Cercle de soutien",
    nameEn: "Support circle",
    descFr: "Partage d'expériences TND, écoute sans conseil forcé.",
    descEn: "Share ND experiences, listen without forced advice.",
    energy: "low",
    capacity: 10,
    topicFr: "Tu peux raconter ta journée, ou juste lire.",
    topicEn: "You can share your day, or just read.",
    companion: true,
  },
  {
    id: "nature",
    nameFr: "Coin Nature",
    nameEn: "Nature Nook",
    descFr: "Plantes, oiseaux, météo, balades.",
    descEn: "Plants, birds, weather, walks.",
    energy: "low",
    capacity: 14,
    topicFr: "Qu'as-tu remarqué dehors aujourd'hui ?",
    topicEn: "What did you notice outside today?",
    companion: false,
  },
  {
    id: "reading",
    nameFr: "Coin Lecture",
    nameEn: "Reading Corner",
    descFr: "Livres, BD, articles. Citations bienvenues.",
    descEn: "Books, comics, articles. Quotes welcome.",
    energy: "low",
    capacity: 12,
    topicFr: "Quel livre t'accompagne en ce moment ?",
    topicEn: "What book is keeping you company?",
    companion: false,
  },
  {
    id: "focus",
    nameFr: "Salle Focus",
    nameEn: "Focus Room",
    descFr: "Co-travail silencieux + timer Pomodoro.",
    descEn: "Silent co-working + Pomodoro timer.",
    energy: "low",
    capacity: 8,
    topicFr: "On travaille côte à côte, sans bavarder.",
    topicEn: "We work side by side, without chatting.",
    companion: false,
  },
  {
    id: "astronomy",
    nameFr: "Club Astronomie",
    nameEn: "Astronomy Club",
    descFr: "Ciel, planètes, observation.",
    descEn: "Sky, planets, stargazing.",
    energy: "medium",
    capacity: 20,
    topicFr: "Jupiter, les lunes, les nébuleuses…",
    topicEn: "Jupiter, moons, nebulae…",
    companion: false,
  },
  {
    id: "music",
    nameFr: "Salon Musique",
    nameEn: "Music Lounge",
    descFr: "Partage d'écoute, instruments, playlists.",
    descEn: "Listening, instruments, playlists.",
    energy: "medium",
    capacity: 15,
    topicFr: "Quelle pièce t'apaise en ce moment ?",
    topicEn: "What piece soothes you right now?",
    companion: false,
  },
  {
    id: "coding",
    nameFr: "Club Code",
    nameEn: "Code Club",
    descFr: "Apprendre ensemble, autodidactes bienvenus.",
    descEn: "Learn together, self-taught welcome.",
    energy: "medium",
    capacity: 16,
    topicFr: "Questions, bugs, projets perso — sans jugement.",
    topicEn: "Questions, bugs, side projects — no judgement.",
    companion: false,
  },
];

export function getRoom(id: string): ClubRoom | undefined {
  return ROOMS.find((r) => r.id === id);
}

export const ROOM_IDS = ROOMS.map((r) => r.id);
