import { tx, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LEVELS = [
  { fr: "Vide", en: "Empty" },
  { fr: "Faible", en: "Low" },
  { fr: "Modéré", en: "Moderate" },
  { fr: "Bon", en: "Good" },
  { fr: "Plein", en: "Full" },
];

/** Batterie sociale : 5 niveaux, gros boutons, un seul choix. */
export function EnergyBar({
  value,
  onChange,
  lang,
}: {
  value: number;
  onChange: (v: number) => void;
  lang: Lang;
}) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label={tx(lang, "Batterie sociale", "Social battery")}>
      {LEVELS.map((l, i) => {
        const selected = value === i;
        return (
          <button
            key={l.en}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={tx(lang, l.fr, l.en)}
            onClick={() => onChange(i)}
            className={cn(
              "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 text-sm transition-colors",
              selected
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary/40",
            )}
          >
            <span
              className="block h-2 w-2 rounded-full"
              style={{
                background:
                  i === 0
                    ? "var(--destructive)"
                    : i === 1
                      ? "var(--color-sky)"
                      : "var(--primary)",
                opacity: selected ? 1 : 0.45,
              }}
            />
            <span className="text-center text-[11px] font-medium leading-tight">
              {tx(lang, l.fr, l.en)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
