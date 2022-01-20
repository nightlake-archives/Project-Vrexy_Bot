import { VrexyClient } from '../classes/Client';
import { CommandInteraction, version } from 'discord.js';
import i18next from 'i18next';
import { SlashCommandBuilder } from '@discordjs/builders';
import { stripIndent } from 'common-tags';

const botVersion = 'v2.0.0a5';

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
					title: i18next.t('meta:about.title', { appName: 'Vrexy', lng: interaction.locale }),
					color: bot.color,
					description: i18next.t('meta:about.description', { appName: 'Vrexy', lng: interaction.locale }),
					fields: [
						{
							name: i18next.t('meta:about.developers', { lng: interaction.locale }),
							value: developers,
							inline: true,
						},
						{
							name: i18next.t('meta:about.specialThanks', { lng: interaction.locale }),
							value: specials,
							inline: true,
						},
						{
							name: i18next.t('meta:about.links.title', { lng: interaction.locale }),
							value: stripIndent`
							${i18next.t('meta:about.links.website', { link: 'https://vrexy.xyz', lng: interaction.locale })}
							${i18next.t('meta:about.links.twitter', { link: 'https://twitter.com/@VrexyBot', lng: interaction.locale })}
							`,
							inline: true,
						},
						{
							name: i18next.t('meta:about.tech', { lng: interaction.locale }),
							value: stripIndent`
							<:discordJS:931090194726260736> [discord.js](https://discord.js.org): ${version}
							<:nodeJS:931090194512367667> [node.js](https://nodejs.org): ${process.version}
							`,
							inline: true,
						},
						{
							name: i18next.t('meta:about.stats.title', { lng: interaction.locale }),
							value: stripIndent`
							${i18next.t('meta:about.stats.servers', { guildCountCount: bot.guilds.cache.size, lng: interaction.locale })}
							${i18next.t('meta:about.stats.users', { userCount: bot.users.cache.size, lng: interaction.locale })}
							`,
							inline: true,
						},
					],
					footer: {
						text: `Vrexy ${botVersion}`,
						iconURL: 'https://cdn.discordapp.com/attachments/713675042143076356/933037231118110740/unknown.png',
					},
				},
			],
		});
	}
	}
}