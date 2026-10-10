# Lesson 13 — Reading Documentation and Error Messages

**Chapter 3 · Developer Habits · Lesson 13 of 18**

## What you'll learn

- Why reading documentation is a core developer skill, not something only beginners need
- How to read an Apex error message systematically instead of panicking at it
- Where to find official Apex documentation, and why "official" matters
- The habit of searching the exact error message text before assuming you understand it

## Nobody memorizes an entire language

Professional developers, including ones with years of Apex experience, look things up constantly — the exact parameter order for a method, whether a certain collection type has a specific helper method, the precise behavior of an edge case. This isn't a sign of weak knowledge; it's a sign of correctly prioritizing accuracy over guessing. Learning to program effectively means learning to read documentation quickly and confidently, not memorizing every method signature in advance.

For Apex specifically, the authoritative source is Salesforce's own **Apex Developer Guide**, hosted on developer.salesforce.com. Official documentation matters because it reflects the actual current behavior of the actual current platform — a five-year-old blog post or forum answer might describe a method that's since changed, been deprecated, or never worked quite the way the post claimed. Third-party tutorials and community answers (Trailhead, Stack Exchange, developer blogs) are genuinely useful for examples and context, but when in doubt about exact, current behavior, the official reference is the one to trust.

## Reading an error message without panicking

An error message is not an attack — it's the single most useful piece of information you have at the moment something breaks, and most of it is meant to be read, not just reacted to. A typical Apex compile-time error includes: what kind of problem occurred, a line number, and often a reasonably specific description of what's wrong. Consider a message like:

```
Line: 4, Column: 20
Variable does not exist: discountRate
```

Read left to right: this tells you exactly which line to look at (4), and exactly what the problem is (a variable named `discountRate` is being referenced somewhere it hasn't been declared, or was misspelled). The instinct to treat an error message as noise to scroll past, hunting instead for a Stack Exchange post with the same title, skips the fastest path to the fix: the message itself, read carefully, usually tells you precisely where to look.

## A systematic approach to an unfamiliar error

1. **Read the whole message**, not just the first few words — the full text often distinguishes between several similar-sounding problems.
2. **Find the line number** it references, and look at that specific line, not just the general area of the file.
3. **Check what the message is actually claiming** against what the code actually says — a message like "Variable does not exist" means check spelling and whether the variable was declared in a scope visible from that line (Lesson 7's scope lesson applies directly here).
4. **If it's still unclear, search the exact error text**, in quotes, rather than a vague paraphrase of the problem — "Variable does not exist" as a literal search is far more useful than searching "my code is broken."

## Documentation habits worth building now

Get comfortable navigating the Apex Developer Guide's structure: it's organized by language concept (data types, collections, classes) and by specific class reference (every built-in method on `String`, `List`, `Map`, and so on, documented with its exact signature and behavior). When you reach the Apex-specific courses later in this path and need to know, say, exactly what a specific collection method does with an edge case, that reference — not a guess, and not a half-remembered blog post — is the place to check first.

## Key terms

| Term | Meaning |
|---|---|
| Apex Developer Guide | Salesforce's official, authoritative documentation for the Apex language |
| Compile-time error message | Feedback the compiler gives about a structural problem, including a line number and description |
| Reading documentation | A core, continuous developer skill, not something only needed early on |

## Lab

Take this error message: `Line: 7, Column: 1 — Expression cannot be assigned`. Without running any code, write out, step by step, how you would approach figuring out what's wrong using this lesson's four-step process — including what kind of code pattern (think back to Lesson 4's operators lesson) would typically produce exactly this error.

## Check yourself

Can you explain, without notes, why official Salesforce documentation is generally more trustworthy for exact current behavior than an older blog post or forum answer? Can you walk through, from memory, the four steps this lesson gives for approaching an unfamiliar error message?
