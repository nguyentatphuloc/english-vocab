import WordsList from '../components/WordsList';

function WordsListPage({ cards, onDelete }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">Words List</h2>
      <WordsList cards={cards} onDelete={onDelete} />
    </section>
  );
}

export default WordsListPage;
