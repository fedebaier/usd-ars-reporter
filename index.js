import 'dotenv/config';

import axios from 'axios';
import { Bot } from 'grammy';

const { BOT_TOKEN, CHAT_ID } = process.env;

if (!BOT_TOKEN || !CHAT_ID) {
  throw new Error('Please configure environment variables!');
}

const bot = new Bot(BOT_TOKEN);
const date = new Date();
let message = '';

try {
  const [dolar, fiwind, belo, letsbit, binancep2p, ripio] = await Promise.all([
    axios.get('https://criptoya.com/api/dolar').then((r) => r.data),
    axios.get('https://criptoya.com/api/fiwind/usdt/ars/0.1').then((r) => r.data),
    axios.get('https://criptoya.com/api/belo/usdt/ars/0.1').then((r) => r.data),
    axios.get('https://criptoya.com/api/letsbit/usdt/ars/0.1').then((r) => r.data),
    axios.get('https://criptoya.com/api/binancep2p/usdt/ars/0.1').then((r) => r.data),
    axios.get('https://criptoya.com/api/ripio/usdt/ars/0.1').then((r) => r.data),
  ]);

  message = `Cotizaciones al <b>${date.toLocaleString('es-ES', {
    timeZone: 'America/Buenos_Aires',
  })}</b>

  🤑 <b>USDT - Fiwind</b> 🤑
  Compra: ${fiwind.ask}
  Venta: ${fiwind.bid}

  🤑 <b>USDT - Belo</b> 🤑
  Compra: ${belo.ask}
  Venta: ${belo.bid}

  🤑 <b>USDT - Let'sBit</b> 🤑
  Compra: ${letsbit.ask}
  Venta: ${letsbit.bid}

  🤑 <b>USDT - Binance P2P</b> 🤑
  Compra: ${binancep2p.ask}
  Venta: ${binancep2p.bid}

  🤑 <b>USDT - Ripio</b> 🤑
  Compra: ${ripio.ask}
  Venta: ${ripio.bid}

  💵 <b>BLUE</b> 💵
  Compra: ${dolar.blue.ask}
  Venta: ${dolar.blue.bid}

  💵 <b>MEP</b> 💵
  AL30: ${dolar.mep['al30']['24hs'].price}
  GD30: ${dolar.mep['gd30']['24hs'].price}

  💵 <b>CCL</b> 💵
  AL30: ${dolar.ccl['al30']['24hs'].price}
  GD30: ${dolar.ccl['gd30']['24hs'].price}

  💵 <b>TARJETA</b> 💵
  ${dolar.tarjeta.price}

  💵 <b>OFICIAL</b> 💵
  ${dolar.oficial.price}`;
} catch (error) {
  message = `<b>Error</b>: ${JSON.stringify(error)}`;
}

await bot.api.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
