import { CommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';

export interface Command {
	execute: (bot: VrexyClient, interaction: CommandInteraction) => void;
}