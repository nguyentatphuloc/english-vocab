const STORAGE_KEY = 'english_vocab_flashcards_v1';

export const loadCards = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

export const saveCards = (cards) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

export const upsertCard = (cards, card) => {
  const index = cards.findIndex((item) => item.word.toLowerCase() === card.word.toLowerCase());
  if (index === -1) return [card, ...cards];

  const next = [...cards];
  next[index] = { ...next[index], ...card, id: next[index].id };
  return next;
};

export const removeCard = (cards, id) => cards.filter((card) => card.id !== id);
