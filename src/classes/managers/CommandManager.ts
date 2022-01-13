import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from 'src/types/Command.type';

export default class CommandManager {
	map: Collection<string, Command>;
	constructor() {
		this.map = new Collection();
	}

	load() {
		const commandDir = readdirSync(`${process.cwd()}/dist/commands`);
		commandDir.forEach(async commandFile => {
			const commandName = commandFile.split('.')[0];
			this.map.set(commandName, await import(`${process.cwd()}/dist/commands/${commandFile}`));
		});
	}
}