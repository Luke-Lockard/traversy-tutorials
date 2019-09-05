let myString: string;
let myNum: number;
let myBool: boolean;
let myVar: any;

/*
let strArr: string[];
let numArr: number[];
let boolArr: boolean[];
*/

let strArr: Array<string>;
let numArr: Array<number>;
let boolArr: Array<boolean>;

let strNumTuple: [string, number];

myString = 'Hello'.slice(0, 3) + ' World';
myNum = 0xf00d;
myBool = false;
myVar = 'hi';

strArr = ['Hello', 'World'];
numArr = [1, 2, 3];
boolArr = [true, false, true];

strNumTuple = ['Hello', 4];

let myVoid: void = undefined;
let myNull: null = null;
let myUndefined: undefined = null;

console.log(myVoid);