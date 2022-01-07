import { VrexyClient } from '../../classes/Client';
import { CommandInteraction } from 'discord.js'

module.exports = {
    name: 'meta',
    async execute(bot: VrexyClient, interaction: CommandInteraction) {
        switch (interaction.options.getSubcommand()) {
            case 'about': {
                function getUsernames(userIDs: Array<String>) {
                    let usernames = []

                    for (const userID in userIDs) {
                        const user = bot.users.cache.get(userID)
                        usernames.push(user.tag)
                    }

                    return usernames
                }

                interaction.reply({ embeds: [
                    {
                        title: `:information_source: ${bot.fetchLangString('APIUD', 'META_ABOUT_TITLE', {'appName': 'Vrexy'})}`,
                        color: bot.color,
                        description: bot.fetchLangString('APIUD', 'META_ABOUT_DESC', {'appName': 'Vrexy'}),
                        fields: [
                            {
                                name: `<:bot_dev:836605174696509471> ${bot.fetchLangString('APIUD', 'META_ABOUT_FIELDS_DEVELOPERS', {})}`,
                                value: getUsernames(['348591272476540928']).join('\n')
                            },
                            {
                                name: `:star: ${bot.fetchLangString('APIUD', 'META_ABOUT_FIELDS_SPECIALS', {})}`,
                                value: getUsernames(['707675871355600967', '478823932913516544']).join('\n')
                            },
                            {
                                name: `:link: ${bot.fetchLangString('APIUD', 'META_ABOUT_LINKS_TITLE', {})}`,
                                value: [
                                    `:globe_americas: (${bot.fetchLangString('APIUD', 'META_ABOUT_LINKS_WEBSITE', {})})[https://vrexy.xyz]`
                                ].join('\n')
                            }
                        ]
                    }
                ]})
            }
        }
    }
}