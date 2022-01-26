import { AutocompleteInteraction, BaseCommandInteraction } from 'discord.js';
import { VrexyClient } from 'src/classes/Client';
import { SlashCommandBuilder, ContextMenuCommandBuilder } from '@discordjs/builders';

export interface Command {
	data?: SlashCommandBuilder | ContextMenuCommandBuilder;
	dev?: boolean;
	run: (bot: VrexyClient, interaction: BaseCommandInteraction) => void;
	autocomplete: (bot: VrexyClient, interaction: AutocompleteInteraction) => void;
}