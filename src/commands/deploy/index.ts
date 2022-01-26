import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
	.setName('deploy')
	.setDescription('Deploys slash commands.')
	.addSubcommand(command => command
		.setName('add')
		.setDescription('Adds a slash command.')
		.addStringOption(option => option
			.setName('file')
			.setDescription('The command to add.')
			.setRequired(true)
		)
		.addStringOption(option => option
			.setName('guild')
			.setDescription('Provide a guild to add this command in.')
			.setRequired(false)
		)
	)
	.addSubcommand(command => command
		.setName('remove')
		.setDescription('Removes a slash command.')
		.addStringOption(option => option
			.setName('file')
			.setDescription('The command to remove.')
			.setRequired(true)
		)
		.addStringOption(option => option
			.setName('guild')
			.setDescription('Provide a guild to remove this command from.')
			.setRequired(false)
		)
	);

export const dev = true;