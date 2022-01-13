import { Client, Intents } from 'discord.js';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	locale: LocaleManager;
	color: number;
	src: string;
	token: string;

	constructor(token: string) {
		super({
			intents: [Intents.FLAGS.GUILD_MEMBERS], allowedMentions: { parse: ['users'], repliedUser: false },
		});
		this.locale = new LocaleManager();
		this.color = 0xE67E22;
		this.src = `${process.cwd()}/dist`;
		this.token = token;
	}

	init() {
		this.login(this.token);

		process.on('unhandledRejection', error => {
			console.error(error);
		});
	}
}

