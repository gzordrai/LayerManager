import { ChatInputCommandInteraction } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const handleSlashCommand = async (client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> => {
    const command: ICommand = client.commands.get(interaction.commandName)!;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);

        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}