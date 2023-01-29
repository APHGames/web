---
title: JavaScript
---

import useBaseUrl from '@docusaurus/useBaseUrl';


## Basic structures
- three declarators: `var, const, let`
- don't use `var` anymore, as it's hoisted

### Assignment

```javascript
// creating a new object
let person = {
    name: 'Kunio Otani'
}

// re-assignment of a variable
person.name = 'Joe Bridge'

// creating a new variable
let city = 'New York';

// creating a regular function
// regular functions are not recommended anymore
let myFunc = function() {
    return 42;
}

// creating an arrow function
let myFunc2 = () => {
    return 42;
}

// equivalent (in case the function only have a return statement)
let myFunc2 = () => 42;

```

### Six falsy values
- any other values is true
- `false`, `0`, `''`, `null`, `undefined`, `NaN`

### Six primitive values (+ Object)
- Boolean, Null, Undefined, Number, String, Symbol


### Arguments
- common way - arguments are listed

```javascript
function displayTags(tags) {
    for(let tag of tags) {
        ...
    }
}
```

- `arguments` keyword (not a very good approach)

```javascript
// "arguments" is a reserved keyword for arguments of a function
function displayTags() {
    // e.g., we can call displayTags(1, 2, 3)
	for(let i in arguments) {
        ...
    }
}
```

- rest parameter syntax

```javascript

// - allows to represent an indefinite number of arguments as an Array
function displayTags(targetElement, ...tags){ // ... always goes last
   for(let i in tags) { ... }	
}

// spread operator will convert an array into individual elements
const tags = ['tag1', 'tag2'];
displayTags(myElement, ...tags);
```


### For loops
- **for-in** - works for **any** object, not only arrays. **The order is undefined**, not recommended to use

```javascript
for(let key in activeUsers) {
    console.log(activeUsers[key])
}
```

- **for-of** - works only for objects that have `[Symbol.iterator]`
  - works for arrays out of the box

```javascript
for(let user of activeUsers) {
    console.log(user)
}
```

### Destructuring assignment
#### Array destructuring
- allows to extract multiple array elements and store them into variables

```javascript
// name1 and name2 are new variables that will contain first two items in the array
let [ name1, name2 ] = names
```

- ignoring second element

```javascript
let [ name,, name3 ] = names
```

- setting default values (in case they are undefined)

```javascript
let [ a = 1, b = 2, c = 3 ] = names
```

- extracting sub-arrays

```javascript
// extracts first item and the rest of the array as a new array
let [first, ...rest] = users;
```

#### Object destructuring
- allows to extract attributes

```javascript
// assign properties - bad way
let user = buildUser('Sam', 'Williams')
let first = user.first
let last = user.last

// assign properties - good way
let { first, last, fullName } = buildUser('Sam', 'Williams')
// in case we only need fullName
let { fullName } = buildUser('Sam', 'Williams')

// works for functions too
function setThread(name, options = {}) {
	let { param1, param2 } = options;
}
```

### Template strings

```javascript
// ` backtick must be used!!!
let fullName = `${first} ${last}` 
```

### Optional Chaining
- can save us a few if-checks

```javascript
// if submission is undefined or null, it will assign that value to the result
// saves us a lot of ifchecks, as it doesn't throw an error
let result = submission?.holding?.name;

// equivalent
let result;
if(submission && submission.holding) {
	result = submission.holding.name;
}
```

### Default value
- default value of a function parameter

```javascript
// default value
function loadProfiles(userNames = []) {
	
}
```

- default primitive value

```javascript
// if options.container is a falsy value (see above), it will get .timer-display
let container = options.container || ".timer-display"; 

// another option - if options.container is null or undefined, it will get .timer-display
let container = options.container ?? ".timer-display"; 
```

- default object value

```javascript
let defaults = {
	...someDefaultObject, // this will copy-paste everything from someDefaultObject
	param1: value1, // here we can re-declare what we need
	param2: value2
}

