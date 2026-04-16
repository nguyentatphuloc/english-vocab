import AudioButton from './AudioButton';

function WordResult({ result, onAddCard }) {
  if (!result) return null;

  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-slate-800">{result.word}</h2>
        <AudioButton text={result.word} />
      </div>

      <p className="mb-2 text-slate-600">
        <span className="font-medium">IPA:</span> {result.phonetic || 'N/A'}
      </p>
      <p className="mb-4 text-slate-600">
        <span className="font-medium">Loại từ:</span> {result.partOfSpeech || 'N/A'}
      </p>

      <div className="space-y-3">
        {result.definitions.map((definition, index) => (
          <div key={`${definition.definition}-${index}`} className="rounded border border-slate-100 bg-slate-50 p-3">
            <p className="text-slate-800">• {definition.definition}</p>
            {definition.example ? (
              <div className="mt-1 flex items-start gap-2 text-sm text-slate-600">
                <span>Ví dụ: {definition.example}</span>
                <AudioButton text={definition.example} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddCard}
        className="mt-4 rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
      >
        Add to Cards
      </button>
    </div>
  );
}

export default WordResult;
