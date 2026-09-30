/**
 * Scripts sociaux : phrases prêtes, jamais obligatoires.
 * Elles aident quand on ne sait pas comment commencer.
 */
export const SOCIAL_SCRIPTS = [
  {
    id: "hello",
    situationFr: "Arriver dans un salon",
    situationEn: "Joining a room",
    phrases: [
      { fr: "Bonjour. Je viens d'arriver, je lis un moment.", en: "Hi. I just arrived, I'll read for a bit." },
      { fr: "Bonjour. Je suis curieux·se de vos échanges.", en: "Hi. I'm curious about your conversation." },
      { fr: "Salut. Je n'ai pas grand-chose à dire, je reste un peu.", en: "Hi. I don't have much to say, I'll stay a while." },
    ],
  },
  {
    id: "clarify",
    situationFr: "Je n'ai pas compris un message",
    situationEn: "I didn't understand a message",
    phrases: [
      { fr: "Je voudrais mieux comprendre — peux-tu reformuler ?", en: "I'd like to understand better — could you rephrase?" },
      { fr: "Est-ce que tu parles au premier degré ?", en: "Are you speaking literally?" },
      { fr: "Je prends un moment avant de répondre.", en: "I'm taking a moment before responding." },
    ],
  },
  {
    id: "pause",
    situationFr: "Je me sens dépassé·e",
    situationEn: "I feel overwhelmed",
    phrases: [
      { fr: "Je vais passer en lecture seule un moment.", en: "I'll switch to read-only for a moment." },
      { fr: "J'ai besoin d'une pause, je reviens plus tard.", en: "I need a break, I'll come back later." },
      { fr: "Je sors en douceur. Merci pour l'échange.", en: "I'm leaving gently. Thanks for the chat." },
    ],
  },
  {
    id: "topic",
    situationFr: "Changer de sujet clairement",
    situationEn: "Changing topic clearly",
    phrases: [
      { fr: "Nouveau sujet : j'aimerais parler de…", en: "New topic: I'd like to talk about…" },
      { fr: "Est-ce que quelqu'un peut me résumer le fil ?", en: "Could someone summarise the thread for me?" },
      { fr: "Je reviens à ce que tu as dit plus tôt :", en: "Going back to what you said earlier:" },
    ],
  },
];
