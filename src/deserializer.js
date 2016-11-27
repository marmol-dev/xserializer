"use strict";
var serializer_1 = require('./serializer');
var json_object_store_1 = require("./json-object-store");
function isObject(e) {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}
var Deserializer = (function () {
    function Deserializer(_base, _settings) {
        if (_settings === void 0) { _settings = serializer_1.getDefaultSettings(); }
        Object.assign(this, { _settings: _settings, _base: _base });
        this._objectStore = new json_object_store_1["default"](_settings);
    }
    Object.defineProperty(Deserializer.prototype, "constructorProvider", {
        get: function () {
            return this._constructorProvider;
        },
        set: function (value) {
            this._constructorProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    Deserializer.prototype.isId = function (val) {
        return Array.isArray(val) &&
            val.length === 2;
    };
    Deserializer.prototype.isReference = function (obj) {
        return isObject(obj) &&
            this._settings.referencePropertyName in obj &&
            this.isId(obj[this._settings.referencePropertyName]);
    };
    Deserializer.prototype.isWithId = function (obj) {
        return isObject(obj) &&
            this._settings.idPropertyName in obj &&
            this.isId(obj[this._settings.idPropertyName]);
    };
    Deserializer.prototype.getInternal = function (obj) {
        return obj[this._settings.internalPropertyName] || {};
    };
    Deserializer.prototype.getId = function (obj) {
        return obj[this._settings.idPropertyName];
    };
    Deserializer.prototype.getReferenceId = function (obj) {
        return obj[this._settings.referencePropertyName];
    };
    Deserializer.prototype.addToStorePart = function (obj) {
        var _this = this;
        if (isObject(obj)) {
            if (this.isWithId(obj)) {
                this._objectStore.add(obj);
            }
            if (!this.isReference(obj)) {
                for (var key in obj) {
                    this.addToStorePart(obj[key]);
                }
            }
        }
        else if (Array.isArray(obj)) {
            obj.forEach(function (e) { return _this.addToStorePart(e); });
        }
    };
    Deserializer.prototype.constructObject = function (jsonObj) {
        var className = this.getId(jsonObj)[0];
        var constructor = this._constructorProvider(className);
        var object = Object.create(constructor.prototype);
        Object.assign(object, this.getInternal(jsonObj));
        delete object[this._settings.idPropertyName];
        return object;
    };
    Deserializer.prototype.deserializeStore = function () {
        for (var className in this._objectStore.objects) {
            for (var objectId in this._objectStore.objects[className]) {
                this._objectStore.objects[className][objectId] = this.constructObject(this._objectStore.objects[className][objectId]);
            }
        }
    };
    Deserializer.prototype.updateReferences = function (obj) {
        var _this = this;
        if (Array.isArray(obj)) {
            return obj.map(function (e) { return _this.updateReferences(e); });
        }
        else if (isObject(obj)) {
            if (this.isReference(obj)) {
                return this._objectStore.get(this.getReferenceId(obj));
            }
            else {
                for (var key in obj) {
                    obj[key] = this.updateReferences(obj[key]);
                }
                return obj;
            }
        }
        else {
            return obj;
        }
    };
    Deserializer.prototype.updateStoreReferences = function () {
        for (var className in this._objectStore.objects) {
            for (var objectId in this._objectStore.objects[className]) {
                this._objectStore.objects[className][objectId] = this.updateReferences(this._objectStore.objects[className][objectId]);
            }
        }
    };
    Deserializer.prototype.getLinkedObject = function (part) {
        var _this = this;
        if (Array.isArray(part)) {
            return part.map(function (e) { return _this.getLinkedObject(e); });
        }
        else if (isObject(part)) {
            if (this.isReference(part)) {
                return this._objectStore.get(this.getReferenceId(part));
            }
            else {
                if (this.isWithId(part)) {
                    return this._objectStore.get(this.getId(part));
                }
                else {
                    var toret = {};
                    for (var key in toret) {
                        toret[key] = this.getLinkedObject(toret[key]);
                    }
                    return toret;
                }
            }
        }
        else {
            return part;
        }
    };
    Deserializer.prototype.deserialize = function () {
        this.addToStorePart(this._base);
        this.deserializeStore();
        this.updateStoreReferences();
        return this.getLinkedObject(this._base);
    };
    return Deserializer;
}());
exports.__esModule = true;
exports["default"] = Deserializer;
//# sourceMappingURL=deserializer.js.map