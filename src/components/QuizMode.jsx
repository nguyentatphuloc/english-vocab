import { useMemo, useState } from 'react';

const shuffle = (arr) => {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

function QuizMode({ cards, onResult }) {
  const [feedback, setFeedback] = useState(null);

  const question = useMemo(() => {
    if (cards.length < 4) return null;

    const pool = shuffle(cards).slice(0, 4);
    const correct = pool[0];

    return {
      correct,
      prompt: correct.definitions?.[0]?.definition || 'Không có định nghĩa',
      options: shuffle(pool.map((item) => item.word)),
    };
  }, [cards]);

  const handleAnswer = (answer) => {
    const isCorrect = answer === question.correct.word;
    setFeedback(isCorrect ? 'Chính xác!' : `Sai, đáp án đúng là ${question.correct.word}`);
    onResult(question.correct, isCorrect ? 'good' : 'hard');
  };

  if (!question) {
    return <p className="rounded bg-yellow-100 p-4 text-yellow-700">Cần ít nhất 4 từ để bắt đầu quiz.</p>;
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Chọn từ đúng với nghĩa sau:</h3>
      <p className="rounded bg-slate-100 p-3 text-slate-800">{question.prompt}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="rounded border border-slate-300 px-4 py-2 text-left hover:bg-blue-50"
          >
            {option}
          </button>
        ))}
      </div>

      {feedback ? <p className="font-medium text-slate-700">{feedback}</p> : null}
    </div>
  );
}

export default QuizMode;
