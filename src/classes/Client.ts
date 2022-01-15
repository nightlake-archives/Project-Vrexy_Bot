import { Client, Intents, Collection } from 'discord.js';
import { Db, MongoClient } from 'mongodb';
import { Command } from 'src/types/Command.type';
import { Component } from 'src/types/Component.type';
import { DevUtil } from 'src/types/devCommand.type';
import CommandManager from './managers/CommandManager';
import ComponentManager from './managers/ComponentManager';
import DevUtilManager from './managers/DevUtilManager';
import EventManager from './managers/EventManager';
import LocaleManager from './managers/LocaleManager';

export class VrexyClient extends Client {
	// managers and collections
	locale: LocaleManager;
	commands: Collection<string, Command>;
	components: Collection<string, Component>;
	devUtils: Collection<string, DevUtil>;
	// mongo connection
	mongo: MongoClient;
	connection: Promise<MongoClient>;
	db: Db;
	// bot info
	color: number;
	devs: string[];

	constructor(token: string) {
		super({
			intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
			partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'USER'],
			allowedMentions: { parse: ['users'], repliedUser: false },
		});

		this.locale = new LocaleManager();
		this.mongo = new MongoClient('mongodb://localhost:27017');
		this.color = 0xE67E22;
		this.devs = ['348591272476540928'];
		this.token = token;
	}

	init() {
		new EventManager(this);
		this.commands = new CommandManager().load();
		this.components = new ComponentManager().load();
		this.devUtils = new DevUtilManager().load();
		this.connection = this.mongo.connect();
		this.db = this.mongo.db('vrexy');
		this.login(this.token);

		process.on('unhandledRejection', error => {
			console.error(error);
		});
	}
}