// !!! order matters. Here, param1 and param2 will be replaced by what is inside someDefaultObject
let defaults = {
	param1: value1,
	param2: value2,
	...someDefaultObject,
}
```

### Rest and Spread operators
- denoted with three ellipses `...`
- rest is used to represent an infinite number of arguments
- spread is used to allow an iterable object to be expanded
- rest destructuring

```javascript
function fn(num1, num2, ...args) { } /// args always goes last
```

- destructured first three parameters

```javascript
function fn(...[n1, n2, n3]) {}
```

- spread operator

```javascript
function myFunction(n1, n2, n3) { ... }
 
const values = [ 1, 2, 3 ];
// spread 
myFunction(...values);
```

- object destructuring

```javascript
const { firstNamne, lastName } = obj
```

- destructuring into a new variable

```javascript
const { firstName: first, lastName } = obj
console.log(first)
```

### Arrow functions
- are callable but not constructable (you can't use `new` operator)

```javascript
const myArrowFunction = () => {
	console.log('Hello from arrow function');
}

// arrow function that returns an object
// parentheses need to be used ()
const myArrowFunction = () => ({ something: 3 });

// WRONG! This would be considered a function body
const myArrowFunction = () => { something: 3 };

```

### Array operations
- mutating arrays
  - **these functions mutate the original array:** `copyWithin, fill, pop, push, reverse, shift, sort, splice, unshift`

```javascript
const mutatingAdd = [1, 2, 3]
// adding a new item to an array
mutatingAdd.push(4) // [1, 2, 3, 4]
// equivalent, as this doesn't create a new array (compiler optimization)
mutatingAdd = [...mutatingAdd, 4]

// unshift will add an item to the beginning
mutatingAdd.unshift(0) // [0, 1, 2, 3, 4]
// equivalent of unshift
mutatingAdd = [0, ...pokemon]
```

- immutable operations

```javascript
const arr1 = [1, 2]
const arr2 = [3, 4]

const arr3 = arr1.concat(arr2) // [1, 2, 3, 4]
const arr3 = [...arr1, ...arr2]// [1, 2, 3, 4]
const arr4_altern = [0, ...arr1] //[0, 1, 2]
```

- `find()` - returns the first element that satisfies a testing function

```javascript
let admin = users.find((user) => { return user.admin; });

// a common error: passing an object instead of an arrow function
// this will not work
let admin = users.find(adminUser)
```

- splice - removes strings from an array

```javascript
const arr = [0, 1, 2]
// will mutate the original array
const tailArr = arr.splice(-1) // [2]
console.log(arr) // [0, 1]
```

- slice - creates a subarray

```javascript
const numbers = [0, 1, 2, 3, 4]
const lessThanThree = numbers.slice(0, 3) // [0, 1, 2]
const moreThanTwo = numbers.splice(2, numbers.length) // [2, 3, 4] 
```

- sorting arrays

```javascript
// sorting function: 
// if < 0, then a < b if == 0, then a == b if > 0, then b > a
nums.sort((a, b) => {
  return a - b; // ascending, only if a and b are numbers 
});

nums.sort((a, b) => {
  return b - a; // descending, only if a and b are numbers 
});
```

- generating a sequence

```javascript
const indices = Array.from(Array(10).keys())
console.log(indices) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Maps
- when using objects as maps, their keys are always converted to strings

```javascript
let obj = {};
obj[1] = 2;
obj['1'] = 3; // will replace obj[1]
```

- unlike objects, Maps can't be serialized into JSON, yet they can be iterated via for-of loop (objects can't)

```javascript
let totalReplies = new Map();
totalReplies.set(user1, 5) ;
totalReplies.set(user2, 42);
let has = totalReplies.has(user1);
totalReplies.delete(user1);
```

- iterating over entries

```javascript
// the iterator returns an array of pairs. That's why we can use let [key, value]
for(let [key, value] of mapSettings) {
	console.log(`${key} = ${value}`);
}
```

