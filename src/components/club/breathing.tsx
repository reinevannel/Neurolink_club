import { useEffect, useState } from "react";
import { tx, type Lang } from "@/lib/i18n";

/** Respiration guidée : 4 s inspirer, 4 s retenir, 4 s expirer. */
export function BreathingGuide({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => ((p + 1) % 3) as 0 | 1 | 2);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  const label =
    phase === 0
      ? tx(lang, "Inspire…", "Breathe in…")
      : phase === 1
        ? tx(lang, "Retiens…", "Hold…")
        : tx(lang, "Expire…", "Breathe out…");

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <div className="relative grid size-40 place-items-center">
        <div className="breath-ring absolute inset-0 rounded-full border border-primary/30 bg-primary/10" />
        <div className="relative z-10 text-center">
          <p className="font-display text-lg font-semibold text-foreground">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground tabular-nums">4 s</p>
        </div>
      </div>
      <p className="max-w-xs text-center text-sm text-muted-foreground">
        {tx(
          lang,
          "Rien à réussir. Suis le cercle, ou ignore-le.",
          "Nothing to achieve. Follow the circle, or ignore it.",
        )}
      </p>
    </div>
  );
}
