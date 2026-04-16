import ReviewMode from '../components/ReviewMode';

function ReviewPage({ dueCards, onReview }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">Review Mode</h2>
      <ReviewMode cards={dueCards} onReview={onReview} />
    </section>
  );
}

export default ReviewPage;
