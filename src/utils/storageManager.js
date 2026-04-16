const STORAGE_KEY = 'english_vocab_cards_v1';

const safeParse = (raw) => {
  try {
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const loadCards = () => safeParse(window.localStorage.getItem(STORAGE_KEY));

export const saveCards = (cards) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

export const clearCards = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};
