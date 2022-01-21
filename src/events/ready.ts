import { VrexyClient } from '../classes/Client';

export function execute(bot: VrexyClient) {
	bot.logger.log(`Logged in as ${bot.user.tag}`);
}