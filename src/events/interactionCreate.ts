import { Interaction, Message } from 'discord.js';
import { bold, green } from 'picocolors';
import i18next from 'i18next';
import { VrexyClient } from '../classes/Client';

export async function execute(bot: VrexyClient, interaction: Interaction): Promise<void | Message<true> > {
	if (!interaction.inCachedGuild()) return;

	if (interaction.isApplicationCommand()) {
		let commandName = interaction.commandName;

		if (interaction.isCommand()) {
			if (interaction.options.getSubcommandGroup(false)) commandName += `/${interaction.options.getSubcommandGroup()}`;
			if (interaction.options.getSubcommand(false)) commandName += `/${interaction.options.getSubcommand()}`;
		}

		const command = bot.commands.get(commandName) ?? bot.commands.find(cmd => cmd.data?.name === interaction.commandName);

		try {
			if (command.dev && !bot.devs.includes(interaction.user.id)) {
				return interaction.reply({
					content: '<:app_error:894254521025445979> You need to be a developer to do that!',
					ephemeral: true,
				});
			}

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
