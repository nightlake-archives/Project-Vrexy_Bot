import { VrexyClient } from '../../classes/Client';
import { CommandInteraction, version } from 'discord.js';
import { stripIndent } from 'common-tags';

module.exports = {
	name: 'meta',
	async execute(bot: VrexyClient, interaction: CommandInteraction) {
		switch (interaction.options.getSubcommand()) {
		case 'about': {
			const developers = (await Promise.all(['348591272476540928'].map(async id => (await bot.users.fetch(id)).tag))).join('\n');
			const specials = (await Promise.all(['707675871355600967', '478823932913516544'].map(async id => (await bot.users.fetch(id)).tag))).join('\n');

			interaction.reply({ embeds: [
				{
					title: `:information_source: ${bot.fetchLangString('en-US', 'META_ABOUT_TITLE', { 'appName': 'Vrexy' })}`,
					color: bot.color,
					description: bot.fetchLangString('en-US', 'META_ABOUT_DESC', { 'appName': 'Vrexy' }),
					fields: [
						{
							name: `<:bot_dev:836605174696509471> ${bot.fetchLangString('en-US', 'META_ABOUT_FIELDS_DEVELOPERS', {})}`,
							value: developers,
							inline: true,
						},
						{
							name: `:star: ${bot.fetchLangString('en-US', 'META_ABOUT_FIELDS_SPECIALS', {})}`,
							value: specials,
							inline: true,
						},
						{
							name: `:link: ${bot.fetchLangString('en-US', 'META_ABOUT_LINKS_TITLE', {})}`,
							value: [
								`:earth_americas: [${bot.fetchLangString('en-US', 'META_ABOUT_LINKS_WEBSITE', {})}](https://vrexy.xyz)`,
								`:bird: [${bot.fetchLangString('en-US', 'META_ABOUT_LINKS_TWITTER', {})}](https://twitter.com/VrexyBot)`,
							].join('\n'),
							inline: true,
						},
						{
							name: `:desktop: ${bot.fetchLangString('en-US', 'META_ABOUT_TECH_TITLE', {})} `,
							value: stripIndent`
                                [discord.js](https://discord.js.org): ${version}
                                [node.js](https://nodejs.org): ${process.version}
                                `,
							inline: true,
						},
						{
							name: `:bar_chart: ${bot.fetchLangString('en-US', 'META_ABOUT_STATS_TITLE', {})}`,
							value: stripIndent`
                                :homes: ${bot.fetchLangString('en-US', 'META_ABOUT_STATS_SERVERS', { 'guildCount': bot.guilds.cache.size })}
                                :family: ${bot.fetchLangString('en-US', 'META_ABOUT_STATS_USERS', { 'userCount': bot.users.cache.size })}
                                `,
							inline: true,
						},
					],
					footer: {
						text: bot.fetchLangString('en-US', 'META_ABOUT_VERSION', { 'version': 'PreMongoIntegrate' }),
					},
				},
			] });
		}
		}
	},
};