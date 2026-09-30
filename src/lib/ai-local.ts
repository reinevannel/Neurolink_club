/**
 * Aide locale, sans serveur et sans clé.
 * « Formuler » nettoie la phrase. Aether répond par une phrase calme.
 */
export async function reformulateMessage(input: { data: { draft: string; lang: "fr" | "en" } }) {
  const text = input.data.draft.replace(/\s+/g, " ").trim();
  if (!text) return { ok: false as const, error: "empty" as const };
  const polite = input.data.lang === "fr" ? "Je voudrais dire : " : "I would like to say: ";
  const body = text.length < 80 && !/^(bonjour|hello|salut|hi)\b/i.test(text) ? `${polite}${text}` : text;
  return { ok: true as const, text: body };
}

export async function askCompanion(input: { data: { lang: "fr" | "en" } }) {
  return {
    ok: true as const,
    text:
      input.data.lang === "fr"
        ? "Je t'ai lu. Tu n'as pas à répondre tout de suite."
        : "I read you. You do not have to reply right away.",
  };
}
