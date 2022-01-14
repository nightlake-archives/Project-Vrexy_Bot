import { Message } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';
import clean from '../utils/clean';

export async function execute(bot: VrexyClient, message: Message, args: string[]): Promise<Message> {
	if (args.includes('bot.token')) return message.reply('<:app_error:894254521025445979> No!');
	let codex = args.join(' ').replaceAll('```js', '').replaceAll('```ts', '');

	if (codex.indexOf('```', codex.length - 4) !== -1) {
		codex = codex.slice(0, -3);
	}

	const code = codex.replace('bot.token', 'no');
	try {
		const evaled = eval(code);
		message.react('✅');
		return message.reply({ embeds: [{
			title: 'Done!',
			description: `\`\`\`js\n${await clean(bot, evaled)}}\n\`\`\``,
			color: bot.color,
		}] });
	}
	catch (error) {
		message.react('❌');
		return message.reply({ embeds: [{
			title: 'Error!',
			description: `\`\`\`js\n${await clean(bot, error)}}\n\`\`\``,
			color: bot.color,
		}] });
	}
}