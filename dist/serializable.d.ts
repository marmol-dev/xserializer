import 'reflect-metadata';
/**
 * Serialize decorator
 * It apply to properties
 * @param replaceWithId
 * @returns {(target:Object, propertyKey:string)=>undefined}
 * @constructor
 */
export declare function Serialize(replaceWithId?: boolean): (target: Object, propertyKey: string) => void;
/**
 * Decorator to set a class Serializable
 * @param serializerSettings
 * @returns {(constructor:Function)=>void}
 * @constructor
 */
export declare function Serializable(): (constructor: Function) => void;
