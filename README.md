# xserializer

Tools to serialize Javascript class instances to JSON objects and deserialize JSON objects to it's correspondent class instances.

## Installation
`npm i --save xserializer`

## Usage examples

### Typescript

Go to [examples](src/examples/) for a detailed view.

```typescript
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
```

Output console of [example2](src/examples/example2.ts) will look something like:

```
Person {
  _name: 'Martin',
  _posts: 
   [ Post { _title: 'First post', _author: [Circular] },
     Post { _title: 'Second post', _author: [Circular] } ] }
Hello, my name is Martin
##################################################
{ '#': [ 'Person', '2941a7a6-6770-9947-90af-5ed382aaf694' ],
  name: 'Martin',
  posts: 
   [ { '#': [ 'Post', '207339f3-6ec9-2cc8-6e7a-c847cf1613ee' ],
       title: 'First post',
       author: { '@': [ 'Person', '2941a7a6-6770-9947-90af-5ed382aaf694' ] },
       _: 
        { _title: 'First post',
          _author: { '@': [ 'Person', '2941a7a6-6770-9947-90af-5ed382aaf694' ] } } },
     { '#': [ 'Post', 'cff65ea1-e1f4-c934-8a28-b1e08119d997' ],
       title: 'Second post',
       author: { '@': [ 'Person', '2941a7a6-6770-9947-90af-5ed382aaf694' ] },
       _: 
        { _title: 'Second post',
          _author: { '@': [ 'Person', '2941a7a6-6770-9947-90af-5ed382aaf694' ] } } } ],
  postsCount: 2,
  _: 
   { _name: 'Martin',
     _posts: 
      [ { '@': [ 'Post', '207339f3-6ec9-2cc8-6e7a-c847cf1613ee' ] },
        { '@': [ 'Post', 'cff65ea1-e1f4-c934-8a28-b1e08119d997' ] } ] } }
##################################################
Person {
  _name: 'Martin',
  _posts: 
   [ Post { _title: 'First post', _author: [Circular] },
     Post { _title: 'Second post', _author: [Circular] } ] }
Hello, my name is Martin
```

### Javascript (ES5)

Go to [examples](dist/examples/) for ES5 compiled examples.

## API docs

Not available yet.


## Warning

**This project is still in alpha. Use at your own risk**



## License

Copyright 2016 Martín Molina Álvarez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.