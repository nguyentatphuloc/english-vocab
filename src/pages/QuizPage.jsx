import QuizMode from '../components/QuizMode';

function QuizPage({ cards, onQuizResult }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">Quiz Mode</h2>
      <QuizMode cards={cards} onResult={onQuizResult} />
    </section>
  );
}

export default QuizPage;
