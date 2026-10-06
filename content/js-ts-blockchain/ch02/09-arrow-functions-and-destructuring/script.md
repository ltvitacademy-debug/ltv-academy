# Script — Arrow Functions & Destructuring

## Segment 1 (title)

Arrow functions and destructuring are two of the most-used pieces of modern JavaScript syntax — once they're comfortable, most real code reads noticeably faster, and nearly every blockchain library's examples lean on both.

## Segment 2 (code: arrow syntax)

An arrow function is shorter to write, and with a single expression body and no braces, the return is implicit — whatever the expression evaluates to is automatically returned. This compact form is everywhere in real code, especially when a function is passed as an argument to another function.

## Segment 3 (code: this behavior)

Here's the real difference, not just the shorter syntax: arrow functions don't have their own this, they inherit it from whatever scope they're written inside. Regular functions get their own this, which depends on how they're called and frequently isn't what you expect inside a callback — that's the actual reason arrow functions are preferred there.

## Segment 4 (code: array destructuring)

Array destructuring pulls values out of an array into named variables, by position, in one line — instead of writing coords bracket zero, bracket one, bracket two separately. You can even skip an element you don't need with an empty slot.

## Segment 5 (code: object destructuring)

Object destructuring pulls properties out by name instead of position. You can rename a property while pulling it out, and supply a default value that only applies if the property is missing or undefined.

## Segment 6 (outro)

Arrow functions for shorter syntax and predictable this, destructuring for pulling values out of arrays and objects in one line. Next up: template literals — building strings the way real code actually does it.
