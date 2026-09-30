import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plant, PLANT_COLORS } from "@/components/club/plants";
import { BreathingGuide } from "@/components/club/breathing";
import { INTERESTS } from "@/lib/interests";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/garden")({ component: GardenPage });

function GardenPage() {
  const lang = useClub((s) => s.lang);
  const interests = useClub((s) => s.interests);
  const stages = useClub((s) => s.plantStages);
  const grow = useClub((s) => s.growPlant);
  const toggleInterest = useClub((s) => s.toggleInterest);
  const [active, setActive] = useState<string | null>(null);
  const [breathe, setBreathe] = useState(false);

  const plants = INTERESTS.filter((i) => interests.includes(i.id));
  const current = plants.find((p) => p.id === active);

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-6 px-5 py-6 pb-24 md:pb-10">
      <div>
        <h1 className="font-display text-2xl font-bold">AetherJardin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tx(
            lang,
            "Chaque plante est un intérêt. Pas de score, pas de classement.",
            "Each plant is an interest. No score, no ranking.",
          )}
        </p>
      </div>

      <div className="relative h-64 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="deco absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_40%)]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest/20 to-transparent" />
        {plants.length === 0 && (
          <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground">
            {tx(
              lang,
              "Choisis un intérêt sur l'accueil pour faire pousser une plante.",
              "Pick an interest on Home to grow a plant.",
            )}
          </p>
        )}
        {plants.map((p, idx) => {
          const left = 12 + ((idx * 18) % 76);
          const stage = stages[p.id] ?? 2;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(active === p.id ? null : p.id)}
              className="absolute bottom-4 -translate-x-1/2 rounded-xl focus-visible:ring-2"
              style={{ left: `${left}%` }}
              aria-label={tx(lang, p.fr, p.en)}
            >
              <Plant type={p.plant} stage={stage} color={PLANT_COLORS[p.id] ?? "#A8C4B2"} />
            </button>
          );
        })}
      </div>

      {current ? (
        <div className="space-y-3 rounded-2xl border border-primary/20 bg-card p-4">
          <p className="font-semibold">{tx(lang, current.fr, current.en)}</p>
          <p className="text-xs text-muted-foreground">
            {tx(lang, `Stade ${stages[current.id] ?? 2}/4`, `Stage ${stages[current.id] ?? 2}/4`)}
          </p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${(stages[current.id] ?? 2) >= i ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="rounded-xl"
              onClick={() => grow(current.id)}
              disabled={(stages[current.id] ?? 2) >= 4}
            >
              {tx(lang, "Prendre soin", "Tend")}
            </Button>
            <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => toggleInterest(current.id)}>
              {tx(lang, "Retirer l'intérêt", "Remove interest")}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xs italic text-muted-foreground">
          {tx(lang, "Touche une plante pour en savoir plus.", "Tap a plant to learn more.")}
        </p>
      )}

      <div className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">
              {tx(lang, "Respiration guidée", "Guided breathing")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {tx(lang, "Optionnelle. 4 secondes par phase.", "Optional. 4 seconds per phase.")}
            </p>
          </div>
          <Button variant={breathe ? "secondary" : "default"} className="rounded-xl" onClick={() => setBreathe((v) => !v)}>
            {breathe ? tx(lang, "Arrêter", "Stop") : tx(lang, "Commencer", "Start")}
          </Button>
        </div>
        {breathe && <BreathingGuide lang={lang} />}
      </div>
    </div>
  );
}
