import { VrexyClient } from '../classes/Client';

export function execute(bot: VrexyClient): void {
	bot.logger.log(`Logged in as ${bot.user.tag}`);
}