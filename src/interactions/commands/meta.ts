import { VrexyClient } from '../../classes/Client';
import { CommandInteraction } from 'discord.js'

module.exports = {
    name: 'meta',
    async execute(bot: VrexyClient, interaction: CommandInteraction) {
        switch (interaction.options.getSubcommand()) {
            case 'about': {
                const developers = (await Promise.all(['348591272476540928'].map(async id => (await bot.users.fetch(id)).tag))).join('\n');
                const specials = (await Promise.all(['707675871355600967', '478823932913516544'].map(async id => (await bot.users.fetch(id)).tag))).join('\n');

                interaction.reply({ embeds: [
                    {
                        title: `:information_source: ${bot.fetchLangString('en-US', 'META_ABOUT_TITLE', {'appName': 'Vrexy'})}`,
                        color: bot.color,
                        description: bot.fetchLangString('en-US', 'META_ABOUT_DESC', {'appName': 'Vrexy'}),
                        fields: [
                            {
                                name: `<:bot_dev:836605174696509471> ${bot.fetchLangString('en-US', 'META_ABOUT_FIELDS_DEVELOPERS', {})}`,
                                value: developers
                            },
                            {
                                name: `:star: ${bot.fetchLangString('en-US', 'META_ABOUT_FIELDS_SPECIALS', {})}`,
                                value: specials
                            },
                            {
                                name: `:link: ${bot.fetchLangString('en-US', 'META_ABOUT_LINKS_TITLE', {})}`,
                                value: [
                                    `:earth_americas: [${bot.fetchLangString('en-US', 'META_ABOUT_LINKS_WEBSITE', {})}](https://vrexy.xyz)`
                                ].join('\n')
                            }
                        ]
                    }
                ]})
            }
        }       
    }
}