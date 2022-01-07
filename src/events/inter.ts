import { VrexyClient } from "./../classes/Client";
import { Interaction } from "discord.js"

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(bot: VrexyClient, interaction: Interaction) {
        if (interaction.isCommand()) {
            const command = bot.slashInteractions.get(interaction.commandName);

            if (!command) return;
        
            try {
                await command.execute(bot, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }        
        }
    }
}
