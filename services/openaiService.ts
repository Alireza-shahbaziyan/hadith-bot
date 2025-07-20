import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const openAIResponse = async (topic: string): Promise<string> => {
  const prompt = `یک حدیث معتبر از منابع شیعه درباره‌ی موضوع «${topic}» ارائه کن.
حدیث باید به زبان عربی آورده شود، سپس ترجمه دقیق فارسی آن در خط بعد قرار گیرد، و در خط سوم منبع معتبر آن (شامل نام کتاب، جلد و صفحه) ذکر شود.
از هرگونه توضیح یا تفسیر اضافی خودداری کن.
توجه: در صورت استفاده از واژگان رکیک، توهین‌آمیز یا موضوعات مغایر با شئونات اسلامی، به کاربر هشدار داده می‌شود و در صورت تکرار، موضوع جهت بررسی به سازمان اطلاعات سپاه گزارش خواهد شد`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
    });

    return completion.choices[0].message.content || 'نتیجه‌ای یافت نشد.';
  } catch (error: any) {
    console.error('❌ خطا در OpenAI:', error);
    return 'متأسفم، مشکلی پیش آمد. لطفاً دوباره تلاش کن.';
  }
};
