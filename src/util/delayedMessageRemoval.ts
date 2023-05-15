import { ChatInputCommandInteraction } from "discord.js";

const delay: number = 2000;

export const delayedInteractionRemoval = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, delay));
    await interaction.deleteReply();
}