import { VrexyClient } from './classes/Client';

import dotenv from 'dotenv';
dotenv.config();

const bot = new VrexyClient(process.env.TOKEN);
bot.init();
