"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const index_1 = require('../lib/index');
const util_1 = require("util");
let Person = class Person {
    constructor(name) {
        this._name = name;
        this._posts = [];
    }
    get name() {
        return this._name;
    }
    get posts() {
        return this._posts;
    }
    get postsCount() {
        return this.posts.length;
    }
    sayHello() {
        return `Hello, my name is ${this.name}`;
    }
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
let Post = class Post {
    constructor(title, author) {
        this._title = title;
        this._author = author;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
};
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
const separatorString = Array(50).fill('#').join('');
const martin = new Person('Martin');
martin.posts.push(...[
    new Post('First post', martin),
    new Post('Second post', martin)]);
console.log(martin);
console.log(martin.sayHello());
console.log(separatorString);
const serializer = new index_1.Serializer(martin);
const martinJSON = serializer.serialize();
console.log(util_1.inspect(martinJSON, { depth: 5 }));
console.log(separatorString);
const deserializer = new index_1.Deserializer(martinJSON);
deserializer.constructorProvider = (className) => {
    const NullClass = function () {
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
const martin2 = deserializer.deserialize();
console.log(martin2);
console.log(martin2.sayHello());
//# sourceMappingURL=example2.js.map