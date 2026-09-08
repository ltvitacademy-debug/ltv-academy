# Lesson 14 — For & While Loops: continue and break

**Chapter 5 · Solidity Programming · Lesson 14 of 14**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- The real three-part structure every `for` loop needs
- What `continue` and `break` actually do, demonstrated live
- How a `while` loop differs from a `for` loop
- Why an uninitialized variable in Solidity always starts at zero

## The real for loop, piece by piece

![The complete, real `ForWhileLoops` contract from class — a for loop with both `continue` and `break` written inside it.](/courses/blockchain/ch05/14-for-while-loops/shot_for_loop_continue_break.png)
*The actual contract: a for loop that skips one iteration with `continue`, then exits early with `break`.*

```solidity
for (uint256 i = 0; i < 10; i++) {
    if (i == 3) {
        continue; // Skip to the next iteration
    }
    if (i == 5) {
        break; // Exit loop
    }
}
```

Every real `for` loop needs exactly three parts:

1. **Start** — `uint256 i = 0` — where the loop begins.
2. **Condition** — `i < 10` — the loop keeps running as long as this is true.
3. **Step** — `i++` — what happens after each pass.

As the instructor put it when a student asked what's actually required
to make something a valid loop: *"you need a starting condition, a
condition in the middle, and a step condition — if you have all three
of those things, that makes it a valid for loop."*

## continue vs. break: a real, concrete difference

- **`continue`** — when `i` equals `3`, this line **skips the rest of
  that one iteration** and jumps straight to the step (`i++`), moving on
  to the next value.
- **`break`** — when `i` equals `5`, this line **exits the loop
  entirely** — the code stops running immediately, for good.

## The while loop: the same idea, simpler syntax

```solidity
uint256 j;
while (j < 10) {
    j++;
}
```

A `while` loop has no built-in start/condition/step structure — you
manage all three yourself. Here, `j` starts **unassigned**, which in
Solidity always defaults to **zero**. The loop then increments `j`
until the condition `j < 10` becomes false.

## Key terms

| Term | Meaning |
|---|---|
| continue | Skips the rest of the current loop iteration, moves to the next |
| break | Exits the loop entirely, immediately |
| Default value | An unassigned Solidity variable always starts at its type's zero-equivalent |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your
own words, the real difference between what happens when `continue`
runs versus when `break` runs, inside the exact same loop.
