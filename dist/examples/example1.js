"use strict";
const xserializer = require('../lib/index');
class Person {
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
    sayHello() {
        return `Hello, my name is ${this.name}`;
    }
}
class Post {
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
}
const martin = new Person('Martin');
martin.posts.push(...[
    new Post('First post', martin),
    new Post('Second post', martin)]);
console.log(martin);
console.log(martin.sayHello());
const serializer = new xserializer.Serializer(martin);
const martinJSON = serializer.serialize();
console.log(martinJSON);
const deserializer = new xserializer.Deserializer(martinJSON);
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
//# sourceMappingURL=example1.js.map