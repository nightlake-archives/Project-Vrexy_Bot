import { CommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

import { SlashCommandBuilder } from '@discordjs/builders';
import { exec } from 'child_process';
import clean from '../utils/clean';


export const data = new SlashCommandBuilder()
	.setName('eval')
	.setDescription('Runs the given evalution string.')
	.addStringOption(
		option => option
			.setName('evaluate')
			.setDescription('The string to evaluate.')
			.setRequired(true)
	)
	.addStringOption(
		option => option
			.setName('as')
			.setDescription('The language to evaluate the evaluate string as.')
			.setRequired(true)
			.setChoices([['js', 'Javascript'], ['sh', 'Shell']])
	);


export async function run(bot: VrexyClient, interaction: CommandInteraction): Promise<void> {
	const code = interaction.options.getString('evaluate');
	const lang = interaction.options.getString('as');

	try {
		const evaluated = lang === 'sh' ? exec(code) : eval(code);
		const cleaned = await clean(bot, evaluated);

		const params = { embeds: [{
			title: ':white_check_mark: Succeed',
			description: `\`\`\`js\n${cleaned}\n\`\`\``,
			color: bot.color,
		}] };

		interaction.replied ? interaction.followUp(params) : interaction.reply(params);
	}
	catch (error) {
		interaction.reply({ embeds: [{
			title: '<:app_error:894254521025445979> Failed',
			description: `\`\`\`js\n${error}\n\`\`\``,
			color: bot.color,
		}] });
	}
}

export const dev = true;