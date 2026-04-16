import { useMemo, useState } from 'react';

const sorters = {
  createdAt: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  nextReviewDate: (a, b) => new Date(a.nextReviewDate) - new Date(b.nextReviewDate),
  easeFactor: (a, b) => b.easeFactor - a.easeFactor,
};

function WordsList({ cards, onDelete }) {
  const [sortBy, setSortBy] = useState('createdAt');

  const sortedCards = useMemo(() => [...cards].sort(sorters[sortBy]), [cards, sortBy]);

  if (!cards.length) {
    return <p className="rounded bg-slate-100 p-4 text-slate-600">Chưa có từ vựng nào được lưu.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="sortBy" className="text-sm font-medium text-slate-700">
          Sắp xếp theo:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="createdAt">Ngày tạo</option>
          <option value="nextReviewDate">Ngày ôn tiếp</option>
          <option value="easeFactor">Ease Factor</option>
        </select>
      </div>

      <div className="space-y-3">
        {sortedCards.map((card) => (
          <div key={card.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{card.word}</h3>
                <p className="text-sm text-slate-500">{card.phonetic || 'N/A'}</p>
                <p className="mt-1 text-sm text-slate-700">{card.definitions?.[0]?.definition}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Tạo: {new Date(card.createdAt).toLocaleDateString()} • Ôn: {new Date(card.nextReviewDate).toLocaleDateString()} • EF:{' '}
                  {card.easeFactor}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(card.id)}
                className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
              >
                Xóa
              </button>
            </div>

            {card.reviewHistory?.length ? (
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-blue-600">Lịch sử ôn tập</summary>
                <ul className="mt-2 space-y-1 text-slate-600">
                  {card.reviewHistory.map((item, index) => (
                    <li key={`${card.id}-${index}`}>
                      {new Date(item.reviewedAt).toLocaleDateString()} - {item.quality}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordsList;
