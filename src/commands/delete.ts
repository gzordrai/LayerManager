import { ApplicationCommandOptionChoiceData, AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../bot";
import { Database, Layer } from "../database";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete a layer")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("The layer name")
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const name: string = interaction.options.getString("name", true);

        if (await Database.has(name)) {
            if (!(await Database.getLayer(name)).islocked()) {
                await Database.removeLayer(name);

                await interaction.followUp({ content: "Layer deleted successfully", ephemeral: true });
            } else
                await interaction.followUp({ content: "The layer is locked", ephemeral: true });
        } else
            await interaction.followUp({ content: "There is no layer with this name", ephemeral: true });
    }
}

export default command;