# Lesson 15 — Writing Clean Code

**Chapter 3 · Developer Habits · Lesson 15 of 18**

## What you'll learn

- Why "clean code" is about other readers, not cleverness
- Naming conventions that make Apex code self-explanatory without extra comments
- The DRY principle, and how it connects back to Lesson 7's functions
- When a comment is actually worth writing, and when it's a sign something else is wrong

## Code is read far more often than it's written

A piece of code gets written once, then read many times over — by the original author coming back to it months later, by teammates extending it, by whoever has to fix it when it breaks. **Clean code** is code written with that reader in mind: easy to follow, predictable in its structure, and honest about what it actually does. Clever code that does something in the fewest possible characters, at the cost of being hard to follow, is almost always a worse trade than slightly longer code that reads clearly — the few seconds "saved" writing it are repaid many times over by every future reader who has to decode it.

## Naming: the cheapest form of documentation

A variable, method, or class name is a tiny piece of documentation you write every single time you name something — and it costs nothing extra to make it good. Compare:

```apex
Integer x = 10;
Boolean b = x > 5;

// vs.

Integer orderCount = 10;
Boolean hasEnoughOrdersForDiscount = orderCount > 5;
```

The second version needs no comment to explain what it's doing — the names themselves carry the meaning. A good name answers "what does this actually represent?" specifically enough that a reader doesn't have to trace back through the code to figure it out. Apex convention (matching Java, which Apex's syntax borrows heavily from) uses `camelCase` for variables and methods (`orderCount`, `calculateDiscount`) and `PascalCase` for class names (`Customer`, `InvalidDiscountException` from Lesson 11) — following the convention matters because it's one less thing a reader has to think about; inconsistent casing is a small but constant friction.

## DRY: Don't Repeat Yourself

Lesson 7 introduced methods specifically as the fix for repeated logic scattered across a program. **DRY** ("Don't Repeat Yourself") is the general principle behind that fix: the same logic should exist in exactly one place, not copy-pasted everywhere it's needed. The practical test for whether you're violating DRY: if you needed to change this piece of logic, how many places in the codebase would you have to go find and update? If the honest answer is more than one, that logic belongs in a shared method instead, exactly as Lesson 7 described. DRY isn't about avoiding all repetition at any cost — two pieces of code that merely *look* similar but represent genuinely different concepts don't need to be forced into one method just to satisfy the principle; it's specifically about not duplicating the same underlying logic.

## When a comment helps, and when it's a warning sign

A comment that restates what the code obviously already says adds nothing: `// set x to 10` above `Integer x = 10;` wastes a reader's time confirming something they could already see. A comment earns its place when it explains *why*, not *what* — a business rule that isn't obvious from the code itself ("// Salesforce requires discount rates as decimals, not percentages, hence the /100 here"), or a deliberate workaround for a non-obvious constraint. A comment that's only there because the code itself is confusing, though, is often a sign the code should be rewritten more clearly instead — a well-named variable or a well-structured method frequently makes the comment that would have explained it unnecessary in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Clean code | Code written to be easy for other readers to follow, not just to run correctly |
| camelCase | Naming convention for variables/methods in Apex: lowercase first word, capitalized following words |
| PascalCase | Naming convention for class names in Apex: every word capitalized |
| DRY | "Don't Repeat Yourself" -- the same logic should exist in exactly one place |

## Lab

Take this poorly-named Apex snippet and rewrite it with clear, self-explanatory names (as code, no org needed), following camelCase/PascalCase conventions, and add exactly one comment only if there's a genuine "why" worth explaining:

```apex
Integer a = 15;
Decimal b = 0.2;
Integer c = (Integer)(a - (a * b));
```

Then write one sentence identifying whether your rewritten version still needs a comment at all, and why or why not.

## Check yourself

Can you explain, without notes, why a comment that restates what the code already clearly says is considered close to useless? Can you apply the DRY "how many places would I have to update" test to a real example from your own Lab exercises earlier in this course?
