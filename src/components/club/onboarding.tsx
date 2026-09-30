import { useState } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AbstractAvatar } from "@/components/club/abstract-avatar";
import { INTERESTS } from "@/lib/interests";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Première visite : 3 étapes courtes, on peut passer. */
export function Onboarding() {
  const lang = useClub((s) => s.lang);
  const setLang = useClub((s) => s.setLang);
  const complete = useClub((s) => s.completeOnboarding);

  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [seed, setSeed] = useState(1);
  const [picked, setPicked] = useState<string[]>(["astronomy", "nature"]);

  const finish = () => {
    complete({
      nickname: nickname.trim() || tx(lang, "Toi", "You"),
      avatarSeed: seed,
      interests: picked.length ? picked : ["nature"],
    });
  };

  return (
    <div className="sanctuary flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-4" />
            </div>
            <div>
              <p className="font-display text-base font-bold leading-none">AetherNest</p>
              <p className="mt-1 text-[11px] text-muted-foreground">NeuroLink Club</p>
            </div>
          </div>
          <button
            type="button"
            className="min-h-11 rounded-xl bg-muted px-3 text-xs font-semibold text-muted-foreground"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>

        <div className="mb-5 flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-muted")}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold">
              {tx(lang, "Un club calme, à ta façon.", "A calm club, your way.")}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tx(
                lang,
                "Ce club est pour les personnes autistes — y compris le profil autrefois appelé Asperger — et pour d'autres personnes neurodivergentes. Tu peux te reposer, lire des fiches claires, et trouver des gens qui te ressemblent. Une personne neurotypique entre seulement comme alliée.",
                "This club is for autistic people — including what was once called Asperger syndrome — and for other neurodivergent people. You can rest, read clear cards, and find people like you. A neurotypical person enters only as an ally.",
              )}
            </p>
            <ul className="space-y-2 text-sm text-card-foreground">
              {[
                tx(lang, "Fiches claires : comment chaque personne communique", "Clear cards: how each person communicates"),
                tx(lang, "Kaléidoscope : repos visuel, sans score", "Kaleidoscope: visual rest, no score"),
                tx(lang, "Sortie douce, toujours visible", "Gentle exit, always visible"),
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-2 w-full rounded-xl" onClick={() => setStep(1)}>
              {tx(lang, "Commencer", "Start")}
            </Button>
            <button
              type="button"
              className="w-full min-h-11 text-sm text-muted-foreground underline-offset-4 hover:underline"
              onClick={finish}
            >
              {tx(lang, "Passer l'accueil", "Skip intro")}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">
              {tx(lang, "Un pseudo, pas ton vrai nom.", "A nickname, not your real name.")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tx(
                lang,
                "Il s'affiche dans les salons. Tu pourras le changer plus tard.",
                "It shows in the rooms. You can change it later.",
              )}
            </p>
            <label className="block text-sm font-medium" htmlFor="nick">
              {tx(lang, "Pseudo", "Nickname")}
            </label>
            <Input
              id="nick"
              value={nickname}
              maxLength={24}
              autoComplete="off"
              placeholder={tx(lang, "ex. Lune, Pixel, Marée", "e.g. Moon, Pixel, Tide")}
              className="h-12 rounded-xl"
              onChange={(e) => setNickname(e.target.value)}
            />
            <p className="text-sm font-medium">{tx(lang, "Forme d'avatar", "Avatar shape")}</p>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeed(s)}
                  aria-label={tx(lang, `Forme ${s + 1}`, `Shape ${s + 1}`)}
                  className={cn(
                    "rounded-full p-1",
                    seed === s ? "ring-2 ring-ring ring-offset-2 ring-offset-card" : "",
                  )}
                >
                  <AbstractAvatar seed={s} size={40} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1 rounded-xl" onClick={() => setStep(0)}>
                {tx(lang, "Retour", "Back")}
              </Button>
              <Button className="flex-1 rounded-xl" onClick={() => setStep(2)}>
                {tx(lang, "Continuer", "Continue")}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">
              {tx(lang, "Qu'est-ce qui t'intéresse ?", "What interests you?")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tx(
                lang,
                "On s'en sert pour proposer des salons. Tu peux n'en choisir aucun.",
                "We use this to suggest rooms. You can pick none.",
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const on = picked.includes(i.id);
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() =>
                      setPicked((p) => (on ? p.filter((x) => x !== i.id) : [...p, i.id]))
                    }
                    className={cn(
                      "min-h-11 rounded-full border px-3 text-sm font-medium",
                      on
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-card-foreground",
                    )}
                  >
                    {tx(lang, i.fr, i.en)}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1 rounded-xl" onClick={() => setStep(1)}>
                {tx(lang, "Retour", "Back")}
              </Button>
              <Button className="flex-1 rounded-xl" onClick={finish}>
                {tx(lang, "Entrer dans le club", "Enter the club")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
