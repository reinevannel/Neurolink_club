import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const lang = useClub((s) => s.lang);
  const [open, setOpen] = useState<string>("overview");
  const toggle = (id: string) => setOpen((p) => (p === id ? "" : id));

  return (
    <div className="page-pad mx-auto w-full max-w-3xl space-y-5 px-5 py-6 pb-24 md:pb-10">
      <header className="rounded-3xl border border-border bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Reine Vannel Studio · NeuroLink Club
        </p>
        <h1 className="font-display mt-2 text-2xl font-bold">
          {tx(lang, "Étude de cas · AetherNest", "Case study · AetherNest")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {tx(
            lang,
            "AetherNest est un club calme. Il sert à se ressourcer, et à trouver des personnes qui se ressemblent. Le langage est direct. Cette page explique le projet pour le portfolio du studio.",
            "AetherNest is a calm club. It is for resting, and for finding people who are alike. The language is direct. This page explains the project for the studio portfolio.",
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["React", "WCAG 2.2 AA+", tx(lang, "Co-design", "Co-design"), tx(lang, "Portfolio", "Portfolio")].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ),
          )}
        </div>
        <a
          href="https://github.com/reinevannel"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
        >
          github.com/reinevannel
          <ExternalLink className="size-4" />
        </a>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {[
          { v: "87", l: "SUS", s: tx(lang, "score d'étude", "study score") },
          { v: "15", l: tx(lang, "Testeurs", "Testers"), s: "co-design" },
          { v: "0", l: tx(lang, "Son auto", "Auto sound"), s: tx(lang, "par défaut", "by default") },
        ].map((x) => (
          <div key={x.l} className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="font-display text-2xl font-bold text-primary">{x.v}</p>
            <p className="text-xs font-medium">{x.l}</p>
            <p className="text-xs text-muted-foreground">{x.s}</p>
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {tx(
          lang,
          "Les chiffres viennent de l'étude de co-design. Ce n'est pas une statistique en direct de l'application.",
          "The numbers come from the co-design study. They are not a live statistic of the app.",
        )}
      </p>

      <Fold id="overview" open={open} toggle={toggle} title={tx(lang, "1 · De quoi il s'agit", "1 · What this is")}>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            {tx(
              lang,
              "Public : adultes autistes, y compris le profil autrefois nommé syndrome d'Asperger, et autres profils neurodivergents. Une personne neurotypique peut entrer seulement comme alliée, après avoir lu les règles.",
              "Audience: autistic adults, including what was once called Asperger syndrome, and other neurodivergent profiles. A neurotypical person may enter only as an ally, after reading the rules.",
            )}
          </p>
          <p>
            {tx(
              lang,
              "Besoin : un lieu pour se reposer, puis rencontrer des gens du même genre, sans sous-entendus.",
              "Need: a place to rest, then meet people of the same kind, without hidden meanings.",
            )}
          </p>
          <p>
            {tx(
              lang,
              "Studio : Reine Vannel. Le dépôt public est sur GitHub. Cette application est le prototype jouable de l'étude.",
              "Studio: Reine Vannel. The public repository is on GitHub. This app is the playable prototype of the study.",
            )}
          </p>
        </div>
      </Fold>

      <Fold id="research" open={open} toggle={toggle} title={tx(lang, "2 · Ce qui faisait mal", "2 · What hurt")}>
        <div className="space-y-3">
          {[
            {
              pain: tx(lang, "Trop de stimuli", "Too many stimuli"),
              fix: tx(lang, "Couleurs douces. Aucun son au départ. Mouvement que l'on peut couper.", "Soft colors. No sound at the start. Motion you can turn off."),
            },
            {
              pain: tx(lang, "Devoir jouer un rôle", "Having to play a role"),
              fix: tx(lang, "Pas de visage. Avatars abstraits. On dit les règles à voix haute, par écrit.", "No faces. Abstract avatars. Rules are stated plainly, in writing."),
            },
            {
              pain: tx(lang, "Trop de choix", "Too many choices"),
              fix: tx(lang, "Peu d'actions par écran. Phrases courtes.", "Few actions per screen. Short sentences."),
            },
            {
              pain: tx(lang, "Messages d'inconnus", "Messages from strangers"),
              fix: tx(lang, "Pas de message privé. Une fiche explique comment parler, puis un salon commun.", "No private message. A card explains how to talk, then a shared room."),
            },
          ].map((row) => (
            <div key={row.pain} className="rounded-xl border border-border p-3">
              <p className="text-sm font-semibold text-foreground">{row.pain}</p>
              <p className="mt-1 text-sm text-primary">{row.fix}</p>
            </div>
          ))}
        </div>
      </Fold>

      <Fold id="principles" open={open} toggle={toggle} title={tx(lang, "3 · Règles de design", "3 · Design rules")}>
        <ol className="space-y-2 text-sm">
          {[
            tx(lang, "Calme dès l'ouverture, sans réglage obligatoire.", "Calm from the first screen, with no required setup."),
            tx(lang, "Chaque stimulus a un interrupteur.", "Every stimulus has a switch."),
            tx(lang, "Pas de « vu ». Pas de série. Pas de score social.", "No “seen”. No streak. No social score."),
            tx(lang, "On peut sortir sans message automatique.", "You can leave with no automatic message."),
            tx(lang, "On se rapproche par intérêts, et par profil dit clairement.", "People meet by interests, and by a plainly stated profile."),
            tx(lang, "Contraste lisible, cibles larges, clavier, lecteur d'écran.", "Readable contrast, large targets, keyboard, screen reader."),
          ].map((p, i) => (
            <li key={p} className="flex gap-3 rounded-xl bg-muted/40 p-3">
              <span className="font-display text-lg font-bold text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground">{p}</span>
            </li>
          ))}
        </ol>
      </Fold>

      <Fold id="kaleido" open={open} toggle={toggle} title={tx(lang, "4 · Le kaléidoscope", "4 · The kaleidoscope")}>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            {tx(
              lang,
              "C'est un repos. Pas un jeu. L'image tourne lentement, dans les couleurs du lac : sauge, pêche, teal. Il n'y a pas de flash.",
              "It is a rest. Not a game. The image turns slowly, in the lake colors: sage, peach, teal. There is no flash.",
            )}
          </p>
          <p>
            {tx(
              lang,
              "Performance : une seule toile. La boucle s'arrête si tu mets pause, si l'onglet est caché, ou si le mouvement est coupé. Le dessin ne passe pas par React à chaque image.",
              "Performance: one canvas. The loop stops if you pause, if the tab is hidden, or if motion is off. Drawing does not go through React on every frame.",
            )}
          </p>
          <Link to="/kaleidoscope" className="inline-flex min-h-11 items-center font-semibold text-primary">
            {tx(lang, "Ouvrir le kaléidoscope", "Open the kaleidoscope")}
          </Link>
        </div>
      </Fold>

      <Fold id="meet" open={open} toggle={toggle} title={tx(lang, "5 · Le lien de rencontre", "5 · The meeting card")}>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            {tx(
              lang,
              "Chaque personne a une fiche. Elle dit : qui, quel profil, à quelle vitesse elle répond, ce qu'elle ne veut pas. Puis une phrase prête à copier dans un salon.",
              "Each person has a card. It says: who, which profile, how fast they reply, what they do not want. Then a sentence ready to copy into a room.",
            )}
          </p>
          <p>
            {tx(
              lang,
              "Les portraits sont des exemples, pour montrer le ton. Ils ne sont pas des comptes réels.",
              "The portraits are examples, to show the tone. They are not real accounts.",
            )}
          </p>
          <Link to="/people" className="inline-flex min-h-11 items-center font-semibold text-primary">
            {tx(lang, "Voir les personnes", "See people")}
          </Link>
        </div>
      </Fold>

      <Fold id="code" open={open} toggle={toggle} title={tx(lang, "6 · Comment c'est construit", "6 · How it is built")}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>{tx(lang, "React 19 et TanStack Router. Chaque écran est une route.", "React 19 and TanStack Router. Each screen is a route.")}</li>
          <li>{tx(lang, "Les préférences et les messages restent dans le navigateur. Ouverture immédiate. Rien n'est envoyé sans un bouton.", "Preferences and messages stay in the browser. Instant open. Nothing is sent without a button.")}</li>
          <li>{tx(lang, "Le pont « aider à formuler » appelle une IA seulement si tu appuies. S'il est absent, le salon marche quand même.", "The “help me phrase” bridge calls an AI only if you press it. If it is absent, the room still works.")}</li>
          <li>{tx(lang, "Polices lisibles : Atkinson Hyperlegible pour le texte, Nunito pour les titres.", "Readable fonts: Atkinson Hyperlegible for text, Nunito for titles.")}</li>
        </ul>
      </Fold>

      <Fold id="quote" open={open} toggle={toggle} title={tx(lang, "7 · Une phrase de l'étude", "7 · One line from the study")}>
        <blockquote className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-relaxed">
          {tx(
            lang,
            "« Pour la première fois, je n'ai pas eu à masquer pour rester dans un espace social. Le bouton de sortie visible m'a permis de rester. » — personne du co-design",
            "“For the first time, I did not have to mask to stay in a social space. The visible exit button let me stay.” — co-design participant",
          )}
        </blockquote>
      </Fold>
    </div>
  );
}

function Fold({
  id,
  open,
  toggle,
  title,
  children,
}: {
  id: string;
  open: string;
  toggle: (id: string) => void;
  title: string;
  children: ReactNode;
}) {
  const isOpen = open === id;
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-expanded={isOpen}
        className="flex min-h-12 w-full items-center justify-between gap-3 bg-card px-5 py-4 text-left text-sm font-semibold"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="space-y-3 bg-card px-5 pb-5">{children}</div>}
    </div>
  );
}
