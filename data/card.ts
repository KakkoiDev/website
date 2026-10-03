import { dictionary } from "@/data/dictionary";

// /card, the digital 名刺: one page in both languages, shown on a phone when
// there is no paper card. The names keep each language's order.
export const card = {
  meta: {
    title: "Card | kakkoi.dev",
    description: "Cyril Antoni's digital business card.",
  },
  name: dictionary.en.hero.name,
  nameJa: dictionary.ja.hero.name,
  title: "Software engineer · AI",
  // ?ref=phone tells these scans apart from the paper card's ?ref=card.
  qrUrl: "https://kakkoi.dev/ja/?ref=phone",
  qrLabel: "QR code for kakkoi.dev",
  caption: {
    en: "Scan to open kakkoi.dev",
    ja: "スキャンしてkakkoi.devを開く",
  },
  addToContacts: {
    en: dictionary.en.contact.addToContacts,
    ja: dictionary.ja.contact.addToContacts,
  },
};
