import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Component } from 'src/types/Component';
import Logger from '../Logger';
import { bold, green } from 'picocolors';

export default class ComponentManager {
	map: Collection<string, Component>;
	logger: Logger;

	constructor() {
		this.map = new Collection();
		this.logger = new Logger();
	}

	load() {
		const commandDir = readdirSync(`${process.cwd()}/dist/components`);
		this.logger.log(`${bold(green('components:'))} ${commandDir.join(', ')}`);
		commandDir.forEach(async componentFile => {
			const componentName = componentFile.split('.')[0];
			this.map.set(componentName, await import(`${process.cwd()}/dist/components/${componentFile}`));
		});
		return this.map;
	}
}