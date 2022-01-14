import { CommandInteraction, ButtonInteraction, SelectMenuInteraction } from 'discord.js';
import { VrexyClient } from '../classes/Client';

export async function execute(bot: VrexyClient, interaction: (CommandInteraction | ButtonInteraction | SelectMenuInteraction)) {
	if (interaction.isCommand()) {
		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(bot, interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	else if (interaction.isMessageComponent) {
		const interactionData = interaction.customId.split(':');
		const component = bot.components.get(interactionData[0]);
		if (!component) return;

		try {
			await component.execute(bot, interaction, interactionData);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an issue while executing this component!', ephemeral: true });
		}
	}
}
