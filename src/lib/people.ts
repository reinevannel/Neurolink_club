/**
 * Portraits du club.
 * Ce sont des exemples clairs, pas de vraies personnes.
 * Chaque fiche dit comment la personne communique, pour éviter les sous-entendus.
 */
import type { NeuroProfile } from "./store";

export interface Person {
  id: string;
  name: string;
  seed: number;
  profile: Exclude<NeuroProfile, "unset">;
  profileFr: string;
  profileEn: string;
  interests: string[];
  roomId: string;
  bioFr: string;
  bioEn: string;
  paceFr: string;
  paceEn: string;
  rulesFr: string[];
  rulesEn: string[];
  openerFr: string;
  openerEn: string;
}

export const PEOPLE: Person[] = [
  {
    id: "lea",
    name: "Léa",
    seed: 5,
    profile: "autisme",
    profileFr: "Autisme",
    profileEn: "Autism",
    interests: ["astronomy", "nature"],
    roomId: "astronomy",
    bioFr: "J'observe le ciel et les oiseaux. Je parle peu, mais j'aime les détails précis.",
    bioEn: "I watch the sky and birds. I speak little, but I like precise details.",
    paceFr: "Je réponds le lendemain, parfois le surlendemain. Ce n'est pas un rejet.",
    paceEn: "I reply the next day, sometimes the day after. That is not a rejection.",
    rulesFr: [
      "Messages courts.",
      "Pas d'appel. Pas de vocal.",
      "Une question à la fois.",
      "Je ne fais pas de small talk.",
    ],
    rulesEn: [
      "Short messages.",
      "No calls. No voice notes.",
      "One question at a time.",
      "I don't do small talk.",
    ],
    openerFr: "Bonjour Léa. J'aime aussi l'astronomie. On peut en parler dans le salon, sans se presser.",
    openerEn: "Hello Léa. I also like astronomy. We can talk about it in the room, with no rush.",
  },
  {
    id: "noa",
    name: "Noa",
    seed: 2,
    profile: "autisme",
    profileFr: "Autisme — profil autrefois appelé Asperger",
    profileEn: "Autism — once called Asperger profile",
    interests: ["coding", "reading", "maps"],
    roomId: "coding",
    bioFr: "Je code et je lis. Les phrases directes me rassurent. Les blagues cachées me perdent.",
    bioEn: "I code and I read. Direct sentences reassure me. Hidden jokes lose me.",
    paceFr: "Je réponds le jour même si j'ai de l'énergie. Sinon, j'écris « plus tard ».",
    paceEn: "I reply the same day if I have energy. Otherwise I write “later”.",
    rulesFr: [
      "Dis exactement ce que tu veux.",
      "Pas d'ironie.",
      "Je peux coller du code. C'est OK.",
      "Si je me tais, je lis encore.",
    ],
    rulesEn: [
      "Say exactly what you want.",
      "No irony.",
      "I may paste code. That is OK.",
      "If I go quiet, I am still reading.",
    ],
    openerFr: "Bonjour Noa. Je cherche des personnes qui codent à leur rythme. Une question simple : quel langage tu utilises ?",
    openerEn: "Hello Noa. I'm looking for people who code at their own pace. One simple question: which language do you use?",
  },
  {
    id: "toma",
    name: "Toma",
    seed: 7,
    profile: "mixte",
    profileFr: "Autisme et TDAH",
    profileEn: "Autism and ADHD",
    interests: ["music", "nature"],
    roomId: "music",
    bioFr: "La musique basse m'aide. Mon énergie change vite. J'ai besoin de pauses sans me justifier.",
    bioEn: "Quiet music helps me. My energy changes fast. I need breaks without explaining.",
    paceFr: "Parfois trois messages d'affilée, puis silence. Les deux sont normaux pour moi.",
    paceEn: "Sometimes three messages in a row, then silence. Both are normal for me.",
    rulesFr: [
      "Pas de « tu es encore là ? ».",
      "On peut parler musique, volume bas.",
      "Je peux partir au milieu d'une phrase.",
    ],
    rulesEn: [
      "No “are you still there?”.",
      "We can talk music, low volume.",
      "I may leave mid-sentence.",
    ],
    openerFr: "Bonjour Toma. Moi aussi mon énergie change. On peut échanger une pièce de piano, sans suite obligatoire.",
    openerEn: "Hello Toma. My energy changes too. We can share one piano piece, with no required follow-up.",
  },
  {
    id: "aria",
    name: "Aria",
    seed: 3,
    profile: "autisme",
    profileFr: "Autisme",
    profileEn: "Autism",
    interests: ["coding", "astronomy", "gaming"],
    roomId: "quiet",
    bioFr: "J'aime les systèmes : code, orbites, règles de jeux. Je pose des questions directes.",
    bioEn: "I like systems: code, orbits, game rules. I ask direct questions.",
    paceFr: "Je réponds quand le message est clair. Un long paragraphe me fatigue.",
    paceEn: "I reply when the message is clear. A long paragraph tires me.",
    rulesFr: [
      "Une idée par message.",
      "Les questions sont bienvenues.",
      "Pas de compliment vague.",
    ],
    rulesEn: [
      "One idea per message.",
      "Questions are welcome.",
      "No vague compliments.",
    ],
    openerFr: "Bonjour Aria. J'ai une question précise sur le ciel, ou sur le code. Tu préfères lequel ?",
    openerEn: "Hello Aria. I have one precise question, about the sky or about code. Which do you prefer?",
  },
  {
    id: "sami",
    name: "Sami",
    seed: 4,
    profile: "dyspraxie",
    profileFr: "Dyspraxie",
    profileEn: "Dyspraxia",
    interests: ["reading", "art", "animals"],
    roomId: "reading",
    bioFr: "J'aime les livres illustrés et les animaux. Les petits boutons me fatiguent. Ici, les cibles sont grandes.",
    bioEn: "I like illustrated books and animals. Tiny buttons tire me. Here, the targets are large.",
    paceFr: "J'écris lentement. Merci de ne pas compléter mes phrases.",
    paceEn: "I type slowly. Please don't finish my sentences.",
    rulesFr: [
      "Pas de visio.",
      "Texte seulement.",
      "Attendre que j'aie fini.",
    ],
    rulesEn: ["No video.", "Text only.", "Wait until I finish."],
    openerFr: "Bonjour Sami. Je lis aussi. Quel livre illustré tu recommandes, en une phrase ?",
    openerEn: "Hello Sami. I read too. Which illustrated book do you recommend, in one sentence?",
  },
  {
    id: "ines",
    name: "Inès",
    seed: 6,
    profile: "autisme",
    profileFr: "Autisme",
    profileEn: "Autism",
    interests: ["trains", "maps"],
    roomId: "quiet",
    bioFr: "Les trains et les cartes sont mon sujet long. Je peux en parler longtemps si tu le demandes clairement.",
    bioEn: "Trains and maps are my long topic. I can talk about them for a while if you ask clearly.",
    paceFr: "Si le sujet m'intéresse, je réponds vite. Sinon, je dis « ce n'est pas mon sujet ».",
    paceEn: "If the topic interests me, I reply fast. Otherwise I say “not my topic”.",
    rulesFr: [
      "Tu peux demander un détail précis.",
      "Ne coupe pas un fait pour changer de sujet.",
      "Pas de moquerie sur l'intensité.",
    ],
    rulesEn: [
      "You can ask for one precise detail.",
      "Don't cut a fact to change the subject.",
      "No teasing about intensity.",
    ],
    openerFr: "Bonjour Inès. J'aimerais un fait sur une ligne de train, ou sur une carte. Lequel tu choisis ?",
    openerEn: "Hello Inès. I'd like one fact about a train line, or about a map. Which do you choose?",
  },
  {
    id: "jules",
    name: "Jules",
    seed: 1,
    profile: "tdah",
    profileFr: "TDAH",
    profileEn: "ADHD",
    interests: ["gaming", "music", "coding"],
    roomId: "focus",
    bioFr: "Je joue et je code par à-coups. Le timer Focus m'aide. Je n'aime pas les discussions sans sujet.",
    bioEn: "I game and code in bursts. The Focus timer helps. I don't like talks with no topic.",
    paceFr: "Je peux disparaître 20 minutes puis revenir. Préviens-moi si tu pars.",
    paceEn: "I may vanish for 20 minutes then come back. Tell me if you leave.",
    rulesFr: [
      "Un sujet nommé au début.",
      "Le silence de travail est OK.",
      "Pas de rappel culpabilisant.",
    ],
    rulesEn: [
      "Name one topic at the start.",
      "Working silence is OK.",
      "No guilty reminders.",
    ],
    openerFr: "Bonjour Jules. Je propose 25 minutes de focus, puis une phrase sur le jeu ou le code.",
    openerEn: "Hello Jules. I suggest 25 minutes of focus, then one sentence about a game or code.",
  },
  {
    id: "camille",
    name: "Camille",
    seed: 8,
    profile: "allie",
    profileFr: "Personne neurotypique — alliée",
    profileEn: "Neurotypical person — ally",
    interests: ["nature", "reading"],
    roomId: "nature",
    bioFr: "Je ne suis pas autiste. Je viens lire et apprendre les règles. Je n'écris pas en premier.",
    bioEn: "I am not autistic. I come to read and learn the rules. I do not write first.",
    paceFr: "Je réponds seulement si on m'adresse la parole, et après avoir relu.",
    paceEn: "I reply only if spoken to, and after re-reading.",
    rulesFr: [
      "Je ne donne pas de conseils non demandés.",
      "Je ne dis pas « tout le monde est un peu autiste ».",
      "Je quitte le salon si on me le demande.",
    ],
    rulesEn: [
      "I don't give unasked advice.",
      "I don't say “everyone is a little autistic”.",
      "I leave the room if asked.",
    ],
    openerFr: "Bonjour Camille. J'ai lu que tu es alliée et que tu n'écris pas en premier. Je te parle ici, dans le Coin Nature, par écrit.",
    openerEn: "Hello Camille. I read that you are an ally and that you don't write first. I'm speaking to you here, in the Nature Nook, in text.",
  },
];

export function getPerson(id: string) {
  return PEOPLE.find((p) => p.id === id);
}

export function sharedInterests(person: Person, mine: string[]) {
  return person.interests.filter((id) => mine.includes(id));
}

/** Plus le score est haut, plus la personne est proche de toi. */
export function matchScore(person: Person, interests: string[], profile: NeuroProfile) {
  const shared = sharedInterests(person, interests).length;
  const same = profile !== "unset" && person.profile === profile ? 3 : 0;
  return shared * 2 + same;
}
