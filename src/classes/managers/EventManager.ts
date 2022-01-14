import { readdirSync } from 'fs';
import { VrexyClient } from '../Client';

export default class EventManager {
	bot: VrexyClient;

	constructor(bot: VrexyClient) {
		const eventDir = readdirSync(`${process.cwd()}/dist/events`);
		eventDir.forEach(async eventFile => {
			const eventName = eventFile.split('.')[0];
			const eventCode = await import(`${process.cwd()}/dist/events/${eventFile}`);
			// eslint-disable-next-line no-shadow
			bot.on(eventName, (...eventFile) => {
				eventCode.execute(bot, ...eventFile);
			});
		});
	}
}