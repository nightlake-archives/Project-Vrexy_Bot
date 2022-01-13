import { Client, Intents, Collection } from 'discord.js';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	slashInteractions: Collection<string, any>;
	componentInteractions: Collection<string, any>;
	locale: LocaleManager;
	color: number;
	src: string;

	constructor() {
		super({
			intents: [Intents.FLAGS.GUILD_MEMBERS], allowedMentions: { parse: ['users'], repliedUser: false },
		});
		this.slashInteractions = new Collection();
		this.componentInteractions = new Collection();
		this.locale = new LocaleManager();
		this.color = 0xE67E22;
		this.src = `${process.cwd()}/dist`;
	}
}

