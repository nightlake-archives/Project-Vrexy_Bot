import { VrexyClient } from './classes/Client';

import dotenv from 'dotenv';
dotenv.config();

const bot = new VrexyClient();
bot.login(process.env.TOKEN);
