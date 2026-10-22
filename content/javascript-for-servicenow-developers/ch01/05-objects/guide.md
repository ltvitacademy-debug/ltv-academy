# Lesson 5 — Objects

**Chapter 1 · JavaScript Fundamentals · Lesson 5 of 32**

## What you'll learn

- How to build an object literal with key-value pairs
- Dot notation vs. bracket notation for reading and writing properties
- How objects nest inside each other to represent structured data
- Why understanding object shape matters once this course reaches real ServiceNow data

## Building an object literal

An object is a collection of key-value pairs, written with curly braces.
Each key is a property name; each value can be any type, including another
object or an array:

```javascript
var incident = {
  number: "INC0010042",
  priority: 1,
  shortDescription: "VPN not connecting for remote users",
  isEscalated: false,
};
```

Here, `incident` has four properties: `number`, `priority`,
`shortDescription`, and `isEscalated`. Unlike an array, properties aren't
accessed by numeric position — they're accessed by name.

## Dot notation vs. bracket notation

Most of the time, you'll read and write properties with **dot notation**,
which is shorter and easier to read:

```javascript
incident.number;        // "INC0010042"
incident.priority = 2;  // updates priority to 2
```

**Bracket notation** does the same thing, but takes the property name as a
string, which makes it useful when the property name is stored in a
variable, or contains characters (like a space or a hyphen) that dot
notation can't handle:

```javascript
incident["number"];     // "INC0010042" - same result as incident.number

var fieldName = "priority";
incident[fieldName];    // 1 - bracket notation can use a variable here;
                         // incident.fieldName could not
```

That last example is the real reason bracket notation exists: dot notation
requires you to type the literal property name at the time you write the
code. Bracket notation lets the property name be decided at runtime — by
whatever a variable happens to hold.

## Nested objects

Object properties can hold other objects, letting you represent structured,
hierarchical data — exactly how a real ServiceNow record with related
fields, or a REST API response, tends to be shaped:

```javascript
var incident = {
  number: "INC0010042",
  priority: 1,
  assignedTo: {
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
  },
};

incident.assignedTo.name;         // "Jordan Lee"
incident["assignedTo"]["email"];  // "jordan.lee@example.com"
```

You chain dot notation (or bracket notation) to walk down into nested
levels — `incident.assignedTo.name` first gets the `assignedTo` object, then
gets `name` from within that object.

## Why this matters for ServiceNow work ahead

Starting in Chapter 2, this course introduces GlideRecord, ServiceNow's API
for working with records on the platform, and later, JSON data returned by
REST calls. Both are shaped like nested objects — a record has fields, a
field might itself carry structured data, and a REST response is very
often one big object (or an array of objects) with properties nested
several levels deep. Being completely comfortable reading and writing
object properties now — plain JavaScript objects, with no ServiceNow
involved yet — is what makes that later material click instead of feeling
like new syntax to memorize.

## Key terms

| Term | Meaning |
|---|---|
| Object literal | `{ key: value, ... }` syntax for building an object directly |
| Property | A named key on an object, paired with a value |
| Dot notation | `object.property` — the shorter, more common way to access a property |
| Bracket notation | `object["property"]` — required when the property name is dynamic or has special characters |
| Nested object | An object whose property value is itself another object |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why would
you ever need bracket notation instead of dot notation, and how do you
read a deeply nested property like `incident.assignedTo.email`?
