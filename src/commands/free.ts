import { ApplicationCommandOptionChoiceData, AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../bot";
import { Database, Layer } from "../database";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("free")
        .setDescription("Unlock one or all layers")
        .addSubcommand(subcommand =>
            subcommand
                .setName("layer")
                .setDescription("Unlock a layer")
                .addStringOption(option =>
                    option
                        .setName("name")
                        .setDescription("The layer name")
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("all")
                .setDescription("Unlock all layers")
        ),
    ephemeral: true,
    autoDelete: true,
    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const choices: Array<Layer> = await Database.getAll();
        let ret: Array<ApplicationCommandOptionChoiceData<string | number>> = new Array<ApplicationCommandOptionChoiceData<string | number>>();

        choices.forEach((layer: Layer) => {
            if (layer.islocked())
                ret.push({ name: layer.getName(), value: layer.getName() });
        });

        await interaction.respond(ret);
    },
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const subcommand: string = interaction.options.getSubcommand(true);
        let response: string;

        switch(subcommand) {
            case "all":
                const layers: Array<Layer> = await Database.getAll();

                layers.forEach(async (layer: Layer) => {
                    layer.unlock();
                    await Database.save(layer);
                });

                response = "All layers have been unlock";
                break;
            case "layer":
                const name: string = interaction.options.getString("name", true);

                if (await Database.has(name)) {
                    const layer: Layer = await Database.getLayer(name);

                    if (layer.islocked()) {
                        layer.unlock();
                        layer.setLockerId("");

                        await Database.save(layer);
                        response = "The layer has been unlocked";
                    } else
                    response = "This layer is not lock";
                } else
                    response = "There is no layer with this name";
                break;
            default:
                response = "Subcommand not found";
        }

        await interaction.followUp({ content: response, ephemeral: this.ephemeral });
    }
}

export default command;