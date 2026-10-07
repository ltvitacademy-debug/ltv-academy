# Script — Mutexes, Locks & Condition Variables

## Segment 1 (title)

Last lesson ended with a broken counter — two threads, no coordination, lost updates. This lesson gives you the fix: the mutex, the RAII lock types that make it safe to use, and the condition variable that lets one thread wait efficiently for another.

## Segment 2 (code)

A mutex lets only one thread into a protected block at a time. Wrap the counter update in a lock_guard built on that mutex, and every increment becomes safe, because lock_guard locks the mutex the moment it's constructed and unlocks it automatically the moment it goes out of scope — even if an exception is thrown in between.

## Segment 3 (steps)

That automatic unlocking is the whole reason to prefer RAII locks over calling lock and unlock by hand. lock_guard is the simple case — locked for its entire scope. unique_lock is more flexible: it can unlock and relock partway through, and it's the lock type condition variables require, because waiting needs to release the mutex and reacquire it later. Manual lock and unlock, by contrast, deadlocks every other thread the moment one early return or exception skips the unlock call.

## Segment 4 (steps)

Put a mutex and a condition variable together and you get a classic pattern: a producer thread pushes an order onto a shared queue, locks and unlocks around that push, then calls notify_one to wake up a consumer. The consumer isn't spinning burning CPU — it's asleep inside wait, which releases the mutex while idle and only wakes and re-locks once notified, re-checking its condition before trusting it.

## Segment 5 (code)

That re-check matters because waits can wake spuriously, with no notify behind them at all, and a notify can also arrive before the consumer even starts waiting. Passing a predicate to wait handles both: it keeps re-checking in a loop until the condition is actually true, which is what makes this pattern correct rather than merely usually correct.

## Segment 6 (outro)

Mutexes serialize access, RAII guarantees release, and condition variables add efficient waiting on top. Up next, lesson twenty-three: atomics and memory ordering, a lighter-weight tool for simple shared counters and flags that don't need a full lock.
