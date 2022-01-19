import { AutocompleteInteraction, BaseCommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';
import { SlashCommandBuilder, ContextMenuCommandBuilder } from '@discordjs/builders';

interface CommandData {
	slash?: SlashCommandBuilder;
	context?: ContextMenuCommandBuilder;
}

export interface Command {
	data: CommandData;
	run: (bot: VrexyClient, interaction: BaseCommandInteraction) => void;
	autocomplete: (bot: VrexyClient, interaction: AutocompleteInteraction) => void;
	custom?: Record<string, unknown>;
}