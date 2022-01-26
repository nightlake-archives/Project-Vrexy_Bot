import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from 'src/types/Command';
import Logger from '../Logger';
import { bold, green } from 'picocolors';

export default class CommandManager {
	map: Collection<string, Command>;
	logger: Logger;

	constructor() {
		this.map = new Collection();
		this.logger = new Logger();
	}

	load(): Collection<string, Command> {
		const commandDir = readdirSync(`${process.cwd()}/dist/commands`);
		this.logger.log(`${bold(green('commands:'))} ${commandDir.join(', ')}`);

		commandDir.forEach(async commandFile => {
			if (!commandFile.endsWith('.js')) {
				const subCommands = readdirSync(`${process.cwd()}/dist/commands/${commandFile}/`);
				this.logger.log(`${bold(green(`commands/${commandFile}:`))} ${subCommands.join(', ')}`);

				subCommands.forEach(async subCommand => {
					const [subName] = subCommand.split('.');
					if (subName === 'index') return;

					if (!subCommand.endsWith('.js')) {
						const groupSubCommands = readdirSync(`${process.cwd()}/dist/commands/${commandFile}/${subCommand}`);
						this.logger.log(`${bold(green(`commands/${commandFile}/${subCommand}:`))} ${groupSubCommands.join(', ')}`);

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