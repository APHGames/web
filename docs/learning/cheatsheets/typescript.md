---
title: TypeScript
---

- official page: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

### Basic Types

```typescript
any
void
unknown 
 
boolean
number
string
Symbol
  
null
undefined

string[]          /* or Array<string> */
[string, number]  /* tuple */
  
false, 0, "", null, undefined, NaN  // always false
```

### Declarations

```typescript
let isDone: boolean;
const myName: string = 'Robert'; // assignment
const myName = 'Robert'; // type determined from the right side
 
const hobbies: string[] = ['Programming', 'Cooking']; // array
const address: [string, number] = ["Street", 99]; // tuple

let repeatType: 'repeat-x' | 'repeat-y' | 'no-repeat';  // union enum

let sprites: Sprite | Sprite[]; // union type
let spriteMesh: Sprite & Mesh; // intersection type
let myCar: any = 'BMW'; // any
const greeting = `Hello I'm ${userName}`; // template literal
```

### Casting
```typescript
const user = result as User;
const user = (<User>)result;

// we can cast nested objects as well in both wayss
const users: User[] = [
  <Employee> {
    firstname: 'Kunio',
    surname: 'Otani',
    role: 'Developer' 
  }
]

```

### Functions

```typescript
// normal function
function add (a: number, b: number): number {
  return a + b
}

// arrow function
const add = (a: number, b: number): number => a + b;
 
// this never returns anything
function neverReturns(): never {
  throw new Error('An error!');
}
```

### Enumerators
- we should avoid enums, as they don't transpile well
  - can be avoided by using const enums: `const enum Color`

```typescript
enum Color = {
  Gray, // 0
  Red, // 1
  Green = 100, // 100
  Blue, // 101
  Yellow = 2 // 2
}
 
const myColor: Color = Color.Green
console.log(myColor); // Prints: 100

const colors = Object.keys(Color); // gets all enum keys
```


### Classes

```typescript
class Point {
 
  public x: number;
  public y: number;
  protected static instances = 0; // initial value
 
  constructor(x: number, y: number) {
    Point.instances++;
    this.x = x;
    this.y = y;
  }
}

// abstract class
abstract class Shape {
  abstract calcSize(): number;
}
```

### Inheritance and interfaces

```typescript
class Point {
  protected x: number;
  protected y: number;
}
 
class Point3D extends Point {
  protected z: number;
}
 
// if possible, prefer types over interfaces!
interface Colored {
  select(): void;
}

class Pixel extends Point implements Colored {
  select(): void { ... }
}
```

### Getters, setters

```typescript
class Plant {
  private _species: string = 'Default';
 
  get species() {
    return this._species;
  }
 
  set species(value: string) {
    this._species = value;
  }
}

// value access
new Plant().species = 'ferns';

```

### Generics

```typescript
class Greeter<T> {
  greeting: T;

  constructor(message: T) {
    this.greeting = message;
  }
}
 
let greeter = new Greeter<string>('Hello, world');

// default parameters
class Greeter<T = any> {
  greeting: T;
}

```

### Other constructs

```typescript
// type assertions
let len: number = (input as string).length;
let len: number = (<string> input).length;
 
// optional parameters
interface User {
  name: string, // can be null but not undefined
  age?: number // can be null or undefined
}

// optional chaining (if foo is undefined, it will not throw an error)
let x = foo?.bar.baz();

// nullish coalescing
let x = foo ?? bar; // if foo is undefined, assign bar 

// destructuring declaration (will take 3 attributes from an output)
const { x, y, z } = calcPosition();


// dynamic keys
{ [key: string]: Object[] }
 
// type aliases
type Name = string | string[]
// function alias
type MyFunction = (param1: number, param2: number) => string;

// types for polymorphism
type Shape = Square | Rectangle | Circle;
 
// function types
function getUser(callback: (user: User) => any) { callback({...}) }
 
// default parameters
const greet = (name: string = 'Robert') => console.log(`Hello, ${name}`);
 
// array destructuring
const testResults: number[] = [3.89, 2.99, 1.38];
const [result1, result2, result3] = testResults;

// arrow functions
const myMultiply: (val1: number, val2: number) => number;
 
let myFunction = (val1: number, val2: number) => {
  return val1 + val2;
}
 
// object types
let userData: { name: string, age: number } = {
  name: 'Max'
};
 
// rest operator
function displayTags(targetElement: HTMLElement, ...tags: string[]) { 
  for(let i in tags) { // do something here }  
}

displayTags(myElement, "tag1", "tag2", "tag3");

// variable swap
let x = 1;
let y = 2;
[x, y] = [y, x];

// && and || declaration operators
let ent: Entity | null;
let name = ent && ent.name;  // name is of type string | null
let ent2 = ent || { name: "test" };  // ent will always contain name

// spread operator (good for shallow copy)
let copy = { ...original };
let merged = { ...foo, ...bar, ...baz };

// type as interface
type Point = {
  x: number;
  y: number;
}

```

### Exports and Imports

```typescript
export const myConst = 12345; // simple export

// we can export types as well
export type Color = {
  red: number;
  green: number;
  blue: number;
}

// import
import { PI, calculateCircumference } from './src/circle' // imports selected types
// type import
import { type Color } from './types';
```

### Advanced Generics

#### Indexed type

```typescript
type Asset = {
	type: string;
}

// assetType must be a string
const getAssetInfo = (assetType: Asset['type']) => {
}
```

#### Record
- Record can be used for dictionaries (objects with a given key type and a value type)
- keyof typeof list all keys of an object

```typescript
const Items = {
	none: 'sth',
	expired: 'sth',
}

// LabelMap can only contain keys from Items
const LabelMap: Record<keyof typeof Items, string> = {
	none: 'default',
	expired: 'default',
}
```

#### ValueOfKey
- will get a type of an object property

```typescript
type ValueOfKey<T, U> = {
	[K in keyof T]: U extends K ? T[K] : never;
}[keyof T];

type Obj = {
	a: string;
}

// val is 'string'
type val = ValueOfKey<Obj, a>;

```

#### Unpack Array Type
- will get a type of an object array property

```typescript
type UnpackArrayType<T, U> = ValueOfKey<T, U> extends unknown[]
  ? ValueOfKey<T, U>[number]
  : never;

type Obj = {
	a: string[];
}

type val = UnpackArrayType<Obj, a>;
```

#### Conditional Generics
- we can use ternary operators in generics

```typescript
// intrinsic elements are built-in elements like div, section, etc.
// infer type is basically a helper that is used inside the generic declaration 
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    T extends JSXElementConstructor<infer P> // T is a React component with props P
	    ? P
		: T extends keyof JSX.IntrinsicElements // T is an intrinsic component
		    ? JSX.IntrinsicElements[T]
			: {} ;
```
