import { Message } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

export async function execute(bot: VrexyClient, message: Message) {
	if (message.author.bot) return;
	if (message.content.startsWith(bot.user.toString())) {
		if (!bot.devs.includes(message.author.id)) return;

		const args = message.content.slice(bot.user.toString().length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = bot.devUtils.get(commandName);

		if (!command) return;

		try {
			command.execute(bot, message, args);
		}
		catch (error) {
			await message.reply({ embeds: [{
				title: '<:app_error:894254521025445979>	You fucked up!',
				description: error.toString(),
			}] });
		}
	}
}
