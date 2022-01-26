import { CommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

export async function run(bot: VrexyClient, interaction: CommandInteraction): Promise<void> {
	const file = interaction.options.getString('file');
	const guild = interaction.options.getString('guild');

	try {
		const { commands } = bot.guilds.cache.get(guild) ?? bot.application;
		// @ts-expect-error here we're fetching all the commands so no properties are provided.
		await commands.fetch();

		if (file === 'all') {
			commands.cache.forEach(async command => {
				if (command.name == 'deploy') return;
				await command.delete();
			});

			return interaction.reply(':white_check_mark: Removed **all** bot commands.');
		}

		const command = commands.cache.find(c => c.name === file);
		await command.delete();
		interaction.reply(`:white_check_mark: Removed \`${file}\`.`);
	}
	catch (error) {
		interaction.reply({ embeds: [{
			title: '<:app_error:894254521025445979> Failed',
			description: `\`\`\`js\n${error}\`\`\``,
		}] });
	}
}