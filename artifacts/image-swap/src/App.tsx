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
  onLeft,
  onRight,
  disableLeft,
  disableRight,
}: {
  onLeft: () => void;
  onRight: () => void;
  disableLeft: boolean;
  disableRight: boolean;
}) {
  return (
    <div className="controls">
      <button
        className="arrow-btn"
        onClick={onRight}
        disabled={disableRight}
        title="Copy right →"
      >
        ›
      </button>
      <div className="arrow-divider" />
      <button
        className="arrow-btn"
        onClick={onLeft}
        disabled={disableLeft}
        title="Copy left ←"
      >
        ‹
      </button>
    </div>
  );
}

export default function App() {
  const [images, setImages] = useState<[string | null, string | null, string | null]>([null, null, null]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function loadFile(file: File, index: number) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImages((prev) => {
          const next = [...prev] as [string | null, string | null, string | null];
          next[index] = e.target!.result as string;
          return next;
        });
      }
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (file) loadFile(file, index);
    e.target.value = "";
  }

  function copy(from: number, to: number) {
    if (images[from]) {
      setImages((prev) => {
        const next = [...prev] as [string | null, string | null, string | null];
        next[to] = prev[from];
        return next;
      });
    }
  }

  return (
    <div className="app">
      <h1>Image Viewer</h1>
      <p className="subtitle">Click a panel to load an image. Use the arrows to copy between panels.</p>

      <div className="workspace three-panels">
        <ImagePanel
          image={images[0]}
          label="Image 1"
          onClick={() => inputRefs[0].current?.click()}
        />

        <CopyControls
          onRight={() => copy(0, 1)}
          onLeft={() => copy(1, 0)}
          disableRight={!images[0]}
          disableLeft={!images[1]}
        />

        <ImagePanel
          image={images[1]}
          label="Image 2"
          onClick={() => inputRefs[1].current?.click()}
        />

        <CopyControls
          onRight={() => copy(1, 2)}
          onLeft={() => copy(2, 1)}
          disableRight={!images[1]}
          disableLeft={!images[2]}
        />

        <ImagePanel
          image={images[2]}
          label="Image 3"
          onClick={() => inputRefs[2].current?.click()}
        />
      </div>

      {inputRefs.map((ref, i) => (
        <input
          key={i}
          ref={ref}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, i)}
        />
      ))}
    </div>
  );
}
