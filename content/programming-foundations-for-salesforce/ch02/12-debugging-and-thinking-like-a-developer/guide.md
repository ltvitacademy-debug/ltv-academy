# Lesson 12 — Debugging and Thinking Like a Developer

**Chapter 2 · Structuring Code · Lesson 12 of 18**

## What you'll learn

- Why debugging is a skill with a repeatable process, not a matter of luck or talent
- How to use `System.debug` to actually see what a program is doing while it runs
- A systematic approach: reproduce, isolate, hypothesize, verify
- Why "it should work" is the most dangerous sentence in debugging

## Debugging is a skill, not a mystery

Every program you write will eventually do something you didn't expect. **Debugging** is the process of figuring out why, and fixing it. New programmers often treat this as a frustrating, random hunt; experienced developers treat it as a repeatable process, because it largely is one. The difference isn't talent — it's having a method, and trusting the method more than your assumptions about what the code "should" be doing.

## Seeing inside a running program with System.debug

You cannot fix what you cannot see. The simplest and most direct way to look inside a running Apex program is `System.debug()`, which Lesson 1 and 2 already used without fully explaining:

```apex
Integer orderTotal = 150;
Decimal discountRate = 0.1;
System.debug('orderTotal before discount: ' + orderTotal);

Integer discounted = (Integer) (orderTotal - (orderTotal * discountRate));
System.debug('discounted result: ' + discounted);
```

Scattering `System.debug` statements at each meaningful step of a calculation, printing both the inputs and the result at each stage, turns an invisible black box into a program you can actually watch happen. This sounds almost too basic to call a "technique," but it is, by a wide margin, the most-used debugging tool in any Apex developer's daily work — later in this path, you'll see these debug statements show up directly in the Developer Console's debug logs, which Lesson 17 covers.

## A systematic process, not a guess

When something isn't working, resist the urge to immediately start changing random lines of code and re-running it to see if the problem goes away — this "shotgun" approach sometimes accidentally works, but it teaches you nothing about why, and often introduces a second bug while chasing the first. A systematic process instead looks like this:

1. **Reproduce it reliably.** Find the exact, repeatable steps that trigger the problem. A bug you can't reliably reproduce is nearly impossible to confirm you've actually fixed.
2. **Isolate it.** Narrow down exactly which part of the code is responsible, by checking values at different points with `System.debug` until you find the specific line where things stop matching your expectations.
3. **Form a hypothesis.** State, specifically, what you think is wrong — not "something's broken," but "I think `discountRate` is holding `10` instead of `0.1` by the time it reaches this calculation."
4. **Verify it.** Check whether your hypothesis is actually correct, with a debug statement or a deliberate test, before changing anything. Only once you've confirmed the real cause should you write the fix.

## "It should work" is a warning sign, not a conclusion

The sentence "this should work" is almost always the moment right before discovering it doesn't, because it signals that you're reasoning from an assumption about the code rather than evidence from actually running it. Lesson 5's unreachable-code example and Lesson 6's missing-increment infinite loop are both exactly this kind of bug: code that looks correct on a quick read, compiles without complaint, and runs without crashing, while quietly doing the wrong thing. The fix for "it should work" is always the same: stop reasoning about what the code should do, and go look — with `System.debug`, line by line — at what it's actually doing.

## Key terms

| Term | Meaning |
|---|---|
| Debugging | The process of figuring out why a program behaves unexpectedly, and fixing it |
| System.debug | Apex's basic tool for printing a value's current state during execution |
| Reproduce | Finding the exact, repeatable steps that reliably trigger a bug |
| Isolate | Narrowing down exactly which part of the code is responsible for a bug |
| Hypothesis | A specific, checkable statement of what you believe is causing a bug, before you fix it |

## Lab

Take this broken Apex snippet (don't fix it yet):

```apex
Integer total = 0;
for (Integer i = 1; i <= 5; i--) {
    total = total + i;
}
System.debug(total);
```

Using the four-step process from this lesson (reproduce, isolate, hypothesize, verify), walk through — in writing, not by running code — what's wrong with this loop's condition and increment, what you'd expect `System.debug` to show if you added it inside the loop, and what the fix should be. Write your hypothesis before you write the fix.

## Check yourself

Can you name, without notes, the four steps of the systematic debugging process this lesson describes, and explain why skipping straight to "form a hypothesis" without first isolating the problem usually wastes time? Can you explain why "it should work" is specifically a warning sign rather than a legitimate conclusion to reach?
