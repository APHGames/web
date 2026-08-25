---
title: JavaScript
---

import useBaseUrl from '@docusaurus/useBaseUrl';


## Základní struktury
- tři deklarátory: `var, const, let`
- nepoužívejte `var`, protože je hoistován

### Přiřazení

```javascript
// vytvoření nového objektu
let person = {
    name: 'Kunio Otani'
}

// přeřazení proměnné
person.name = 'Joe Bridge'

// vytvoření nové proměnné
let city = 'New York';

// vytvoření běžné funkce
// běžné funkce se již nedoporučují
let myFunc = function() {
    return 42;
}

// vytvoření šipkové funkce
let myFunc2 = () => {
    return 42;
}

// ekvivalent (pokud funkce obsahuje pouze return)
let myFunc2 = () => 42;

```

### Šest falsy hodnot
- jakákoli jiná hodnota je pravdivá
- `false`, `0`, `''`, `null`, `undefined`, `NaN`

### Šest primitivních hodnot (+ Object)
- Boolean, Null, Undefined, Number, String, Symbol


### Argumenty
- běžný způsob - argumenty jsou vyjmenovány

```javascript
function displayTags(tags) {
    for(let tag of tags) {
        ...
    }
}
```

- klíčové slovo `arguments` (nepříliš vhodný přístup)

```javascript
// "arguments" je rezervované klíčové slovo pro argumenty funkce
function displayTags() {
    // např. lze volat displayTags(1, 2, 3)
	for(let i in arguments) {
        ...
    }
}
```

- syntaxe rest parametru

```javascript

// - umožňuje reprezentovat neomezený počet argumentů jako pole
function displayTags(targetElement, ...tags){ // ... vždy jde na poslední místo
   for(let i in tags) { ... }	
}

// spread operátor převede pole na jednotlivé prvky
const tags = ['tag1', 'tag2'];
displayTags(myElement, ...tags);
```


### Smyčky for
- **for-in** - funguje pro **jakýkoli** objekt, nejen pole
- Specifikace jazyka ECMAScript (JavaScript) uvádí, že pořadí výčtu vlastností objektu je nedefinované - nedoporučuje se používat

```javascript
for(let key in activeUsers) {
    console.log(activeUsers[key])
}
```

- **for-of** - funguje pouze pro objekty mající `[Symbol.iterator]`
  - pro pole funguje automaticky

```javascript
for(let user of activeUsers) {
    console.log(user)
}
```

### Destrukturalizační přiřazení
#### Destrukturalizace pole
- umožňuje extrahovat více prvků pole a uložit je do proměnných

```javascript
// name1 a name2 jsou nové proměnné obsahující první dva prvky pole
let [ name1, name2 ] = names
```

- ignorování druhého prvku

```javascript
let [ name,, name3 ] = names
```

- nastavení výchozích hodnot (pro případ, že jsou undefined)

```javascript
let [ a = 1, b = 2, c = 3 ] = names
```

- extrakce podpolí

```javascript
// extrahuje první prvek a zbytek pole jako nové pole
let [first, ...rest] = users;
```

#### Destrukturalizace objektu
- umožňuje extrahovat atributy

```javascript
// přiřazení vlastností - špatný způsob
let user = buildUser('Sam', 'Williams')
let first = user.first
let last = user.last

// přiřazení vlastností - správný způsob
let { first, last, fullName } = buildUser('Sam', 'Williams')
// pokud potřebujeme pouze fullName
let { fullName } = buildUser('Sam', 'Williams')

// funguje i pro funkce
function setThread(name, options = {}) {
	let { param1, param2 } = options;
}
```

### Template stringy

```javascript
// je nutné použít zpětné apostrofy ` !!!
let fullName = `${first} ${last}` 
```

### Volitelné řetězení
- může ušetřit několik kontrol pomocí if

```javascript
// pokud je submission undefined nebo null, přiřadí tuto hodnotu výsledku
// šetří spoustu if kontrol, protože nevyvolá chybu
let result = submission?.holding?.name;

// ekvivalent
let result;
if(submission && submission.holding) {
	result = submission.holding.name;
}
```

### Výchozí hodnota
- výchozí hodnota parametru funkce

```javascript
// výchozí hodnota
function loadProfiles(userNames = []) {
	
}
```

- výchozí primitivní hodnota

```javascript
// pokud je options.container falsy hodnota (viz výše), dostane hodnotu .timer-display
let container = options.container || ".timer-display"; 

