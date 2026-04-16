import QuizMode from '../components/QuizMode';

function QuizPage({ cards, onRate }) {
  return <QuizMode cards={cards} onRate={onRate} />;
}

export default QuizPage;
