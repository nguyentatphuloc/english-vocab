import { speakText } from '../utils/audioHelper';

function AudioButton({ text }) {
  return (
    <button
      type="button"
      onClick={() => speakText(text)}
      className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700 hover:bg-blue-200"
    >
      🔊
    </button>
  );
}

export default AudioButton;
