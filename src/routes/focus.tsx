import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";

export const Route = createFileRoute("/focus")({ component: FocusPage });

const WORK = 25 * 60;
const REST = 5 * 60;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FocusPage() {
  const lang = useClub((s) => s.lang);
  const setMode = useClub((s) => s.setMode);
  const [seconds, setSeconds] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    setMode("focus");
    return () => setMode("normal");
  }, [setMode]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s > 1) return s - 1;
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (seconds !== 0) return;
    setIsRest((r) => {
      const next = !r;
      setSeconds(next ? REST : WORK);
      return next;
    });
    setRunning(false);
  }, [seconds]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const total = isRest ? REST : WORK;
  const pct = Math.round(((total - seconds) / total) * 100);

  return (
    <div className="page-pad mx-auto flex w-full max-w-md flex-col items-center gap-8 px-5 py-10 pb-24">
      <div className="w-full text-center">
        <h1 className="font-display text-2xl font-bold">{tx(lang, "Salle Focus", "Focus Room")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tx(
            lang,
            "Une seule tâche. Le timer n'est pas une punition.",
            "One task. The timer is not a punishment.",
          )}
        </p>
      </div>

      <div className="relative grid size-56 place-items-center">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--muted)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
          />
        </svg>
        <div className="relative text-center">
          <p className="font-display text-4xl font-bold tabular-nums">
            {pad(m)}:{pad(s)}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {isRest ? tx(lang, "Pause", "Break") : tx(lang, "Travail", "Work")}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="rounded-xl" onClick={() => setRunning((v) => !v)}>
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? tx(lang, "Pause", "Pause") : tx(lang, "Démarrer", "Start")}
        </Button>
        <Button
          variant="secondary"
          className="rounded-xl"
          onClick={() => {
            setRunning(false);
            setIsRest(false);
            setSeconds(WORK);
          }}
        >
          <RotateCcw className="size-4" />
          {tx(lang, "Réinitialiser", "Reset")}
        </Button>
      </div>

      <label className="w-full text-sm font-medium">
        {tx(lang, "Ma tâche (optionnel, reste ici)", "My task (optional, stays here)")}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          maxLength={160}
          className="mt-2 w-full rounded-2xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={tx(lang, "ex. Lire 4 pages", "e.g. Read 4 pages")}
        />
      </label>

      <Link to="/rooms/$roomId" params={{ roomId: "focus" }} className="text-sm text-primary underline-offset-4 hover:underline">
        {tx(lang, "Ouvrir le salon Focus (chat silencieux)", "Open the Focus chat (quiet)")}
      </Link>
    </div>
  );
}
