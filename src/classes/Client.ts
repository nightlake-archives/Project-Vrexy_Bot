import { Client, Intents, Collection } from 'discord.js';
import { MongoClient } from 'mongodb';

import { Command } from 'src/types/Command';
import { Component } from 'src/types/Component';
import Logger from './Logger';

import CommandManager from './managers/CommandManager';
import ComponentManager from './managers/ComponentManager';
import EventManager from './managers/EventManager';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	// managers and collections
	commands: Collection<string, Command>;
	components: Collection<string, Component>;
	logger: Logger;
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
			presence: {
				status: 'idle',
				activities: [
					{ name: 'type / to get started! https://vrexy.xyz', url: 'https://www.youtube.com/watch?v=PfwGTMV265E', type: 'STREAMING' },
				],
			},
		});
		this.token = token;

		this.color = 0xE67E22;
		this.devs = ['348591272476540928', '478823932913516544'];
	}

	init(): void {
		this.logger = new Logger();
		new LocaleManager();
		new EventManager(this);
		this.commands = new CommandManager().load();
		this.components = new ComponentManager().load();
		this.mongo = new MongoClient('mongodb://localhost:27017');
		this.login(this.token);

		process.on('unhandledRejection', (error: Error) => {
			this.logger.error(error.stack);
		});
	}
}

