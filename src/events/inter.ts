import { CommandInteraction, ButtonInteraction, SelectMenuInteraction } from 'discord.js';
import { VrexyClient } from '../classes/Client';

export default async function execute(bot: VrexyClient, interaction: (CommandInteraction | ButtonInteraction | SelectMenuInteraction)) {
	if (interaction.isCommand()) {
		const command = bot.slashInteractions.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(bot, interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
}