### Sets
- common sets - they don't contain duplicate values

```javascript
let tags = new Set()
tags.add('JavaScript')
tags.add({ version : '2015' })

let [first] = tags // first item
```



### Classes
- class syntax (introduced in ES6)

```javascript
class SponsorWidget {
    myVar = 12
    myOtherVar
    
    constructor(name description, url){
        // another way how to initialize variables
        this.name = name
        this.description = description
        this.url = url
    }
    
    render(){     
        let link = this._buildLink(this.url)
    }
    
    // underscore is a convention for private method, not used in TypeScript
    _buildLink(url) {
        
    }
}

// inheritance
class SponsorWidget extends Widget {
    constructor(name, description, url) {
        super()
    }
    
    render() {
        super.render() // parent version
        let parsedName = this.parse(this.name)
        let css = this._buildCss()
    }
}
```


### Promises
- three states - pending, fulfilled, rejected
- handlers - `then()`, `catch()`, `finally()`
- when `Promise.then()` is called, it returns a new promise in the pending state
- when `Promise.catch()` is called, it internally calls `Promise.then(undefined, rejectHandler)`

```javascript
const myPromise = new Promise((resolve, reject) => {
    reject(new Error());
})

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('Done!')} ) // also works
})
```

#### Error handling

```javascript
myPromise.then(() => {
    // success handler
}, (error) => {
    // error handler -> the second argument
    console.log(error);
})

Promise.resolve('Resolve').then(console.log) // prints Resolve
Promise.reject('Reject').catch(console.log) // prints Reject
```

#### Promise chaining

```javascript
getPollResultsFromServer("Sass") // pending
  .then(ui.renderScript) // fulfilled, read results
  .then(doSomethingElseNonBlocking) // fulfilled
  .catch((error) => { // rejected
	 console.log("Error: ", error); 
  });

function getPollResultsFromServer(pollName){
	return new Promise(function(resolve, reject){
		// this will go to the next THEN function
		resolve(someValue);
		// this will go to the next CATCH function
		reject(new Error('There is no spoon');
	});
}
```

#### Combined promises
  - Promise.all waits until all promises have been fulfilled
  - Promise.race waits until the first promise has been fulfilled

```javascript
await Promise.all([
    resolveAfter1Second(),
    resolveAfter2Seconds(),
])
```

### Async/await
- `async` function returns a promise - all async functions can have `then()` and `catch()` handlers
- `await` can be used only within an `async` function

- using async/await

```javascript
// await proceeds to the next line of code when an async function has been completed/fulfilled
// returns an array of fulfilled values when all inner promises have been fulfilled
const myPromise = await Promise.all([
	(async() => await resolveAfter1Second()),
	(async() => await resolveAfter2Seconds()),
]);
```

- if we don't return a promise, JS will do it automagically!

```javascript
async function example1() {
    return 'Hello' // JS will wrap this into a promise
}
```

- error rejection

```javascript
try {
    const value1 = await Promise.reject('Error')
} catch(err) {
    
}
```

- async and map
  - don't use `.map(async () => ... )`. Instead, iterate in a for-loop

```javascript
const fruitLoop = async() => {
  for await(const emoji of smoothie) {
    log(emoji)
  }
}
```

### Modules
- creating modules

```javascript
// flas-message.js
export default function(message){
    alert(message)
}

// app.js
import flashMessage from './flash-message'
flashMessage('Hello')
```

- named exports

```javascript
// flash-message.js
export function alertMessage(message){
	alert(message);
}

export function logMessage(message){
	console.log(message);
}

// app.js
import { alertMessage, logMessage } from './flash-message';
```

- importing the whole module

```javascript
import * as flash from './flash-message';
flash.alertMessage('Hello');
```

- mixing default and named exports

```javascript
// file mojo.js
const A = () => console.log('A');
export default A;

export const B = () => console.log('B');
export const C = () => console.log('C');

// file dojo.js
// a module can only have one default export, but many named exports
import A, { B, C } from 'mojo.js'; // A is a default export, B and C are named exports
```

