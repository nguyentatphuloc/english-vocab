import AudioButton from './AudioButton';

function Flashcard({ card }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{card.word}</h2>
        <AudioButton text={card.word} />
      </div>
      <p className="text-sm text-slate-500">{card.phonetic || '-'}</p>
      <p className="mt-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-sm text-blue-700">{card.partOfSpeech || 'unknown'}</p>
      <ul className="mt-3 space-y-2 text-slate-700">
        {card.definitions.slice(0, 3).map((item, idx) => (
          <li key={`${item.definition}-${idx}`}>• {item.definition}</li>
        ))}
      </ul>
    </div>
  );
}

export default Flashcard;
