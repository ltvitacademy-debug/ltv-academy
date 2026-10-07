# Script — Why C++ in Finance

## Segment 1 (title)

Welcome to C++ for Quantitative Developers. Python and Java get you far, but eventually a strategy needs to react in microseconds, and that's where C++ takes over. This lesson is about why that's still true, and what you'll build toward over the rest of the course.

## Segment 2 (steps)

Most quant shops run several languages at once. Research gets prototyped in Python because it's fast to write and has a huge numerical ecosystem. Pricing and risk libraries are built in C++ at the core, often wrapped so researchers can still call them from a notebook. And matching engines, market data feeds, and execution systems are C++ almost everywhere, because every microsecond of latency there is a competitive disadvantage.

## Segment 3 (code)

Here's the trade-off in miniature. This code reserves space for a million trades up front, so adding them one at a time doesn't trigger a surprise reallocation later — exactly the kind of latency spike a trading system can't afford. And the loop that totals notional reads each trade by reference instead of copying it. Small decisions, but in C++ you get to make every one of them.

## Segment 4 (steps)

In Python or Java, a garbage collector reclaims memory on its own schedule, and it can pause your program at a moment it chooses, not you. C++ has none of that. An object's lifetime is tied to its scope — a local variable is destroyed the moment it goes out of scope — so the worst case is something you can actually reason about instead of something that happens to you.

## Segment 5 (steps)

That control doesn't mean writing low-level code everywhere. C++'s founding goal is zero-overhead abstraction: classes, templates, and the standard library should cost nothing extra at runtime compared to writing the equivalent by hand. A vector of a million prices really is just contiguous memory under the hood, with no hidden per-element bookkeeping. That's what lets you write readable code and still hit microsecond targets.

## Segment 6 (outro)

Control over memory and execution, in exchange for speed with no hidden cost — that's the deal C++ offers. Up next, lesson two: toolchains, compilers, and build systems, where you'll set up the tools that actually turn this source into a running program.
