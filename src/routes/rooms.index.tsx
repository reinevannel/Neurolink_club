import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare } from "lucide-react";
import { ROOMS } from "@/lib/rooms";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rooms/")({ component: RoomsPage });

function RoomsPage() {
  const lang = useClub((s) => s.lang);
  const energy = useClub((s) => s.energy);

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-6 px-5 py-6 pb-24 md:pb-10">
      <div>
        <h1 className="font-display text-2xl font-bold">{tx(lang, "Salons", "Rooms")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tx(
            lang,
            "Texte uniquement. Tu peux lire sans écrire. La sortie est toujours visible.",
            "Text only. You can read without writing. Exit is always visible.",
          )}
        </p>
      </div>
      <div className="space-y-2.5">
        {ROOMS.map((room) => {
          const locked = energy < 2 && room.energy !== "low";
          const inner = (
            <>
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <MessageSquare className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-semibold">{tx(lang, room.nameFr, room.nameEn)}</p>
                  <span
                    className={cn(
                      "shrink-0 text-xs font-medium",
                      room.energy === "low" ? "text-forest" : "text-accent",
                    )}
                  >
                    {room.energy === "low" ? tx(lang, "Calme", "Calm") : tx(lang, "Modéré", "Moderate")}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {tx(lang, room.descFr, room.descEn)}
                </p>
                {locked && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tx(
                      lang,
                      "Batterie trop basse — remonte-la sur l'accueil.",
                      "Battery too low — raise it on Home.",
                    )}
                  </p>
                )}
              </div>
              {!locked && <ArrowRight className="size-4 shrink-0 text-muted-foreground" />}
            </>
          );
          if (locked) {
            return (
              <div
                key={room.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 opacity-60"
              >
                {inner}
              </div>
            );
          }
          return (
            <Link
              key={room.id}
              to="/rooms/$roomId"
              params={{ roomId: room.id }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/30"
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
