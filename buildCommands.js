const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
	{
		name: 'meta', description: 'VrexyGroupCommands.Meta',
		options: [
			{ name: 'about', description: 'Views info about the bot.', type: 1 }
		]
	},
	{
		name: 'roledrop', description: 'VrexyGroupCommands.RoleDropdown',
		options: [
			{ name: 'deploy', description: 'Deploys a role dropdown in the specified channel.', options: [
				{ name: 'category', description: 'The category to deploy.', type: 3 },
				{ name: 'channel', description: 'The channel to deploy the category to.', type: 7, channel_types: [0] }
			], type: 1}
		]
	}
]

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
