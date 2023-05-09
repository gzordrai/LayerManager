import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { ExtendedClient } from "./ExtendedClient";

export interface ICommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    ephemeral?: boolean;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
    execute: ((interaction: ChatInputCommandInteraction, client: ExtendedClient) => Promise<void>);
}