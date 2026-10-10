# Lesson 17 — The Developer Console and VS Code

**Chapter 3 · Developer Habits · Lesson 17 of 18**

## What you'll learn

- What the Salesforce Developer Console is, and what it's genuinely good for
- How Execute Anonymous lets you run Apex without creating a permanent class
- Why most professional Salesforce development has moved to VS Code with the Salesforce Extensions and CLI
- How to connect debug logs (and System.debug from Lesson 12) to what you'll actually see in each tool

## The Developer Console: a browser-based Apex workbench

The **Developer Console** is a browser-based tool built directly into the Salesforce platform, reachable from inside any org, for writing and running Apex, viewing debug logs, and inspecting classes without leaving the browser. For quick, exploratory work — trying out a small piece of logic, checking what a method actually returns, viewing a recent debug log — it remains genuinely useful even though it's not where most day-to-day professional Apex development happens anymore.

Its signature feature is **Execute Anonymous**: a window where you paste a block of Apex and run it immediately, without saving it as a permanent class anywhere in the org. This connects directly back to Lesson 12's debugging lesson — Execute Anonymous is exactly where you'd paste a snippet full of `System.debug` statements just to see what values are actually flowing through a piece of logic, without needing to build and deploy a whole class just to check one thing.

```apex
// Pasted directly into Execute Anonymous:
Integer orderTotal = 150;
System.debug('orderTotal is: ' + orderTotal);
```

Running this immediately produces a **debug log** — a detailed record of what happened during that execution, including every `System.debug` output, any errors, and (once you reach the Apex-specific courses) governor-limit usage. Debug logs can be large and noisy at first glance; the lines carrying your own `System.debug` output are specifically the ones worth scanning for first when you're trying to confirm a hypothesis, exactly as Lesson 12 described.

## VS Code and the Salesforce Extensions: where real development happens

Most professional Salesforce development today happens in **Visual Studio Code** (VS Code), a general-purpose code editor, combined with the official **Salesforce Extensions for VS Code** and the underlying **Salesforce CLI**. This combination exists because real projects need things the Developer Console alone doesn't provide well: proper version control integration (Lesson 14's concepts, with Git specifically), working with source files on your own machine rather than only inside a browser tab, and support for scratch orgs — disposable, source-driven Salesforce environments created specifically for development and testing, a concept the next course in this path (covering Salesforce DX) builds on directly.

The Salesforce Extensions run on top of the Salesforce CLI behind the scenes — installing the CLI is a prerequisite even if you never type a CLI command directly, since the extensions use it to actually talk to a Salesforce org. This course doesn't teach the specific CLI commands or scratch-org workflow in detail; that belongs to the dedicated Salesforce DX course later in this path. What matters here is the shape of the landscape: a browser-based tool (Developer Console) for quick, exploratory work, and a full local development environment (VS Code plus the Salesforce Extensions and CLI) for real, version-controlled, team-based development.

## Why both tools matter to know about now

You don't need to have either tool installed or open to finish this course — everything so far has been teachable as plain Apex-flavored code on the page. But recognizing both tools by name, and roughly what each is for, means the Apex-specific courses ahead won't be introducing a brand-new concept at the exact same moment they're also introducing new syntax. Knowing *where* code gets written and run is just as much a foundation as knowing *how* to write it.

## Key terms

| Term | Meaning |
|---|---|
| Developer Console | A browser-based Salesforce tool for writing/running Apex and viewing debug logs |
| Execute Anonymous | A Developer Console feature for running a block of Apex immediately, without saving it as a class |
| Debug log | A detailed record of what happened during a piece of Apex execution |
| Salesforce Extensions for VS Code | The official tooling that brings Salesforce development into VS Code |
| Scratch org | A disposable, source-driven Salesforce environment created for development and testing |

## Lab

Without needing to actually open either tool, write a short paragraph (as if explaining it to a teammate brand new to Salesforce) describing when you'd reach for the Developer Console's Execute Anonymous window versus when you'd reach for VS Code with the Salesforce Extensions instead, using at least one specific scenario for each.

## Check yourself

Can you explain, without notes, what Execute Anonymous actually does and why it's useful for the kind of debugging Lesson 12 described? Can you name the three pieces of the modern Salesforce VS Code development setup (the editor, the extensions, and the underlying tool they both depend on) and what each one is for?
