import { VrexyClient } from '../classes/Client';
import { SelectMenuInteraction } from 'discord.js';
import clean from '../utils/clean';

export async function run(bot: VrexyClient, interaction: SelectMenuInteraction<'cached'>, interactionData: string[]) {
	interaction.channel.send(`h! ${interactionData}, ${clean(bot, interaction.component)}`);
}