// jiná možnost - pokud je options.container null nebo undefined, dostane hodnotu .timer-display
let container = options.container ?? ".timer-display"; 
```

- výchozí hodnota objektu

```javascript
let defaults = {
	...someDefaultObject, // zkopíruje vše ze someDefaultObject
	param1: value1, // zde lze předeklarovat co potřebujeme
	param2: value2
}

// !!! pořadí záleží. Zde budou param1 a param2 nahrazeny tím, co je uvnitř someDefaultObject
let defaults = {
	param1: value1,
	param2: value2,
	...someDefaultObject,
}
```

### Operátory Rest a Spread
- označeny třemi tečkami `...`
- rest se používá pro reprezentaci neomezeného počtu argumentů
- spread se používá pro rozbalení iterovatelného objektu
- destrukturalizace rest

```javascript
function fn(num1, num2, ...args) { } /// args vždy jde na poslední místo
```

- destrukturalizace prvních tří parametrů

```javascript
function fn(...[n1, n2, n3]) {}
```

- spread operátor

```javascript
function myFunction(n1, n2, n3) { ... }
 
const values = [ 1, 2, 3 ];
// spread 
myFunction(...values);
```

- destrukturalizace objektu

```javascript
const { firstNamne, lastName } = obj
```

- destrukturalizace do nové proměnné

```javascript
const { firstName: first, lastName } = obj
console.log(first)
```

### Šipkové funkce
- lze volat, ale nelze konstruovat (nelze použít operátor `new`)

```javascript
const myArrowFunction = () => {
	console.log('Hello from arrow function');
}

// šipková funkce vracející objekt
// je nutné použít závorky ()
const myArrowFunction = () => ({ something: 3 });

// ŠPATNĚ! Toto by bylo považováno za tělo funkce
const myArrowFunction = () => { something: 3 };

```

### Operace s poli
- mutující pole
  - **tyto funkce mutují původní pole:** `copyWithin, fill, pop, push, reverse, shift, sort, splice, unshift`

```javascript
const mutatingAdd = [1, 2, 3]
// přidání nové položky do pole
mutatingAdd.push(4) // [1, 2, 3, 4]
// ekvivalent, protože nevytváří nové pole (optimalizace kompilátoru)
mutatingAdd = [...mutatingAdd, 4]

// unshift přidá položku na začátek
mutatingAdd.unshift(0) // [0, 1, 2, 3, 4]
// ekvivalent unshift
mutatingAdd = [0, ...pokemon]
```

- neměnné operace

```javascript
const arr1 = [1, 2]
const arr2 = [3, 4]

const arr3 = arr1.concat(arr2) // [1, 2, 3, 4]
const arr3 = [...arr1, ...arr2]// [1, 2, 3, 4]
const arr4_altern = [0, ...arr1] //[0, 1, 2]
```

- `find()` - vrátí první prvek splňující testovací funkci

```javascript
let admin = users.find((user) => { return user.admin; });

// běžná chyba: předání objektu místo šipkové funkce
// toto nebude fungovat
let admin = users.find(adminUser)
```

- splice - odebere prvky z pole

```javascript
const arr = [0, 1, 2]
// zmutuje původní pole
const tailArr = arr.splice(-1) // [2]
console.log(arr) // [0, 1]
```

- slice - vytvoří podpole

```javascript
const numbers = [0, 1, 2, 3, 4]
const lessThanThree = numbers.slice(0, 3) // [0, 1, 2]
const moreThanTwo = numbers.splice(2, numbers.length) // [2, 3, 4] 
```

- řazení polí

```javascript
// funkce řazení: 
// pokud < 0, pak a < b; pokud == 0, pak a == b; pokud > 0, pak b > a
nums.sort((a, b) => {
  return a - b; // vzestupně, pouze pokud a a b jsou čísla 
});

nums.sort((a, b) => {
  return b - a; // sestupně, pouze pokud a a b jsou čísla 
});
```

- generování sekvence

```javascript
const indices = Array.from(Array(10).keys())
console.log(indices) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Mapy
- při použití objektů jako map jsou jejich klíče vždy převedeny na řetězce

```javascript
let obj = {};
obj[1] = 2;
obj['1'] = 3; // nahradí obj[1]
```

- na rozdíl od objektů nelze mapy serializovat do JSON, ale lze je iterovat pomocí for-of (objekty nelze)

```javascript
let totalReplies = new Map();
totalReplies.set(user1, 5) ;
totalReplies.set(user2, 42);
let has = totalReplies.has(user1);
totalReplies.delete(user1);
```

