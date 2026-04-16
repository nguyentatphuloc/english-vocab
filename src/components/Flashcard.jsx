import { getReviewStatus } from '../utils/spacedRepetition';

function Flashcard({ card }) {
  const status = getReviewStatus(card.nextReviewDate);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-800">{card.word}</h3>
      <p className="mt-1 text-slate-600">{card.phonetic || 'N/A'}</p>
      <p className="mt-2 text-slate-700">{card.definitions?.[0]?.definition}</p>
      <span className={`mt-3 inline-block rounded px-2 py-1 text-xs font-medium ${status.color} ${status.bg}`}>
        {status.label}
      </span>
      <p className="mt-2 text-sm text-slate-500">Ôn lại: {new Date(card.nextReviewDate).toLocaleDateString()}</p>
    </div>
  );
}

export default Flashcard;
