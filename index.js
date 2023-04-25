import 'dotenv/config';

import axios from 'axios';
import { Bot } from 'grammy';

const { BOT_TOKEN, CHAT_ID } = process.env;

if (!BOT_TOKEN || !CHAT_ID) {
  throw new Error('Please configure environment variables!');
}

const [dolar, buenbit, lemon] = await Promise.all([
  axios.get('https://criptoya.com/api/dolar').then((r) => r.data),
  axios.get('https://criptoya.com/api/buenbit/usdt/ars/0.1').then((r) => r.data),
  axios.get('https://criptoya.com/api/lemoncash/usdt/ars/0.1').then((r) => r.data),
]);

const message = `🤑 <b>USDT - BuenBit</b> 🤑
Compra: ${buenbit.ask}
Venta: ${buenbit.bid}

🤑 <b>USDT - Lemon</b> 🤑
Compra: ${lemon.ask}
Venta: ${lemon.bid}

💵 <b>BLUE</b> 💵
Compra: ${dolar.blue}
Venta: ${dolar.blue_bid}

💵 <b>MEP</b> 💵
${dolar.mep}

💵 <b>SOLIDARIO</b> 💵
${dolar.solidario}

💵 <b>CCL</b> 💵
${dolar.ccl}

💵 <b>QATAR</b> 💵
${dolar.qatar}

💵 <b>OFICIAL</b> 💵
${dolar.oficial}`;

const bot = new Bot(BOT_TOKEN);

await bot.api.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
