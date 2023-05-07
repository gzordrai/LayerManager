import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../bot";
import { Database } from "../database";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add a new layer")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("The layer name")
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const name: string = interaction.options.getString("name", true);

        if ((await Database.count()) <= parseInt(process.env.MAX_LAYER!)) {
            if (await Database.has(name))
                await interaction.followUp({ content: "There is already a layer with this name", ephemeral: true });
            else {
                await Database.addLayer(name);

                await interaction.followUp({ content: "Layer added successfully", ephemeral: true });
            }
        } else
            await interaction.followUp({ content: "Maximum number of layers reached", ephemeral: true });
    }
}

export default command;