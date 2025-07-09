import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function callOpenAIAPI(inputText: string): Promise<string> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'أنت مساعد ذكي لتحسين النصوص العربية لغويًا ونحويًا وإملائيًا مع الحفاظ على المعنى.',
        },
        {
          role: 'user',
          content: inputText,
        },
      ],
      model: 'gpt-4o',
    });

    return chatCompletion.choices[0]?.message?.content?.trim() || 'لم يتم توليد رد.';
  } catch (error) {
    console.error('خطأ في الاتصال بـ OpenAI:', error);
    return 'حدث خطأ أثناء الاتصال بالخدمة.';
  }
}
