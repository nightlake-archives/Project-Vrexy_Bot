import { VrexyClient } from '../classes/Client';
import { MessageComponentInteraction } from 'discord.js';

export async function execute(bot: VrexyClient, interaction: MessageComponentInteraction, interactionData: string[]) {
	interaction.channel.send(`h! ${interactionData}, ${interaction.component.type}`);
}