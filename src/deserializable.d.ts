import 'reflect-metadata';
export declare function Deserializable(): (constructor: Function) => void;
export declare function Deserialize(replaceWithId?: boolean): (target: Object, propertyKey: string) => void;
export declare function isDeserializable(obj: Object): any;
