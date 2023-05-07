import { Config, JsonDB } from "node-json-db";
import path from "path";
import { Layer } from "./Layer";
import { IJsonLayer } from "./json";

export class Database {
    private static data: JsonDB = new JsonDB(new Config(path.resolve(__dirname, "../../data/database.json"), true, true, '/'));

    /**
     * Adds a layer to the database
     * 
     * @param layer The layer to add
     */
    public static async addLayer(layer: Layer): Promise<void> {
        await Database.save(layer);
    }

    /**
     * Removes a layer from the database
     * 
     * @param layer The layer to remove
     */
    public static async removeLayer(layer: Layer): Promise<void> {
        await Database.data.delete(`/${layer.getName()}`);
    }

    /**
     * Retrieves a layer from the database by its name
     * 
     * @param name The name of the layer to retrieve
     * @returns {Layer} The layer object
     */
    public static async getLayer(name: string): Promise<Layer> {
        const data: IJsonLayer = await Database.data.getData(`/${name}`);

        return new Layer(name, data.locked);
    }

    /**
     * Returns the number of layers in the database
     * 
     * @returns {number} The number of layers in the database
     */
    public static async count(): Promise<number> {
        return Object.keys(await Database.data.getData("/")).length;
    }

    /**
     * Checks if a layer with the specified name exists in the database
     * 
     * @param name The name of the layer to check
     * @returns {boolean} True if the layer exists, otherwise false
     */
    public static async has(name: string): Promise<boolean> {
        return await Database.data.exists(`/${name}`);
    }


    /**
     * Saves a layer to the database
     * 
     * @param layer The layer to save
     */
    public static async save(layer: Layer): Promise<void> {
        await Database.data.push(`/${layer.getName()}`, layer.toJSON(), true);
    }
}
