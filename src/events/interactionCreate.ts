import { Interaction } from 'discord.js';
import { VrexyClient } from '../classes/Client';

export async function execute(bot: VrexyClient, interaction: Interaction) {
	if (!interaction.inCachedGuild()) return;

	if (interaction.isApplicationCommand()) {
		const command = bot.commands.get(interaction.commandName)
			|| bot.commands.find(cmd => cmd.data.context?.name === interaction.commandName);

		try {
			await command?.run(bot, interaction);
		}
		catch (error) {
			console.error(error);
			return interaction.reply(`<:app_error:894254521025445979> ${bot.locale.get(interaction.locale, 'ERROR_COMMAND_EXECUTION', { errorID: interaction.id })}`);
		}
	}
	else if (interaction.isMessageComponent()) {
		if (interaction.isAutocomplete()) {
			const command = bot.commands.get(interaction.commandName);
			await command?.autocomplete(bot, interaction);
			return;
		}

		const data = interaction.customId.split(':');
		const component = bot.components.get(data[0]);

		try {
			if (component?.checks?.sameAuthor && interaction.message.author.id !== interaction.member.user.id) return;
			await component?.run(bot, interaction, data);
		}
		catch (error) {
			console.error(error);
		}
	}
}
