import { VrexyClient } from './classes/Client';
import { readdirSync } from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const bot = new VrexyClient();

const eventFiles = readdirSync(`${bot.src}/events`).filter((file: string) => file.endsWith('.js'));
const slashFiles = readdirSync(`${bot.src}/interactions/commands`).filter((file: string) => file.endsWith('.js'));
const commponentFiles = readdirSync(`${bot.src}/interactions/components`).filter(file => file.endsWith('.js'));

for (const eventFile of eventFiles) {
	const event = require(`${bot.src}/events/${eventFile.replace('.js', '')}`);
	if (event.once) {
		bot.once(event.name, (...args: Array<any>) => event.execute(...args));
	}
	else {
		bot.on(event.name, (...args: Array<any>) => event.execute(...args));
	}
}

for (const slashFile of slashFiles) {
	const command= require(`${bot.src}/interactions/commands/${slashFile}`);
	bot.slashInteractions.set(command.name, command);
}

for (const componentFile of commponentFiles) {
	const component = require(`${bot.src}/interactions/components/${componentFile}`);
	bot.componentInteractions.set(component.name, component);
}

bot.login(process.env.TOKEN);
