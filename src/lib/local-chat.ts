/**
 * Messages des salons, enregistrés dans ce navigateur seulement.
 * Pas de serveur : l'ouverture est immédiate, et rien n'est envoyé ailleurs.
 */
export interface ChatMessage {
  id: string;
  roomId: string;
  author: string;
  seed: number;
  body: string;
  createdAt: string;
}

const KEY = "aethernest-messages-v1";

const SEEDS: Record<string, { author: string; seed: number; body: string }[]> = {
  quiet: [
    {
      author: "Aether",
      seed: 0,
      body: "Bienvenue dans le Salon Calme. On écrit à son rythme. Pas d'obligation de répondre.",
    },
    {
      author: "Aria",
      seed: 3,
      body: "Bonsoir. J'aime cet espace : il n'y a pas de pression.",
    },
  ],
  support: [
    {
      author: "Aether",
      seed: 0,
      body: "Cercle de soutien. Tu peux raconter ta journée, ou seulement lire.",
    },
    {
      author: "Toma",
      seed: 7,
      body: "Aujourd'hui j'ai eu besoin de trois pauses. C'est déjà beaucoup, et c'est OK.",
    },
  ],
  nature: [
    {
      author: "Léa",
      seed: 5,
      body: "Un merle s'est posé sur le rebord. Trois notes, puis le silence.",
    },
  ],
  reading: [
    {
      author: "Noa",
      seed: 2,
      body: "Je relis un chapitre lentement. Une page à la fois.",
    },
  ],
  focus: [
    {
      author: "Aether",
      seed: 0,
      body: "Salle Focus. Un cycle = 25 minutes. Tu peux juste écrire « je commence ».",
    },
  ],
  astronomy: [
    {
      author: "Léa",
      seed: 5,
      body: "J'ai observé Jupiter hier soir.",
    },
    {
      author: "Aria",
      seed: 3,
      body: "Tu as vu ses lunes ?",
    },
    {
      author: "Noa",
      seed: 2,
      body: "Io et Europe, avec ma lunette. Un petit disque pâle, très net.",
    },
  ],
  music: [
    {
      author: "Toma",
      seed: 7,
      body: "Piano seul, volume bas. Ça m'aide à entrer dans la pièce.",
    },
  ],
  coding: [
    {
      author: "Aria",
      seed: 3,
      body: "Autodidacte ici. Les questions simples sont les bienvenues.",
    },
    {
      author: "Noa",
      seed: 2,
      body: "Je bloque sur un useEffect. Je peux coller dix lignes ?",
    },
  ],
};

type Store = Record<string, ChatMessage[]>;

function readStore(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* quota / private mode */
  }
}

export function listLocalMessages(roomId: string): ChatMessage[] {
  const store = readStore();
  const existing = store[roomId];
  if (existing && existing.length > 0) return existing;
  const seeded = (SEEDS[roomId] ?? [
    { author: "Aether", seed: 0, body: "Salon ouvert. Tu peux écrire quand tu veux." },
  ]).map((row, index) => ({
    id: `seed-${roomId}-${index}`,
    roomId,
    author: row.author,
    seed: row.seed,
    body: row.body,
    createdAt: new Date(Date.now() - (12 - index) * 60_000).toISOString(),
  }));
  store[roomId] = seeded;
  writeStore(store);
  return seeded;
}

export function appendLocalMessage(input: {
  roomId: string;
  author: string;
  seed: number;
  body: string;
}): ChatMessage {
  const store = readStore();
  const list = store[input.roomId] ?? listLocalMessages(input.roomId);
  const message: ChatMessage = {
    id: `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    roomId: input.roomId,
    author: input.author.slice(0, 24),
    seed: input.seed,
    body: input.body.replace(/\s+/g, " ").trim().slice(0, 400),
    createdAt: new Date().toISOString(),
  };
  store[input.roomId] = [...list, message].slice(-200);
  writeStore(store);
  return message;
}
