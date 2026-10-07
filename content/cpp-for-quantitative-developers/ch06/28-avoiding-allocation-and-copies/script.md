# Script — Avoiding Allocation & Copies

## Segment 1 (title)

Two of the most common, most fixable sources of slowness in C++ are heap allocation and unnecessary copying, and both sneak in without anyone noticing. This lesson is about three fixes: reserving capacity up front, passing by reference instead of by value, and letting move semantics skip a copy entirely.

## Segment 2 (code)

A vector that grows one push_back at a time doesn't just allocate once — by default it reallocates to a bigger buffer and copies every existing element over, repeatedly, every time it outgrows its current capacity. If you know roughly how many elements you'll end up with, call reserve first. That's one allocation instead of a handful of reallocate-and-copy cycles.

## Segment 3 (code)

Passing a large object by value makes a full copy of it just to call the function. Passing by const reference instead gives the function read-only access to the caller's original object, with no copying at all. If the function only needs to read the data, const reference is strictly better for anything bigger than a couple of built-in values.

## Segment 4 (steps)

So the rule of thumb has three cases. Small, cheap types like int and double — pass by value, copying them costs nothing. Large or container-like types the function only reads — pass by const reference. And when the function genuinely needs to keep its own copy to modify, take it by value and let the caller decide whether to copy or move into it.

## Segment 5 (code)

That's where move semantics comes in. std::move casts its argument to signal "you can take this object's internals, I won't use it in its old form again." Assigning one vector from std::move of another transfers the underlying buffer instead of copying every element, and the source is left valid but empty. Returning a local vector by value from a function already gets this for free under modern C++ — it's moved out, not copied.

## Segment 6 (outro)

Reserve turns repeated reallocation into one allocation, const reference skips copies the function never needed, and move semantics skips copies of data that was about to be discarded anyway. Up next, lesson twenty-nine: compiler optimization and inlining, where the compiler starts doing some of this automatically — if your code gives it the chance.
