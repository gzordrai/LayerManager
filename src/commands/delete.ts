import { ApplicationCommandOptionChoiceData, AutocompleteInteraction, ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
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
    ephemeral: true,
    autoDelete: true,
    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const choices: Array<Layer> = await Database.getAll();
        let ret: Array<ApplicationCommandOptionChoiceData<string | number>> = new Array<ApplicationCommandOptionChoiceData<string | number>>();

        choices.forEach((layer: Layer) => {
            if (!layer.islocked())
                ret.push({ name: layer.getName(), value: layer.getName() });
        });

        await interaction.respond(ret);
    },
    async execute(interaction: ChatInputCommandInteraction, _: ExtendedClient): Promise<void> {
        const name: string = interaction.options.getString("name", true);
        let response: string;

        if (await Database.has(name)) {
            if (!(await Database.getLayer(name)).islocked()) {
                await Database.removeLayer(name);

                response = "Layer deleted successfully";
            } else
            response="The layer is locked";
        } else
            response = "There is no layer with this name";

        await interaction.followUp({ content: response, ephemeral: this.ephemeral });
    }
}

export default command;