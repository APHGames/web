---
title: TypeScript
---

- oficiální stránka: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

### Základní typy

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

string[]          /* nebo Array<string> */
[string, number]  /* tuple */
  
false, 0, "", null, undefined, NaN  // vždy false
```

### Deklarace

```typescript
let isDone: boolean;
const myName: string = 'Robert'; // přiřazení
const myName = 'Robert'; // typ určen z pravé strany
 
const hobbies: string[] = ['Programming', 'Cooking']; // pole
const address: [string, number] = ["Street", 99]; // tuple

let repeatType: 'repeat-x' | 'repeat-y' | 'no-repeat';  // union výčet

let sprites: Sprite | Sprite[]; // union typ
let spriteMesh: Sprite & Mesh; // průnik typů
let myCar: any = 'BMW'; // any
const greeting = `Hello I'm ${userName}`; // template literal
```

### Přetypování
```typescript
const user = result as User;
const user = (<User>)result;

// lze přetypovat i vnořené objekty v obou způsobech
const users: User[] = [
  <Employee> {
    firstname: 'Kunio',
    surname: 'Otani',
    role: 'Developer' 
  }
]

```

### Funkce

```typescript
// normální funkce
function add (a: number, b: number): number {
  return a + b
}

// šipková funkce
const add = (a: number, b: number): number => a + b;
 
// tato nikdy nic nevrátí
function neverReturns(): never {
  throw new Error('An error!');
}
```

### Výčty
- výčtům bychom se měli vyhýbat, protože se špatně transpilují
  - lze se jim vyhnout použitím const výčtů: `const enum Color`

```typescript
enum Color = {
  Gray, // 0
  Red, // 1
  Green = 100, // 100
  Blue, // 101
  Yellow = 2 // 2
}
 
const myColor: Color = Color.Green
console.log(myColor); // Vypíše: 100

const colors = Object.keys(Color); // získá všechny klíče výčtu
```

- lepším řešením je použití const objektů s pomocným typem values:

```typescript
const Direction = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const;

type Values<T> = T[keyof T];
let direction: Values<typeof Direction>): void
```

### Třídy

```typescript
class Point {
 
  public x: number;
  public y: number;
  protected static instances = 0; // počáteční hodnota
 
  constructor(x: number, y: number) {
    Point.instances++;
    this.x = x;
    this.y = y;
  }
}

// abstraktní třída
abstract class Shape {
  abstract calcSize(): number;
}
```

### Dědičnost a rozhraní

```typescript
class Point {
  protected x: number;
  protected y: number;
}
 
class Point3D extends Point {
  protected z: number;
}
 
// pokud je to možné, preferujte typy před rozhraními!
interface Colored {
  select(): void;
}

class Pixel extends Point implements Colored {
  select(): void { ... }
}
```

### Gettery a settery

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

// přístup k hodnotě
new Plant().species = 'ferns';

```

### Generika

```typescript
class Greeter<T> {
  greeting: T;

  constructor(message: T) {
    this.greeting = message;
  }
}
 
let greeter = new Greeter<string>('Hello, world');

// výchozí parametry
class Greeter<T = any> {
  greeting: T;
}

```

### Ostatní konstrukty

```typescript
// typové aserce
let len: number = (input as string).length;
let len: number = (<string> input).length;
 
// volitelné parametry
interface User {
  name: string, // může být null, ale ne undefined
  age?: number // může být null nebo undefined
}

// volitelné řetězení (pokud je foo undefined, nevyvolá chybu)
let x = foo?.bar.baz();

// nulové slučování
let x = foo ?? bar; // pokud je foo undefined, přiřadí bar 

// destrukturalizační deklarace (vezme 3 atributy z výstupu)
const { x, y, z } = calcPosition();


// dynamické klíče
{ [key: string]: Object[] }
 
// aliasy typů
type Name = string | string[]
// alias funkce
type MyFunction = (param1: number, param2: number) => string;

// typy pro polymorfismus
type Shape = Square | Rectangle | Circle;
 
// typy funkcí
function getUser(callback: (user: User) => any) { callback({...}) }
 
// výchozí parametry
const greet = (name: string = 'Robert') => console.log(`Hello, ${name}`);
 
// destrukturalizace pole
const testResults: number[] = [3.89, 2.99, 1.38];
const [result1, result2, result3] = testResults;

// šipkové funkce
const myMultiply: (val1: number, val2: number) => number;
 
let myFunction = (val1: number, val2: number) => {
  return val1 + val2;
}
 
// typy objektů
let userData: { name: string, age: number } = {
  name: 'Max'
};
 
// operátor rest
function displayTags(targetElement: HTMLElement, ...tags: string[]) { 
  for(let i in tags) { // do something here }  
}

displayTags(myElement, "tag1", "tag2", "tag3");

// prohození proměnných
let x = 1;
let y = 2;
[x, y] = [y, x];

// deklarační operátory && a ||
let ent: Entity | null;
let name = ent && ent.name;  // name je typu string | null
let ent2 = ent || { name: "test" };  // ent bude vždy obsahovat name

// spread operátor (dobrý pro mělkou kopii)
let copy = { ...original };
let merged = { ...foo, ...bar, ...baz };

// typ jako rozhraní
type Point = {
  x: number;
  y: number;
}

```

### Exporty a importy

```typescript
export const myConst = 12345; // jednoduchý export

// lze exportovat i typy
export type Color = {
  red: number;
  green: number;
  blue: number;
}

// import
import { PI, calculateCircumference } from './src/circle' // importuje vybrané typy
// typový import
import { type Color } from './types';
```

### Pokročilá generika

#### Indexovaný typ

```typescript
type Asset = {
	type: string;
}

// assetType musí být řetězec
const getAssetInfo = (assetType: Asset['type']) => {
}
```

#### Record
- Record lze použít pro slovníky (objekty s daným typem klíče a hodnotou)
- keyof typeof vypíše všechny klíče objektu

```typescript
const Items = {
	none: 'sth',
	expired: 'sth',
}

// LabelMap může obsahovat pouze klíče z Items
const LabelMap: Record<keyof typeof Items, string> = {
	none: 'default',
	expired: 'default',
}
```

#### ValueOfKey
- získá typ vlastnosti objektu

```typescript
type ValueOfKey<T, U> = {
	[K in keyof T]: U extends K ? T[K] : never;
}[keyof T];

type Obj = {
	a: string;
}

// val je 'string'
type val = ValueOfKey<Obj, a>;

```

#### Rozbalení typu pole
- získá typ vlastnosti pole objektu

```typescript
type UnpackArrayType<T, U> = ValueOfKey<T, U> extends unknown[]
  ? ValueOfKey<T, U>[number]
  : never;

type Obj = {
	a: string[];
}

type val = UnpackArrayType<Obj, a>;
```

#### Podmíněná generika
- v generikách lze použít ternární operátory

```typescript
// intrinsic elements jsou vestavěné elementy jako div, section atd.
// infer typ je pomocník používaný uvnitř deklarace generika 
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    T extends JSXElementConstructor<infer P> // T je React komponenta s props P
	    ? P
		: T extends keyof JSX.IntrinsicElements // T je intrinsic komponenta
		    ? JSX.IntrinsicElements[T]
			: {} ;
```
