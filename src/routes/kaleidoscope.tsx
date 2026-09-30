import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { KaleidoscopeCanvas } from "@/components/club/kaleidoscope-canvas";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kaleidoscope")({ component: KaleidoscopePage });

function KaleidoscopePage() {
  const lang = useClub((s) => s.lang);
  const motion = useClub((s) => s.prefs.motion);
  const [paused, setPaused] = useState(!motion);
  const [speed, setSpeed] = useState(1);
  const [segments, setSegments] = useState(8);

  const still = paused || !motion;

  return (
    <div className="page-pad mx-auto flex w-full max-w-3xl flex-col gap-5 px-5 py-6 pb-24 md:pb-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Repos visuel", "Visual rest")}
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold">
          {tx(lang, "Kaléidoscope", "Kaleidoscope")}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {tx(
            lang,
            "Image lente, couleurs douces, pas de flash. Tu peux l'arrêter. L'image reste alors fixe. Rien n'est enregistré. Rien ne fait de bruit.",
            "A slow image, soft colors, no flash. You can stop it. The picture then stays still. Nothing is saved. There is no sound.",
          )}
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-border bg-[#0b2830]">
        <div className="aspect-square w-full sm:aspect-[4/3]">
          <KaleidoscopeCanvas paused={still} speed={speed} segments={segments} />
        </div>
      </div>

      {!motion && (
        <p className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed">
          {tx(
            lang,
            "Le mouvement est coupé dans tes réglages sensoriels. Le kaléidoscope reste donc immobile.",
            "Motion is off in your sensory settings. The kaleidoscope therefore stays still.",
          )}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          disabled={!motion}
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold disabled:opacity-50"
        >
          {paused || !motion ? <Play className="size-4" /> : <Pause className="size-4" />}
          {paused || !motion
            ? tx(lang, "Animer lentement", "Animate slowly")
            : tx(lang, "Arrêter l'image", "Stop the image")}
        </button>

        <div className="rounded-2xl border border-border bg-card p-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            {tx(lang, "Vitesse", "Speed")}
          </p>
          <div className="flex gap-2">
            {[
              { v: 0.45, fr: "Très lente", en: "Very slow" },
              { v: 1, fr: "Lente", en: "Slow" },
              { v: 1.6, fr: "Un peu plus", en: "A bit more" },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setSpeed(opt.v)}
                className={cn(
                  "min-h-11 flex-1 rounded-xl px-1 text-xs font-medium",
                  speed === opt.v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {tx(lang, opt.fr, opt.en)}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            {tx(lang, "Symétrie", "Symmetry")}
          </p>
          <div className="flex gap-2">
            {[6, 8, 12].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setSegments(n)}
                className={cn(
                  "min-h-11 flex-1 rounded-xl text-sm font-semibold",
                  segments === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-bold">
          {tx(lang, "À quoi sert cet écran", "What this screen is for")}
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>{tx(lang, "Te poser les yeux, sans fil de discussion.", "Rest your eyes, with no chat thread.")}</li>
          <li>{tx(lang, "Revenir ensuite vers les personnes, quand tu veux.", "Then go back to people, when you want.")}</li>
          <li>{tx(lang, "Aucune récompense. Aucun score. Tu n'as rien à gagner.", "No reward. No score. There is nothing to win.")}</li>
        </ul>
      </section>
    </div>
  );
}
