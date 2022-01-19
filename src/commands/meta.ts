import { VrexyClient } from '../classes/Client';
import { CommandInteraction, version } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { stripIndent } from 'common-tags';

export const data = {
	slash: new SlashCommandBuilder()
		.setName('meta')
		.setDescription('VrexyGroupCommands.Meta')
		.addSubcommand(command => command.setName('about').setDescription('Views info about the bot')),
};

export async function run(bot: VrexyClient, interaction: CommandInteraction) {
	switch (interaction.options.getSubcommand()) {
	case 'about': {
		const developers = (await Promise.all(bot.devs.map(async id => (await bot.users.fetch(id)).tag))).join('\n');
		const specials = (await Promise.all(['707675871355600967', '478823932913516544'].map(async id => (await bot.users.fetch(id)).tag))).join('\n');

		interaction.reply({
			embeds: [
				{
					title: `:information_source: ${bot.locale.get(interaction.locale, 'META_ABOUT_TITLE', { 'appName': 'Vrexy' })}`,
					color: bot.color,
					description: bot.locale.get(interaction.locale, 'META_ABOUT_DESC', { 'appName': 'Vrexy' }),
					fields: [
						{
							name: `<:bot_dev:836605174696509471> ${bot.locale.get(interaction.locale, 'META_ABOUT_FIELDS_DEVELOPERS')}`,
							value: developers,
							inline: true,
						},
						{
							name: `:star: ${bot.locale.get(interaction.locale, 'META_ABOUT_FIELDS_SPECIALS')}`,
							value: specials,
							inline: true,
						},
						{
							name: `:link: ${bot.locale.get(interaction.locale, 'META_ABOUT_FIELDS_LINKS')}`,
							value: [
								`:earth_americas: [${bot.locale.get(interaction.locale, 'META_ABOUT_LINKS_WEBSITE')}](https://vrexy.xyz)`,
								`:bird: [${bot.locale.get(interaction.locale, 'META_ABOUT_LINKS_TWITTER')}](https://twitter.com/VrexyBot)`,
							].join('\n'),
							inline: true,
						},
						{
							name: `:desktop: ${bot.locale.get(interaction.locale, 'META_ABOUT_FIELDS_TECH')} `,
							value: stripIndent`
							<:discordJS:931090194726260736> [discord.js](https://discord.js.org): ${version}
							<:nodeJS:931090194512367667> [node.js](https://nodejs.org): ${process.version}
							`,
							inline: true,
						},
						{
							name: `:bar_chart: ${bot.locale.get(interaction.locale, 'META_ABOUT_FIELDS_STATS')}`,
							value: stripIndent`
							:homes: ${bot.locale.get(interaction.locale, 'META_ABOUT_STATS_SERVERS', { 'guildCount': bot.guilds.cache.size })}
							:family: ${bot.locale.get(interaction.locale, 'META_ABOUT_STATS_USERS', { 'userCount': bot.users.cache.size })}
							`,
							inline: true,
						},
					],
					footer: {
						text: bot.locale.get(interaction.locale, 'META_ABOUT_VERSION', { 'version': 'PreMongoIntegrate' }),
					},
				},
			],
		});
	}
	}
}