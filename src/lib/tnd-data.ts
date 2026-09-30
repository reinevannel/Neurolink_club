/**
 * Ressources TND — langage simple, orienté besoins et forces.
 * Ce n'est pas un diagnostic. C'est un guide pour se comprendre.
 */
import type { Lang } from "./i18n";

export interface TndCard {
  id: string;
  color: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  rooms: string[];
  traitsFr: string[];
  traitsEn: string[];
  dailyFr: string[];
  dailyEn: string[];
  strengthsFr: string[];
  strengthsEn: string[];
  nestFr: string[];
  nestEn: string[];
  tipsFr: string[];
  tipsEn: string[];
}

export const TND_CARDS: TndCard[] = [
  {
    id: "autisme",
    color: "#7AB8C8",
    titleFr: "Autisme",
    titleEn: "Autism",
    subtitleFr: "Y compris ce qu'on appelait le syndrome d'Asperger",
    subtitleEn: "Including what was once called Asperger syndrome",
    rooms: ["quiet", "astronomy", "coding", "nature"],
    traitsFr: [
      "Perception sensorielle amplifiée (bruit, lumière, textures)",
      "Besoin de routines et de prévisibilité",
      "Difficulté à décoder les implicites sociaux",
      "Pensée logique, précise, structurée",
      "Centres d'intérêt intenses (hyperfixations)",
      "Fatigue sociale rapide",
    ],
    traitsEn: [
      "Amplified sensory perception (noise, light, textures)",
      "Need for routines and predictability",
      "Difficulty decoding social subtext",
      "Logical, precise, structured thinking",
      "Intense special interests",
      "Rapid social fatigue",
    ],
    dailyFr: [
      "Surcharge sensorielle ou émotionnelle",
      "Malentendus sociaux fréquents",
      "Besoin de pauses régulières",
      "Difficulté à gérer les imprévus",
    ],
    dailyEn: [
      "Sensory or emotional overload",
      "Frequent social misunderstandings",
      "Need for regular breaks",
      "Difficulty handling the unexpected",
    ],
    strengthsFr: [
      "Créativité atypique et originale",
      "Honnêteté, fiabilité, loyauté",
      "Capacité d'analyse profonde",
      "Sens du détail exceptionnel",
    ],
    strengthsEn: [
      "Atypical, original creativity",
      "Honesty, reliability, loyalty",
      "Deep analytical capacity",
      "Exceptional eye for detail",
    ],
    nestFr: [
      "Salon Calme : texte seul, pas de pression de répondre",
      "Sortie douce : tu pars sans t'expliquer",
      "Pont de communication : reformuler un message avant d'envoyer",
      "Mode Surcharge : écran minimal + respiration",
    ],
    nestEn: [
      "Quiet Lounge: text only, no pressure to reply",
      "Gentle exit: leave without explaining",
      "Communication bridge: rephrase before sending",
      "Overload mode: minimal screen + breathing",
    ],
    tipsFr: [
      "Annonce tes règles : « je réponds plus tard », c'est OK.",
      "Un salon à la fois. Fermer les autres onglets aide.",
      "Si le fil est trop rapide, passe en lecture seule.",
    ],
    tipsEn: [
      "State your rules: “I'll reply later” is OK.",
      "One room at a time. Closing other tabs helps.",
      "If the thread is too fast, switch to read-only.",
    ],
  },
  {
    id: "tdah",
    color: "#F4A261",
    titleFr: "TDAH",
    titleEn: "ADHD",
    subtitleFr: "Trouble de l'attention, avec ou sans hyperactivité",
    subtitleEn: "Attention deficit, with or without hyperactivity",
    rooms: ["focus", "music", "coding"],
    traitsFr: [
      "Attention fluctuante, difficile à maintenir",
      "Impulsivité ou agitation interne",
      "Difficulté à organiser les tâches",
      "Hyperfocus sur ce qui passionne",
      "Besoin de stimulation intéressante",
    ],
    traitsEn: [
      "Fluctuating, hard-to-sustain attention",
      "Impulsivity or internal restlessness",
      "Difficulty organising tasks",
      "Hyperfocus on passionate topics",
      "Need for interesting stimulation",
    ],
    dailyFr: [
      "Procrastination involontaire",
      "Difficulté à suivre une routine",
      "Surcharge mentale fréquente",
      "Messages envoyés trop vite",
    ],
    dailyEn: [
      "Involuntary procrastination",
      "Difficulty following routines",
      "Frequent mental overload",
      "Messages sent too fast",
    ],
    strengthsFr: [
      "Créativité spontanée",
      "Pensée associative rapide",
      "Énergie et enthousiasme",
      "Innovation hors-cadre",
    ],
    strengthsEn: [
      "Spontaneous creativity",
      "Fast associative thinking",
      "Energy and enthusiasm",
      "Out-of-the-box innovation",
    ],
    nestFr: [
      "Salle Focus : Pomodoro 25 min, une seule tâche",
      "Relire 5 secondes avant d'envoyer (bouton Pause)",
      "Intérêts : le club te range près de tes hyperfixations",
    ],
    nestEn: [
      "Focus Room: 25-min Pomodoro, one task",
      "Re-read 5 seconds before sending (Pause button)",
      "Interests: the club sits you near your hyperfixations",
    ],
    tipsFr: [
      "Écris le message, attends un cycle de respiration, puis envoie.",
      "Le timer Focus n'est pas une punition : c'est un rail.",
      "Coupe les notifications. Ici, elles sont off par défaut.",
    ],
    tipsEn: [
      "Write the message, take one breath cycle, then send.",
      "The Focus timer is a rail, not a punishment.",
      "Turn notifications off. Here, they are off by default.",
    ],
  },
  {
    id: "tdc",
    color: "#6B9B7E",
    titleFr: "TDC / Dyspraxie",
    titleEn: "DCD / Dyspraxia",
    subtitleFr: "Trouble du développement de la coordination",
    subtitleEn: "Developmental coordination disorder",
    rooms: ["quiet", "reading", "music"],
    traitsFr: [
      "Gestes fins plus coûteux (écriture, souris précise)",
      "Fatigue rapide sur les tâches physiques",
      "Organisation spatiale parfois difficile",
    ],
    traitsEn: [
      "Fine motor tasks cost more (writing, precise mouse)",
      "Quick fatigue on physical tasks",
      "Spatial organisation can be harder",
    ],
    dailyFr: [
      "Frustration si l'interface est trop petite",
      "Besoin de grandes cibles cliquables",
    ],
    dailyEn: [
      "Frustration if the interface is too small",
      "Need for large clickable targets",
    ],
    strengthsFr: [
      "Stratégies créatives pour contourner les obstacles",
      "Pensée visuelle souvent forte",
      "Résilience développée",
    ],
    strengthsEn: [
      "Creative workarounds",
      "Often strong visual thinking",
      "Developed resilience",
    ],
    nestFr: [
      "Boutons ≥ 44 px, partout",
      "Taille du texte réglable (Aa / Aa+ / Aa++)",
      "Pas de gestes complexes (pas de drag obligatoire)",
    ],
    nestEn: [
      "Buttons ≥ 44 px, everywhere",
      "Adjustable text size (Aa / Aa+ / Aa++)",
      "No complex gestures (no required drag)",
    ],
    tipsFr: [
      "Utilise le clavier : Tab pour avancer, Entrée pour envoyer.",
      "Agrandis le texte dès l'accueil si tu lis plus facilement.",
    ],
    tipsEn: [
      "Use the keyboard: Tab to move, Enter to send.",
      "Enlarge text from the start if it helps reading.",
    ],
  },
  {
    id: "dysphasie",
    color: "#C87A9B",
    titleFr: "Dysphasie / TDL",
    titleEn: "DLD / Dysphasia",
    subtitleFr: "Trouble développemental du langage",
    subtitleEn: "Developmental language disorder",
    rooms: ["quiet", "support", "nature"],
    traitsFr: [
      "Plus de temps pour formuler ou comprendre",
      "Fatigue lors des échanges longs",
      "Les implicites et l'ironie sont coûteux",
    ],
    traitsEn: [
      "More time needed to formulate or understand",
      "Fatigue during long exchanges",
      "Subtext and irony are costly",
    ],
    dailyFr: [
      "Malentendus fréquents",
      "Peur de « mal dire »",
    ],
    dailyEn: [
      "Frequent misunderstandings",
      "Fear of saying it “wrong”",
    ],
    strengthsFr: [
      "Pensée imagée souvent riche",
      "Communication non verbale développée",
    ],
    strengthsEn: [
      "Often rich imagistic thinking",
      "Developed non-verbal communication",
    ],
    nestFr: [
      "Phrases prêtes (scripts sociaux)",
      "Pont IA : « aider à formuler » avant d'envoyer",
      "Messages courts valorisés, pas la longueur",
    ],
    nestEn: [
      "Ready phrases (social scripts)",
      "AI bridge: “help me phrase this” before sending",
      "Short messages are valued, not length",
    ],
    tipsFr: [
      "Un message = une idée. Tu peux en envoyer plusieurs.",
      "Le bouton « formuler » n'est pas de la triche. C'est un outil.",
    ],
    tipsEn: [
      "One message = one idea. You can send several.",
      "The “help me phrase” button is a tool, not cheating.",
    ],
  },
  {
    id: "dys",
    color: "#C4A87A",
    titleFr: "Dyslexie / Dysorthographie",
    titleEn: "Dyslexia",
    subtitleFr: "Traitement du langage écrit différent",
    subtitleEn: "A different way of processing written language",
    rooms: ["quiet", "music", "nature"],
    traitsFr: [
      "Lecture plus lente, plus coûteuse",
      "L'orthographe n'est pas un miroir de l'intelligence",
      "Fatigue visuelle sur les longs blocs",
    ],
    traitsEn: [
      "Slower, more costly reading",
      "Spelling is not a mirror of intelligence",
      "Visual fatigue on long blocks",
    ],
    dailyFr: [
      "Peur d'être jugé·e sur l'écrit",
      "Évitement des chats rapides",
    ],
    dailyEn: [
      "Fear of being judged on writing",
      "Avoiding fast chats",
    ],
    strengthsFr: [
      "Raisonnement souvent global et visuel",
      "Créativité narrative",
    ],
    strengthsEn: [
      "Often global, visual reasoning",
      "Narrative creativity",
    ],
    nestFr: [
      "Police Atkinson Hyperlegible (conçue pour la lisibilité)",
      "Texte aéré, contrasté, jamais justifié",
      "Aucune correction rouge humiliante",
    ],
    nestEn: [
      "Atkinson Hyperlegible typeface (designed for readability)",
      "Airy, contrasted text, never justified",
      "No humiliating red spellcheck",
    ],
    tipsFr: [
      "Écris comme tu parles. Personne ne note l'orthographe ici.",
      "Augmente la taille du texte. C'est fait pour ça.",
    ],
    tipsEn: [
      "Write the way you speak. Nobody grades spelling here.",
      "Increase the text size. That's what it's for.",
    ],
  },
];

