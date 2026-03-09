1️. Difference between var, let, and const
a.	var
I.	var is the older way of declaring variables in JavaScript.
II.	It is function scoped, meaning it works inside the whole function.
III.	It can be redeclared and updated.
b.	let
I.	It is block scoped, meaning it only works inside { }.
II.	It can be updated but cannot be redeclared in the same scope.
c.	const
I.	const is also block scoped.
II.	It cannot be updated or redeclared.
III.	It must be assigned a value when declared.

2️. What is the Spread Operator (...)?
The spread operator (...) is used to expand elements of an array or object. It helps copy or combine data easily. It is commonly used for copying arrays,	merging object, passing multiple values

3️. Difference between map(), filter(), and forEach().
map(): Creates a new array,	Transforms each element
Example:
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

filter(): Keeps only elements that match a condition, Creates a new array
Example:
const numbers = [1, 2, 3, 4];
const even = numbers.filter(n => n % 2 === 0);
forEach():Loops through the array,Does not return a new array	
Example:
const numbers = [1, 2, 3];
numbers.forEach(n => console.log(n));

4️ What is an Arrow Function?
An arrow function is a shorter way to write functions in JavaScript. It was introduced in ES6.
Example:const add = (a, b) => {
  return a + b;
};
 
5.What are Template Literals?
Template literals allow us to write strings in an easier and more dynamic way using backticks ( ).




