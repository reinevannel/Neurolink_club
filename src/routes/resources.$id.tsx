import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react";
import { getTnd } from "@/lib/tnd-data";
import { getRoom } from "@/lib/rooms";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";

export const Route = createFileRoute("/resources/$id")({ component: TndDetail });

function TndDetail() {
  const { id } = Route.useParams();
  const card = getTnd(id);
  const lang = useClub((s) => s.lang);

  if (!card) {
    return (
      <div className="p-8 text-sm">
        {tx(lang, "Page introuvable.", "Page not found.")}{" "}
        <Link to="/resources" className="text-primary underline">
          {tx(lang, "Ressources", "Resources")}
        </Link>
      </div>
    );
  }

  const traits = lang === "fr" ? card.traitsFr : card.traitsEn;
  const daily = lang === "fr" ? card.dailyFr : card.dailyEn;
  const strengths = lang === "fr" ? card.strengthsFr : card.strengthsEn;
  const nest = lang === "fr" ? card.nestFr : card.nestEn;
  const tips = lang === "fr" ? card.tipsFr : card.tipsEn;

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-6 px-5 py-6 pb-24 md:pb-10">
      <Link to="/resources" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" />
        {tx(lang, "Toutes les ressources", "All resources")}
      </Link>

      <header className="rounded-3xl border border-border bg-card p-6">
        <span className="inline-block size-2.5 rounded-full" style={{ background: card.color }} />
        <h1 className="font-display mt-2 text-2xl font-bold">{tx(lang, card.titleFr, card.titleEn)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{tx(lang, card.subtitleFr, card.subtitleEn)}</p>
      </header>

      <Section title={tx(lang, "Caractéristiques fréquentes", "Common traits")}>
        {traits.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </Section>
      <Section title={tx(lang, "Au quotidien", "Day to day")}>
        {daily.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </Section>
      <div className="rounded-2xl border p-4" style={{ borderColor: `${card.color}55`, background: `${card.color}14` }}>
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: card.color }}>
          <Sparkles className="size-3.5" />
          {tx(lang, "Ce que cela apporte", "What it brings")}
        </p>
        <ul className="space-y-1.5 text-sm">
          {strengths.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <Section title={tx(lang, "Comment AetherNest aide", "How AetherNest helps")}>
        {nest.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </Section>
      <Section title={tx(lang, "Pistes concrètes", "Practical tips")}>
        {tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </Section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Salons qui vont bien", "Matching rooms")}
        </h2>
        <div className="space-y-2">
          {card.rooms.map((rid) => {
            const room = getRoom(rid);
            if (!room) return null;
            return (
              <Link
                key={rid}
                to="/rooms/$roomId"
                params={{ roomId: rid }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <MessageSquare className="size-4 text-primary" />
                <span className="text-sm font-medium">{tx(lang, room.nameFr, room.nameEn)}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</h2>
      <ul className="space-y-1.5 text-sm leading-relaxed">{children}</ul>
    </section>
  );
}
