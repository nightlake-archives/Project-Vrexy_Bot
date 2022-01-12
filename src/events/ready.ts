import { VrexyClient } from '../classes/Client';

export default function execute(bot: VrexyClient) {
	console.log(`[${bot.user.tag}] Logged in`);
}