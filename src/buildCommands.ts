import { REST } from '@discordjs/rest';
import { Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { readdirSync } from 'fs';
import { Command } from './types/Command';

import Logger from './classes/Logger';
import { bold, green } from 'picocolors';
import { config } from 'dotenv';
config();
const logger = new Logger();

const commandFiles = readdirSync('./dist/commands');
const releaseCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];
const devCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];

commandFiles.forEach(async file => {
	let command: Command;
	if (!file.endsWith('.js')) {
		command = await import(`./commands/${file}/index`);
	}
	else {
		command = await import(`./commands/${file.split('.')[0]}`);
	}

	if (command.data.isDev) {
		if (command.data.slash) devCommands.push(command.data.slash.toJSON());
		if (command.data.context) devCommands.push(command.data.context.toJSON());
	}
	else {
		if (command.data.slash) releaseCommands.push(command.data.slash.toJSON());
		if (command.data.context) releaseCommands.push(command.data.context.toJSON());
	}
});


const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const guilds = ['713675042143076352'];

guilds.forEach(guild => {
	rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, guild), { body: devCommands })
		.then(() => logger.log(`${bold(green('builder:'))} Registered for ${guild}`))
		.catch(console.error);
});

rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: releaseCommands })
	.then(() => logger.log(`${bold(green('builder:'))} Registered for application`))
	.catch(console.error);
