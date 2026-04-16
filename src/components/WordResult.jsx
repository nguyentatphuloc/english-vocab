import AudioButton from './AudioButton';

function WordResult({ result, onAdd }) {
  if (!result) return null;

  return (
    <section className="mt-4 rounded-xl bg-white p-4 shadow">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-slate-800">{result.word}</h2>
        <AudioButton text={result.word} />
      </div>
      {result.phonetic ? <p className="mt-1 text-slate-500">{result.phonetic}</p> : null}
      <p className="mt-2 inline-block rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">{result.partOfSpeech}</p>
      <ul className="mt-3 space-y-3">
        {result.definitions.slice(0, 4).map((def, idx) => (
          <li key={`${def.definition}-${idx}`} className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-800">• {def.definition}</p>
            {def.example ? (
              <div className="mt-1 flex items-start gap-2 text-sm text-slate-600">
                <span>"{def.example}"</span>
                <AudioButton text={def.example} className="shrink-0" />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onAdd(result)}
        className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        Add to Cards
      </button>
    </section>
  );
}

export default WordResult;
