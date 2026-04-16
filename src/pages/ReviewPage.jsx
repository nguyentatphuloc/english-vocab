import ReviewMode from '../components/ReviewMode';

function ReviewPage({ dueCards, currentIndex, onRate }) {
  return <ReviewMode dueCards={dueCards} currentIndex={currentIndex} onRate={onRate} />;
}

export default ReviewPage;
