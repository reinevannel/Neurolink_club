/**
 * Tests du club.
 * Ils utilisent le testeur déjà dans Node. Aucune librairie ajoutée.
 *
 * Lancer : npm test
 */
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { explainSignInGate } from "./auth-tour.ts";
import { tx } from "./i18n.ts";
import { getPerson, matchScore, sharedInterests } from "./people.ts";

class MemoryStorage {
  private map = new Map<string, string>();
  getItem(key: string) {
    return this.map.has(key) ? this.map.get(key)! : null;
  }
  setItem(key: string, value: string) {
    this.map.set(key, String(value));
  }
  removeItem(key: string) {
    this.map.delete(key);
  }
  clear() {
    this.map.clear();
  }
}

const memory = new MemoryStorage();
Object.defineProperty(globalThis, "localStorage", {
  value: memory,
  configurable: true,
});

const { appendLocalMessage, listLocalMessages } = await import("./local-chat.ts");

describe("texte bilingue", () => {
  it("prend le français quand la langue est fr", () => {
    assert.equal(tx("fr", "Bonjour", "Hello"), "Bonjour");
  });

  it("prend l'anglais quand la langue est en", () => {
    assert.equal(tx("en", "Bonjour", "Hello"), "Hello");
  });
});

describe("rencontres", () => {
  it("compte les intérêts en commun, sans inventer", () => {
    const lea = getPerson("lea");
    assert.ok(lea);
    assert.deepEqual(sharedInterests(lea, ["astronomy", "music"]), ["astronomy"]);
  });

  it("classe plus haut un même profil et des intérêts partagés", () => {
    const lea = getPerson("lea");
    const camille = getPerson("camille");
    assert.ok(lea && camille);
    const close = matchScore(lea, ["astronomy", "nature"], "autisme");
    const far = matchScore(camille, ["coding"], "autisme");
    assert.equal(close, 7);
    assert.equal(far, 0);
    assert.ok(close > far);
  });

  it("n'ajoute pas de bonus si le profil n'est pas choisi", () => {
    const lea = getPerson("lea");
    assert.ok(lea);
    assert.equal(matchScore(lea, ["astronomy"], "unset"), 2);
  });

  it("retourne undefined pour une fiche inconnue", () => {
    assert.equal(getPerson("personne-inconnue"), undefined);
  });
});

describe("messages locaux", () => {
  beforeEach(() => {
    memory.clear();
  });

  it("ouvre un salon calme avec des messages déjà écrits", () => {
    const messages = listLocalMessages("quiet");
    assert.ok(messages.length >= 2);
    assert.equal(messages[0]?.author, "Aether");
  });

  it("garde un message, le nettoie, et le limite", () => {
    listLocalMessages("quiet");
    const sent = appendLocalMessage({
      roomId: "quiet",
      author: "ToiToiToiToiToiToiToiToiEXTRA",
      seed: 1,
      body: "  Bonjour.   " + "a".repeat(500),
    });
    assert.equal(sent.author.length, 24);
    assert.equal(sent.body.startsWith("Bonjour."), true);
    assert.ok(sent.body.length <= 400);
    const again = listLocalMessages("quiet");
    assert.equal(again.at(-1)?.id, sent.id);
  });
});

describe("authentification — trois états seulement", () => {
  it("attend tant que la vérification n'est pas finie", () => {
    const explained = explainSignInGate({ isPending: true, hasUser: true });
    assert.equal(explained.state, "pending");
    assert.match(explained.sentence, /vérification/);
  });

  it("dit qu'une session existe seulement après la vérification", () => {
    const explained = explainSignInGate({ isPending: false, hasUser: true });
    assert.equal(explained.state, "signed_in");
  });

  it("laisse le club ouvert quand personne n'est connecté", () => {
    const explained = explainSignInGate({ isPending: false, hasUser: false });
    assert.equal(explained.state, "signed_out");
    assert.match(explained.sentence, /appareil/);
  });
});
