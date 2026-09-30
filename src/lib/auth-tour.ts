/**
 * Visite guidée de l'authentification.
 *
 * Le club ne demande pas de compte.
 * Cette fonction ne connecte personne.
 * Elle explique seulement les trois états déjà calculés par le projet.
 *
 * pending    : on ne sait pas encore
 * signed_in  : une session existe
 * signed_out : la vérification est finie, il n'y a personne
 */
import {
  resolveSignInGateState,
  type SignInGateInput,
  type SignInGateState,
} from "./auth/sign-in-gate.ts";

export function explainSignInGate(input: SignInGateInput): {
  state: SignInGateState;
  sentence: string;
} {
  const state = resolveSignInGateState(input);
  if (state === "pending") {
    return {
      state,
      sentence: "La session est encore en cours de vérification. On n'affiche pas de bouton.",
    };
  }
  if (state === "signed_in") {
    return {
      state,
      sentence: "Une session existe. On peut afficher qui est là, et un moyen de sortir.",
    };
  }
  return {
    state,
    sentence: "Personne n'est connecté. Ici, le club reste ouvert : les messages restent sur l'appareil.",
  };
}
