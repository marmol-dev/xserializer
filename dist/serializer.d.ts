export interface SerializerSettings {
    idPropertyName: string;
    referencePropertyName: string;
    internalPropertyName: string;
}
export declare type JSONId = [string, string];
export interface JSONReference {
    [prop: string]: JSONId;
}
export interface JSONWithId {
    [prop: string]: JSONId;
}
export declare function getDefaultSettings(): SerializerSettings;
export default class Serializer {
    static guid(): string;
    private _base;
    private _settings;
    constructor(_base: any, _settings?: SerializerSettings);
    private getIdPropertyName(part);
    private getJSONId(part);
    private getJSONReference(obj);
    private getSerializeProperties(part);
    private getDeserializeProperties(part);
    private serializePart(part);
    serialize(): any;
}
