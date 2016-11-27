/// <reference path="typings/index.d.ts" />
import 'reflect-metadata';

export function Deserializable(): (constructor: Function) => void;
export function Deserialize(replaceWithId?: boolean): (target: Object, propertyKey: string) => void;
export function isDeserializable(obj: Object): any;

export interface SerializerSettings {
    idPropertyName: string;
    referencePropertyName: string;
    internalPropertyName: string;
}
export type JSONId = [string, string];
export interface JSONReference {
    [prop: string]: JSONId;
}
export interface JSONWithId {
    [prop: string]: JSONId;
}
export function getDefaultSettings(): SerializerSettings;
export class Serializer {
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

export class JSONObjectStore {
    private _map;
    private _settings;
    constructor(_settings: SerializerSettings);
    add(obj: JSONWithId): void;
    get(id: JSONId): JSONWithId;
    private objects: {
        [className: string]: {
            [id: string]: JSONWithId;
        };
    };
}

export type ConstructorProvider = (name: string) => Function;
export class Deserializer {
    private _base;
    private _constructorProvider;
    private _objectStore;
    private _settings;
    constructor(_base: any, _settings?: SerializerSettings);
    constructorProvider: ConstructorProvider;
    private isId(val);
    private isReference(obj);
    private isWithId(obj);
    private getInternal(obj);
    private getId(obj);
    private getReferenceId(obj);
    private addToStorePart(obj);
    private constructObject(jsonObj);
    private deserializeStore();
    private updateReferences(obj);
    private updateStoreReferences();
    private getLinkedObject(part);
    deserialize(): any;
}

/**
 * Serialize decorator
 * It apply to properties
 * @param replaceWithId
 * @returns {(target:Object, propertyKey:string)=>undefined}
 * @constructor
 */
export function Serialize(replaceWithId?: boolean): (target: Object, propertyKey: string) => void;
/**
 * Decorator to set a class Serializable
 * @param serializerSettings
 * @returns {(constructor:Function)=>void}
 * @constructor
 */
export function Serializable(): (constructor: Function) => void;

