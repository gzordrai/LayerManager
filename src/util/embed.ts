import { EmbedBuilder, Guild } from "discord.js";
import { Layer } from "../database";

export const createLayersEmbed = (guild: Guild, layers: Array<Layer>): EmbedBuilder => {
    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle("Layers list")
        .setDescription("The list of all layers")
        .setColor("Blue");

    for (let i = 0; i < 25 && i < layers.length; i++) {
        const layer: Layer = layers[i];

        if (!layer.islocked())
            embed.addFields({ name: `🟢 - ${layer.getName()}`, value: "Ready to use" });
        else
            embed.addFields({ name: `🔴 - ${layer.getName()}`, value: `Locked by ${guild.members.cache.get(layer.getLockerId())?.user}` });
    }

    return embed;
}