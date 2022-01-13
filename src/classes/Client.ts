import { Client, Intents } from 'discord.js';
import CommandManager from './managers/CommandManager';
import EventManager from './managers/EventManager';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	locale: LocaleManager;
	commands: CommandManager;
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
		new EventManager(this);
		this.commands = new CommandManager();
		this.login(this.token);

		process.on('unhandledRejection', error => {
			console.error(error);
		});
	}
}

