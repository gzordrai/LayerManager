import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Le dépot github du bot"),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder();

        embed.setColor("Blue");
        embed.setTitle(interaction.client.user.username);
        embed.setURL("https://github.com/gzordrai/LayerManager");

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;