- exporting class modules

```javascript
// exporting class modules
export default class FlashMessage { ... }
// importing class modules
import FlashMessage from './flash-message';
// alternative
export { FlashMessage }
import { FlashMessage }
```


## Advanced structures

### Curried functions
- multiple arrow functions, can be used to wrap event handlers with additional parameters

```javascript
const three = a => b => c => a + b + c
three(1)(2)(3)

// equivalent:
const three = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
```

### Iterators
- we have to define a function that takes a collection in as the parameter and returns an object which **must** have property `next`
- when `next` is called, the iterator steps to the next value in the collection and returns an object with the value and the done status of the iteration

```javascript
function createIterator(array){
    let currIdx = 0
    return {
        next() {
            return currIdx < array.lenth ? {
                value: array[currIdx++], done: false,
            } : { done: true }
        },
    }
}
```

### Generators
- provide an iterative way to build a collection of data
- can be used for asynchronous processing also

```javascript
function *nameList(){
    yield 'Sam'   // { done : false, value: 'Sam' }
    yield 'Tyler' // { done : false, value: 'Tyler' }
    // if there is no return, the last value will be undefined
    return 'Mojo'; // { done : true, value: 'Mojo '}
}

const generator = nameList(); // will create a generator
for(let name of generator) {...} // will iterate over yield statements
let names = [...generator]; // also possible, yet each generator can only be used once

// another way -> manually iterating over yield statements
while(!generator.done) {
	let val = generator.next(); // manually fetching values
}
```

- infinite loop
  - possible when using generators, as each yield will pause it

```javascript
function *gen() {
    let i = 0
    while(true) {
        yield i++ 
    }
}
```

### Tagged template literals
- can be parsed with tag functions and can return a manipulated string

```javascript
function tagFunction(strings, param) {
    return strings[0] + param
}
 
const tagged = tagFunction`We have ${num} param`
```


### Readonly properties

```javascript
let a = {}
Object.defineProperty(a, 'mojo', {
  value: 15,
  writable: false
})
```

### Getters and setters

```javascript
function Foobar () {
    var _foo //  true private property
  
    Object.defineProperty(obj, 'foo', {
      get: function () { return _foo },
      set: function (value) { _foo = value }
    })
}
```

### Proxies

```javascript
function Foo() {
    return new Proxy(this, {
      get: function (object, property) {
        if (Reflect.has(object, property)) {
          return Reflect.get(object, property)
        } else {
          return function methodMissing() {
            console.log(`You called ${property} but it doesn't exist!`)
          }
        }
      }
    })
}
```





## Tips and tricks

- transforming arguments object into an array

```javascript
const argArray = Array.prototype.slice.call(arguments)
```

- avoiding repetition

```javascript
// repetition
return { first: first, last: last, fullName : fullName }
// without repetition (works only when properties have the same name)
return { first, last, fullName }
```

- deep cloning
  - **very bad way, as it will transform the object into a string and back**
  - better to use some dedicated cloning libraries

```javascript
JSON.stringify(myObj1) === JSON.stringify(myObj2) 
```

- semicolons
  - no longer mandatory, except form a few cases

```javascript
// this prevents any previous code from 
// executing your code as the arguments to that function
// therefore, the semicolon has to be there
;(async () => { ... }
```

- avoid using `new Array()`

```javascript
const a = new Array(10);
a.push(12); // length is 11 !!!
a.toString(); // returns ,,,,,,,,,12
const a = [10]; // recommended approach! Don't use new Array()
```

- math operations

```javascript
// Math operations 
Math.trunc(5.5) = 5 // returns integer part, very fast, added in ES6
Math.ceil(5.5) = 6 // rounds up 
Math.floor(5.5) = 5 // rounds down 
Math.round(5.5) = 6 // rounds with respect to the fraction part 
```

- remove duplicities from an array

```javascript
const arr = [...new Set([1, 2, 3, 3])] // [1, 2, 3]
```

- get the last item in an array

```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array.slice(-1)) // Result: [9]
```

- assigning operators in a constructor

```javascript
class Polygon {
  constructor(options) { // many attributes
    Object.assign(this, options)
  }
}
```

- freezing properties of an object

```javascript

