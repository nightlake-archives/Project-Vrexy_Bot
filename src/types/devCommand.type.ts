import { Message } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

export interface DevUtil {
	execute: (bot: VrexyClient, message: Message, args: string[]) => void;
}