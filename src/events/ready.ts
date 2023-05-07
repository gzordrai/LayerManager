
import { Events } from "discord.js";
import { ExtendedClient, IEvent } from "../bot";

const event: IEvent = {
    name: Events.ClientReady,
    once: true,
    async execute(client: ExtendedClient): Promise<void> {
        if(!client.user || !client.application) return;

        console.log(`Logged in as ${client.user.tag} !`);
    },
};

export default event;