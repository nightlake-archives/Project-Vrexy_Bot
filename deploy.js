const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bold, green } = require('picocolors');
require('dotenv').config();

const bot = process.env.ID;
const guilds = ['713675042143076352', '822380069129289749', '826717711181545523']; // meon test, vrexy support, vrexy dev

const command = require('./dist/commands/deploy/index');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

guilds.forEach(guild => {
	rest.put(Routes.applicationGuildCommands(bot, guild), { command })
		.then(() => console.log(`${bold(green('builder:'))} Registered for ${guild}`))
		.catch(console.error);
});
