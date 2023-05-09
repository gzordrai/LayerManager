import { ChatInputCommandInteraction } from "discord.js";
import { ICommand } from "../bot";

export const handleSlashCommand = async (command: ICommand, interaction: ChatInputCommandInteraction): Promise<void> => {
    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);

        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}