# Lesson 5 — Control Flow: Conditions

**Chapter 1 · Programming Concepts · Lesson 5 of 18**

## What you'll learn

- What "control flow" means and why conditions are the simplest form of it
- Apex's `if`, `else if`, and `else` structure, with real examples
- How a `switch on` statement offers a cleaner alternative when checking one value against many possibilities
- Common condition mistakes: missing `else` branches and unreachable code

## Control flow is about choosing which instructions run

Lesson 2 introduced the idea that most programs aren't purely sequential — they need to skip some instructions and run others, depending on circumstances that are only known while the program is executing. **Control flow** is the general term for anything that changes which instruction runs next, rather than simply running the very next line. Conditions are the simplest and most common form of control flow: run this block if something is true, skip it otherwise.

## `if`, `else if`, and `else`

```apex
Integer orderTotal = 120;

if (orderTotal >= 100) {
    System.debug('Free shipping applied');
} else if (orderTotal >= 50) {
    System.debug('Discounted shipping applied');
} else {
    System.debug('Standard shipping rate applied');
}
```

This structure is evaluated top to bottom, and **only one branch ever runs**. Apex checks the `if` condition first; if it's true, that block runs and every other branch is skipped entirely — Apex doesn't go on to check the `else if` just because it's curious. If the `if` condition is false, it checks the `else if` condition next, and so on. The final `else`, if present, has no condition of its own — it's a catch-all that runs only if every condition above it was false. An `else` block is optional; you can have an `if` with no `else` at all, and the program simply does nothing if the condition is false.

A subtle but important habit: write conditions from most specific to least specific, or you can accidentally make a later, more specific branch unreachable. If the first condition in the example had instead been `orderTotal >= 50`, the `orderTotal >= 100` branch below it would never run — any total of 100 or more already satisfies `>= 50` and gets caught by the first branch.

## `switch on`: cleaner for many possibilities on one value

When you're checking a single value against several specific possibilities, a chain of `else if` statements gets repetitive. Apex's `switch on` statement handles this case more cleanly:

```apex
String stage = 'Negotiation';

switch on stage {
    when 'Prospecting' {
        System.debug('Early stage');
    }
    when 'Negotiation', 'Closed Won' {
        System.debug('Late stage');
    }
    when else {
        System.debug('Unrecognized stage');
    }
}
```

A `when` block can list several comma-separated values that all map to the same block, as shown with `'Negotiation', 'Closed Won'` above. The optional `when else` block is the catch-all, equivalent to a final `else`, and if you include it, it must be the last block. There's no fall-through between blocks — once a matching block runs, the switch statement exits, unlike some other C-family languages where a missing `break` lets execution continue into the next case by accident.

## Two common mistakes

**A missing `else` that silently does nothing.** If a condition is meant to always produce some outcome, but the code only handles the "true" case and quietly has no `else`, the "false" case does nothing at all — no output, no error, nothing visible to tell you a case was missed. This is easy to miss during testing if you only ever test the "true" path.

**Unreachable code from ordering conditions wrong.** As shown above, putting a broader condition before a narrower one silently swallows the narrower one. The code compiles fine and runs without error — it just never does what the narrower branch was written to do. Neither of these mistakes produces a compile-time error, which is exactly why they're easy to ship without noticing; Lesson 12's debugging habits are partly built around catching exactly this category of logic bug.

## Key terms

| Term | Meaning |
|---|---|
| Control flow | Anything that changes which instruction runs next, rather than running the next line by default |
| if / else if / else | A branching structure where at most one branch runs, checked top to bottom |
| switch on | A branching structure that checks one value against several specific possibilities |
| when else | The optional catch-all block in a switch statement, must be listed last |
| Unreachable code | Code that compiles but can never actually execute, usually from a broader condition placed before it |

## Lab

Write Apex `if`/`else if`/`else` logic (as code, no org needed) that assigns a shipping cost based on an `Integer orderTotal`: free shipping for totals of 100 or more, $5 shipping for totals of 50 to 99, and $10 shipping for anything below 50. Then rewrite the same logic as a `switch on` statement operating on a `String` shipping tier ('Standard', 'Discounted', 'Free') instead, and explain in a sentence which version you find clearer and why.

## Check yourself

Can you explain why only one branch of an `if`/`else if`/`else` chain ever runs, even if a later condition would also technically be true? Can you describe, in your own words, what makes a piece of code "unreachable," and why the compiler doesn't warn you about the ordering mistake that caused it?
