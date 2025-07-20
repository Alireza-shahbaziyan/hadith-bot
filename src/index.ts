import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";
import { openAIResponse } from '../services/openaiService';
import dotenv from "dotenv";
import { prisma } from '../services/prismaService';


dotenv.config();

if (!process.env.BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not defined in the environment variables");
}
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("سلام! من رباتت هستم! .برای دریافت حدیث، لطفاً موضوع مورد نظر خود را ارسال کن."));
bot.hears("vip", (ctx) => ctx.reply("سلام عزیز دلم!"));


// handling the /history command to show user's message history 
bot.command('history', async (ctx) => {
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) return;

  const user = await prisma.user.findUnique({
    where: { telegramId },
    include: { messages: { orderBy: { createdAt: 'desc' }, take: 5 } },
  });

  if (!user || user.messages.length === 0) {
    return ctx.reply('📭 هنوز پیامی از تو ثبت نشده.');
  }

  let historyText = `🕘 آخرین پیام‌های شما:\n\n`;

  user.messages.forEach((msg, index) => {
    historyText += `🔹 موضوع ${index + 1}:\n`;
    historyText += `📨 شما: ${msg.content}\n`;
    historyText += `📜 پاسخ: ${msg.response}\n\n`;
  });

  await ctx.reply(historyText);
});
// handling the /clear command to delete user's message history
bot.command("clear", async (ctx) => {
  const userId = ctx.from?.id;

  if (!userId) {
    return ctx.reply("خطا: شناسه کاربر یافت نشد.");
  }

  await prisma.message.deleteMany({
    where: {
      userId: userId,
    },
  });

  ctx.reply("✅ تاریخچه پیام‌های شما با موفقیت پاک شد.");
});

bot.on(message('text'), async (ctx) => {
  const userText = ctx.message.text;
  if (userText.startsWith("/")) return;
  const telegramId = ctx.from?.id.toString();
  const firstName = ctx.from?.first_name || 'کاربر';

  if (!telegramId || !userText) return;

  // پیدا کردن یا ساختن کاربر
  const user = await prisma.user.upsert({
    where: { telegramId },
    update: {},
    create: {
      telegramId,
      firstName,
    },
  });

  await ctx.reply('🔍 در حال جستجو برای حدیث مرتبط...');

  const response = await openAIResponse(userText);

  // ذخیره پیام و پاسخ
  await prisma.message.create({
    data: {
      content: userText,
      response,
      userId: user.id,
    },
  });

  await ctx.reply(response);
});
bot.launch();
