/** Assemble des classes CSS. Pas de bibliothèque en plus. */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
