import { useState, useRef } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!text && !file) {
      alert("Please enter some text or upload a file first!");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    if (file) formData.append("file", file);
    if (text) formData.append("text", text);

    try {
      const response = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setResult(`❌ Error: ${data.error}`);
      } else {
        setResult(data.result);
      }
    } catch (error) {
      setResult("⚠️ Error: Could not connect to backend. Make sure it's running on http://127.0.0.1:8000");
    }

    setLoading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/plain" || droppedFile.name.endsWith('.txt')) {
        setFile(droppedFile);
        setText(""); // Clear text when file is uploaded
      } else {
        alert("Please upload a text file (.txt)");
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setText(""); // Clear text when file is uploaded
    }
  };

  const clearAll = () => {
    setFile(null);
    setText("");
    setResult("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (file) {
      return "📄";
    }
    return dragActive ? "📁" : "📁";
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1 className="floating">🎓 AI Study Assistant</h1>
        <p>Transform your notes into clear summaries and exam questions</p>
      </div>

      <div className="main-content">
        {/* Input Section */}
        <div className="input-section">
          <div className="section-title">
            📝 <span>Input Your Notes</span>
          </div>
          
          {/* Text Input */}
          <textarea
            className="text-input"
            placeholder="Paste your study notes here... (or upload a file below)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!!file}
          />

          {/* File Upload */}
          <div className="file-input-container">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".txt,.text"
              className="file-input"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                borderColor: dragActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)',
                backgroundColor: dragActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'
              }}
            />
            <div className={`file-status ${file ? 'selected' : ''}`}>
              {file ? (
                <span>📄 {file.name} selected</span>
              ) : (
                <span>Drop a .txt file here or click to browse</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={handleSubmit}
              disabled={loading || (!text && !file)}
              className="submit-button"
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Processing with AI...
                </>
              ) : (
                "🚀 Generate Summary & Questions"
              )}
            </button>
            
            {(text || file) && (
              <button
                onClick={clearAll}
                className="clear-button"
              >
                🗑️ Clear All
              </button>
            )}
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <div className={`result-section ${result.includes('❌') || result.includes('⚠️') ? '' : 'success-pulse'}`}>
            <div className="result-title">
              {result.includes('❌') || result.includes('⚠️') ? '❌ Error' : '✨ AI Generated Results'}
            </div>
            <div className="result-content">
              {result}
            </div>
          </div>
        )}

        {/* Instructions */}
        {!result && !loading && (
          <div className="instructions-box">
            <p>💡 <strong>How to use:</strong></p>
            <p>1. Type or paste your study notes in the text area above</p>
            <p>2. Or upload a .txt file by dragging and dropping or clicking browse</p>
            <p>3. Click "Generate" to get AI-powered summaries and exam questions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
