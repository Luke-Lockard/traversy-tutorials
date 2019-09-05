// alert('Hello world');
// console.log('Hello world');
// console.error('This is an error');
// console.warn("This is a warning.");

// var, let, const

// let age = 30;
// const age = 30; // cant reassign with const
// age = 31;

// console.log(age);

// String, Number, Boolean, null, undefined, Symbol

const name = 'Luke';
const age = 23;
const rating = 4.5;
const isCool = true;
const x = null;
const y = undefined;
let z;  // undefined

// console.log(typeof name);
// console.log(typeof age);
// console.log(typeof rating);
// console.log(typeof isCool);
// console.log(typeof x);
// console.log(typeof y);
// console.log(typeof z);

// Concatenation
// console.log('My name is ' + name + ' and I am ' + age);
// Template String
const hello = `My name is ${name} and I am ${age}`;
// console.log(hello);

const s = 'Hello World';

// console.log(s.length);  // strings have the property 'length'
// console.log(s.toUpperCase());   // string has methods
// console.log(s.split(''));


// Arrays - variables that hold multiple values
const numbers = new Array(1,2,3,4,5);
// console.log(numbers);

const fruits = ['apples', 'oranges', 'pears', 10 , true];
// console.log(fruits);
// console.log(fruits[1]);

fruits[3] = 'grapes';
console.log(fruits);

fruits.push('mangos');
console.log(fruits);
fruits.unshift('strawberries');
console.log(fruits);
fruits.pop();
console.log(fruits);

console.log(Array.isArray(fruits));
console.log(Array.isArray('hello'));
console.log(fruits.indexOf('oranges'));
console.log(fruits);

// Object literals
const person = {
    firstName: 'Luke',
    lastName: 'Lockard',
    age: 30,
    hobbies: ['music', 'movies', 'sports'],
    address: {
        street: '50 main st',
        city: 'Boston',
        state: 'MA'
    }
}

console.log(person);
console.log(person.firstName);

const { firstName, lastName, address: { city }} = person;
console.log(city);

person.email = 'luke@gmail.com';

console.log(person);

// Arrays of Objects
const todos = [
    {
        id: 1,
        text: 'Take out trash',
        isCompleted: true
    },
    {
        id: 1,
        text: 'Meeting with boss',
        isCompleted: true
    },
    {
        id: 1,
        text: 'Dentist appointment',
        isCompleted: false
    }
];

console.log(todos[1].text);

const todoJSON = JSON.stringify(todos);
console.log(todoJSON);


// For
for (let i = 0; i < todos.length; i++) {
    // console.log(i);
    // console.log(`For Loop Number: ${i}`)
    console.log(todos[i].text);
}

for (let todo of todos) {
    console.log(todo);
}

// forEach, map, filter
todos.forEach(function(todo) {
    console.log(todo.text);
});

// const todoText = 
const todoCompleted = todos.map(function(todo) {
    // return todo.text;
    return todo.isCompleted === true;
}).map(function(todo) {
    return todo.text;
});

// console.log(todoText);
console.log(todoCompleted);