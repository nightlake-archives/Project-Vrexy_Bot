import { ButtonInteraction, SelectMenuInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

export interface Component {
	execute: (bot: VrexyClient, interaction: ButtonInteraction | SelectMenuInteraction, interactionData: string[]) => void;
}