import { Client, Intents, Collection } from 'discord.js';
import { MongoClient } from 'mongodb';

import { Command } from 'src/types/Command';
import { Component } from 'src/types/Component';

import CommandManager from './managers/CommandManager';
import ComponentManager from './managers/ComponentManager';
import EventManager from './managers/EventManager';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	// managers and collections
	commands: Collection<string, Command>;
	components: Collection<string, Component>;
	// mongo connection
	mongo: MongoClient;
	// bot info
	color: number;
	devs: string[];

	constructor(token: string) {
		super({
			intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
			partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'USER'],
			allowedMentions: { parse: ['users'], repliedUser: false },
		});
		this.token = token;

		this.color = 0xE67E22;
		this.devs = ['348591272476540928', '478823932913516544'];

		this.mongo = new MongoClient('mongodb://localhost:27017');
	}

	init() {
		new LocaleManager();
		new EventManager(this);
		this.commands = new CommandManager().load();
		this.components = new ComponentManager().load();
		this.login(this.token);

		process.on('unhandledRejection', error => {
			console.error(error);
		});
	}
}

