import { VrexyClient } from '../classes/Client';
import { CommandInteraction } from 'discord.js';

export async function execute(bot: VrexyClient, interaction: CommandInteraction) {

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
		break;
	}
	}
}