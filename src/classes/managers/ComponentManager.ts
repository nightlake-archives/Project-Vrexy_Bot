import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Component } from 'src/types/Component.type';

export default class ComponentManager {
	map: Collection<string, Component>;
	constructor() {
		this.map = new Collection();
	}

	load() {
		const commandDir = readdirSync(`${process.cwd()}/dist/components`);
		commandDir.forEach(async componentFile => {
			const componentName = componentFile.split('.')[0];
			this.map.set(componentName, await import(`${process.cwd()}/dist/components/${componentFile}`));
		});
		return this.map;
	}
}