"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var index_1 = require('../lib/index');
var util_1 = require("util");
var Person = (function () {
    function Person(name) {
        this._name = name;
        this._posts = [];
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "posts", {
        get: function () {
            return this._posts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "postsCount", {
        get: function () {
            return this.posts.length;
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.sayHello = function () {
        return "Hello, my name is " + this.name;
    };
    __decorate([
        index_1.Deserialize()
    ], Person.prototype, "_name", void 0);
    __decorate([
        index_1.Deserialize()
    ], Person.prototype, "_posts", void 0);
    __decorate([
        index_1.Serialize()
    ], Person.prototype, "name", null);
    __decorate([
        index_1.Serialize()
    ], Person.prototype, "posts", null);
    __decorate([
        index_1.Serialize()
    ], Person.prototype, "postsCount", null);
    Person = __decorate([
        index_1.Serializable(),
        index_1.Deserializable()
    ], Person);
    return Person;
}());
var Post = (function () {
    function Post(title, author) {
        this._title = title;
        this._author = author;
    }
    Object.defineProperty(Post.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Post.prototype, "author", {
        get: function () {
            return this._author;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        index_1.Deserialize()
    ], Post.prototype, "_title", void 0);
    __decorate([
        index_1.Deserialize()
    ], Post.prototype, "_author", void 0);
    __decorate([
        index_1.Serialize()
    ], Post.prototype, "title", null);
    __decorate([
        index_1.Serialize()
    ], Post.prototype, "author", null);
    Post = __decorate([
        index_1.Serializable(),
        index_1.Deserializable()
    ], Post);
    return Post;
}());
var separatorString = Array(50).fill('#').join('');
var martin = new Person('Martin');
(_a = martin.posts).push.apply(_a, [
    new Post('First post', martin),
    new Post('Second post', martin)]);
console.log(martin);
console.log(martin.sayHello());
console.log(separatorString);
var serializer = new index_1.Serializer(martin, { operationMode: 'both' });
var martinJSON = serializer.serialize();
console.log(util_1.inspect(martinJSON, { depth: 5 }));
console.log(separatorString);
var deserializer = new index_1.Deserializer(martinJSON);
deserializer.constructorProvider = function (className) {
    var NullClass = function () {
    };
    NullClass.prototype = null;
    switch (className) {
        case null:
            return NullClass;
        case 'Person':
            return Person;
        case 'Post':
            return Post;
        case 'Object':
        default:
            return Object;
    }
};
var martin2 = deserializer.deserialize();
console.log(martin2);
console.log(martin2.sayHello());
var _a;
//# sourceMappingURL=example2.js.map