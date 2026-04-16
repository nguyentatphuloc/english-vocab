import WordsList from '../components/WordsList';

function WordsListPage({ cards, onDelete }) {
  return <WordsList cards={cards} onDelete={onDelete} />;
}

export default WordsListPage;
