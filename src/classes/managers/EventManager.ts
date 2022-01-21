import { readdirSync } from 'fs';
import { VrexyClient } from '../Client';
import { bold, green } from 'picocolors';

export default class EventManager {
	bot: VrexyClient;

	constructor(bot: VrexyClient) {
		const eventDir = readdirSync(`${process.cwd()}/dist/events`);
		bot.logger.log(`${bold(green('EVENTS:'))} ${eventDir.join(', ')}`);

		eventDir.forEach(async eventFile => {
			const eventName = eventFile.split('.')[0];
			const eventCode = await import(`${process.cwd()}/dist/events/${eventFile}`);
			// eslint-disable-next-line no-shadow
			bot.on(eventName, async (...eventFile) => {
				await eventCode.execute(bot, ...eventFile);
			});
		});
	}
}