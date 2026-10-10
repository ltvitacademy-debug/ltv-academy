# Lesson 5 — Control Flow: Conditions and Loops

**Chapter 1 · Apex Fundamentals · Lesson 5 of 43**

## What you'll learn

- `if` / `else if` / `else` branching
- Apex's three forms of the `for` loop, including the SOQL `for` loop
- `while` and `do-while` loops
- `break` and `continue`

## if / else

Apex's conditional statement works the way it does in Java: `else` is
always optional, and it always groups with the closest `if`.

```apex
Integer place = 2;
String medal;

if (place == 1) {
    medal = 'gold';
} else if (place == 2) {
    medal = 'silver';
} else if (place == 3) {
    medal = 'bronze';
} else {
    medal = null;
}
```

## Apex supports five kinds of procedural loop

Salesforce's own documentation lists them together:

```text
do {statement} while (Boolean_condition);
while (Boolean_condition) statement;
for (initialization; Boolean_exit_condition; increment) statement;
for (variable : array_or_set) statement;
for (variable : [inline_soql_query]) statement;
```

That's a `do-while`, a `while`, and three *variations* of `for`. All loops
support `break;` (exit the entire loop) and `continue;` (skip to the next
iteration).

## The traditional for loop

```apex
for (Integer i = 0; i < 5; i++) {
    System.debug('Iteration ' + i);
}
```

## The list/set iteration for loop

```apex
List<String> names = new List<String>{'Ana', 'Beto', 'Chloe'};

for (String name : names) {
    System.debug('Hello, ' + name);
}
```

The loop variable must be the same primitive or sObject type as the
collection you're iterating.

## The SOQL for loop

This is the one that's genuinely unique to Apex: you can iterate directly
over the results of a query, without assigning them to a list first.

```apex
for (Account acc : [SELECT Id, Name FROM Account LIMIT 200]) {
    System.debug('Account: ' + acc.Name);
}
```

There's also a batch form that iterates in chunks of up to 200 records at
a time, useful for processing very large result sets without holding
everything in memory at once:

```apex
for (List<Account> accBatch : [SELECT Id, Name FROM Account]) {
    System.debug('Batch size: ' + accBatch.size());
}
```

## while and do-while

A `while` loop checks its condition before running the block:

```apex
Integer counter = 0;
while (counter < 3) {
    System.debug('While iteration ' + counter);
    counter++;
}
```

A `do-while` loop runs the block *first*, then checks the condition — so
the body always executes at least once:

```apex
Integer attempts = 0;
do {
    System.debug('Attempt ' + attempts);
    attempts++;
} while (attempts < 3);
```

## break and continue

```apex
for (Integer i = 0; i < 10; i++) {
    if (i == 3) {
        continue; // skip 3, keep going
    }
    if (i == 6) {
        break; // stop the loop entirely
    }
    System.debug(i);
}
```

## Key terms

| Term | Meaning |
|---|---|
| Traditional `for` loop | `for (init; condition; increment) { ... }` |
| List/set iteration `for` loop | `for (variable : collection) { ... }` |
| SOQL `for` loop | `for (variable : [query]) { ... }`, iterating query results directly |
| `do-while` | A loop that runs its body at least once before checking the condition |
| `break` / `continue` | Exit the entire loop / skip to the next iteration |

## Lab

In Execute Anonymous, run all three `for` variations against a small
in-memory list and against a real SOQL query (adjust the object/limit if
your org has no records):

```apex
List<Integer> numbers = new List<Integer>{10, 20, 30};

for (Integer i = 0; i < numbers.size(); i++) {
    System.debug('Traditional: ' + numbers[i]);
}

for (Integer n : numbers) {
    System.debug('List iteration: ' + n);
}

for (Account acc : [SELECT Id, Name FROM Account LIMIT 5]) {
    System.debug('SOQL for loop: ' + acc.Name);
}
```

## Check yourself

Name all three variations of the `for` loop in Apex, and explain the one
real difference in execution order between `while` and `do-while`.
