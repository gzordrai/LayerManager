import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Le dépot github du bot"),
    ephemeral: true,
    autoDelete: false,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(interaction.client.user.username)
            .setURL("https://github.com/gzordrai/LayerManager");

        await interaction.followUp({ embeds: [embed], ephemeral: this.ephemeral });
    }
}

export default command;