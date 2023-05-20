import { ChannelType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
import { createLayersEmbed } from "../util";
import { Database } from "../database";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setting up the bot")
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("The channel where the list of layers will be found")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(false)
        ),
    ephemeral: false,
    autoDelete: false,
    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient | undefined): Promise<void> {
        const channel: TextChannel | null = interaction.options.getChannel("channel", false, [ChannelType.GuildText]);
        const embed: EmbedBuilder = createLayersEmbed(interaction.guild!, await Database.getAll());

        if (client) {
            if (channel) {
                client.layersEmbed = await channel.send({ embeds: [embed] });
                await interaction.followUp({ content: `The display of the layers has been set in ${channel}`, ephemeral: true });
            } else
                client.layersEmbed = await interaction.followUp({ embeds: [embed], ephemeral: this.ephemeral });
        }
    }
}

export default command;