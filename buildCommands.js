const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes, ChannelType } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
	new SlashCommandBuilder().setName('meta').setDescription('Info about Vrexy').addSubcommand(subcommand =>
		subcommand.setName('about')
			.setDescription('Views info about the bot')
	),
	new SlashCommandBuilder().setName('roleDropdown').addSubcommand(subCommand => 
		subCommand.setName('deploy')
			.setDescription('Deploys a role dropdown in the specified channel.')
			.addStringOption(option => option.setName('category').setDescription('The category to deploy.').setRequired(true))
			.addChannelOption(option => option.setName('channel').setDescription('The channel to deploy the dropdown to.').setRequired(true).addChannelType(ChannelType.GuildText))
	)
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

if (process.env.GUILDID) {
	rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands })
		.then(() => console.log('Successfully registered application commands for guild.'))
		.catch(console.error);
}
else {
	rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
		.then(() => console.log('Successfully registered application commands for bot.'))
		.catch(console.error);
}
