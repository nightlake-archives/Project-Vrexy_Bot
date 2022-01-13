import { VrexyClient } from './classes/Client';
import { readdirSync } from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const bot = new VrexyClient();
bot.login(process.env.TOKEN);
