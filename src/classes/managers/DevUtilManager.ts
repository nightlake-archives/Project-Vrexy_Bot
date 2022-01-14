import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { DevUtil } from 'src/types/devCommand.type';

export default class DevUtilManager {
	map: Collection<string, DevUtil>;
	constructor() {
		this.map = new Collection();
	}

	load() {
		const commandDir = readdirSync(`${process.cwd()}/dist/dev`);
		commandDir.forEach(async commandFile => {
			const commandName = commandFile.split('.')[0];
			this.map.set(commandName, await import(`${process.cwd()}/dist/dev/${commandFile}`));
		});
		return this.map;
	}
}