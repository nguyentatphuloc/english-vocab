import { speakText } from '../utils/audioHelper';

function AudioButton({ text, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => speakText(text)}
      className={`rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-700 hover:bg-blue-200 ${className}`}
      aria-label={`Speak ${text}`}
    >
      🔊
    </button>
  );
}

export default AudioButton;
