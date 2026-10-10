# Lesson 6 — Control Flow: Loops

**Chapter 1 · Programming Concepts · Lesson 6 of 18**

## What you'll learn

- Why loops exist: running the same logic repeatedly without copying and pasting it
- Apex's three loop forms: the counting `for` loop, the `for each` loop, and `while` / `do while`
- The difference between a loop that might never run and one that always runs at least once
- Why infinite loops happen, and the habit that prevents them

## Loops exist to avoid repeating yourself

If you needed to print the numbers 1 through 5, you could write five separate `System.debug` statements. That works for five, but falls apart at five hundred, and falls apart completely if the number of repetitions isn't known until the program is running. A **loop** runs the same block of instructions repeatedly, either a counted number of times or until some condition stops being true, without the programmer writing that block out more than once.

## The counting `for` loop

```apex
for (Integer i = 0; i < 5; i++) {
    System.debug('Iteration: ' + i);
}
```

A traditional `for` loop has three parts, separated by semicolons, all on one line: an **initialization** (`Integer i = 0`, runs once before the loop starts), a **condition** (`i < 5`, checked before every iteration — the loop keeps running as long as this is true), and an **increment** (`i++`, runs after every iteration). `i++` is shorthand for `i = i + 1`. This loop runs with `i` equal to `0, 1, 2, 3, 4` — five iterations total, not six, because the condition `i < 5` becomes false once `i` reaches `5`, and the loop stops before that iteration runs. Off-by-one mistakes here (expecting six iterations, or expecting the loop to include `5`) are extremely common for beginners.

## The `for each` loop

When you're looping over every item in a collection (collections get their own full lesson, Lesson 9) rather than counting up to a number, a `for each` loop is clearer and removes the risk of an off-by-one mistake entirely:

```apex
List<String> customerNames = new List<String>{'Jordan', 'Priya', 'Sam'};

for (String name : customerNames) {
    System.debug('Customer: ' + name);
}
```

This reads naturally as "for each String called `name` in `customerNames`, do this" — there's no counter to manage and no condition to get wrong, because the loop automatically runs once per item and stops when it runs out of items.

## `while` and `do while`

A `while` loop runs as long as a condition stays true, and — critically — checks that condition **before** the first iteration, meaning it might run zero times if the condition starts out false:

```apex
Integer attemptsLeft = 3;
while (attemptsLeft > 0) {
    System.debug('Attempt remaining: ' + attemptsLeft);
    attemptsLeft--;
}
```

A `do while` loop is nearly identical, but checks the condition **after** the first iteration, guaranteeing the loop body runs at least once even if the condition would have been false from the start:

```apex
Integer attempts = 0;
do {
    System.debug('Attempt number: ' + attempts);
    attempts++;
} while (attempts < 3);
```

Choosing between them comes down to one question: does this logic need to run at least once no matter what? If yes, `do while` guarantees that; a plain `while` does not.

## Infinite loops

A loop's stopping condition has to actually become false at some point, or the loop never stops — an **infinite loop**. The most common cause is forgetting to update the variable the condition depends on:

```apex
Integer count = 0;
while (count < 5) {
    System.debug('This never stops');
    // count++ was forgotten -- count stays 0 forever, condition never becomes false
}
```

The habit that prevents this: every time you write a loop condition, immediately ask "what, inside this loop, makes this condition eventually false?" and confirm that thing actually happens on every iteration, with no path through the loop body that skips it.

## Key terms

| Term | Meaning |
|---|---|
| Loop | A block of instructions that runs repeatedly, a counted number of times or until a condition is no longer true |
| for loop | A loop with an explicit initialization, condition, and increment, typically used for counting |
| for each loop | A loop that runs once per item in a collection, with no manual counter |
| while loop | A loop that checks its condition before each iteration, and may run zero times |
| do while loop | A loop that checks its condition after each iteration, guaranteeing at least one run |
| Infinite loop | A loop whose stopping condition never becomes false, so it never terminates |

## Lab

Write three different Apex loops (as code) that each print the numbers 1 through 4: one using a counting `for` loop, one using a `while` loop, and one using a `do while` loop. For the `while` and `do while` versions, write one sentence each identifying exactly which line is responsible for eventually making the loop's condition false — the line that prevents it from becoming an infinite loop.

## Check yourself

Can you explain, without looking back, the exact difference in when a `while` loop and a `do while` loop check their condition, and why that difference means one of them might run zero times and the other never can? Can you say what specifically causes an infinite loop, in your own words, and what question you should ask yourself every time you write one to avoid it?
