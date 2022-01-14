import { VrexyClient } from '../classes/Client';

export function execute(bot: VrexyClient) {
	console.log(`[${bot.user.tag}] Logged in`);
}