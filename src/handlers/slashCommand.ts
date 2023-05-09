import { ChatInputCommandInteraction } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const handleSlashCommand = async (client: ExtendedClient, command: ICommand, interaction: ChatInputCommandInteraction): Promise<void> => {
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.log(error);

        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}