const obj = { foo1: 'bar1', foo2: { value: 'bar2' } };

Object.freeze( obj );

obj.foo = 'foo'; // doesn't change the property, doesn't throw Error
obj.foo2.value = 'bar3'; // does change the value - it's nested!

```

### Console tips
- displaying variables: `console.log({foo, bar, baz})`

<img src={useBaseUrl('img/docs/cheatsheets/console_vars.jpg')} />

- using CSS styles: `console.log('%c Hello', 'color: orange;');`

<img src={useBaseUrl('img/docs/cheatsheets/console_styles.jpg')} />

- using tables: `console.table([foo, bar, baz]);`

<img src={useBaseUrl('img/docs/cheatsheets/console_table.jpg')} />

- measuring time:
  - `console.time('looper');`
  - `console.timeEnd('looper');`

<img src={useBaseUrl('img/docs/cheatsheets/console_time.jpg')} />

- tracing method: `console.trace('Did I forget sth?');`

<img src={useBaseUrl('img/docs/cheatsheets/console_trace.jpg')} />


## Weird parts of JavaScript

```javascript
false.toString(); // false 
function Foo() { } 
Foo.bar = 1; 
"🎉".length === 2; // true. However, it's a single element in a for-of loop

2.toString(); // SyntaxError, dot here means a floating point literal 
(2).toString(); // OK 
2 .toString(); // OK
2..toString(); // OK and What the Fuck

const foo = {}; // a new object, derives from Object.prototype 

// property access 
const foo = { name : "kitten" }
foo.name; // OK 
foo["name"]; // OK 
const get = "name";
foo[get]; // OK 
foo.1234; // ERROR 
foo["1234"]; // OK

// delete is the only way how to remove a property
// we can't delete global variables !!!!
// undefined or null only removes the VALUE 
const obj = { bar: 1 };
obj.bar = undefined; // removes value 
delete obj.bar; // removes key

// anonymous namespaces -> NOT USED ANYMORE! It's yuck yuck forever!
(function () {
	// a self contained namespace 
	window.foo = function() {
		// exposed closure 
	};
})(); // execute immediately

// more about arrays 
new Array(3); // [], 
new Array('3'); // ['3']


// equality operator. A leftover from a bigone era when JavaScript was built by morons and idiots 
"" == "0" 			// false 
0 == ""				// true 
0 == "0"			// true 
false == "false"	// false 
false == "0"		// true 
false == undefined	// false 
false == null		// false 
null == undefined 	// true 
{ } === {}			// false 
new String("foo") === "foo" // false 
10 == "10"			// true 
10 == "+10"			// true 
10 == "010"			// true 
isNan(null) == false// true, null converts to 0
new Number(10)===10	// false, object and number 

// typeof operator 
"foo" 				// string 
new String("foo")	// string 
true 				// boolean 
[1, 2, 3]			// object 
new Function()		// function 

// casting 
'' + 10 === '10' // true 
!!'foo';		 // true 
!!true;			 // true 

// boolean evaluation
new Boolean()           // false
new Boolean(0)          // false (for any falsy parameter)
// but careful, (new Boolean(anything) === true/false) -> always FALSE
new Boolean(true)        // true (for any truthy parameter)


// plus operator - converts a string to number
+'9.11'
+true // 1
+'123e-5' // returns 0.00123

// !! operator (bang bang)
// converts anything to boolean
!!null // false
!!undefined // false
!!true // true
!!"" // false
!!"string" // true

// tilde operator - bitwise NOT operator
if(~username.indexOf("Drake")) { ... }
```