import { useMemo, useState } from 'react';
import { getDaysUntilReview } from '../utils/spacedRepetition';

function WordsList({ cards, onDelete }) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [selectedId, setSelectedId] = useState(null);

  const sortedCards = useMemo(() => {
    const list = [...cards];
    list.sort((a, b) => {
      if (sortBy === 'easeFactor') return b.easeFactor - a.easeFactor;
      return new Date(a[sortBy]) - new Date(b[sortBy]);
    });
    return list;
  }, [cards, sortBy]);

  const selected = cards.find((card) => card.id === selectedId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-slate-600">
          Sort by
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded border border-slate-300 px-2 py-1"
        >
          <option value="createdAt">Created date</option>
          <option value="nextReviewDate">Next review</option>
          <option value="easeFactor">Ease factor</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-600">
            <tr>
              <th className="px-3 py-2">Word</th>
              <th className="px-3 py-2">Next review</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Ease</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCards.map((card) => {
              const days = getDaysUntilReview(card.nextReviewDate);
              const status = days <= 0 ? 'Review now' : days <= 3 ? 'Due soon' : 'Stable';
              const statusClass = days <= 0 ? 'text-red-600' : days <= 3 ? 'text-orange-600' : 'text-green-600';
              return (
                <tr key={card.id} className="border-t">
                  <td className="px-3 py-2 font-semibold text-blue-700">{card.word}</td>
                  <td className="px-3 py-2">{new Date(card.nextReviewDate).toLocaleDateString()}</td>
                  <td className={`px-3 py-2 font-medium ${statusClass}`}>{status}</td>
                  <td className="px-3 py-2">{card.easeFactor}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setSelectedId(card.id)} className="rounded bg-slate-200 px-2 py-1">
                        Details
                      </button>
                      <button type="button" onClick={() => onDelete(card.id)} className="rounded bg-red-500 px-2 py-1 text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="font-bold">Review history: {selected.word}</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {(selected.reviewHistory || []).slice().reverse().map((item, idx) => (
              <li key={`${item.date}-${idx}`}>
                {new Date(item.date).toLocaleString()} - {item.quality} - interval {item.interval}d
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default WordsList;
