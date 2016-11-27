import { JSONWithId, SerializerSettings, JSONId } from "./serializer";
export default class JSONObjectStore {
    private _map;
    private _settings;
    constructor(_settings: SerializerSettings);
    add(obj: JSONWithId): void;
    get(id: JSONId): JSONWithId;
    readonly objects: {
        [className: string]: {
            [id: string]: JSONWithId;
        };
    };
}
