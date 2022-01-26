import { CommandInteraction } from 'discord.js';
import i18next from 'i18next';
import { VrexyClient } from 'src/classes/Client';

export async function run(bot: VrexyClient, interaction: CommandInteraction): Promise<void> {
	interaction.reply(i18next.t('meta:ping', { ping: bot.ws.ping, lng: interaction.locale }));
}