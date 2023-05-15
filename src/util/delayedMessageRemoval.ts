import { Message } from "discord.js";

const delay: number = 2000;

export const delayedMessageRemoval = async (message: Message): Promise<void> => {
    await new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, delay));
    await message.delete();
}