import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BreathingGuide } from "@/components/club/breathing";
import { tx } from "@/lib/i18n";
import { useClub } from "@/lib/store";

/** Plein écran ultra-simple quand la batterie est à 0. */
export function OverloadOverlay() {
  const lang = useClub((s) => s.lang);
  const setMode = useClub((s) => s.setMode);
  const setEnergy = useClub((s) => s.setEnergy);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {tx(lang, "Mode surcharge", "Overload mode")}
      </p>
      <h1 className="font-display max-w-sm text-center text-2xl font-bold">
        {tx(lang, "Tu peux t'arrêter ici.", "You can stop here.")}
      </h1>
      <BreathingGuide lang={lang} />
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Button
          className="w-full rounded-xl"
          onClick={() => {
            setEnergy(2);
            setMode("normal");
          }}
        >
          {tx(lang, "Je vais mieux", "I feel better")}
        </Button>
        <Button
          variant="secondary"
          className="w-full rounded-xl"
          onClick={() => {
            setMode("calme");
            setEnergy(1);
            void navigate({ to: "/garden" });
          }}
        >
          {tx(lang, "Aller au jardin", "Go to the garden")}
        </Button>
        <Button
          variant="ghost"
          className="w-full rounded-xl text-destructive"
          onClick={() => {
            setMode("normal");
            void navigate({ to: "/" });
          }}
        >
          {tx(lang, "Sortie douce — quitter cet écran", "Gentle exit — leave this screen")}
        </Button>
      </div>
    </div>
  );
}
