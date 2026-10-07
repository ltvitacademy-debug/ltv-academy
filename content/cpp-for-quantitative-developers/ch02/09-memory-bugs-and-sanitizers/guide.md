# Memory Bugs & Sanitizers

Smart pointers eliminate most memory bugs, but not all C++ code you'll encounter uses them consistently, and even disciplined code can have a subtle mistake. This lesson catalogs the classic memory bugs — leaks, use-after-free, double-free, and buffer overruns — and then introduces the tools that actually find them: AddressSanitizer and Valgrind. Knowing these tools exist, and running them routinely, is what separates code that merely compiles from code you can trust in production.

## What you'll learn

- The four classic memory bugs: leaks, use-after-free, double-free, and buffer overruns
- Why these bugs are often silent — the program may run fine for a long time before failing
- AddressSanitizer (`-fsanitize=address`) and how to enable it
- Valgrind's `memcheck` tool as an alternative, especially useful on Linux without recompiling
- Why these tools are run in CI/testing, not just when something already looks wrong

## The four classic bugs

```cpp
// 1. Memory leak — allocated, never freed
void leak() {
    double* p = new double(100.0);
    // no delete — this memory is gone for the life of the program
}

// 2. Use-after-free — accessing memory after it's been released
void use_after_free() {
    double* p = new double(100.0);
    delete p;
    std::cout << *p << "\n";   // undefined behavior — p is dangling
}

// 3. Double-free — delete called twice on the same pointer
void double_free() {
    double* p = new double(100.0);
    delete p;
    delete p;                   // undefined behavior — already freed
}

// 4. Buffer overrun — reading or writing past an array's bounds
void buffer_overrun() {
    double prices[3] = {100.1, 100.2, 100.3};
    std::cout << prices[5] << "\n";  // reads memory that isn't part of the array
}
```

All four compile without any warning in most configurations, and all four may appear to "work" — printing a plausible-looking number, or not crashing immediately — which is exactly why they're dangerous. A buffer overrun might silently corrupt unrelated data instead of crashing where the bug actually is, making it far harder to track down later.

## Why smart pointers don't eliminate these entirely

`std::unique_ptr` and `std::shared_ptr` make leaks, use-after-free, and double-free dramatically less likely — they handle the `delete` for you, so there's no delete call to forget or duplicate. But you can still create a use-after-free by holding a raw pointer or reference into an object after the smart pointer that owns it is destroyed, and buffer overruns can still happen on `std::vector` or `std::array` if you index past `.size()` without using bounds-checked access like `.at()`.

## AddressSanitizer

```bash
g++ -std=c++20 -fsanitize=address -g buggy.cpp -o buggy
./buggy
```

AddressSanitizer (ASan) is a compiler-instrumented tool, built into GCC and Clang, that detects memory errors at runtime with detailed reports — exactly which line allocated the memory, and exactly which line misused it. Compiling with `-fsanitize=address` adds instrumentation around every memory access; running the resulting binary against the same inputs you'd normally use will immediately report a use-after-free, double-free, or buffer overrun with a full stack trace, instead of letting it silently corrupt memory or crash somewhere unrelated later. The `-g` flag keeps debug symbols so the report includes real line numbers.

## Valgrind's memcheck

```bash
g++ -std=c++20 -g buggy.cpp -o buggy
valgrind --leak-check=full ./buggy
```

Valgrind runs your *already-compiled* program inside a virtual CPU that tracks every memory access, so it doesn't require recompiling with special flags (though compiling with `-g` still helps produce useful line numbers). `--leak-check=full` reports exactly which allocations were never freed when the program exits, with the call stack that created them. It's slower than ASan (because it emulates execution) but works on binaries you didn't necessarily compile yourself, and remains a Linux/macOS staple for leak-hunting.

## Why this matters in practice

Production trading and pricing systems run their full test suite under ASan (and often a thread sanitizer for race conditions) as a routine part of CI, not something reached for only after a crash in production. A memory bug can sit silent for months before a particular code path finally triggers it — catching it in automated testing, every time the code changes, is dramatically cheaper than diagnosing a live incident.

## Key terms

| Term | Meaning |
|---|---|
| Use-after-free | Accessing memory through a pointer after that memory has been freed |
| Double-free | Calling delete (or free) twice on the same pointer |
| AddressSanitizer (ASan) | A compiler-instrumented tool that detects memory errors at runtime |
| Valgrind | A tool that runs a compiled program under instrumented emulation to catch memory errors and leaks |

## Recap

Memory leaks, use-after-free, double-free, and buffer overruns often compile cleanly and fail silently, which is exactly why tools like AddressSanitizer and Valgrind belong in routine testing, not just emergency debugging. Next up, Lesson 10: Move Semantics, where you'll learn how C++ transfers ownership of a resource efficiently instead of copying it.
