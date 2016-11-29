"use strict";
function isObject(e) {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}
var DEFAULT_SETTINGS = {
    idPropertyName: '#',
    referencePropertyName: '@',
    internalPropertyName: '_',
    operationMode: 'both'
};
function getDefaultSettings() {
    return Object.assign({}, DEFAULT_SETTINGS);
}
exports.getDefaultSettings = getDefaultSettings;
var serializedSymbol = Symbol();
var Serializer = (function () {
    function Serializer(_base, _settings) {
        if (_settings === void 0) { _settings = getDefaultSettings(); }
        Object.assign(this, { _base: _base });
        this._settings = Object.assign(getDefaultSettings(), _settings);
    }
    Serializer.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    Serializer.prototype.getIdPropertyName = function (part) {
        var idPropertyName = '__serializeId__';
        return idPropertyName;
    };
    Serializer.prototype.getJSONId = function (part) {
        var idPropertyName = this.getIdPropertyName(part);
        if (idPropertyName in part === false) {
            Object.defineProperty(part, idPropertyName, {
                value: Serializer.guid(),
                enumerable: false
            });
        }
        return [part.constructor.name || null, part[idPropertyName]];
    };
    Serializer.prototype.getJSONReference = function (obj) {
        return (_a = {},
            _a[this._settings.referencePropertyName] = this.getJSONId(obj),
            _a
        );
        var _a;
    };
    Serializer.prototype.getSerializeProperties = function (part) {
        if (this._settings.operationMode === 'deserialize') {
            return [];
        }
        var properties = Reflect.getMetadata('serializeProperties', part.constructor);
        if (!properties) {
            properties = Object.keys(part);
        }
        return properties;
    };
    Serializer.prototype.getDeserializeProperties = function (part) {
        if (this._settings.operationMode === 'serialize') {
            return [];
        }
        var properties = Reflect.getMetadata('deserializeProperties', part.constructor);
        if (!properties) {
            properties = Object.keys(part);
        }
        return properties;
    };
    Serializer.prototype.serializePart = function (part) {
        var _this = this;
        if (Array.isArray(part)) {
            return part.map(function (e) { return _this.serializePart(e); });
        }
        else if (isObject(part)) {
            if (serializedSymbol in part === false) {
                part[serializedSymbol] = true;
                var toret_1 = (_a = {},
                    _a[this._settings.idPropertyName] = this.getJSONId(part),
                    _a
                );
                var serializeProperties = this.getSerializeProperties(part);
                serializeProperties.forEach(function (key) {
                    try {
                        toret_1[key] = _this.serializePart(part[key]);
                    }
                    catch (e) { }
                });
                var deserializeProperties = this.getDeserializeProperties(part);
                toret_1[this._settings.internalPropertyName] = {};
                deserializeProperties.forEach(function (key) {
                    try {
                        toret_1[_this._settings.internalPropertyName][key] = _this.serializePart(part[key]);
                    }
                    catch (e) { }
                });
                return toret_1;
            }
            else {
                return this.getJSONReference(part);
            }
        }
        else {
            return part;
        }
        var _a;
    };
    Serializer.prototype.serialize = function () {
        return this.serializePart(this._base);
    };
    return Serializer;
}());
exports.Serializer = Serializer;
//# sourceMappingURL=serializer.js.map