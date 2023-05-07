import { Events, Interaction } from "discord.js";
import { ExtendedClient, IEvent } from "../bot";
import { handleAutocomplete, handleSlashCommand } from "../handlers"

const event: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        if (interaction.inCachedGuild()) {
            if (interaction.isAutocomplete())
                await handleAutocomplete(client, interaction);
            else if (interaction.isChatInputCommand()) {
                await interaction.deferReply({ ephemeral: true });
                await handleSlashCommand(client, interaction);
            }
        }
    },
};

export default event;