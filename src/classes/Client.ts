import { Client, Intents, Collection } from 'discord.js';
import { Command } from 'src/types/Command.type';
import { Component } from 'src/types/Component.type';
import { DevUtil } from 'src/types/devCommand.type';
import CommandManager from './managers/CommandManager';
import ComponentManager from './managers/ComponentManager';
import DevUtilManager from './managers/DevUtilManager';
import EventManager from './managers/EventManager';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	locale: LocaleManager;
	commands: Collection<string, Command>;
	components: Collection<string, Component>;
	devUtils: Collection<string, DevUtil>;
	color: number;
	devs: string[];

	constructor(token: string) {
		super({
			intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'CHANNEL'], allowedMentions: { parse: ['users'], repliedUser: false },
		});
		this.locale = new LocaleManager();
		this.color = 0xE67E22;
		this.devs = ['348591272476540928'];
		this.token = token;
	}

	init() {
		new EventManager(this);
		this.commands = new CommandManager().load();
		this.components = new ComponentManager().load();
		this.devUtils = new DevUtilManager().load();
		this.login(this.token);

		process.on('unhandledRejection', error => {
			console.error(error);
		});
	}
}