- iterace přes záznamy

```javascript
// iterátor vrací pole dvojic. Proto lze použít let [key, value]
for(let [key, value] of mapSettings) {
	console.log(`${key} = ${value}`);
}
```

### Množiny
- běžné množiny - neobsahují duplicitní hodnoty

```javascript
let tags = new Set()
tags.add('JavaScript')
tags.add({ version : '2015' })

let [first] = tags // první položka
```



### Třídy
- syntaxe tříd (zavedena v ES6)

```javascript
class SponsorWidget {
    myVar = 12
    myOtherVar
    
    constructor(name description, url){
        // jiný způsob inicializace proměnných
        this.name = name
        this.description = description
        this.url = url
    }
    
    render(){     
        let link = this._buildLink(this.url)
    }
    
    // podtržítko je konvence pro privátní metodu, v TypeScriptu se nepoužívá
    _buildLink(url) {
        
    }
}

// dědičnost
class SponsorWidget extends Widget {
    constructor(name, description, url) {
        super()
    }
    
    render() {
        super.render() // verze rodiče
        let parsedName = this.parse(this.name)
        let css = this._buildCss()
    }
}
```


### Promises
- tři stavy - pending, fulfilled, rejected
- handlery - `then()`, `catch()`, `finally()`
- při volání `Promise.then()` vrátí nový promise ve stavu pending
- při volání `Promise.catch()` interně volá `Promise.then(undefined, rejectHandler)`

```javascript
const myPromise = new Promise((resolve, reject) => {
    reject(new Error());
})

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('Done!')} ) // také funguje
})
```

#### Zpracování chyb

```javascript
myPromise.then(() => {
    // handler úspěchu
}, (error) => {
    // handler chyby -> druhý argument
    console.log(error);
})

Promise.resolve('Resolve').then(console.log) // vypíše Resolve
Promise.reject('Reject').catch(console.log) // vypíše Reject
```

#### Řetězení promises

```javascript
getPollResultsFromServer("Sass") // pending
  .then(ui.renderScript) // fulfilled, přečtení výsledků
  .then(doSomethingElseNonBlocking) // fulfilled
  .catch((error) => { // rejected
	 console.log("Error: ", error); 
  });

function getPollResultsFromServer(pollName){
	return new Promise(function(resolve, reject){
		// toto přejde na další THEN funkci
		resolve(someValue);
		// toto přejde na další CATCH funkci
		reject(new Error('There is no spoon');
	});
}
```

#### Kombinované promises
  - Promise.all čeká, dokud nejsou splněny všechny promises
  - Promise.race čeká, dokud není splněn první promise

```javascript
await Promise.all([
    resolveAfter1Second(),
    resolveAfter2Seconds(),
])
```

### Async/await
- `async` funkce vrací promise - všechny async funkce mohou mít handlery `then()` a `catch()`
- `await` lze použít pouze uvnitř `async` funkce

- použití async/await

```javascript
// await pokračuje na další řádek kódu, když je async funkce dokončena/splněna
// vrátí pole splněných hodnot, když jsou splněny všechny vnitřní promises
const myPromise = await Promise.all([
	(async() => await resolveAfter1Second()),
	(async() => await resolveAfter2Seconds()),
]);
```

- pokud nevracíme promise, JS to udělá automaticky!

```javascript
async function example1() {
    return 'Hello' // JS to zabalí do promise
}
```

- zamítnutí chyby

```javascript
try {
    const value1 = await Promise.reject('Error')
} catch(err) {
    
}
```

- příklad události smyčky
  - Promises jsou vloženy do fronty mikrotasků s vysokou prioritou

```javascript
console.log('Synchronous 1');
setTimeout(() => console.log('Timeout 2'), 0);
Promise.resolve().then(() => console.log('Promise 3'));
console.log('Synchronous 4');

// správné pořadí:
// Synchronous 1
// Synchronous 4
// Promise 3
// Timeout 2
```

- kombinování async a await

```javascript
const makeSmoothie = async() => {
  try {
    const a = getFruit('pineapple');
    const b = getFruit('strawberry');

    const result = await Promise.all([a, b]);
    return result;
  } catch(err) {
    console.log(err);
  }
}

```

- async a map
  - nepoužívejte `.map(async () => ... )`. Místo toho iterujte v for-cyklu

```javascript
const fruitLoop = async() => {
  for await(const emoji of smoothie) {
    log(emoji)
  }
}
```

### Moduly
- vytváření modulů

