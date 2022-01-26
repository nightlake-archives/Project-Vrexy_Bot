import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types';

export const data = new SlashCommandBuilder()
	.setName('role-dropdown')
	.setDescription('VrexyGroupCommands.RoleDropdown')
	.addSubcommand(
		subcommand => subcommand
			.setName('deploy')
			.setDescription('Deploys a role dropdown in the specified channel.')
			.addStringOption(
				option => option
					.setName('category')
					.setDescription('The category to deploy.')
					.setRequired(true)
			)
			.addChannelOption(
				option => option
					.setName('channel')
					.setDescription('The channel to deploy the dropdown in.')
					.addChannelType(ChannelType.GuildText)
					.setRequired(true)
			)
	);

export const dev = true;
