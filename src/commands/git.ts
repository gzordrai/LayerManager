import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Le dépot github du bot"),
    ephemeral: true,
    async execute(interaction: ChatInputCommandInteraction, _: ExtendedClient): Promise<Message<boolean>> {
        const embed: EmbedBuilder = new EmbedBuilder();

        embed.setColor("Blue");
        embed.setTitle(interaction.client.user.username);
        embed.setURL("https://github.com/gzordrai/LayerManager");

        return await interaction.followUp({ embeds: [embed], ephemeral: this.ephemeral });
    }
}

export default command;