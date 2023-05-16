import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
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
    ephemeral: true,
    autoDelete: true,
    async execute(interaction: ChatInputCommandInteraction, _: ExtendedClient): Promise<void> {
        const name: string = interaction.options.getString("name", true);
        let response: string;

        if ((await Database.count()) <= parseInt(process.env.MAX_LAYER!)) {
            if (await Database.has(name))
                response = "There is already a layer with this name";
            else {
                await Database.addLayer(name);

                response = "Layer added successfully";
            }
        } else
            response = "Maximum number of layers reached";

        await interaction.followUp({ content: response, ephemeral: this.ephemeral });
    }
}

export default command;