```javascript
// flas-message.js
export default function(message){
    alert(message)
}

// app.js
import flashMessage from './flash-message'
flashMessage('Hello')
```

- pojmenované exporty

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

- import celého modulu

```javascript
import * as flash from './flash-message';
flash.alertMessage('Hello');
```

- kombinování výchozích a pojmenovaných exportů

```javascript
// soubor mojo.js
const A = () => console.log('A');
export default A;

export const B = () => console.log('B');
export const C = () => console.log('C');

// soubor dojo.js
// modul může mít pouze jeden výchozí export, ale mnoho pojmenovaných exportů
import A, { B, C } from 'mojo.js'; // A je výchozí export, B a C jsou pojmenované exporty
```

- exportování modulů tříd

```javascript
// exportování modulů tříd
export default class FlashMessage { ... }
// importování modulů tříd
import FlashMessage from './flash-message';
// alternativa
export { FlashMessage }
import { FlashMessage }
```


## Pokročilé struktury

### Curried funkce
- více šipkových funkcí, lze použít k zabalení event handlerů s dalšími parametry

```javascript
const three = a => b => c => a + b + c
three(1)(2)(3)

// ekvivalent:
const three = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
```

### Iterátory
- je třeba definovat funkci, která přijme kolekci jako parametr a vrátí objekt, který **musí** mít vlastnost `next`
- při volání `next` iterátor přejde na další hodnotu v kolekci a vrátí objekt s hodnotou a stavem iterace

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

### Generátory
- poskytují iterativní způsob sestavení kolekce dat
- lze použít i pro asynchronní zpracování

```javascript
function *nameList(){
    yield 'Sam'   // { done : false, value: 'Sam' }
    yield 'Tyler' // { done : false, value: 'Tyler' }
    // pokud není return, poslední hodnota bude undefined
    return 'Mojo'; // { done : true, value: 'Mojo '}
}

const generator = nameList(); // vytvoří generátor
for(let name of generator) {...} // bude iterovat přes yield příkazy
let names = [...generator]; // také možné, ale každý generátor lze použít pouze jednou

// jiný způsob -> ruční iterace přes yield příkazy
while(!generator.done) {
	let val = generator.next(); // ruční načítání hodnot
}
```

- nekonečná smyčka
  - možná při použití generátorů, protože každý yield ji pozastaví

```javascript
function *gen() {
    let i = 0
    while(true) {
        yield i++ 
    }
}
```

### Tagované template literály
- lze parsovat tag funkcemi a mohou vrátit manipulovaný řetězec

```javascript
function tagFunction(strings, param) {
    return strings[0] + param
}
 
const tagged = tagFunction`We have ${num} param`
```


### Vlastnosti jen pro čtení

```javascript
let a = {}
Object.defineProperty(a, 'mojo', {
  value: 15,
  writable: false
})
```

### Gettery a settery

```javascript
function Foobar () {
    var _foo //  skutečně soukromá vlastnost
  
    Object.defineProperty(obj, 'foo', {
      get: function () { return _foo },
      set: function (value) { _foo = value }
    })
}
```

### Proxy

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


## Tipy a triky

- podmíněné přiřazení vlastnosti
  - v případech, kdy chceme, aby objekt vlastnost buď měl, nebo vůbec neměl

```javascript
function assign(size) {

  // pokud je parametr undefined, size nebude vůbec přítomen
  const myObj = {
    radius: 12,
    ...(size ? { size: size } : {})
  }
}


```

- transformace objektu arguments na pole

```javascript
const argArray = Array.prototype.slice.call(arguments)
```

- vyhnutí se opakování

```javascript
// opakování
return { first: first, last: last, fullName : fullName }
// bez opakování (funguje pouze, pokud mají vlastnosti stejné jméno)
return { first, last, fullName }
```

- hluboké klonování
  - **velmi špatný způsob, protože transformuje objekt na řetězec a zpět**
  - lepší je použít specializované knihovny pro klonování

```javascript
JSON.stringify(myObj1) === JSON.stringify(myObj2) 
```

- středníky
  - již nejsou povinné, s výjimkou několika případů

```javascript
// toto zabrání jakémukoli předchozímu kódu
// spustit váš kód jako argumenty té funkce
// proto tam středník musí být
;(async () => { ... }
```

- vyhněte se použití `new Array()`

```javascript
const a = new Array(10);
a.push(12); // délka je 11 !!!
a.toString(); // vrátí ,,,,,,,,,12
const a = [10]; // doporučený přístup! Nepoužívejte new Array()
```

