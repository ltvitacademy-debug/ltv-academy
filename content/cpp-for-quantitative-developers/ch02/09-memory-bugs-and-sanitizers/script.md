# Script — Memory Bugs & Sanitizers

## Segment 1 (title)

Smart pointers eliminate most memory bugs, but not every piece of C++ code you'll encounter uses them consistently, and even disciplined code can slip up. This lesson catalogs the classic memory bugs, then introduces the tools that actually find them.

## Segment 2 (steps)

There are four of these bugs you'll run into constantly. A leak is memory that's allocated and never freed. Use-after-free is reading memory through a pointer after it's already been released. Double-free is calling delete twice on the same pointer. And a buffer overrun is reading or writing past the end of an array. All four compile without a warning, and all four can appear to work for a while, which is exactly what makes them dangerous.

## Segment 3 (code)

Here's use-after-free and double-free back to back. The pointer is freed once, then read anyway, then freed a second time. Both lines are undefined behavior — they might print something plausible, they might crash, they might corrupt something else entirely, and which one happens can change from run to run.

## Segment 4 (code)

A buffer overrun is just as quiet. This reads past the end of a three-element array. Nothing stops it at compile time, and depending on what happens to be in memory right after the array, it might not even crash — it might just silently corrupt data somewhere else in the program, which is far harder to track back to this line later.

## Segment 5 (code)

AddressSanitizer is how you actually catch these instead of hoping you notice. Compile with this flag, run the program exactly as you normally would, and the moment it touches memory incorrectly, you get a report naming the exact line, with a full stack trace — instead of a silent corruption that surfaces somewhere unrelated, much later.

## Segment 6 (steps)

AddressSanitizer needs a recompile but runs fast and is built into GCC and Clang already. Valgrind's memcheck tool is the alternative — slower, because it emulates execution, but it can run a binary you didn't necessarily build yourself, and it's especially good at finding leaks. The real habit that matters is running one of these routinely, as part of your test suite, not only after something already looks broken.

## Segment 7 (outro)

Leaks, use-after-free, double-free, and buffer overruns tend to fail silently, which is exactly why sanitizers belong in everyday testing. Up next, lesson ten: move semantics, where you'll learn how C++ transfers ownership of a resource instead of copying it.
