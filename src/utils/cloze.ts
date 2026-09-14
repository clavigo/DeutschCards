// src/utils/cloze.ts
export function createClozeSentence(sentence?: string, word?: string): string {
  if (!sentence || !word) return "";

  // Беремо основу слова (перші 4-5 літер), щоб перекрити форми дієслів:
  // "warten" -> "wart" -> збігається з "warte", "wartet", "wartest"
  // "denken" -> "denk" -> збігається з "denkst", "denkt"
  const base =
    word.length > 4 ? word.slice(0, Math.min(word.length - 2, 5)) : word;

  // Регулярний вираз шукає слово з такою основою, ігноруючи регістр
  const regex = new RegExp(`\\b${base}[a-zA-ZäöüßÄÖÜ]*\\b`, "i");

  if (regex.test(sentence)) {
    return sentence.replace(regex, "______");
  }

  // Якщо точного збігу основи немає (сильні форми), просто замінюємо пряме слово
  return sentence.replace(new RegExp(`\\b${word}\\b`, "gi"), "______");
}
