import { AutocompleteInteraction } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const handleAutocomplete = async (client: ExtendedClient, interaction: AutocompleteInteraction): Promise<void> => {
    const command: ICommand = client.commands.get(interaction.commandName)!;

    try {
        if (command.autocomplete)
            await command.autocomplete(interaction);
    } catch (error) {
        console.log(error);
    }
}