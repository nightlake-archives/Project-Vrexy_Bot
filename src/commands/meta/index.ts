import { SlashCommandBuilder } from '@discordjs/builders';

export const data = {
	slash: new SlashCommandBuilder()
		.setName('meta')
		.setDescription('VrexyGroupCommands.Meta')
		.addSubcommand(command => command.setName('about').setDescription('Views info about the bot')),
};