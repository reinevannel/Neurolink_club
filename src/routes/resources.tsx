import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Heart } from "lucide-react";
import { IMPACTS, TND_CARDS } from "@/lib/tnd-data";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";

export const Route = createFileRoute("/resources")({ component: ResourcesPage });

function ResourcesPage() {
  const lang = useClub((s) => s.lang);

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-8 px-5 py-6 pb-24 md:pb-10">
      <section className="rounded-3xl border border-border bg-card p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Ressources", "Resources")}
        </p>
        <h1 className="font-display mt-2 text-2xl font-bold">
          {tx(lang, "Comprendre les TND", "Understanding ND conditions")}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {tx(
            lang,
            "Les troubles du neurodéveloppement décrivent un fonctionnement différent — souvent riche, précis, sensible. Ils ne définissent pas une personne.",
            "Neurodevelopmental conditions describe a different way of functioning — often rich, precise, sensitive. They do not define a person.",
          )}
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-primary/20 bg-card p-4">
        <div className="flex items-center gap-2">
          <Heart className="size-4 text-primary" />
          <p className="text-sm font-semibold">
            {tx(lang, "Pourquoi ces pages existent", "Why these pages exist")}
          </p>
        </div>
        {[
          tx(lang, "Mieux comprendre son fonctionnement", "Better understand how you work"),
          tx(lang, "Nommer un besoin sans se justifier", "Name a need without justifying"),
          tx(lang, "Trouver le salon et le mode adaptés", "Find the matching room and mode"),
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
            {item}
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Guides", "Guides")}
        </h2>
        <div className="space-y-2">
          {TND_CARDS.map((card) => (
            <Link
              key={card.id}
              to="/resources/$id"
              params={{ id: card.id }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/30"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: card.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{tx(lang, card.titleFr, card.titleEn)}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {tx(lang, card.subtitleFr, card.subtitleEn)}
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Ce que ça peut déclencher", "What it can trigger")}
        </h2>
        <div className="space-y-2">
          {IMPACTS.map((impact) => (
            <div key={impact.id} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">{tx(lang, impact.titleFr, impact.titleEn)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tx(lang, "Déclenché par : ", "Triggered by: ")}
                {tx(lang, impact.triggersFr, impact.triggersEn)}
              </p>
              <p className="mt-2 text-xs text-primary">
                AetherNest · {tx(lang, impact.featureFr, impact.featureEn)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
