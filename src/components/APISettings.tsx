import React, { useState, useEffect } from 'react';

const PASSWORD = 'admin2025';

const models = ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'];

export const APISettings: React.FC = () => {
  const [authPassed, setAuthPassed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    const savedModel = localStorage.getItem('openai_model');
    if (savedKey) setApiKey(savedKey);
    if (savedModel) setSelectedModel(savedModel);
  }, []);

  const handleSave = () => {
    localStorage.setItem('openai_api_key', apiKey);
    localStorage.setItem('openai_model', selectedModel);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordCheck = () => {
    if (passwordInput === PASSWORD) {
      setAuthPassed(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  if (!authPassed) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto my-6 text-right">
        <label className="block mb-2 font-medium">🔐 أدخل كلمة المرور لعرض الإعدادات:</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          onClick={handlePasswordCheck}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          دخول
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto my-6 text-right">
      <h2 className="text-lg font-semibold mb-4">⚙️ إعدادات OpenAI</h2>

      <label className="block mb-1 font-medium">🔑 مفتاح OpenAI:</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="sk-..."
      />

      <label className="block mb-1 font-medium">🧠 اختر الموديل:</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>

      <button
        onClick={handleSave}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        حفظ الإعدادات
      </button>

      {saved && <p className="text-green-600 mt-2 font-medium">✅ تم الحفظ بنجاح</p>}
    </div>
  );
};
