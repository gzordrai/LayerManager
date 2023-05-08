import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export interface ICommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}