/**
 * Browser Speech Synthesis Helper for German (de-DE)
 */
export const speakGerman = (text: string, rate: number = 0.9): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate; // slightly slower for language learning clarity

  // Try to find a German voice
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(
    (voice) => voice.lang.startsWith('de') || voice.lang.includes('DE')
  );

  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  window.speechSynthesis.speak(utterance);
};
