import React, { useState } from 'react';
import { TextAreaInput } from './components/TextAreaInput';
import { ActionButton } from './components/ActionButton';
import { callOpenAIAPI } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhance = async () => {
    setIsLoading(true);
    try {
      const response = await callOpenAIAPI(inputText);
      setEnhancedText(response);
    } catch (error) {
      console.error('حدث خطأ أثناء الاتصال بـ OpenAI:', error);
      setEnhancedText('حدث خطأ أثناء المعالجة، برجاء المحاولة لاحقًا.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">محسن النصوص العربية</h1>
        
        <TextAreaInput
          id="original-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب النص العربي هنا..."
          className="min-h-[200px]"
        />

        <ActionButton onClick={handleEnhance} isLoading={isLoading} className="w-full md:w-auto">
          تحسين النص
        </ActionButton>

        <TextAreaInput
          id="enhanced-text"
          value={enhancedText}
          readOnly
          isLoading={isLoading}
          className="min-h-[200px]"
        />
      </div>
    </div>
  );
};

export default App;
