"use strict";
var JSONObjectStore = (function () {
    function JSONObjectStore(_settings) {
        Object.assign(this, { _settings: _settings });
        this._map = {};
    }
    JSONObjectStore.prototype.add = function (obj) {
        var id = obj[this._settings.idPropertyName];
        if (id[0] in this._map === false) {
            this._map[id[0]] = {};
        }
        this._map[id[0]][id[1]] = obj;
    };
    JSONObjectStore.prototype.get = function (id) {
        if (id[0] in this._map === false || id[1] in this._map[id[0]] === false) {
            return undefined;
        }
        return this._map[id[0]][id[1]];
    };
    Object.defineProperty(JSONObjectStore.prototype, "objects", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    return JSONObjectStore;
}());
exports.__esModule = true;
exports["default"] = JSONObjectStore;
