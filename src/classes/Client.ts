import { Client, Intents, Collection } from 'discord.js';
import { readdirSync } from 'fs';

export class VrexyClient extends Client {
    slashInteractions: Collection<String, any>
    componentInteractions: Collection<String, any>
    langFiles: Record<string, any>
    color: number
    src: String
    fetchLangString
    
    constructor() {
        super({
            intents: [Intents.FLAGS.GUILD_MEMBERS], allowedMentions: { parse: ['users'], repliedUser: false }
        });
        this.slashInteractions = new Collection();
        this.componentInteractions = new Collection();
        this.langFiles = new Collection();
        this.color = 0xE67E22;
        this.src = `${process.cwd()}/dist`

        for (const langFile of readdirSync(`${process.cwd()}/i18n`).filter((file: String) => file.endsWith(".json"))) {
            const langFileData = require(`${process.cwd()}/i18n/${langFile}`)
            this.langFiles[langFile] = langFileData
        }

        this.fetchLangString = (lang: string, translatebleString: string, variables: Record<string, any>): string => {
            const langFile = this.langFiles[`${lang}.json`]

            function formatVars(str: string, variables: Record<string, any>): string {
                return str.replace(new RegExp("\{([^\{]+)\}", "g"), function(_unused, varName){
                    return variables[varName];
                })
            }

            return formatVars(langFile[translatebleString], variables);
        }
    }
}

