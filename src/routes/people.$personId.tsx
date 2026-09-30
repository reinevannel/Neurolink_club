import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { AbstractAvatar } from "@/components/club/abstract-avatar";
import { INTERESTS } from "@/lib/interests";
import { getPerson, sharedInterests } from "@/lib/people";
import { ROOMS } from "@/lib/rooms";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/people/$personId")({ component: PersonPage });

function label(id: string, lang: "fr" | "en") {
  const found = INTERESTS.find((i) => i.id === id);
  return found ? tx(lang, found.fr, found.en) : id;
}

function PersonPage() {
  const { personId } = Route.useParams();
  const person = getPerson(personId);
  const lang = useClub((s) => s.lang);
  const nickname = useClub((s) => s.nickname);
  const interests = useClub((s) => s.interests);
  const saved = useClub((s) => s.savedPeople);
  const toggleSaved = useClub((s) => s.toggleSavedPerson);
  const [copied, setCopied] = useState(false);

  if (!person) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        {tx(lang, "Cette fiche n'existe pas.", "This card does not exist.")}{" "}
        <Link to="/people" className="text-primary underline">
          {tx(lang, "Retour", "Back")}
        </Link>
      </div>
    );
  }

  const room = ROOMS.find((r) => r.id === person.roomId);
  const shared = sharedInterests(person, interests);
  const kept = saved.includes(person.id);
  const me = nickname || tx(lang, "moi", "me");
  const phrase = tx(
    lang,
    `Bonjour ${person.name}. Je m'appelle ${me}. ${
      shared.length
        ? `On partage : ${shared.map((id) => label(id, lang)).join(", ")}.`
        : "Je n'ai pas encore d'intérêt en commun listé."
    } Je préfère un échange lent, par écrit${room ? `, dans ${room.nameFr}` : ""}. Pas d'obligation de répondre.`,
    `Hello ${person.name}. My name is ${me}. ${
      shared.length
        ? `We share: ${shared.map((id) => label(id, lang)).join(", ")}.`
        : "I don't have a shared interest listed yet."
    } I prefer a slow, written exchange${room ? `, in ${room.nameEn}` : ""}. No need to reply.`,
  );

  const copyPhrase = async () => {
    try {
      await navigator.clipboard.writeText(phrase);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-5 px-5 py-6 pb-24 md:pb-10">
      <Link
        to="/people"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        {tx(lang, "Toutes les personnes", "All people")}
      </Link>

      <header className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <AbstractAvatar seed={person.seed} size={56} label={person.name} />
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {tx(lang, "Lien de rencontre", "Meeting card")}
            </p>
            <h1 className="font-display mt-1 text-2xl font-bold">{person.name}</h1>
            <p className="mt-1 text-sm text-primary">{tx(lang, person.profileFr, person.profileEn)}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">{tx(lang, person.bioFr, person.bioEn)}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {tx(lang, person.paceFr, person.paceEn)}
        </p>
        {person.profile === "allie" && (
          <p className="mt-3 rounded-xl bg-muted px-3 py-2 text-sm leading-relaxed">
            {tx(
              lang,
              "Cette personne est neurotypique. Elle est ici comme alliée. Elle n'écrit pas en premier.",
              "This person is neurotypical. They are here as an ally. They do not write first.",
            )}
          </p>
        )}
      </header>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-bold">
          {tx(lang, "Comment parler avec cette personne", "How to talk with this person")}
        </h2>
        <ul className="mt-3 space-y-2">
          {(lang === "fr" ? person.rulesFr : person.rulesEn).map((rule) => (
            <li key={rule} className="flex gap-2 text-sm leading-relaxed">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-primary" />
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-bold">
          {tx(lang, "Intérêts en commun", "Shared interests")}
        </h2>
        {shared.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {tx(
              lang,
              "Aucun pour l'instant. Tu peux ajouter des intérêts sur l'accueil.",
              "None yet. You can add interests on the home page.",
            )}
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {shared.map((id) => (
              <span key={id} className="rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                {label(id, lang)}
              </span>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          {tx(lang, "Ses autres intérêts : ", "Their other interests: ")}
          {person.interests
            .filter((id) => !shared.includes(id))
            .map((id) => label(id, lang))
            .join(", ") || tx(lang, "aucun", "none")}
          .
        </p>
      </section>

      <section className="rounded-2xl border border-primary/25 bg-primary/10 p-5">
        <h2 className="font-display text-lg font-bold">
          {tx(lang, "Phrase pour ouvrir", "Opening sentence")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed">{phrase}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {tx(
            lang,
            "Copie cette phrase, puis colle-la dans le salon. Ce n'est pas un message privé.",
            "Copy this sentence, then paste it in the room. This is not a private message.",
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copyPhrase()}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? tx(lang, "Copié", "Copied") : tx(lang, "Copier la phrase", "Copy the sentence")}
          </button>
          {room && (
            <Link
              to="/rooms/$roomId"
              params={{ roomId: room.id }}
              className="inline-flex min-h-11 items-center rounded-xl border border-border bg-card px-4 text-sm font-semibold"
            >
              {tx(lang, `Ouvrir ${room.nameFr}`, `Open ${room.nameEn}`)}
            </Link>
          )}
          <button
            type="button"
            onClick={() => toggleSaved(person.id)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold",
              kept ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {kept
              ? tx(lang, "Retirée de ma liste", "Remove from my list")
              : tx(lang, "Garder cette personne", "Keep this person")}
          </button>
        </div>
      </section>
    </div>
  );
}
