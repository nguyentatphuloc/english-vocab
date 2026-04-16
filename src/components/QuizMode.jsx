import { useMemo, useState } from 'react';
import { QUALITY } from '../utils/spacedRepetition';

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function QuizMode({ cards, onRate }) {
  const [feedback, setFeedback] = useState('');

  const quiz = useMemo(() => {
    if (cards.length < 4) return null;
    const questionCard = cards[Math.floor(Math.random() * cards.length)];
    const correct = questionCard.definitions?.[0]?.definition;
    const distractors = shuffle(
      cards
        .filter((c) => c.id !== questionCard.id)
        .map((c) => c.definitions?.[0]?.definition)
        .filter(Boolean)
    ).slice(0, 3);

    if (!correct || distractors.length < 3) return null;

    return {
      questionCard,
      options: shuffle([correct, ...distractors]),
      answer: correct,
    };
  }, [cards]);

  if (!quiz) {
    return <div className="rounded-xl bg-white p-5 text-center shadow">Cần ít nhất 4 từ để bắt đầu quiz.</div>;
  }

  const choose = (option) => {
    const isCorrect = option === quiz.answer;
    onRate(quiz.questionCard, isCorrect ? QUALITY.GOOD : QUALITY.HARD);
    setFeedback(isCorrect ? '✅ Correct!' : '❌ Incorrect');
  };

  return (
    <div className="space-y-4 rounded-xl bg-white p-5 shadow">
      <p className="text-sm text-slate-500">Choose the correct meaning:</p>
      <h3 className="text-2xl font-bold text-blue-700">{quiz.questionCard.word}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {quiz.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => choose(option)}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left hover:bg-blue-50"
          >
            {option}
          </button>
        ))}
      </div>
      {feedback ? <p className="font-semibold">{feedback}</p> : null}
    </div>
  );
}

export default QuizMode;
