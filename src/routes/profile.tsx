import { createFileRoute } from "@tanstack/react-router";
import { AbstractAvatar } from "@/components/club/abstract-avatar";
import { EnergyBar } from "@/components/club/energy-bar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { INTERESTS } from "@/lib/interests";
import { tx } from "@/lib/i18n";
import { useClub, type AppMode } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const lang = useClub((s) => s.lang);
  const nickname = useClub((s) => s.nickname);
  const setNickname = useClub((s) => s.setNickname);
  const seed = useClub((s) => s.avatarSeed);
  const setSeed = useClub((s) => s.setAvatarSeed);
  const energy = useClub((s) => s.energy);
  const setEnergy = useClub((s) => s.setEnergy);
  const interests = useClub((s) => s.interests);
  const toggleInterest = useClub((s) => s.toggleInterest);
  const prefs = useClub((s) => s.prefs);
  const patchPrefs = useClub((s) => s.patchPrefs);
  const mode = useClub((s) => s.mode);
  const setMode = useClub((s) => s.setMode);

  const modes: { id: AppMode; fr: string; en: string; descFr: string; descEn: string }[] = [
    { id: "normal", fr: "Normal", en: "Normal", descFr: "Tout est visible.", descEn: "Everything visible." },
    { id: "calme", fr: "Calme", en: "Calm", descFr: "Moins de décor, rythme lent.", descEn: "Less décor, slow pace." },
    { id: "focus", fr: "Focus", en: "Focus", descFr: "Une tâche, timer Pomodoro.", descEn: "One task, Pomodoro timer." },
    { id: "surcharge", fr: "Surcharge", en: "Overload", descFr: "Écran minimal + respiration.", descEn: "Minimal screen + breathing." },
  ];

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-8 px-5 py-6 pb-24 md:pb-10">
      <h1 className="font-display text-2xl font-bold">{tx(lang, "Profil sensoriel", "Sensory profile")}</h1>

      <section className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
        <AbstractAvatar seed={seed} size={64} />
        <div className="min-w-0 flex-1">
          <label htmlFor="pseudo" className="text-xs font-medium text-muted-foreground">
            {tx(lang, "Pseudo (pas ton vrai nom)", "Nickname (not your real name)")}
          </label>
          <Input
            id="pseudo"
            value={nickname}
            maxLength={24}
            className="mt-1 h-11 rounded-xl"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Forme d'avatar", "Avatar shape")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeed(s)}
              className={cn("rounded-full p-1", seed === s ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : "")}
              aria-label={tx(lang, `Forme ${s + 1}`, `Shape ${s + 1}`)}
            >
              <AbstractAvatar seed={s} size={40} />
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Batterie sociale", "Social battery")}
        </h2>
        <EnergyBar value={energy} onChange={setEnergy} lang={lang} />
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Modes", "Modes")}
        </h2>
        <div className="space-y-2">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "w-full rounded-2xl border p-4 text-left",
                mode === m.id ? "border-primary bg-primary/10" : "border-border bg-card",
              )}
            >
              <p className="text-sm font-semibold">{tx(lang, m.fr, m.en)}</p>
              <p className="text-xs text-muted-foreground">{tx(lang, m.descFr, m.descEn)}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Préférences", "Preferences")}
        </h2>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {(
            [
              ["sound", tx(lang, "Sons d'ambiance", "Ambient sounds")],
              ["motion", tx(lang, "Animations douces", "Soft motion")],
              ["notifications", tx(lang, "Notifications", "Notifications")],
              ["typingIndicators", tx(lang, "Indicateurs de frappe", "Typing indicators")],
              ["density", tx(lang, "Affichage dense", "Dense layout")],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm">{label}</span>
              <Switch
                checked={Boolean(prefs[key])}
                onCheckedChange={(v) => patchPrefs({ [key]: v })}
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Taille du texte", "Text size")}
        </h2>
        <div className="flex gap-2">
          {([1, 2, 3] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => patchPrefs({ fontSize: n })}
              className={cn(
                "min-h-11 flex-1 rounded-xl border text-sm font-semibold",
                prefs.fontSize === n
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card",
              )}
            >
              {n === 1 ? "Aa" : n === 2 ? "Aa+" : "Aa++"}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Intérêts", "Interests")}
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
                  on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
                )}
              >
                {tx(lang, i.fr, i.en)}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
