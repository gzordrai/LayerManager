import { ChatInputCommandInteraction, Message } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
import { delayedMessageRemoval } from "../util/delayedMessageRemoval";

export const handleSlashCommand = async (client: ExtendedClient, command: ICommand, interaction: ChatInputCommandInteraction): Promise<void> => {
    try {
        const message: Message = await command.execute(interaction, client);

        if (command.autoDelete)
            await delayedMessageRemoval(message);
    } catch (error) {
        console.log(error);

        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}