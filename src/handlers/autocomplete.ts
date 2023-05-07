import { ApplicationCommandOptionChoiceData, AutocompleteInteraction } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
import { Database, Layer } from "../database";

export const handleAutocomplete = async (client: ExtendedClient, interaction: AutocompleteInteraction): Promise<void> => {
    const command: ICommand = client.commands.get(interaction.commandName)!;

    try {
        const layers: Array<Layer> = await Database.getAll();
        let choices: ApplicationCommandOptionChoiceData<string | number>[] = new Array<ApplicationCommandOptionChoiceData<string | number>>;

        layers.forEach(layer => {
            choices.push({ name: layer.getName(), value: layer.getName() });
        })
        
        await interaction.respond(choices);
    } catch (error) {
        console.log(error);
    }
}