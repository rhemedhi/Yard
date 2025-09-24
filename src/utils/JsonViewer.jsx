import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register the JSON language (if not using UMD)
// SyntaxHighlighter.registerLanguage('json', json);

function JsonViewer({ data }) {

  if (!data) {
    return <div className="text-red-500 p-4">No data to display</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">JSON Data Viewer</h1>
        <div className="bg-gray-900 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language="json"
            style={prism}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default JsonViewer;
