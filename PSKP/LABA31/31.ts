import TelegramBot from "node-telegram-bot-api";
// replace the value below with the Telegram token you receive from @BotFather
const token = 'token';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    await bot.sendMessage(chatId, `Echo: ${text}`);
}   );
