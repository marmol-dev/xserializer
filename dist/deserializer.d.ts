import { SerializerSettings } from './serializer';
export declare type ConstructorProvider = (name: string) => Function;
export declare class Deserializer {
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
