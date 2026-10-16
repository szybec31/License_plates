
import { useEffect, useState } from "react";
import "./App.css";

type AnalysisMode = "recognition" | "detection" | "both";

const modes: {
  id: AnalysisMode;
  title: string;
  description: string;
}[] = [
  {
    id: "recognition",
    title: "Text Recognition (OCR)",
    description: "Read text from a license plate image",
  },
  {
    id: "detection",
    title: "License Plate Detection",
    description: "Locate a license plate in an image",
  },
  {
    id: "both",
    title: "Detection + OCR",
    description: "Locate the plate and recognize its text",
  },
];

const models: Record<AnalysisMode, string[]> = {
  recognition: [
    "Default OCR Model",
    "CNN + Segmentation",
    "CRNN + CTC",
  ],
  detection: [
    "Default Detection Model",
    "YOLO",
  ],
  both: [
    "Default Pipeline",
    "YOLO + CRNN",
  ],
};

function App() {
  const [mode, setMode] = useState<AnalysisMode>("both");
  const [model, setModel] = useState(models.both[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function changeMode(nextMode: AnalysisMode) {
    setMode(nextMode);
    setModel(models[nextMode][0]);
    setResult(false);
  }

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("The maximum file size is 10 MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(false);
  }

  function removeFile() {
    setFile(null);
    setPreview(null);
    setResult(false);
  }

  async function runAnalysis() {
    if (!file) return;

    setLoading(true);
    setResult(false);

    // TODO: Connect the FastAPI backend here.
    // This is only a temporary UI demonstration.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoading(false);
    setResult(true);
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="logo" href="#">
          <span className="logo-icon">P</span>
          Plate<span>Lab</span>
        </a>

        <nav>
          <a href="#analyzer">Analyzer</a>
          <a href="#about">About</a>
        </nav>

        <span className="status">
          <span className="status-dot" />
          Demo UI
        </span>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">NEURAL NETWORKS / COMPUTER VISION / OCR</div>

          <h1>
            License Plate
            <br />
            <span>Recognition.</span>
          </h1>

          <p>
            Upload an image, select an analysis mode, and prepare
            your input for processing by a neural network model.
          </p>

          <div className="hero-tags">
            <span>◇ Image Analysis</span>
            <span>⌘ Swappable Models</span>
            <span>↗ REST API</span>
          </div>
        </section>

        <section id="analyzer" className="analyzer">
          <div className="section-heading">
            <div>
              <span className="section-label">WORKSPACE / 01</span>
              <h2>New Analysis</h2>
            </div>
            <span className="step-badge">01 / Input Configuration</span>
          </div>

          <div className="workspace">
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Input Parameters</h3>
                  <p>Configure how the image will be analyzed.</p>
                </div>
                <span className="panel-number">01</span>
              </div>

              <label className="field-label">Analysis Mode</label>

              <div className="mode-list">
                {modes.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`mode-option ${
                      mode === item.id ? "selected" : ""
                    }`}
                    onClick={() => changeMode(item.id)}
                    aria-pressed={mode === item.id}
                  >
                    <span className="mode-icon">
                      {item.id === "recognition"
                        ? "Aa"
                        : item.id === "detection"
                          ? "▱"
                          : "◫"}
                    </span>

                    <span className="mode-copy">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>

                    <span className="radio">
                      {mode === item.id ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>

              <label className="field-label" htmlFor="model">
                {mode === "recognition"
                  ? "OCR Model"
                  : mode === "detection"
                    ? "Detection Model"
                    : "Model Pipeline"}
              </label>

              <select
                id="model"
                value={model}
                onChange={(event) => setModel(event.target.value)}
              >
                {models[mode].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <p className="hint">
                These models are placeholders. The list will
                eventually be loaded from the API.
              </p>

              <div className="upload-heading">
                <label className="field-label" htmlFor="image">
                  Input Image
                </label>
                <span>JPG / PNG / WEBP · MAX 10 MB</span>
              </div>

              <label className="dropzone" htmlFor="image">
                {preview ? (
                  <img
                    className="upload-preview"
                    src={preview}
                    alt="Selected image preview"
                  />
                ) : (
                  <>
                    <span className="upload-icon">↑</span>
                    <strong>Choose an image to analyze</strong>
                    <span>Click to browse your files</span>
                  </>
                )}
              </label>

              <input
                id="image"
                className="file-input"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) =>
                  selectFile(event.target.files?.[0])
                }
              />

              {file && (
                <div className="selected-file">
                  <span>
                    {file.name}
                    <small>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </small>
                  </span>
                  <button type="button" onClick={removeFile}>
                    Remove
                  </button>
                </div>
              )}

              <button
                className="primary-button"
                type="button"
                disabled={!file || loading}
                onClick={runAnalysis}
              >
                {loading ? "Preparing..." : "Run Analysis →"}
              </button>

              <p className="privacy-note">
                Demo mode: the image is not sent to a backend.
              </p>
            </section>

            <section className="panel result-panel">
              <div className="panel-heading">
                <div>
                  <h3>Analysis Result</h3>
                  <p>The output will appear here.</p>
                </div>
                <span className="panel-number">02</span>
              </div>

              {!result ? (
                <div className="empty-result">
                  <div className="plate-art">
                    <span className="plate-country">PL</span>
                    <span>DW 00000</span>
                  </div>

                  <h3>Waiting for analysis</h3>
                  <p>
                    Select a mode, upload an image, and run the
                    analysis. The recognized plate text or detection
                    visualization will appear here.
                  </p>

                  <div className="result-steps">
                    <span>01 Configure</span>
                    <span>02 Analyze</span>
                    <span>03 Results</span>
                  </div>
                </div>
              ) : (
                <div className="result-content">
                  <div className="demo-notice">
                    UI preview only — this result was not generated
                    by a model.
                  </div>

                  {preview && (
                    <div className="result-image">
                      <img src={preview} alt="Image being analyzed" />

                      {(mode === "detection" || mode === "both") && (
                        <div className="bounding-box">
                          <span>Example detection</span>
                        </div>
                      )}
                    </div>
                  )}

                  {mode !== "detection" && (
                    <div className="recognized-text">
                      <span className="section-label">
                        EXAMPLE OCR OUTPUT
                      </span>
                      <strong>DW 00000</strong>
                      <p>
                        Once the API is connected, this field will
                        display the text returned by the model.
                      </p>
                    </div>
                  )}

                  {mode !== "recognition" && (
                    <div className="result-row">
                      <span>Detection</span>
                      <strong>Example bounding box</strong>
                    </div>
                  )}

                  <div className="result-row">
                    <span>Selected Model</span>
                    <strong>{model}</strong>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() => setResult(false)}
                  >
                    Back to Configuration
                  </button>
                </div>
              )}
            </section>
          </div>
        </section>

        <section id="about" className="about">
          <div>
            <span className="section-label">ABOUT THE PROJECT / 02</span>
            <h2>
              From image to
              <br />
              <span>meaningful results.</span>
            </h2>
            <p>
              This project combines computer vision techniques and
              neural networks to locate license plates and recognize
              the text printed on them.
            </p>
          </div>

          <div className="features">
            <article>
              <span>01 / INPUT</span>
              <h3>Input Image</h3>
              <p>A photo of a license plate or an entire vehicle.</p>
            </article>
            <article>
              <span>02 / MODEL</span>
              <h3>Modular Models</h3>
              <p>Separate detection and text recognition modules.</p>
            </article>
            <article>
              <span>03 / OUTPUT</span>
              <h3>Analysis Results</h3>
              <p>Recognized text and a detection visualization.</p>
            </article>
          </div>
        </section>
      </main>

      <footer>
        <a className="logo" href="#">
          <span className="logo-icon">P</span>
          Plate<span>Lab</span>
        </a>
        <span>Academic Project · Computer Vision</span>
      </footer>
    </div>
  );
}

export default App;
