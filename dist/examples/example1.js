"use strict";
var xserializer = require('../lib/index');
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
    Person.prototype.sayHello = function () {
        return "Hello, my name is " + this.name;
    };
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
    return Post;
}());
var martin = new Person('Martin');
(_a = martin.posts).push.apply(_a, [
    new Post('First post', martin),
    new Post('Second post', martin)]);
console.log(martin);
console.log(martin.sayHello());
var serializer = new xserializer.Serializer(martin);
var martinJSON = serializer.serialize();
console.log(martinJSON);
var deserializer = new xserializer.Deserializer(martinJSON);
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
//# sourceMappingURL=example1.js.map