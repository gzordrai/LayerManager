import { IJsonLayer } from "./json";

export class Layer {
    private name: string;
    private locked: boolean;

    public constructor(name: string, locked: boolean) {
        this.name = name;
        this.locked = locked;
    }

    /**
     * Check if the layer is locked
     * 
     * @returns {boolean} true if the layer is locked, false otherwise
     */
    public islocked(): boolean {
        if (this.locked)
            return true;

        return false;
    }

    /**
     * Lock the layer
     */
    public lock(): void {
        this.locked = true;
    }

    /**
     * Unlock the layer
     */
    public unlock(): void {
        this.locked = false;
    }

    /**
     * Returns the name of the layer.
     * 
     * @returns {string} The name of the layer.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Returns a JSON representation of the layer.
     * @returns {IJsonLayer} The layer's data as a JSON object.
     */
    public toJSON(): IJsonLayer {
        return { locked: this.locked };
    }
}