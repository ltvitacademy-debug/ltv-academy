# Script — Functions & References

## Segment 1 (title)

How you pass data into a function is one of the most consequential decisions you'll make in C++ — and it's something most other languages don't even let you control. This lesson covers functions, then the choice between passing by value and passing by reference.

## Segment 2 (code)

A function has a return type, a name, parameters, and a body, same shape you'd expect from any language. Here every parameter is passed by value, meaning the function gets its own fresh copy of each argument. That's cheap when the type is small, like a double — only eight bytes get copied.

## Segment 3 (steps)

It stops being cheap once the type gets bigger. A function that takes a whole Order by value copies the entire struct on every single call, including copying the string data inside it. That's fine for an int or a double, a few bytes. It's real, avoidable cost for a struct, a string, or a vector, especially in a function that runs on every order in a hot path.

## Segment 4 (code)

A reference parameter solves this without copying anything — it's just another name for the caller's actual object. Default to a const reference for anything you only need to read; the compiler will stop you from accidentally modifying it. Reach for a plain, non-const reference only when the function genuinely needs to change the caller's object, the way filling an order needs to reduce its remaining quantity.

## Segment 5 (steps)

References and pointers both let you avoid a copy, but they're not interchangeable. A reference has to be bound to something the moment it's created, and it can never be null or rebound to a different object later — which is exactly why it's such a safe default. A pointer is more flexible: it can be null, it can be reassigned, and it carries more responsibility. Chapter two is dedicated to pointers, the heap, and ownership in real depth.

## Segment 6 (outro)

Pass small types by value, pass everything else by const reference unless you need to modify it — that one habit eliminates most unnecessary copying you'll ever write. Up next, lesson five: headers, compilation, and linking, where you'll see how a function declared in one file actually gets used from another.
