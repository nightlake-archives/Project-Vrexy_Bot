import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from 'src/types/Command';

export default class CommandManager {
	map: Collection<string, Command>;
	constructor() {
		this.map = new Collection();
	}

	load() {
		const commandDir = readdirSync(`${process.cwd()}/dist/commands`);
		commandDir.forEach(async commandFile => {
			if (!commandFile.endsWith('.js')) {
				const subCommands = readdirSync(`${process.cwd()}/dist/commands/${commandFile}/`);

				subCommands.forEach(async subCommand => {
					const [subName] = subCommand.split('.');
					if (subName === 'index') return;

					if (!subCommand.endsWith('.js')) {
						const groupSubCommands = readdirSync(`${process.cwd()}/dist/commands/${commandFile}/${subCommand}`);

						groupSubCommands.forEach(async groupSubCommand => {
							const [groupSubName] = groupSubCommand.split('.');

							this.map.set(
								`${commandFile}/${subName}/${groupSubName}`,
								await import(`${process.cwd()}/dist/commands/${commandFile}/${subName}/${groupSubCommand}`)
							);
						});

						return;
					}

					this.map.set(
						`${commandFile}/${subName}`,
						await import(`${process.cwd()}/dist/commands/${commandFile}/${subCommand}`)
					);
				});
			}
			const [commandName] = commandFile.split('.');
			this.map.set(commandName, await import(`${process.cwd()}/dist/commands/${commandFile}`));
		});
		return this.map;
	}
}