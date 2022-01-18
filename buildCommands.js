const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
	const command = require(`./dist/commands/${file}`);
	if (command.data.slash) commands.push(command.data.slash.toJSON())
	if (command.data.context) commands.push(command.data.context.toJSON())
}


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
