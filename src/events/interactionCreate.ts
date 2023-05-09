import { Events, Interaction } from "discord.js";
import { ExtendedClient, ICommand, IEvent } from "../bot";
import { handleAutocomplete, handleSlashCommand } from "../handlers"

const event: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        if (interaction.inCachedGuild()) {
            if (interaction.isAutocomplete())
                await handleAutocomplete(client, interaction);
            else if (interaction.isChatInputCommand()) {
                const command: ICommand = client.commands.get(interaction.commandName)!;

                await interaction.deferReply({ ephemeral: command.ephemeral });
                await handleSlashCommand(command, interaction);
            }
        }
    },
};

export default event;