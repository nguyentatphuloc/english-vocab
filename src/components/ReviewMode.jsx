import Flashcard from './Flashcard';

function ReviewMode({ cards, onReview }) {
  if (!cards.length) {
    return <p className="rounded bg-green-100 p-4 text-green-700">Không có từ nào cần ôn ngay 🎉</p>;
  }

  const card = cards[0];

  return (
    <div className="space-y-4">
      <Flashcard card={card} />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => onReview(card, 'hard')} className="rounded bg-red-500 px-4 py-2 font-medium text-white">
          Hard
        </button>
        <button onClick={() => onReview(card, 'good')} className="rounded bg-orange-500 px-4 py-2 font-medium text-white">
          Good
        </button>
        <button onClick={() => onReview(card, 'easy')} className="rounded bg-green-600 px-4 py-2 font-medium text-white">
          Easy
        </button>
      </div>
    </div>
  );
}

export default ReviewMode;
