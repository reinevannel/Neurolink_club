/**
 * Petit helper bilingue FR / EN.
 * On n'utilise pas une librairie i18n : un fichier simple suffit.
 *
 * Usage : tx(lang, "Bonjour", "Hello")
 */
export type Lang = "fr" | "en";

export function tx(lang: Lang, fr: string, en: string): string {
  return lang === "fr" ? fr : en;
}