export function getTnd(id: string): TndCard | undefined {
  return TND_CARDS.find((c) => c.id === id);
}

export const IMPACTS = [
  {
    id: "surcharge",
    titleFr: "Surcharge sensorielle",
    titleEn: "Sensory overload",
    triggersFr: "Bruit, lumière vive, foule, imprévus, multitâche",
    triggersEn: "Noise, bright light, crowds, surprises, multitasking",
    effectsFr: "Fatigue, shutdown, irritabilité, retrait",
    effectsEn: "Fatigue, shutdown, irritability, withdrawal",
    featureFr: "Mode Surcharge · Jardin · Respiration",
    featureEn: "Overload Mode · Garden · Breathing",
  },
  {
    id: "fatigue",
    titleFr: "Fatigue sociale",
    titleEn: "Social fatigue",
    triggersFr: "Interactions longues, groupes, discussions complexes",
    triggersEn: "Long interactions, groups, complex talks",
    effectsFr: "Batterie à plat, besoin de solitude",
    effectsEn: "Depleted battery, need for solitude",
    featureFr: "Batterie sociale · Lecture seule · Sortie douce",
    featureEn: "Social battery · Read-only · Gentle exit",
  },
  {
    id: "implicites",
    titleFr: "Implicites difficiles",
    titleEn: "Hard-to-read subtext",
    triggersFr: "Humour, ironie, règles floues",
    triggersEn: "Humour, irony, vague rules",
    effectsFr: "Stress, malentendus, anxiété",
    effectsEn: "Stress, misunderstandings, anxiety",
    featureFr: "Scripts sociaux · Pont de communication",
    featureEn: "Social scripts · Communication bridge",
  },
  {
    id: "routines",
    titleFr: "Besoin de routines",
    titleEn: "Need for routines",
    triggersFr: "Imprévus, changements rapides",
    triggersEn: "Unexpected events, rapid change",
    effectsFr: "Perte de repères, stress",
    effectsEn: "Lost landmarks, stress",
    featureFr: "Salons stables · Mode Focus",
    featureEn: "Stable rooms · Focus Mode",
  },
];

export function tndTitle(card: TndCard, lang: Lang) {
  return lang === "fr" ? card.titleFr : card.titleEn;
}
