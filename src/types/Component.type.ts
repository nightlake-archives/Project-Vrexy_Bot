import { MessageComponentInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

interface Checks {
	sameAuthor: boolean;
}

export interface Component {
	run: (bot: VrexyClient, interaction: MessageComponentInteraction, interactionData: string[]) => void;
	checks?: Checks
}