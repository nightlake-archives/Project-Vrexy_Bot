import { BaseCommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';
import { } from 'discord-api-types';

export interface Command {
	data: Record<string, Record<string, unknown>>;
	run: (bot: VrexyClient, interaction: BaseCommandInteraction) => void;
	custom?: Record<string, unknown>;
}