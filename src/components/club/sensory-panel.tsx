import { Bell, BellOff, Maximize2, Type, Volume2, VolumeX, Wind } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { tx } from "@/lib/i18n";
import { useClub, type SensoryPrefs } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SensoryPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const lang = useClub((s) => s.lang);
  const prefs = useClub((s) => s.prefs);
  const patch = useClub((s) => s.patchPrefs);

  const rows: {
    key: keyof SensoryPrefs;
    icon: typeof Volume2;
    fr: string;
    en: string;
    hintFr: string;
    hintEn: string;
  }[] = [
    { key: "sound", icon: prefs.sound ? Volume2 : VolumeX, fr: "Sons d'ambiance", en: "Ambient sounds", hintFr: "Toujours off par défaut", hintEn: "Always off by default" },
    { key: "motion", icon: Wind, fr: "Animations douces", en: "Soft motion", hintFr: "Transitions lentes uniquement", hintEn: "Slow transitions only" },
    { key: "notifications", icon: prefs.notifications ? Bell : BellOff, fr: "Notifications", en: "Notifications", hintFr: "Jamais de son", hintEn: "Never with sound" },
    { key: "typingIndicators", icon: Wind, fr: "Indicateurs de frappe", en: "Typing indicators", hintFr: "Points animés dans le chat", hintEn: "Animated dots in chat" },
    { key: "density", icon: Maximize2, fr: "Affichage dense", en: "Dense layout", hintFr: "Moins d'espace entre les blocs", hintEn: "Less space between blocks" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto rounded-2xl border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {tx(lang, "Contrôle sensoriel", "Sensory controls")}
          </DialogTitle>
          <DialogDescription>
            {tx(
              lang,
              "Chaque interrupteur est optionnel. Raccourci : Ctrl+K.",
              "Every switch is optional. Shortcut: Ctrl+K.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="divide-y divide-border rounded-2xl border border-border">
          {rows.map((row) => {
            const Icon = row.icon;
            const checked = Boolean(prefs[row.key]);
            return (
              <div key={row.key} className="flex items-center gap-3 px-4 py-3">
                <div className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-card-foreground">{tx(lang, row.fr, row.en)}</p>
                  <p className="text-xs text-muted-foreground">{tx(lang, row.hintFr, row.hintEn)}</p>
                </div>
                <Switch
                  checked={checked}
                  onCheckedChange={(v) => patch({ [row.key]: v })}
                  aria-label={tx(lang, row.fr, row.en)}
                />
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Type className="size-4" />
            {tx(lang, "Taille du texte", "Text size")}
          </p>
          <div className="flex gap-2">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => patch({ fontSize: n })}
                className={cn(
                  "min-h-11 flex-1 rounded-xl border text-sm font-semibold",
                  prefs.fontSize === n
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground",
                )}
              >
                {n === 1 ? "Aa" : n === 2 ? "Aa+" : "Aa++"}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
