import { VrexyClient } from '../classes/Client';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types';

export const data = {
	slash: new SlashCommandBuilder()
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
		),
};

export async function run(bot: VrexyClient, interaction: CommandInteraction) {
	switch (interaction.options.getSubcommandGroup()) {
	default: {
		switch (interaction.options.getSubcommand()) {
		case 'deploy': {
			const collection = bot.db.collection('guild');
			const guildData = await collection.findOne({ guild: interaction.guild.id });

			const categoryRoles = [{
				label: 'the rock',
				description: 'fuck',
				value: 'theROck',
			},
			{
				label: 'th',
				description: 'your',
				value: 'mom',
			}];


			interaction.reply({
				content: guildData._id.toString(), components: [{
					type: 'ACTION_ROW',
					components: [{
						type: 'SELECT_MENU',
						customId: 'roleDropdown:RoleDropdownSelectMenu',
						options: categoryRoles,
					}],
				}],
			});
		}
		}
		break;
	}
	}
}