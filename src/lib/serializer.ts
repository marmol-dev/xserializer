function isObject(e: any) : boolean {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}

export interface SerializerSettings {
    idPropertyName?: string;
    referencePropertyName?: string;
    internalPropertyName?: string;
    operationMode?: 'serialize' | 'deserialize' | 'both';
}

export type JSONId = [string, string];

export interface JSONReference {
    [prop : string]: JSONId;
}

export interface JSONWithId {
    [prop: string]: JSONId;
}

const DEFAULT_SETTINGS : SerializerSettings = {
    idPropertyName: '#',
    referencePropertyName: '@',
    internalPropertyName: '_',
    operationMode: 'both'
};

export function getDefaultSettings() : SerializerSettings {
    return Object.assign({}, DEFAULT_SETTINGS);
}

const serializedSymbol = Symbol();

export class Serializer {

    public static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    private _base : any;
    private _settings: SerializerSettings;

    constructor(_base: any, _settings: SerializerSettings = getDefaultSettings()){
        Object.assign(this, {_base});
        this._settings = Object.assign(getDefaultSettings(), _settings);
    }

    private getIdPropertyName(part: any) : string {
        const idPropertyName = '__serializeId__';
        return idPropertyName;
    }

    private getJSONId(part: any) : JSONId {
        const idPropertyName = this.getIdPropertyName(part);
        if (idPropertyName in part === false){
            Object.defineProperty(part, idPropertyName, {
                value: Serializer.guid(),
                enumerable: false
            });
        }
        return [part.constructor.name || null, part[idPropertyName]];
    }

    private getJSONReference(obj: any) : JSONReference {
        return {
            [this._settings.referencePropertyName]: this.getJSONId(obj)
        };
    }

    private getSerializeProperties(part: any) : string[] {
        if (this._settings.operationMode === 'deserialize'){
            return [];
        }

        let properties = Reflect.getMetadata('serializeProperties', part.constructor);

        if (!properties){
            properties = Object.keys(part);
        }

        return properties;
    }

    private getDeserializeProperties(part: any): string[] {
        if (this._settings.operationMode === 'serialize'){
            return [];
        }

        let properties = Reflect.getMetadata('deserializeProperties', part.constructor);

        if (!properties){
            properties = Object.keys(part);
        }

        return properties;
    }

    private serializePart(part: any) : any {
        if (Array.isArray(part)){
            return part.map((e: any) => this.serializePart(e));
        } else if (isObject(part)){
            if (serializedSymbol in part === false){
                part[serializedSymbol] = true;

                const toret : any = {
                    [this._settings.idPropertyName] : this.getJSONId(part),
                };

                const serializeProperties = this.getSerializeProperties(part);
                serializeProperties.forEach(key => {
                    try {
                        toret[key] = this.serializePart(part[key]);
                    } catch(e) {}
                });

                let deserializeProperties = this.getDeserializeProperties(part);
                toret[this._settings.internalPropertyName] = {};
                deserializeProperties.forEach(key => {
                    try {
                        toret[this._settings.internalPropertyName][key] = this.serializePart(part[key]);
                    } catch(e) {}
                });

                return toret;
            } else {
                return this.getJSONReference(part);
            }
        } else {
            return part;
        }
    }

    public serialize() : any {
       return this.serializePart(this._base);
    }
}