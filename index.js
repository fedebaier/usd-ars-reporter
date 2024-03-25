import 'dotenv/config';

import axios from 'axios';
import { Bot } from 'grammy';

const { BOT_TOKEN, CHAT_ID } = process.env;

if (!BOT_TOKEN || !CHAT_ID) {
  throw new Error('Please configure environment variables!');
}

const [dolar, buenbit, lemon, belo] = await Promise.all([
  axios.get('https://criptoya.com/api/dolar').then((r) => r.data),
  axios.get('https://criptoya.com/api/buenbit/usdt/ars/0.1').then((r) => r.data),
  axios.get('https://criptoya.com/api/lemoncash/usdt/ars/0.1').then((r) => r.data),
  axios.get('https://criptoya.com/api/belo/usdt/ars/0.1').then((r) => r.data),
]);

const date = new Date();

const message = `Cotizaciones al <b>${date.toLocaleString('es-ES', {
  timeZone: 'America/Buenos_Aires',
})}</b>

🤑 <b>USDT - BuenBit</b> 🤑
Compra: ${buenbit.ask}
Venta: ${buenbit.bid}

🤑 <b>USDT - Lemon</b> 🤑
Compra: ${lemon.ask}
Venta: ${lemon.bid}

🤑 <b>USDT - Belo</b> 🤑
Compra: ${belo.ask}
Venta: ${belo.bid}

💵 <b>BLUE</b> 💵
Compra: ${dolar.blue.ask}
Venta: ${dolar.blue.bid}

💵 <b>MEP</b> 💵
AL30: ${dolar.mep['al30']['48hs'].price}
GD30: ${dolar.mep['gd30']['48hs'].price}

💵 <b>CCL</b> 💵
AL30: ${dolar.ccl['al30']['48hs'].price}
GD30: ${dolar.ccl['gd30']['48hs'].price}

💵 <b>TARJETA</b> 💵
${dolar.tarjeta.price}

💵 <b>OFICIAL</b> 💵
${dolar.oficial.price}`;

const bot = new Bot(BOT_TOKEN);

await bot.api.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
