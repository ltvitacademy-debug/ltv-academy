# Lesson 16 — Business Process Review

**Chapter 3 · Applied Automation · Lesson 16 of 18**

## What you'll learn

- A consolidated recap of every method Chapter 3 introduced
- A reusable health-check you can run against any existing automation, not just new builds
- How Lessons 11-15 connect into a single repeatable workflow
- What to look for when reviewing automation someone else built

## How Chapter 3 fits together

Lesson 11 took a vague complaint about quote discounts and turned it into a working approval design. Lesson 12 did the same for a deadline-driven problem instead of a threshold-driven one. Lesson 13 made sure that design survives the builder leaving. Lesson 14 had you run the whole method yourself, start to finish, on a new scenario. Lesson 15 made sure "it works" actually means something before calling it done. None of those are separate skills — they're five stages of one repeatable process.

## The Chapter 3 method, in order

```
1. Translate the complaint   -> plain-language requirements
2. Design the automation     -> entry criteria, steps, locking,
                                 final actions
3. Document it               -> purpose, trigger, affects,
                                 depends on, owner
4. Test it                   -> happy path, boundary, bulk,
                                 negative
5. Ship it                   -> only after steps 1-4 are done
```

Skipping straight from step 1 to step 5 is exactly how Harborline ended up with an undocumented, untested process in the first place — the chapter's whole argument is that steps 2 through 4 aren't optional overhead, they're what makes step 5 safe.

## An automation health-check

Use this checklist whenever you're reviewing automation someone else built, or your own automation after time has passed:

- Does a written requirement exist, or only the automation itself?
- Can you state the entry criteria without opening Setup?
- Is there a named owner and a last-reviewed date?
- Has it been tested against all four categories from Lesson 15, or only the happy path?
- Would a new admin understand why it was built this way, not just what it does?

If any answer is "no," that's not necessarily a crisis — but it is exactly the kind of gap Chapter 2's maintenance lessons warned becomes expensive later, not now.

## Why this matters beyond this course

Every case study, lab, and test matrix in this chapter used fictional companies, but the method doesn't change when the company is real. A real stakeholder complaint, translated into real requirements, designed with real entry criteria, documented and tested the same way — that's the actual day-to-day work of a Salesforce Administrator, not a special "advanced" skill reserved for complex automation.

## Key terms

| Term | Meaning |
|---|---|
| Health-check | A repeatable checklist used to assess existing automation's documentation and test coverage |
| Translate the complaint | Turning a vague business statement into specific, testable requirements |

## Check yourself

You're ready for Lesson 17 when you can walk through all five steps of the Chapter 3 method, in order, using the Mill Creek lab from Lesson 14 as your example — without looking back at this guide.
