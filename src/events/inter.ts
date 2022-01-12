import { Interaction } from 'discord.js';

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction: any) {
		if (interaction.isCommand()) {
			const command = interaction.client.slashInteractions.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction.client, interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};
