import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Leaf, MessageSquare, Sparkles, Target, Users } from "lucide-react";
import { EnergyBar } from "@/components/club/energy-bar";
import { INTERESTS } from "@/lib/interests";
import { ROOMS } from "@/lib/rooms";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const lang = useClub((s) => s.lang);
  const energy = useClub((s) => s.energy);
  const setEnergy = useClub((s) => s.setEnergy);
  const interests = useClub((s) => s.interests);
  const toggleInterest = useClub((s) => s.toggleInterest);
  const nickname = useClub((s) => s.nickname);

  const visibleRooms = ROOMS.filter((r) => energy >= 2 || r.energy === "low");

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-8 px-5 py-6 pb-24 md:pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6">
        <div className="deco pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-primary/10" />
        <div className="deco pointer-events-none absolute -bottom-12 left-10 size-32 rounded-full bg-forest/15" />
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          AetherNest
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold leading-tight">
          {tx(lang, "Un endroit pour se reposer,", "A place to rest,")}
          <br />
          {tx(lang, "et trouver les tiens.", "and find your people.")}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {tx(
            lang,
            `${nickname ? `Bonjour ${nickname}. ` : ""}Ce club est pour les personnes autistes, y compris le profil autrefois appelé Asperger, et pour d'autres personnes neurodivergentes. Les phrases sont directes. Tu peux partir quand tu veux.`,
            `${nickname ? `Hello ${nickname}. ` : ""}This club is for autistic people, including what was once called Asperger syndrome, and for other neurodivergent people. Sentences are direct. You can leave whenever you want.`,
          )}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Ma batterie sociale", "My social battery")}
        </h2>
        <EnergyBar value={energy} onChange={setEnergy} lang={lang} />
        <p className="mt-2 text-xs text-muted-foreground">
          {energy <= 1
            ? tx(lang, "On te montre seulement les salons calmes.", "Only the quiet rooms are shown.")
            : tx(lang, "Tous les salons ouverts sont visibles.", "All open rooms are visible.")}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {[
          { to: "/people", icon: Users, fr: "Personnes proches", en: "Similar people" },
          { to: "/kaleidoscope", icon: Sparkles, fr: "Kaléidoscope", en: "Kaleidoscope" },
          { to: "/garden", icon: Leaf, fr: "Jardin", en: "Garden" },
          { to: "/focus", icon: Target, fr: "Focus", en: "Focus" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card px-2 text-center transition-colors hover:border-primary/30"
          >
            <a.icon className="size-5 text-primary" />
            <span className="text-xs font-medium">{tx(lang, a.fr, a.en)}</span>
          </Link>
        ))}
      </div>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {tx(lang, "Salons ouverts", "Open rooms")}
          </h2>
          <Link to="/rooms" className="text-xs font-medium text-primary">
            {tx(lang, "Tous", "All")}
          </Link>
        </div>
        <div className="space-y-2.5">
          {visibleRooms.map((room) => (
            <Link
              key={room.id}
              to="/rooms/$roomId"
              params={{ roomId: room.id }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <MessageSquare className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-semibold text-card-foreground">
                    {tx(lang, room.nameFr, room.nameEn)}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 text-xs font-medium",
                      room.energy === "low" ? "text-forest" : "text-accent",
                    )}
                  >
                    {room.energy === "low" ? tx(lang, "Calme", "Calm") : tx(lang, "Modéré", "Moderate")}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {tx(lang, room.descFr, room.descEn)}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Mes intérêts", "My interests")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interests.includes(i.id);
            return (
              <button
                key={i.id}
                type="button"
                onClick={() => toggleInterest(i.id)}
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
      </section>

      <Link
        to="/about"
        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
      >
        <BookOpen className="size-4 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-semibold">{tx(lang, "Étude de cas du studio", "Studio case study")}</p>
          <p className="text-xs text-muted-foreground">
            {tx(lang, "Reine Vannel Studio · portfolio.", "Reine Vannel Studio · portfolio.")}
          </p>
        </div>
      </Link>
    </div>
  );
}
