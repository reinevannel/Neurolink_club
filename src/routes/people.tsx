import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AbstractAvatar } from "@/components/club/abstract-avatar";
import { INTERESTS } from "@/lib/interests";
import { PEOPLE, matchScore, sharedInterests, type Person } from "@/lib/people";
import { tx } from "@/lib/i18n";
import { useClub, type NeuroProfile } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/people")({ component: PeoplePage });

const PROFILES: { id: NeuroProfile; fr: string; en: string }[] = [
  { id: "unset", fr: "Je ne précise pas", en: "I won't say" },
  { id: "autisme", fr: "Autisme", en: "Autism" },
  { id: "tdah", fr: "TDAH", en: "ADHD" },
  { id: "mixte", fr: "Autisme et TDAH", en: "Autism and ADHD" },
  { id: "dyspraxie", fr: "Dyspraxie", en: "Dyspraxia" },
  { id: "allie", fr: "Neurotypique, allié", en: "Neurotypical ally" },
];

function interestLabel(id: string, lang: "fr" | "en") {
  const found = INTERESTS.find((i) => i.id === id);
  if (!found) return id;
  return tx(lang, found.fr, found.en);
}

function whyLine(person: Person, interests: string[], profile: NeuroProfile, lang: "fr" | "en") {
  const shared = sharedInterests(person, interests);
  const names = shared.map((id) => interestLabel(id, lang)).join(", ");
  const same = profile !== "unset" && person.profile === profile;
  if (shared.length && same) {
    return tx(
      lang,
      `Même profil, et ${shared.length} intérêt${shared.length > 1 ? "s" : ""} en commun : ${names}.`,
      `Same profile, and ${shared.length} shared interest${shared.length > 1 ? "s" : ""}: ${names}.`,
    );
  }
  if (shared.length) {
    return tx(
      lang,
      `${shared.length} intérêt${shared.length > 1 ? "s" : ""} en commun : ${names}.`,
      `${shared.length} shared interest${shared.length > 1 ? "s" : ""}: ${names}.`,
    );
  }
  if (same) return tx(lang, "Même profil que toi. Aucun intérêt en commun pour l'instant.", "Same profile as you. No shared interest yet.");
  return tx(lang, "Pas de correspondance directe. Tu peux quand même lire la fiche.", "No direct match. You can still read the card.");
}

function PeoplePage() {
  const lang = useClub((s) => s.lang);
  const interests = useClub((s) => s.interests);
  const profile = useClub((s) => s.neuroProfile);
  const setProfile = useClub((s) => s.setNeuroProfile);

  const ranked = [...PEOPLE].sort((a, b) => {
    const d = matchScore(b, interests, profile) - matchScore(a, interests, profile);
    return d !== 0 ? d : a.name.localeCompare(b.name);
  });

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-6 px-5 py-6 pb-24 md:pb-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {tx(lang, "Rencontres", "Meet")}
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold">
          {tx(lang, "Des personnes qui te ressemblent", "People who are like you")}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {tx(
            lang,
            "Ce ne sont pas des profils réels. Ce sont des exemples du club, écrits clairement. Il n'y a pas de message privé. Chaque fiche dit comment parler, et dans quel salon.",
            "These are not real profiles. They are club examples, written clearly. There is no private message. Each card says how to talk, and in which room.",
          )}
        </p>
      </header>

      <section className="rounded-3xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold">
          {tx(lang, "Ton profil, pour le tri", "Your profile, for sorting")}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {tx(
            lang,
            "Choisis ce qui te ressemble. Le club place d'abord les personnes proches. Tu peux laisser « je ne précise pas ».",
            "Choose what fits you. The club puts closer people first. You can leave “I won't say”.",
          )}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProfile(p.id)}
              className={cn(
                "min-h-11 rounded-full border px-3 text-sm font-medium",
                profile === p.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground",
              )}
            >
              {tx(lang, p.fr, p.en)}
            </button>
          ))}
        </div>
      </section>

      <ul className="space-y-3">
        {ranked.map((person) => {
          const shared = sharedInterests(person, interests);
          return (
            <li key={person.id}>
              <Link
                to="/people/$personId"
                params={{ personId: person.id }}
                className="flex gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <AbstractAvatar seed={person.seed} size={48} label={person.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold">{person.name}</p>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-primary">{tx(lang, person.profileFr, person.profileEn)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {tx(lang, person.bioFr, person.bioEn)}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground">
                    {whyLine(person, interests, profile, lang)}
                  </p>
                  {shared.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {shared.map((id) => interestLabel(id, lang)).join(" · ")}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
