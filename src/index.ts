import { VrexyClient } from './classes/Client';
import { readdirSync } from 'fs';

import dotenv from 'dotenv';
dotenv.config()

const bot: VrexyClient = new VrexyClient();

const eventFiles = readdirSync(`${bot.src}/events`).filter((file: string) => file.endsWith('.js'));
const slashFiles = readdirSync(`${bot.src}/interactions/commands`).filter((file: string) => file.endsWith(".js"));
const commponentFiles = readdirSync(`${bot.src}/interactions/components`).filter(file => file.endsWith('.js'));
const devCmdFiles = readdirSync(`${bot.src}/commands`).filter((file: string) => file.endsWith(".js"))

for (const eventFile of eventFiles) {
    import(`${bot.src}/events/${eventFile.replace('.js', '')}`).then((event: any) => {
        if (event.once) {
            bot.once(event.name, (...args: Array<any>) => event.execute(...args));
        } else {
            bot.on(event.name, (...args: Array<any>) => event.execute(...args));
        }
    })
    
}

for (const slashFile of slashFiles) {
    import(`${bot.src}/interactions/commands/${slashFile}`).then((command: any) => {
        bot.slashInteractions.set(command.name, command)
    })
}

for (const commponentFile of commponentFiles) {
    import(`${bot.src}/interactions/components/${commponentFile}`).then((component: any) => {
        bot.componentInteractions.set(component.name, component)
    })
}

bot.login(process.env.TOKEN)