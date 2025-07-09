import React, { useState } from 'react';
import { TextAreaInput } from './components/TextAreaInput';
import { ActionButton } from './components/ActionButton';
import { APISettings } from './components/APISettings';
import { callOpenAIAPI } from './services/openaiService';
import './style.css';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokensUsed, setTokensUsed] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const response = await callOpenAIAPI(inputText);
    setOutputText(response.result);
    setTokensUsed(response.tokensUsed);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-right">
      <h1 className="text-2xl font-bold mb-6 text-center">✍️ محسن النصوص العربية</h1>

      <APISettings />

      <label className="block mb-2 font-medium">📝 أدخل النص هنا:</label>
      <TextAreaInput
        id="input-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="اكتب نصك هنا..."
        rows={8}
        isLoading={isLoading}
        className="mb-4"
      />

      <ActionButton onClick={handleSubmit} isLoading={isLoading}>
        تحسين النص
      </ActionButton>

      {outputText && (
        <>
          <label className="block mt-6 mb-2 font-medium">🔍 النص المحسّن:</label>
          <TextAreaInput
            id="output-text"
            value={outputText}
            readOnly
            isLoading={isLoading}
            className="mb-2"
          />

          {tokensUsed !== null && (
            <p className="text-sm text-slate-600 mt-2 text-left">
              🧮 عدد التوكنات المستخدمة: {tokensUsed}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
