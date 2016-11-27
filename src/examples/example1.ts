import * as xserializer from '../lib/index';

class Person {
    private _name: string;
    private _posts: Post[];

    constructor(name: string) {
        this._name = name;
        this._posts = [];
    }


    get name(): string {
        return this._name;
    }

    get posts(): Post[] {
        return this._posts;
    }

    public sayHello(){
        return `Hello, my name is ${this.name}`;
    }
}

class Post {
    private _title: string;
    private _author: Person;

    constructor(title: string, author: Person) {
        this._title = title;
        this._author = author;
    }


    get title(): string {
        return this._title;
    }

    get author(): Person {
        return this._author;
    }
}

const martin = new Person('Martin');
martin.posts.push(...[
    new Post('First post', martin),
    new Post('Second post', martin)]
);

console.log(martin);
console.log(martin.sayHello());

const serializer = new xserializer.Serializer(martin);
const martinJSON = serializer.serialize();

console.log(martinJSON);

const deserializer = new xserializer.Deserializer(martinJSON);
deserializer.constructorProvider = (className: string) => {
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
const martin2 = <Person> deserializer.deserialize();

console.log(martin2);
console.log(martin2.sayHello());