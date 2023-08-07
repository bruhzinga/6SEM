import TelegramBot from "node-telegram-bot-api";
// replace the value below with the Telegram token you receive from @BotFather
const token = '6114999175:AAEU2kDHz5WIar7LCoeA_henGP7tJirjepk';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    await bot.sendMessage(chatId, `Echo: ${text}`);
}   );