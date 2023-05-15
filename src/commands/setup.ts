import { ChannelType, ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, TextChannel } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";
import { readFile, writeFileSync } from "fs";
import { createLayersEmbed } from "../util/embed";
import { Database } from "../database";
import path from "path";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setting up the bot")
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("The channel where the list of layers will be found")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    ephemeral: false,
    autoDelete: true,
    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<Message<boolean>> {
        const channel: TextChannel = interaction.options.getChannel("channel", true, [ChannelType.GuildText]);
        const embed: EmbedBuilder = createLayersEmbed(interaction.guild!, await Database.getAll());

        const message: Message = await interaction.followUp({ embeds: [embed], ephemeral: this.ephemeral });
        const pth: string = path.join(__dirname, "../../conf/config.json");

        readFile(pth, "utf8", (error, data: string) => {
            if (error) {
                console.log(error);
                return;
            }

            try {
                const config: any = JSON.parse(data);

                config.channel = channel.id;
                config.message = message.id;
                client.layersEmbed = message;

                writeFileSync(pth, JSON.stringify(config));
            } catch (err) {
                console.log(err);
            }
        })

        return message;
    }
}

export default command;