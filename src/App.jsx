import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';
import ReviewPage from './pages/ReviewPage';
import QuizPage from './pages/QuizPage';
import WordsListPage from './pages/WordsListPage';
import { calculateReviewUpdate, getDaysUntilReview, isDueToday } from './utils/spacedRepetition';
import { loadCards, saveCards } from './utils/storageManager';
import './App.css';

const mapApiResult = (apiData) => {
  const item = apiData?.[0];
  const meaning = item?.meanings?.[0];

  return {
    word: item?.word || '',
    phonetic: item?.phonetic || item?.phonetics?.find((p) => p.text)?.text || '',
    partOfSpeech: meaning?.partOfSpeech || 'unknown',
    definitions: (meaning?.definitions || []).map((d) => ({
      definition: d.definition,
      example: d.example || '',
    })),
  };
};

function App() {
  const [page, setPage] = useState('search');
  const [cards, setCards] = useState(() => loadCards());
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [toast, setToast] = useState('');
  const toastTimeoutRef = useRef(null);

  const dueCards = useMemo(() => cards.filter((card) => isDueToday(card.nextReviewDate)), [cards]);

  const stats = useMemo(() => {
    const dueToday = cards.filter((card) => isDueToday(card.nextReviewDate)).length;
    const upcoming = cards.filter((card) => {
      const days = getDaysUntilReview(card.nextReviewDate);
      return days >= 1 && days <= 3;
    }).length;

    const progress = cards.length ? Math.round(((cards.length - dueToday) / cards.length) * 100) : 0;

    return {
      dueToday,
      upcoming,
      total: cards.length,
      progress,
    };
  }, [cards]);

  const chartData = useMemo(() => {
    const buckets = { 'Due now': 0, '1-3 days': 0, '4-7 days': 0, '8+ days': 0 };
    cards.forEach((card) => {
      const days = getDaysUntilReview(card.nextReviewDate);
      if (days <= 0) buckets['Due now'] += 1;
      else if (days <= 3) buckets['1-3 days'] += 1;
      else if (days <= 7) buckets['4-7 days'] += 1;
      else buckets['8+ days'] += 1;
    });

    return Object.entries(buckets).map(([label, count]) => ({ label, count }));
  }, [cards]);

  const notify = (message) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToast(message);
    toastTimeoutRef.current = window.setTimeout(() => setToast(''), 2200);
  };

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    },
    []
  );

  const updateCards = (nextCards) => {
    setCards(nextCards);
    saveCards(nextCards);
  };

  const searchWord = async (word) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!res.ok) throw new Error('Word not found');
      const data = await res.json();
      setSearchResult(mapApiResult(data));
    } catch {
      setSearchResult(null);
      notify('Word not found.');
    } finally {
      setLoading(false);
    }
  };

  const addCard = (wordData) => {
    if (!wordData.word) return;
    const existed = cards.find((card) => card.word.toLowerCase() === wordData.word.toLowerCase());
    if (existed) {
      notify('This word already exists in flashcards.');
      return;
    }

    const now = new Date().toISOString();
    const card = {
      id: `${wordData.word}-${Date.now()}`,
      ...wordData,
      createdAt: now,
      nextReviewDate: now,
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      reviewHistory: [],
    };

    updateCards([card, ...cards]);
    notify('Word added to flashcards!');
  };

  const rateCard = (card, quality) => {
    const update = calculateReviewUpdate(card, quality);
    const nextCards = cards.map((item) =>
      item.id === card.id
        ? {
            ...item,
            interval: update.interval,
            repetitions: update.repetitions,
            easeFactor: update.easeFactor,
            nextReviewDate: update.nextReviewDate,
            reviewHistory: [...(item.reviewHistory || []), update.reviewEntry],
          }
        : item
    );
    updateCards(nextCards);
    setReviewIndex((idx) => idx + 1);
    notify('Review schedule updated.');
  };

  const deleteCard = (id) => {
    updateCards(cards.filter((card) => card.id !== id));
    notify('Word removed from the list.');
  };

  const renderPage = () => {
    if (page === 'dashboard') return <DashboardPage stats={stats} chartData={chartData} />;
    if (page === 'review') return <ReviewPage dueCards={dueCards} currentIndex={reviewIndex} onRate={rateCard} />;
    if (page === 'quiz') return <QuizPage cards={cards} onRate={rateCard} />;
    if (page === 'words') return <WordsListPage cards={cards} onDelete={deleteCard} />;
    return <SearchPage onSearch={searchWord} result={searchResult} onAdd={addCard} loading={loading} />;
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header currentPage={page} onNavigate={setPage} dueTodayCount={stats.dueToday} />
      <main className="mx-auto max-w-6xl p-4">{renderPage()}</main>
      {toast ? (
        <div className="fixed bottom-4 right-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toast}</div>
      ) : null}
    </div>
  );
}

export default App;
