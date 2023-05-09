import { ChannelType, ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, TextChannel } from "discord.js";
import { ICommand } from "../bot";
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
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const channel: TextChannel = interaction.options.getChannel("channel", true, [ChannelType.GuildText]);
        const embed: EmbedBuilder = createLayersEmbed(interaction.guild!, await Database.getAll());

        interaction.followUp({ embeds: [embed] })
        .then((message: Message) => {
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

                    writeFileSync(pth, JSON.stringify(config));
                } catch (err) {
                    console.log(err);
                }
            })
        })
    }
}

export default command;