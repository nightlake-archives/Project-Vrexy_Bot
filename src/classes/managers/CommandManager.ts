import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from 'src/types/Command';
import Logger from '../Logger';
import { bold, green } from 'picocolors';

export default class CommandManager {
	map: Collection<string, Command>;
	logger: Logger;
	base: string;

	constructor() {
		this.map = new Collection();
		this.logger = new Logger();
		this.base = `${process.cwd()}/dist/commands`;
	}

	async loadSubCommand(commandFile: string, subCommand: string): Promise<void> {
		const [subcommandName] = subCommand.split('.');
		if (subcommandName === 'index') return;

		// subcommand groups
		if (!subCommand.endsWith('.js')) {
			const groupSubCommands = readdirSync(`${this.base}/${commandFile}/${subCommand}`);
			this.logger.log(`${bold(green(`commands/${commandFile}/${subCommand}:`))} ${groupSubCommands.join(', ')}`);

			groupSubCommands.forEach(async groupSubCommand => {
				const [groupSubcommandName] = groupSubCommand.split('.');

				this.map.set(
					`${commandFile}/${subcommandName}/${groupSubcommandName}`,
					await import(`${this.base}/${commandFile}/${subcommandName}/${groupSubCommand}`)
				);
			});
		}
		else {
			this.map.set(
				`${commandFile}/${subcommandName}`,
				await import(`${this.base}/${subCommand}`)
			);
		}
	}

	load(): Collection<string, Command> {
		const commandDir = readdirSync(this.base);
		this.logger.log(`${bold(green('commands:'))} ${commandDir.join(', ')}`);

		commandDir.forEach(async commandFile => {
			// sub commands
			if (!commandFile.endsWith('.js')) {
				const subCommands = readdirSync(`${this.base}/${commandFile}/`);
				this.logger.log(`${bold(green(`commands/${commandFile}:`))} ${subCommands.join(', ')}`);

				subCommands.forEach(subCommand => this.loadSubCommand(commandFile, subCommand));
			}
			else {
				const [commandName] = commandFile.split('.');
				this.map.set(commandName, await import(`${this.base}/${commandFile}`));
			}
		});
		return this.map;
	}
}