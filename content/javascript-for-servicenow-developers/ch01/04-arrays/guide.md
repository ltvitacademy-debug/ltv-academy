# Lesson 4 — Arrays

**Chapter 1 · JavaScript Fundamentals · Lesson 4 of 32**

## What you'll learn

- How to create, index, and measure the length of an array
- `.push()` and `.pop()` for adding and removing items
- `.indexOf()` for finding where a value lives in an array
- `.forEach()`, `.map()`, and `.filter()` — the three methods you'll lean on constantly

## Creating and indexing an array

An array is an ordered list of values, written with square brackets:

```javascript
var incidentNumbers = ["INC0010042", "INC0010043", "INC0010044"];

incidentNumbers[0];        // "INC0010042" - indexes start at 0, not 1
incidentNumbers.length;    // 3
incidentNumbers[2];        // "INC0010044" - the last item here
incidentNumbers[99];       // undefined - no item at that index
```

Indexing always starts at `0`, so the first item is at index `0` and the
last item is at index `length - 1`. Asking for an index that doesn't exist
doesn't throw an error — it just returns `undefined`.

## Adding and removing items

`.push()` adds one or more items to the **end** of an array. `.pop()`
removes and returns the **last** item:

```javascript
var incidentNumbers = ["INC0010042", "INC0010043"];

incidentNumbers.push("INC0010044");
// incidentNumbers is now ["INC0010042", "INC0010043", "INC0010044"]

var removed = incidentNumbers.pop();
// removed is "INC0010044"
// incidentNumbers is back to ["INC0010042", "INC0010043"]
```

## Finding a value with .indexOf()

`.indexOf()` searches an array for a value and returns its index, or `-1`
if the value isn't found anywhere in the array:

```javascript
var incidentNumbers = ["INC0010042", "INC0010043", "INC0010044"];

incidentNumbers.indexOf("INC0010043"); // 1
incidentNumbers.indexOf("INC9999999"); // -1 - not found
```

Checking for `-1` is the standard way to confirm a value is *not* present
in an array before deciding how to proceed.

## Looping with .forEach()

`.forEach()` runs a function once for every item in the array, which is
often cleaner than writing a manual `for` loop when you don't need the
index for anything else:

```javascript
var incidentNumbers = ["INC0010042", "INC0010043", "INC0010044"];

incidentNumbers.forEach(function (number) {
  console.log("Reviewing " + number);
});
```

## Transforming with .map()

`.map()` builds and returns a **brand-new array**, with every item
transformed by the function you give it. The original array is untouched:

```javascript
var incidentNumbers = ["INC0010042", "INC0010043", "INC0010044"];

var shortNumbers = incidentNumbers.map(function (number) {
  return number.slice(3); // drop the "INC" prefix
});
// shortNumbers is ["0010042", "0010043", "0010044"]
// incidentNumbers is unchanged
```

## Filtering with .filter()

`.filter()` also returns a brand-new array, but one that only keeps the
items for which your function returns `true`:

```javascript
var incidents = [
  { number: "INC0010042", priority: 1 },
  { number: "INC0010043", priority: 3 },
  { number: "INC0010044", priority: 1 },
];

var criticalOnly = incidents.filter(function (incident) {
  return incident.priority === 1;
});
// criticalOnly has the two incidents where priority is 1
```

`.map()` and `.filter()` both leave the original array alone and hand you
a new one back — a pattern you'll use constantly once this course gets into
processing real result sets from ServiceNow's APIs.

## Key terms

| Term | Meaning |
|---|---|
| Index | An array position, starting at `0` for the first item |
| `.push()` / `.pop()` | Add to / remove from the end of an array |
| `.indexOf()` | Returns an item's index, or `-1` if it isn't found |
| `.forEach()` | Runs a function once per array item; returns nothing |
| `.map()` / `.filter()` | Each return a new array — transformed, or narrowed by a condition |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what's
the difference between what `.forEach()` returns compared to what `.map()`
returns, and why does `.indexOf()` returning `-1` matter?
