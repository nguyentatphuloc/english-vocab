import Flashcard from './Flashcard';
import { QUALITY } from '../utils/spacedRepetition';

function ReviewMode({ dueCards, currentIndex, onRate }) {
  if (!dueCards.length) {
    return <div className="rounded-xl bg-white p-5 text-center shadow">Không có từ nào cần ôn ngay 🎉</div>;
  }

  const card = dueCards[currentIndex % dueCards.length];

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Card {currentIndex + 1}/{dueCards.length}
      </p>
      <Flashcard card={card} />
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => onRate(card, QUALITY.HARD)} className="rounded-lg bg-red-500 px-4 py-2 text-white">
          Hard
        </button>
        <button type="button" onClick={() => onRate(card, QUALITY.GOOD)} className="rounded-lg bg-orange-500 px-4 py-2 text-white">
          Good
        </button>
        <button type="button" onClick={() => onRate(card, QUALITY.EASY)} className="rounded-lg bg-green-600 px-4 py-2 text-white">
          Easy
        </button>
      </div>
    </div>
  );
}

export default ReviewMode;
