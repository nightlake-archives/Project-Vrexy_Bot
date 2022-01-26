import { VrexyClient } from '../../classes/Client';
import { CommandInteraction } from 'discord.js';

export async function run(bot: VrexyClient, interaction: CommandInteraction) {
	const connection = await bot.mongo.connect();
	const db = connection.db('db');

	const collection = db.collection('guild');
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
	connection.close();
}