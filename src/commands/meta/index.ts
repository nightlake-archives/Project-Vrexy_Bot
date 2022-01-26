import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
	.setName('meta')
	.setDescription('VrexyGroupCommands.Meta')
	.addSubcommand(command => command.setName('about').setDescription('Views info about the bot.'))
	.addSubcommand(command => command.setName('changelog').setDescription('Views what has changed in the bot.'))
	.addSubcommand(command => command.setName('ping').setDescription('Gets the bot\'s response time.'));

export const dev = true;