/**
 * Coquille de l'application : barre latérale (bureau), navigation bas (mobile),
 * bandeau de mode, panneau sensoriel, overlay surcharge.
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Home,
  Leaf,
  MessageSquare,
  Moon,
  Settings2,
  Sparkles,
  Sun,
  Target,
  User,
  Users,
} from "lucide-react";
import { SensoryPanel } from "@/components/club/sensory-panel";
import { OverloadOverlay } from "@/components/club/overload-overlay";
import { Onboarding } from "@/components/club/onboarding";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", icon: Home, fr: "Accueil", en: "Home" },
  { to: "/rooms", icon: MessageSquare, fr: "Salons", en: "Rooms" },
  { to: "/people", icon: Users, fr: "Personnes", en: "People" },
  { to: "/kaleidoscope", icon: Sparkles, fr: "Kaléido", en: "Kaleido" },
  { to: "/profile", icon: User, fr: "Profil", en: "Profile" },
] as const;

const EXTRA = [
  { to: "/garden", icon: Leaf, fr: "Jardin", en: "Garden" },
  { to: "/focus", icon: Target, fr: "Focus", en: "Focus" },
  { to: "/resources", icon: Brain, fr: "TND", en: "ND" },
  { to: "/about", icon: BookOpen, fr: "Étude de cas", en: "Case study" },
] as const;

function applyDom(state: {
  calmTheme: boolean;
  lang: "fr" | "en";
  mode: string;
  prefs: { density: boolean; motion: boolean; fontSize: number };
}) {
  const root = document.documentElement;
  root.classList.toggle("dark", state.calmTheme);
  root.lang = state.lang;
  root.dataset.mode = state.mode;
  root.dataset.density = state.prefs.density ? "dense" : "comfortable";
  root.dataset.motion = state.prefs.motion ? "on" : "off";
  root.dataset.font = String(state.prefs.fontSize);
}

export function AppShell({ children }: { children: ReactNode }) {
  const hydrate = useClub((s) => s.hydrate);
  const hydrated = useClub((s) => s.hydrated);
  const hasOnboarded = useClub((s) => s.hasOnboarded);
  const lang = useClub((s) => s.lang);
  const setLang = useClub((s) => s.setLang);
  const calmTheme = useClub((s) => s.calmTheme);
  const setCalmTheme = useClub((s) => s.setCalmTheme);
  const mode = useClub((s) => s.mode);
  const setMode = useClub((s) => s.setMode);
  const energy = useClub((s) => s.energy);
  const prefs = useClub((s) => s.prefs);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sensory, setSensory] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    applyDom({ calmTheme, lang, mode, prefs });
  }, [hydrated, calmTheme, lang, mode, prefs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSensory((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!hydrated) {
    return (
      <div className="sanctuary grid min-h-dvh place-items-center">
        <p className="text-sm text-muted-foreground">AetherNest</p>
      </div>
    );
  }

  if (!hasOnboarded) return <Onboarding />;

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="sanctuary flex min-h-dvh flex-col md:flex-row">
      <a href="#contenu" className="skip-link">
        {tx(lang, "Aller au contenu", "Skip to content")}
      </a>

      <aside className="hidden h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:sticky md:top-0 md:flex">
        <div className="border-b border-sidebar-border p-5">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-4" />
            </div>
            <div>
              <p className="font-display font-bold leading-none text-sidebar-foreground">AetherNest</p>
              <p className="mt-1 text-[11px] text-muted-foreground">NeuroLink Club</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto p-3" aria-label={tx(lang, "Principal", "Main")}>
          <div>
            <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {tx(lang, "Club", "Club")}
            </p>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "mb-0.5 flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-medium transition-colors",
                  isActive(item.to)
                    ? "bg-sidebar-primary/15 text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="size-4" />
                {tx(lang, item.fr, item.en)}
              </Link>
            ))}
          </div>
          <div>
            <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {tx(lang, "Plus", "More")}
            </p>
            {EXTRA.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "mb-0.5 flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-medium transition-colors",
                  isActive(item.to)
                    ? "bg-sidebar-primary/15 text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="size-4" />
                {tx(lang, item.fr, item.en)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="space-y-2.5 border-t border-sidebar-border p-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary/70"
                style={{ width: `${(energy / 4) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground tabular-nums">{energy}/4</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCalmTheme(!calmTheme)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-muted text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              {calmTheme ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
              {calmTheme ? tx(lang, "Calme", "Calm") : tx(lang, "Lumineux", "Bright")}
            </button>
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="h-11 rounded-xl bg-muted px-3 text-xs font-semibold text-muted-foreground"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              type="button"
              onClick={() => setSensory(true)}
              aria-label={tx(lang, "Contrôle sensoriel", "Sensory controls")}
              className="grid size-11 place-items-center rounded-xl bg-muted text-muted-foreground"
            >
              <Settings2 className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="size-3.5" />
            </div>
            <span className="font-display text-sm font-bold">AetherNest</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="grid size-11 place-items-center rounded-lg text-xs font-semibold text-muted-foreground"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              type="button"
              onClick={() => setCalmTheme(!calmTheme)}
              className="grid size-11 place-items-center rounded-lg text-muted-foreground"
              aria-label={tx(lang, "Thème", "Theme")}
            >
              {calmTheme ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setSensory(true)}
              className="grid size-11 place-items-center rounded-lg text-muted-foreground"
              aria-label={tx(lang, "Contrôle sensoriel", "Sensory controls")}
            >
              <Settings2 className="size-4" />
            </button>
          </div>
        </header>

        {mode !== "normal" && (
          <div
            className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2"
            style={{
              background:
                mode === "surcharge"
                  ? "color-mix(in oklab, var(--destructive) 12%, transparent)"
                  : "color-mix(in oklab, var(--primary) 10%, transparent)",
            }}
          >
            <p className="flex-1 text-xs font-medium">
              {mode === "calme" && tx(lang, "Mode Calme actif", "Calm Mode on")}
              {mode === "focus" && tx(lang, "Mode Focus actif", "Focus Mode on")}
              {mode === "surcharge" && tx(lang, "Mode Surcharge — respire", "Overload Mode — breathe")}
            </p>
            <button
              type="button"
              onClick={() => setMode("normal")}
              className="min-h-11 px-3 text-xs font-medium text-muted-foreground"
            >
              {tx(lang, "Quitter le mode", "Leave mode")}
            </button>
          </div>
        )}

        <main id="contenu" className="flex min-h-0 flex-1 flex-col">
          {children}
        </main>

        <nav
          className="sticky bottom-0 z-20 flex border-t border-border bg-card md:hidden"
          aria-label={tx(lang, "Navigation", "Navigation")}
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                isActive(item.to) ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="size-5" />
              {tx(lang, item.fr, item.en)}
            </Link>
          ))}
        </nav>
      </div>

      <SensoryPanel open={sensory} onOpenChange={setSensory} />
      {mode === "surcharge" && <OverloadOverlay />}
    </div>
  );
}
