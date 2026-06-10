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

export default function App() {
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const inputARef = useRef<HTMLInputElement>(null);
  const inputBRef = useRef<HTMLInputElement>(null);

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

  function copyAtoB() {
    if (imageA) setImageB(imageA);
  }

  function copyBtoA() {
    if (imageB) setImageA(imageB);
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

        <div className="controls">
          <button
            className="arrow-btn"
            onClick={copyAtoB}
            disabled={!imageA}
            title="Copy Image 1 → Image 2"
          >
            ›
          </button>
          <div className="arrow-divider" />
          <button
            className="arrow-btn"
            onClick={copyBtoA}
            disabled={!imageB}
            title="Copy Image 2 → Image 1"
          >
            ‹
          </button>
        </div>

        <ImagePanel
          image={imageB}
          label="Image 2"
          onClick={() => inputBRef.current?.click()}
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
    </div>
  );
}
