# Lesson 37 — Reading Apex Documentation

**Chapter 5 · Applied Apex · Lesson 37 of 43**

## What you'll learn

- Where the real, authoritative Apex documentation actually lives
- How to read a class reference page: method signatures, return types, and version availability
- How to find the current governor limits for your own org's API version, rather than relying on a number memorized from a tutorial
- Why documentation is versioned by Salesforce release, and why that matters for what you're reading
- A practical habit: verifying unfamiliar syntax against the docs before shipping it

## Where the real documentation lives

The authoritative source for Apex is the **Apex Developer Guide** and the **Apex Reference Guide**, both published at developer.salesforce.com/docs. The Developer Guide is organized as a narrative — concepts, language fundamentals, how triggers work, how transactions behave — much like the structure of this course. The Reference Guide is organized as a class-by-class, method-by-method lookup: every built-in class (`String`, `Database`, `JSON`, `Limits`, and hundreds more), every method on it, its parameters, its return type, and often a short code example. **Trailhead** modules are a good on-ramp for learning a new topic conceptually, but for the exact current syntax of a specific method, the Reference Guide is the primary source to check.

## Reading a class reference page

A typical reference entry gives you:

- **The method signature** — its name, parameter types and names, and return type. For example, `public static Id getId()` on `Database.SaveResult` tells you it's a `static`... actually, on an instance method like this one, it tells you the method is called on an instance (not statically), takes no parameters, and returns an `Id`.
- **A description** of what the method does and any side effects.
- **Usage notes** — version restrictions, required permissions, or edge-case behavior (e.g., what happens if you call a getter before a value is set).
- **A code sample**, often minimal, showing the method in context.

Reading these pages methodically — signature first, then description, then usage notes — is faster than skimming for a code sample and guessing at the rest.

## Documentation is versioned by API version

Salesforce ships new platform releases multiple times a year, and the documentation is versioned to match specific API versions (you'll see this as a number in doc URLs, like `.260.0.` or `.264.0.`). A method, a governor limit, or a piece of syntax can genuinely differ — usually by gaining new capability, occasionally by changing default behavior — between versions. When you search for Apex documentation and land on an older cached version, most pages display a "Newer version available" notice; it's worth following that link to confirm you're reading documentation that matches your org's actual API version, especially for anything numeric (governor limits, maximum batch sizes) rather than relying on whatever version happened to rank first in a search result.

## Finding governor limits specifically

Chapter 4 covered governor limits in depth, but the durable skill is knowing *where* to re-check them yourself rather than memorizing numbers that can shift between releases: the Apex Developer Guide's "Execution Governors and Limits" page is the canonical source, and the `Limits` class (Lesson 26) lets you check your org's actual current consumption and ceiling at runtime, which is the most reliable check of all since it reflects your org's real configuration directly.

## A practical habit

Before shipping code that uses a method or a piece of syntax you're not 100% sure about, the habit this course wants you to build is: look it up in the Reference Guide first, confirm the exact signature and any usage notes, and only then write the code — rather than writing code based on a half-remembered example and discovering the mismatch later, in a code review or in production.

## Key terms

| Term | Meaning |
|---|---|
| Apex Developer Guide | The narrative, concept-based official Apex documentation |
| Apex Reference Guide | The class-by-class, method-by-method official Apex API lookup |
| API version | The specific platform release a piece of documentation (and your org) corresponds to |
| Trailhead | Salesforce's guided learning platform, a good conceptual on-ramp but not the primary reference source |

## Lab

Pick a method used somewhere earlier in this course that you haven't personally looked up yet (for example, `String.split()` from Lesson 32, or `Database.insert()`'s `allOrNone` parameter from Chapter 2). Find its entry in the Apex Reference Guide on developer.salesforce.com, read its full signature and usage notes, and write down one detail about it you didn't already know from this course's lessons alone.

## Check yourself

What's the practical difference between the Apex Developer Guide and the Apex Reference Guide, and when would you reach for each one? Why does it matter that Apex documentation is versioned by API version, rather than being one single unchanging page?
