import { Interaction, Message } from 'discord.js';
import { bold, green } from 'picocolors';
import i18next from 'i18next';
import { VrexyClient } from '../classes/Client';

export async function execute(bot: VrexyClient, interaction: Interaction): Promise<void | Message<true> > {
	if (!interaction.inCachedGuild()) return;

	if (interaction.isApplicationCommand()) {
		let command;

		if (interaction.isCommand()) {
			let commandName = interaction.commandName;

			if (interaction.options.getSubcommandGroup(false)) commandName += `/${interaction.options.getSubcommandGroup()}`;
			if (interaction.options.getSubcommand(false)) commandName += `/${interaction.options.getSubcommand()}`;

			command = bot.commands.get(commandName);
		}
		else {
			command = bot.commands.find(cmd => cmd.data.context?.name === interaction.commandName);
		}

		try {
			await command?.run(bot, interaction);
		}
		catch (error) {
			bot.logger.log(`${bold(green(interaction.id))} ${error}`);
			return interaction.reply({
				content: i18next.t('common:error.command', { errorID: interaction.id, lng: interaction.locale }),
				ephemeral: true,
			}).catch(() => null);
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
			bot.logger.log(`${bold(green(interaction.id))} ${error}`);
			return interaction.reply({
				content: i18next.t('common:error.component', { errorID: interaction.id, lng: interaction.locale }),
				ephemeral: true,
			}).catch(() => null);
		}
	}
}
