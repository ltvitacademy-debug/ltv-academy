# Script — The Stack, the Heap & Object Lifetime

## Segment 1 (title)

Chapter two is about memory — the subject that separates C++ from almost every language you may have used before. Every object you create lives somewhere, and knowing exactly where, and for how long, is the foundation for everything else in this chapter.

## Segment 2 (steps)

There are two places memory comes from. The stack is fast and completely automatic, but strictly tied to scope — nothing there can outlive the function that created it. The heap is the opposite: flexible, but entirely your responsibility, and it can outlive the function that allocated it.

## Segment 3 (code)

Every local variable you declare inside a function lives on the stack by default, in a frame created when the function is entered. The moment the function returns, that entire frame disappears, and everything in it is destroyed automatically, in order. No allocation bookkeeping, nothing for you to clean up.

## Segment 4 (code)

The heap works completely differently. You ask for memory explicitly with new, and it stays allocated until you explicitly free it with delete — regardless of whether the function that created it has already returned. That's exactly why the heap exists: for data that needs to outlive the function that built it. Forget the delete, and that memory leaks for the life of the program.

## Segment 5 (steps)

Every stack object follows the same rule. It's constructed the moment execution reaches its declaration, and destroyed the instant execution leaves the enclosing block — a plain end of scope, a return, or an exception unwinding through it. That deterministic timing, versus a garbage collector's "sometime later," is the foundation for a pattern called RAII, which you'll meet properly two lessons from now.

## Segment 6 (code)

Here's the bug that mixing these two up produces. This function returns the address of a local variable — but that variable is destroyed the instant the function returns, before the caller ever sees it. Reading through that pointer afterward is undefined behavior: it might print the old value, it might print garbage, it might crash, and which one happens can change from run to run.

## Segment 7 (outro)

Stack memory is fast and automatic; heap memory is flexible but yours to manage; and confusing the two is one of the most common bugs in the language. Up next, lesson seven: pointers and references in depth, where you'll learn the syntax and rules that keep pointers safe.
