/**
 * Salon de discussion réel.
 *
 * 1. React Query recharge les messages toutes les 2,5 s
 * 2. sendMessage enregistre dans Postgres
 * 3. « Formuler » appelle l'IA pour clarifier le brouillon
 * 4. Dans certains salons, « Aether » peut répondre
 */
import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, LogOut, Sparkles, Wand2 } from "lucide-react";
import { AbstractAvatar } from "@/components/club/abstract-avatar";
import { Button } from "@/components/ui/button";
import { askCompanion, reformulateMessage } from "@/lib/ai-local";
import { appendLocalMessage, listLocalMessages, type ChatMessage } from "@/lib/local-chat";
import { getRoom } from "@/lib/rooms";
import { SOCIAL_SCRIPTS } from "@/lib/scripts";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rooms/$roomId")({ component: RoomPage });

function formatTime(iso: string, lang: "fr" | "en") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RoomPage() {
  const { roomId } = Route.useParams();
  const room = getRoom(roomId);
  const navigate = useNavigate();
  const lang = useClub((s) => s.lang);
  const nickname = useClub((s) => s.nickname);
  const seed = useClub((s) => s.avatarSeed);
  const prefs = useClub((s) => s.prefs);

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [exitDone, setExitDone] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [scriptsOpen, setScriptsOpen] = useState(false);
  const [bridgeError, setBridgeError] = useState<string | null>(null);
  const [aetherBusy, setAetherBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!room) return;
    setMessages(listLocalMessages(roomId));
  }, [room, roomId]);

  const rephrase = useMutation({
    mutationFn: () => reformulateMessage({ data: { draft, lang } }),
    onSuccess: (res) => {
      if (res.ok) {
        setSuggestion(res.text);
        setBridgeError(null);
      } else {
        setBridgeError(
          tx(lang, "Le pont n'est pas disponible pour le moment.", "The bridge is unavailable right now."),
        );
      }
    },
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: prefs.motion ? "smooth" : "auto" });
  }, [messages.length, prefs.motion]);

  if (!room) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        {tx(lang, "Salon introuvable.", "Room not found.")}{" "}
        <Link to="/rooms" className="text-primary underline">
          {tx(lang, "Retour", "Back")}
        </Link>
      </div>
    );
  }

  const doExit = () => {
    setExitDone(true);
    window.setTimeout(() => {
      void navigate({ to: "/rooms" });
    }, 1400);
  };

  if (exitDone) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="grid size-20 place-items-center rounded-full border border-primary/30 bg-card">
          <LogOut className="size-6 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold">
          {tx(lang, "Tu pars en douceur.", "You leave gently.")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {tx(lang, "Prends soin de toi. L'espace t'attend.", "Take care of yourself. This space will be here.")}
        </p>
      </div>
    );
  }

  const onSend = () => {
    const text = draft.trim();
    if (!text || readOnly) return;
    const message = appendLocalMessage({
      roomId,
      author: nickname || "Toi",
      seed,
      body: text,
    });
    setMessages((prev) => [...prev, message]);
    setDraft("");
    setSuggestion(null);
  };

  const talkToAether = async () => {
    const text = draft.trim();
    if (!text || readOnly) return;
    const mine = appendLocalMessage({
      roomId,
      author: nickname || "Toi",
      seed,
      body: text,
    });
    setMessages((prev) => [...prev, mine]);
    setDraft("");
    setAetherBusy(true);
    setBridgeError(null);
    try {
      const reply = await askCompanion({ data: { roomId, message: text, lang } });
      if (reply.ok) {
        const host = appendLocalMessage({
          roomId,
          author: "Aether",
          seed: 0,
          body: reply.text,
        });
        setMessages((prev) => [...prev, host]);
      } else {
        setBridgeError(
          tx(lang, "Aether n'est pas disponible pour le moment. Ton message est gardé ici.", "Aether is unavailable right now. Your message stays here."),
        );
      }
    } catch {
      setBridgeError(
        tx(lang, "Aether n'a pas pu répondre. Ton message est gardé ici.", "Aether could not reply. Your message stays here."),
      );
    } finally {
      setAetherBusy(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-card px-3 py-2.5">
        <Link
          to="/rooms"
          className="grid size-11 place-items-center rounded-xl text-muted-foreground"
          aria-label={tx(lang, "Retour aux salons", "Back to rooms")}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{tx(lang, room.nameFr, room.nameEn)}</p>
          <p className="truncate text-xs text-muted-foreground">{tx(lang, room.topicFr, room.topicEn)}</p>
        </div>
        <button
          type="button"
          onClick={() => setReadOnly((v) => !v)}
          className={cn(
            "min-h-11 rounded-xl px-3 text-xs font-medium",
            readOnly ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          {readOnly ? tx(lang, "Lecture seule", "Read-only") : tx(lang, "Lire seul", "Read only")}
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => {
          const own = m.author === (nickname || "Toi") && m.seed === seed;
          return (
            <div key={m.id} className={cn("flex gap-2.5", own ? "flex-row-reverse" : "flex-row")}>
              {!own && <AbstractAvatar seed={m.seed} size={32} label={m.author} />}
              <div className={cn("flex max-w-[78%] flex-col gap-0.5", own ? "items-end" : "items-start")}>
                {!own && <span className="ml-1 text-xs text-muted-foreground">{m.author}</span>}
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    own
                      ? "rounded-tr-sm bg-primary text-primary-foreground"
                      : "rounded-tl-sm border border-border bg-card text-card-foreground",
                  )}
                >
                  {m.body}
                </div>
                <span className="mx-1 text-[11px] text-muted-foreground">
                  {formatTime(m.createdAt, lang)}
                </span>
              </div>
            </div>
          );
        })}
        {prefs.typingIndicators && aetherBusy && (
          <p className="text-xs text-muted-foreground">{tx(lang, "Aether écrit…", "Aether is writing…")}</p>
        )}
        <div ref={endRef} />
      </div>

      {scriptsOpen && (
        <div className="max-h-40 overflow-y-auto border-t border-border bg-card px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {tx(lang, "Phrases prêtes", "Ready phrases")}
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_SCRIPTS.flatMap((s) => s.phrases).map((p) => (
              <button
                key={p.fr}
                type="button"
                className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs"
                onClick={() => {
                  setDraft(tx(lang, p.fr, p.en));
                  setScriptsOpen(false);
                }}
              >
                {tx(lang, p.fr, p.en)}
              </button>
            ))}
          </div>
        </div>
      )}

      {suggestion && (
        <div className="border-t border-primary/20 bg-primary/10 px-4 py-3">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
            <Wand2 className="size-3" />
            {tx(lang, "Suggestion — tu décides", "Suggestion — you decide")}
          </p>
          <p className="text-sm">{suggestion}</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" className="rounded-lg" onClick={() => setDraft(suggestion)}>
              {tx(lang, "Utiliser", "Use")}
            </Button>
            <Button size="sm" variant="ghost" className="rounded-lg" onClick={() => setSuggestion(null)}>
              {tx(lang, "Ignorer", "Ignore")}
            </Button>
          </div>
        </div>
      )}
      {bridgeError && (
        <p className="px-4 py-2 text-xs text-muted-foreground">{bridgeError}</p>
      )}

      {!readOnly && (
        <div className="shrink-0 space-y-2 border-t border-border bg-card p-3">
          <div className="flex gap-2">
            <label htmlFor="draft" className="sr-only">
              {tx(lang, "Message", "Message")}
            </label>
            <textarea
              id="draft"
              value={draft}
              rows={2}
              maxLength={400}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder={tx(lang, "Écrire un message…", "Write a message…")}
              className="min-h-12 flex-1 resize-none rounded-xl border border-border bg-input-background px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              className="self-end rounded-xl"
              onClick={onSend}
              disabled={!draft.trim()}
            >
              {tx(lang, "Envoyer", "Send")}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="min-h-11 rounded-xl bg-muted px-3 text-xs font-medium text-muted-foreground"
              onClick={() => setScriptsOpen((v) => !v)}
            >
              {tx(lang, "Phrases prêtes", "Ready phrases")}
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-muted px-3 text-xs font-medium text-muted-foreground disabled:opacity-50"
              disabled={!draft.trim() || rephrase.isPending}
              onClick={() => rephrase.mutate()}
            >
              <Wand2 className="size-3.5" />
              {rephrase.isPending
                ? tx(lang, "Formulation…", "Phrasing…")
                : tx(lang, "Aider à formuler", "Help me phrase")}
            </button>
            {room.companion && (
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-muted px-3 text-xs font-medium text-muted-foreground disabled:opacity-50"
                disabled={!draft.trim() || aetherBusy}
                onClick={() => void talkToAether()}
              >
                <Sparkles className="size-3.5" />
                {aetherBusy
                  ? tx(lang, "Aether écrit…", "Aether is writing…")
                  : tx(lang, "Parler à Aether", "Talk to Aether")}
              </button>
            )}
          </div>
        </div>
      )}

      {!exitConfirm ? (
        <button
          type="button"
          onClick={() => setExitConfirm(true)}
          className="mx-3 mb-3 mt-1 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-destructive/25 bg-destructive/10 text-sm font-medium text-destructive"
        >
          <LogOut className="size-4" />
          {tx(lang, "Sortie douce", "Gentle exit")}
        </button>
      ) : (
        <div className="mx-3 mb-3 mt-1 flex items-center gap-3 rounded-xl border border-destructive/25 bg-card p-3">
          <p className="flex-1 text-xs text-muted-foreground">
            {tx(lang, "Quitter maintenant ? Personne n'est notifié.", "Leave now? Nobody is notified.")}
          </p>
          <button
            type="button"
            className="min-h-11 rounded-lg bg-muted px-3 text-xs font-medium"
            onClick={() => setExitConfirm(false)}
          >
            {tx(lang, "Rester", "Stay")}
          </button>
          <button
            type="button"
            className="min-h-11 rounded-lg bg-destructive/20 px-3 text-xs font-medium text-destructive"
            onClick={doExit}
          >
            {tx(lang, "Partir", "Leave")}
          </button>
        </div>
      )}
    </div>
  );
}
