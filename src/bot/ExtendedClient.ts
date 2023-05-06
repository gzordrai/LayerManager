import { Client, Collection } from "discord.js";
import { ICommand } from "./ICommand";

export class ExtendedClient extends Client {
    public commands: Collection<string, ICommand> = new Collection<string, ICommand>();
}