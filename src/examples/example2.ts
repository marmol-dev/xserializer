import {Serializable, Deserialize, Deserializable, Serializer, Deserializer, Serialize} from '../lib/index';
import {inspect} from "util";

@Serializable()
@Deserializable()
class Person {
    @Deserialize()
    private _name: string;
    @Deserialize()
    private _posts: Post[];

    constructor(name: string) {
        this._name = name;
        this._posts = [];
    }

    @Serialize()
    get name(): string {
        return this._name;
    }

    @Serialize()
    get posts(): Post[] {
        return this._posts;
    }

    @Serialize()
    get postsCount() {
        return this.posts.length;
    }

    public sayHello(){
        return `Hello, my name is ${this.name}`;
    }
}

@Serializable()
@Deserializable()
class Post {
    @Deserialize()
    private _title: string;
    @Deserialize()
    private _author: Person;

    constructor(title: string, author: Person) {
        this._title = title;
        this._author = author;
    }

    @Serialize()
    get title(): string {
        return this._title;
    }

    @Serialize()
    get author(): Person {
        return this._author;
    }
}

const separatorString = Array(50).fill('#').join('');

const martin = new Person('Martin');
martin.posts.push(...[
    new Post('First post', martin),
    new Post('Second post', martin)]
);

console.log(martin);
console.log(martin.sayHello());
console.log(separatorString);

const serializer = new Serializer(martin);
const martinJSON = serializer.serialize();

console.log(inspect(martinJSON, {depth: 5}));
console.log(separatorString);


const deserializer = new Deserializer(martinJSON);
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