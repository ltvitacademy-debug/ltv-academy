# Script — Threads & Data Races

## Segment 1 (title)

Modern quant systems have cores to spare, and this chapter is about using them safely. We're starting with `std::thread`, the standard C++ way to run work concurrently — and with the danger that comes bundled with it the moment two threads touch the same memory.

## Segment 2 (code)

Starting a thread looks simple: construct a `std::thread` with a function and its arguments, and it starts running right away, concurrently with whoever created it. The constructor doesn't wait. What you must always do is join it — block until it finishes — or detach it deliberately. Skip that, and the thread's destructor terminates your program.

## Segment 3 (steps)

Here's the danger in slow motion. Two threads share one counter. Thread A reads its current value. Before A writes back the incremented result, thread B reads that same, now-stale value. Both threads compute the same "next" number and write it back — one increment simply vanishes, and nothing crashed or threw an error to tell you.

## Segment 4 (code)

In code, that counter update looks like one line, but it's really three steps: read the value, add one, write it back. When two threads run that line without coordination, their steps can interleave in exactly the losing order we just described, silently dropping updates.

## Segment 5 (steps)

The C++ standard doesn't call this a quirky edge case — it calls unsynchronized concurrent access, with at least one write, a data race, and a data race is undefined behavior. The compiler is allowed to assume races never happen, so it optimizes as though they don't. And because the outcome depends on how the operating system happens to schedule your threads, a test run that passes proves absolutely nothing about tomorrow's run under load.

## Segment 6 (outro)

The lesson to carry forward: any memory more than one thread can touch, where at least one of those touches is a write, needs a synchronization plan. Up next, lesson twenty-two: mutexes, locks, and condition variables — the tools that give you that plan.
