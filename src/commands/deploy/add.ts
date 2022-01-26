import { CommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';
import { readdirSync } from 'fs';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { Command } from 'src/types/Command';

export async function run(bot: VrexyClient, interaction: CommandInteraction): Promise<void> {
	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

	const command = interaction.options.getString('file');
	const guild = interaction.options.getString('guild');

	try {
		if (command === 'all') {
			await Promise.all(
				bot.commands.filter(cmd => !cmd.dev).map(cmd =>
					rest.post(Routes.applicationCommands(bot.user.id), {
						body: cmd.data.toJSON(),
					})
				)
			);
			return interaction.reply(':white_check_mark: Added **all** bot commands.');
		}

		const basePath = `${__dirname}/../../commands`;
		const commands = readdirSync(basePath);

		const file: Command = await import(`${basePath}/${commands.includes(command) ? `${command}/index.js` : command}`);
		await rest.post(file.dev ? Routes.applicationGuildCommands(bot.user.id, guild) : Routes.applicationCommands(bot.user.id), { body: file.data.toJSON() });

		interaction.reply(`:white_check_mark: Added \`${command}\` to ${file.dev ? 'dev stack' : 'bot stack'}.`);
	}
	catch (error) {
		interaction.reply({ embeds: [{
			title: '<:app_error:894254521025445979> Failed',
			description: `\`\`\`js\n${error}\`\`\``,
			color: bot.color,
		}] });
	}
}