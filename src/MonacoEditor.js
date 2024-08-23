import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Editor } from "@monaco-editor/react";
import { v4 as uuidv4 } from 'uuid';

export default function Monaco() {
  const [fileName, setFileName] = useState('script.js');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// script.js content');
  const editorRef = useRef(null);
  const [shareEnabled, setShareEnabled] = useState(true);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const uniqueId = pathParts[pathParts.length - 1];
    if (uniqueId !== '' && uniqueId !== 'nodecode.io') {
      // Load code from storage using uniqueId
      const savedCode = localStorage.getItem(uniqueId);
      if (savedCode) {
        setCode(savedCode);
        setShareEnabled(false);
      }
    }
  }, []);

  const handleShare = () => {
    if (shareEnabled) {
      const uniqueId = uuidv4();
      localStorage.setItem(uniqueId, code);
      window.location.href = `/nodecode.io/${uniqueId}`;
    }
  };

  const handleCodeChange = (newValue) => {
    setCode(newValue);
    setShareEnabled(true);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  }

  const handleSave = () => {
    console.log(editorRef.current.getValue());
  }

  const files = {
    'script.js': {
      value: '// script.js content',
      language: 'javascript',
    },
    'style.css': {
      value: '/* style.css content */',
      language: 'css',
    },
    'index.html': {
      value: '<!-- index.html content -->',
      language: 'html',
    },
    'script.ts':{
        value: '// script.ts content',
        language: 'typescript',
    },
  };

  const handleFileChange = (name) => {
    setFileName(name);
    setLanguage(files[name].language);
    setCode(files[name].value);
  }

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4 mb-4">
        {Object.keys(files).map((file) => (
          <button
            key={file}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={fileName === file}
            onClick={() => handleFileChange(file)}
          >
            {file}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mb-4">
        <label htmlFor="language" className="text-gray-700">Language:</label>
        <select
          id="language"
          className="bg-gray-200 text-gray-700 p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="json">JSON</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className="absolute z-50 flex justify-center items-center shadow-2xl lg:ml-80 top-60">
        <Editor
          height='60vh'
          theme='vs-light'
          width='100vh'
          value={code}
          language={language}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
        />
      </div>

      <button className="bg-green-500 text-white p-2 rounded mt-4" onClick={handleSave}>Save</button>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleShare}
            disabled={!shareEnabled}
          >
            Share
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            disabled={shareEnabled}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Monaco />, rootElement);
