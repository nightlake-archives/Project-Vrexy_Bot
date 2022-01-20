import { REST } from '@discordjs/rest';
import { Routes, APIApplicationCommand } from 'discord-api-types/v9';
import { readdirSync } from 'fs';
import { config } from 'dotenv';
config();

const commandFiles = readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
const releaseCommands: APIApplicationCommand[] = [];
const devCommands: APIApplicationCommand[] = [];

commandFiles.forEach(async file => {
	const command = await import(`./dist/commands/${file}`);

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
		.then(() => console.log(`Successfully registered application commands for guild ${guild}.`))
		.catch(console.error);
});

rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: releaseCommands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