- matematické operace

```javascript
// Matematické operace 
Math.trunc(5.5) = 5 // vrátí celočíselnou část, velmi rychlé, přidáno v ES6
Math.ceil(5.5) = 6 // zaokrouhlí nahoru 
Math.floor(5.5) = 5 // zaokrouhlí dolů 
Math.round(5.5) = 6 // zaokrouhlí podle desetinné části 
```

- odebrání duplicit z pole

```javascript
const arr = [...new Set([1, 2, 3, 3])] // [1, 2, 3]
```

- získání poslední položky v poli

```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array.slice(-1)) // Výsledek: [9]
```

- přiřazení operátorů v konstruktoru

```javascript
class Polygon {
  constructor(options) { // mnoho atributů
    Object.assign(this, options)
  }
}
```

- zmrazení vlastností objektu

```javascript

const obj = { foo1: 'bar1', foo2: { value: 'bar2' } };

Object.freeze( obj );

obj.foo = 'foo'; // nemění vlastnost, nevyvolá chybu
obj.foo2.value = 'bar3'; // změní hodnotu - je vnořená!

```

### Tipy pro konzoli
- zobrazení proměnných: `console.log({foo, bar, baz})`

<img src={useBaseUrl('img/docs/cheatsheets/console_vars.jpg')} />

- použití CSS stylů: `console.log('%c Hello', 'color: orange;');`

<img src={useBaseUrl('img/docs/cheatsheets/console_styles.jpg')} />

- použití tabulek: `console.table([foo, bar, baz]);`

<img src={useBaseUrl('img/docs/cheatsheets/console_table.jpg')} />

- měření času:
  - `console.time('looper');`
  - `console.timeEnd('looper');`

<img src={useBaseUrl('img/docs/cheatsheets/console_time.jpg')} />

- trasování metody: `console.trace('Did I forget sth?');`

<img src={useBaseUrl('img/docs/cheatsheets/console_trace.jpg')} />


## Záludné části JavaScriptu

```javascript
false.toString(); // false 
function Foo() { } 
Foo.bar = 1; 
"🎉".length === 2; // true. Ale je to jediný prvek v cyklu for-of

2.toString(); // SyntaxError, tečka zde znamená plovoucí desetinnou čárku 
(2).toString(); // OK 
2 .toString(); // OK
2..toString(); // OK a co to kurva je

const foo = {}; // nový objekt, odvozuje od Object.prototype 

// přístup k vlastnostem 
const foo = { name : "kitten" }
foo.name; // OK 
foo["name"]; // OK 
const get = "name";
foo[get]; // OK 
foo.1234; // CHYBA 
foo["1234"]; // OK

// delete je jediný způsob jak odstranit vlastnost
// nelze mazat globální proměnné !!!!
// undefined nebo null pouze odstraní HODNOTU 
const obj = { bar: 1 };
obj.bar = undefined; // odstraní hodnotu 
delete obj.bar; // odstraní klíč

// anonymní jmenné prostory -> JIŽ SE NEPOUŽÍVAJÍ! Je to navždy ošklivé!
(function () {
	// samostatný jmenný prostor 
	window.foo = function() {
		// exponovaný closure 
	};
})(); // okamžité spuštění

// více o polích 
new Array(3); // [], 
new Array('3'); // ['3']


// operátor rovnosti. Pozůstatek z dávných dob, kdy JavaScript budovali blbci a idioti 
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
isNan(null) == false// true, null se převede na 0
new Number(10)===10	// false, objekt a číslo 

// operátor typeof 
"foo" 				// string 
new String("foo")	// string 
true 				// boolean 
[1, 2, 3]			// object 
new Function()		// function 

// přetypování 
'' + 10 === '10' // true 
!!'foo';		 // true 
!!true;			 // true 

// vyhodnocení boolean
new Boolean()           // false
new Boolean(0)          // false (pro jakýkoli falsy parametr)
// ale pozor, (new Boolean(cokoli) === true/false) -> vždy FALSE
new Boolean(true)        // true (pro jakýkoli truthy parametr)


// operátor plus - převede řetězec na číslo
+'9.11'
+true // 1
+'123e-5' // vrátí 0.00123

// operátor !! (double bang)
// převede cokoli na boolean
!!null // false
!!undefined // false
!!true // true
!!"" // false
!!"string" // true

// operátor tilda - bitový operátor NOT
if(~username.indexOf("Drake")) { ... }
```
