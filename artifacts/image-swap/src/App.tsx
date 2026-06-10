import { useRef, useState } from "react";

function ImagePanel({
  image,
  label,
  onClick,
}: {
  image: string | null;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="image-panel"
      title="Click to load an image from file"
    >
      {image ? (
        <img src={image} alt={label} />
      ) : (
        <div className="placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Load Image</span>
          <small>Click to browse</small>
        </div>
      )}
      <div className="panel-label">{label}</div>
    </div>
  );
}

function CopyControls({
  leftLabel,
  rightLabel,
  canCopyRight,
  canCopyLeft,
  onCopyRight,
  onCopyLeft,
}: {
  leftLabel: string;
  rightLabel: string;
  canCopyRight: boolean;
  canCopyLeft: boolean;
  onCopyRight: () => void;
  onCopyLeft: () => void;
}) {
  return (
    <div className="controls">
      <button
        className="arrow-btn"
        onClick={onCopyRight}
        disabled={!canCopyRight}
        title={`Copy ${leftLabel} → ${rightLabel}`}
      >
        ›
      </button>
      <div className="arrow-divider" />
      <button
        className="arrow-btn"
        onClick={onCopyLeft}
        disabled={!canCopyLeft}
        title={`Copy ${rightLabel} → ${leftLabel}`}
      >
        ‹
      </button>
    </div>
  );
}

export default function App() {
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [imageC, setImageC] = useState<string | null>(null);
  const inputARef = useRef<HTMLInputElement>(null);
  const inputBRef = useRef<HTMLInputElement>(null);
  const inputCRef = useRef<HTMLInputElement>(null);

  function loadFile(file: File, setter: (src: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setter(e.target.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, setter: (src: string) => void) {
    const file = e.target.files?.[0];
    if (file) loadFile(file, setter);
    e.target.value = "";
  }

  return (
    <div className="app">
      <h1>Image Viewer</h1>
      <p className="subtitle">Click an image panel to load a file. Use the arrows to copy between panels.</p>

      <div className="workspace">
        <ImagePanel
          image={imageA}
          label="Image 1"
          onClick={() => inputARef.current?.click()}
        />

        <CopyControls
          leftLabel="Image 1"
          rightLabel="Image 2"
          canCopyRight={!!imageA}
          canCopyLeft={!!imageB}
          onCopyRight={() => imageA && setImageB(imageA)}
          onCopyLeft={() => imageB && setImageA(imageB)}
        />

        <ImagePanel
          image={imageB}
          label="Image 2"
          onClick={() => inputBRef.current?.click()}
        />

        <CopyControls
          leftLabel="Image 2"
          rightLabel="Image 3"
          canCopyRight={!!imageB}
          canCopyLeft={!!imageC}
          onCopyRight={() => imageB && setImageC(imageB)}
          onCopyLeft={() => imageC && setImageB(imageC)}
        />

        <ImagePanel
          image={imageC}
          label="Image 3"
          onClick={() => inputCRef.current?.click()}
        />
      </div>

      <input
        ref={inputARef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, setImageA)}
      />
      <input
        ref={inputBRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, setImageB)}
      />
      <input
        ref={inputCRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, setImageC)}
      />
    </div>
  );
}
