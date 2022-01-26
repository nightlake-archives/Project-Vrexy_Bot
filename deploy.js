const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bold, green } = require('picocolors');
require('dotenv').config();

const bot = '822203887083454472';
const guilds = ['713675042143076352'];

const command = require('./dist/commands/deploy/index');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

guilds.forEach(guild => {
	rest.put(Routes.applicationGuildCommands(bot, guild), { body: command })
		.then(() => console.log(`${bold(green('builder:'))} Registered for ${guild}`))
		.catch(console.error);
});
