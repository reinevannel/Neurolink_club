/**
 * État du club (côté navigateur).
 *
 * On enregistre les préférences dans localStorage.
 * Rien de personnel : pseudo, intérêts, réglages sensoriels.
 *
 * Comment lire ce fichier :
 *  1. `ClubState` décrit les données
 *  2. `useClub()` permet de les lire / modifier dans un composant
 *  3. `hydrateClub()` charge le localStorage après le 1er rendu
 */
import { create } from "zustand";
import type { Lang } from "./i18n";

export type AppMode = "normal" | "calme" | "focus" | "surcharge";

export type NeuroProfile = "unset" | "autisme" | "tdah" | "mixte" | "dyspraxie" | "allie";

export interface SensoryPrefs {
  sound: boolean;
  motion: boolean;
  notifications: boolean;
  typingIndicators: boolean;
  density: boolean;
  fontSize: 1 | 2 | 3;
}

export interface ClubState {
  hydrated: boolean;
  hasOnboarded: boolean;
  nickname: string;
  avatarSeed: number;
  lang: Lang;
  calmTheme: boolean;
  energy: number;
  mode: AppMode;
  interests: string[];
  neuroProfile: NeuroProfile;
  savedPeople: string[];
  plantStages: Record<string, number>;
  prefs: SensoryPrefs;
  hydrate: () => void;
  completeOnboarding: (p: { nickname: string; avatarSeed: number; interests: string[] }) => void;
  setNickname: (nickname: string) => void;
  setAvatarSeed: (avatarSeed: number) => void;
  setLang: (lang: Lang) => void;
  setCalmTheme: (calmTheme: boolean) => void;
  setEnergy: (energy: number) => void;
  setMode: (mode: AppMode) => void;
  toggleInterest: (id: string) => void;
  setNeuroProfile: (neuroProfile: NeuroProfile) => void;
  toggleSavedPerson: (id: string) => void;
  patchPrefs: (patch: Partial<SensoryPrefs>) => void;
  growPlant: (id: string) => void;
}

const STORAGE_KEY = "aethernest-club";

const defaultPrefs: SensoryPrefs = {
  sound: false,
  motion: true,
  notifications: false,
  typingIndicators: true,
  density: false,
  fontSize: 1,
};

type Persisted = Pick<
  ClubState,
  | "hasOnboarded"
  | "nickname"
  | "avatarSeed"
  | "lang"
  | "calmTheme"
  | "energy"
  | "mode"
  | "interests"
  | "neuroProfile"
  | "savedPeople"
  | "plantStages"
  | "prefs"
>;

function loadSaved(): Partial<Persisted> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Persisted>;
  } catch {
    return {};
  }
}

function persist(state: ClubState) {
  const data: Persisted = {
    hasOnboarded: state.hasOnboarded,
    nickname: state.nickname,
    avatarSeed: state.avatarSeed,
    lang: state.lang,
    calmTheme: state.calmTheme,
    energy: state.energy,
    mode: state.mode,
    interests: state.interests,
    neuroProfile: state.neuroProfile,
    savedPeople: state.savedPeople,
    plantStages: state.plantStages,
    prefs: state.prefs,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

export const useClub = create<ClubState>((set, get) => ({
  hydrated: false,
  hasOnboarded: false,
  nickname: "",
  avatarSeed: 1,
  lang: "fr",
  calmTheme: true,
  energy: 2,
  mode: "normal",
  interests: ["astronomy", "nature"],
  neuroProfile: "unset",
  savedPeople: [],
  plantStages: {},
  prefs: defaultPrefs,

  hydrate: () => {
    if (get().hydrated) return;
    const saved = loadSaved();
    set({
      ...saved,
      prefs: { ...defaultPrefs, ...saved.prefs },
      savedPeople: saved.savedPeople ?? [],
      neuroProfile: saved.neuroProfile ?? "unset",
      hydrated: true,
    });
  },

  completeOnboarding: ({ nickname, avatarSeed, interests }) => {
    set({ hasOnboarded: true, nickname, avatarSeed, interests });
    persist(get());
  },

  setNickname: (nickname) => {
    set({ nickname });
    persist(get());
  },
  setAvatarSeed: (avatarSeed) => {
    set({ avatarSeed });
    persist(get());
  },
  setLang: (lang) => {
    set({ lang });
    persist(get());
  },
  setCalmTheme: (calmTheme) => {
    set({ calmTheme });
    persist(get());
  },
  setEnergy: (energy) => {
    const current = get().mode;
    let mode = current;
    if (energy === 0) mode = "surcharge";
    else if (energy === 1 && current === "surcharge") mode = "calme";
    else if (energy >= 2 && current === "surcharge") mode = "normal";
    set({ energy, mode });
    persist(get());
  },
  setMode: (mode) => {
    set({ mode });
    persist(get());
  },
  toggleInterest: (id) => {
    const interests = get().interests.includes(id)
      ? get().interests.filter((x) => x !== id)
      : [...get().interests, id];
    set({ interests });
    persist(get());
  },
  setNeuroProfile: (neuroProfile) => {
    set({ neuroProfile });
    persist(get());
  },
  toggleSavedPerson: (id) => {
    const savedPeople = get().savedPeople.includes(id)
      ? get().savedPeople.filter((x) => x !== id)
      : [...get().savedPeople, id];
    set({ savedPeople });
    persist(get());
  },
  patchPrefs: (patch) => {
    set({ prefs: { ...get().prefs, ...patch } });
    persist(get());
  },
  growPlant: (id) => {
    const cur = get().plantStages[id] ?? 1;
    set({ plantStages: { ...get().plantStages, [id]: Math.min(4, cur + 1) } });
    persist(get());
  },
}));
