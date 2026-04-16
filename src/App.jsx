import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';
import ReviewPage from './pages/ReviewPage';
import QuizPage from './pages/QuizPage';
import WordsListPage from './pages/WordsListPage';
import { calculateNextReview, createCardSchedule, getReviewStatus, isDueToday } from './utils/spacedRepetition';
import { loadCards, removeCard, saveCards, upsertCard } from './utils/storageManager';

const normalizeDictionaryData = (payload) => {
  const first = payload?.[0];
  const firstMeaning = first?.meanings?.[0];
  return {
    word: first?.word,
    phonetic: first?.phonetic || first?.phonetics?.find((item) => item.text)?.text,
    partOfSpeech: firstMeaning?.partOfSpeech,
    definitions: (firstMeaning?.definitions || []).slice(0, 5).map((item) => ({
      definition: item.definition,
      example: item.example || '',
    })),
  };
};

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setCards(loadCards());
  }, []);

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const dueCards = useMemo(() => cards.filter((card) => isDueToday(card.nextReviewDate)), [cards]);

  const stats = useMemo(() => {
    const dueToday = cards.filter((card) => isDueToday(card.nextReviewDate)).length;
    const dueSoon = cards.filter((card) => getReviewStatus(card.nextReviewDate).label === 'Sắp tới hạn').length;
    const total = cards.length;
    const progress = total ? Math.round(((total - dueToday) / total) * 100) : 0;

    return { dueToday, dueSoon, total, progress };
  }, [cards]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query.trim())}`);
      if (!response.ok) throw new Error('Không tìm thấy từ phù hợp.');
      const data = await response.json();
      setResult(normalizeDictionaryData(data));
    } catch (fetchError) {
      setResult(null);
      setError(fetchError.message || 'Có lỗi khi lấy dữ liệu từ điển.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = () => {
    if (!result?.word) return;

    const schedule = createCardSchedule();
    const nextCards = upsertCard(cards, {
      id: crypto.randomUUID(),
      ...result,
      ...schedule,
      createdAt: new Date().toISOString(),
      reviewHistory: [],
    });

    setCards(nextCards);
    setToast(`Đã lưu từ "${result.word}"`);
  };

  const applyReview = (targetCard, quality) => {
    const reviewPatch = calculateNextReview(targetCard, quality);

    setCards((prev) =>
      prev.map((card) =>
        card.id === targetCard.id
          ? {
              ...card,
              ...reviewPatch,
              reviewHistory: [{ quality, reviewedAt: new Date().toISOString() }, ...(card.reviewHistory || [])],
            }
          : card,
      ),
    );
    setToast(`Đã cập nhật review: ${quality.toUpperCase()}`);
  };

  const handleDeleteCard = (id) => {
    setCards((prev) => removeCard(prev, id));
    setToast('Đã xóa từ khỏi danh sách');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Header dueCount={stats.dueToday} />
        <main className="mx-auto max-w-6xl px-4 py-6">
          {toast ? <div className="mb-4 rounded bg-slate-800 px-4 py-2 text-sm text-white">{toast}</div> : null}

          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  result={result}
                  error={error}
                  onAddCard={handleAddCard}
                />
              }
            />
            <Route path="/dashboard" element={<DashboardPage stats={stats} />} />
            <Route path="/review" element={<ReviewPage dueCards={dueCards} onReview={applyReview} />} />
            <Route path="/quiz" element={<QuizPage cards={cards} onQuizResult={applyReview} />} />
            <Route path="/words" element={<WordsListPage cards={cards} onDelete={handleDeleteCard} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
