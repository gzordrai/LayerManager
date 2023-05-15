import { ApplicationCommandOptionChoiceData, AutocompleteInteraction, ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
import { Database, Layer } from "../database";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("take")
        .setDescription("Lock a layer")
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
    async execute(interaction: ChatInputCommandInteraction, _: ExtendedClient): Promise<Message<boolean>> {
        const name: string = interaction.options.getString("name", true);
        let response: string;

        if (await Database.has(name)) {
            const layer: Layer = await Database.getLayer(name);

            if (!layer.islocked()) {
                layer.lock();
                layer.setLockerId(interaction.user.id);

                await Database.save(layer);
                response = "The layer has been locked";
            } else
                response = "This layer is lock";
        } else
            response = "There is no layer with this name";

        return await interaction.followUp({ content: response, ephemeral: this.ephemeral });
    }
}

export default command;