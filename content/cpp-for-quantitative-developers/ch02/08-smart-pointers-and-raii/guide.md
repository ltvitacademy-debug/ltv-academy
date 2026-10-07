# Smart Pointers & RAII

Lessons 6 and 7 showed you raw `new` and `delete`, and the two ways they go wrong: forget the `delete` and you leak memory; call it twice, or use the pointer afterward, and you get undefined behavior. Modern C++ almost never calls `new`/`delete` directly anymore. This lesson introduces RAII — the pattern that makes that possible — and the two smart pointers, `std::unique_ptr` and `std::shared_ptr`, that you'll use instead for the rest of your C++ career.

## What you'll learn

- RAII: tying a resource's lifetime to an object's lifetime
- `std::unique_ptr` — exclusive ownership, zero overhead versus a raw pointer
- `std::shared_ptr` — shared ownership with reference counting, and when it's actually needed
- `std::make_unique` and `std::make_shared`, and why they're preferred over `new`
- Why raw `new`/`delete` should almost never appear in code you write from here on

## RAII: Resource Acquisition Is Initialization

```cpp
class FileHandle {
public:
    FileHandle(const std::string& path) {
        file_ = std::fopen(path.c_str(), "r");   // acquire the resource
    }
    ~FileHandle() {
        if (file_) std::fclose(file_);            // release it, guaranteed
    }
private:
    FILE* file_;
};

void read_config() {
    FileHandle fh("config.txt");   // resource acquired here
    // ... use fh ...
}                                    // destructor runs here — file closed, always
```

RAII means: acquire a resource (memory, a file handle, a network socket, a lock) in a constructor, and release it in the destructor. Because C++ guarantees a stack object's destructor runs deterministically when it goes out of scope — including when an exception is thrown through that scope — the resource is released no matter how the function exits. You never have to remember to call a cleanup function; the type system does it for you. Smart pointers are simply RAII applied specifically to heap memory.

## std::unique_ptr — exclusive ownership

```cpp
#include <memory>

struct Order {
    int id;
    double price;
};

std::unique_ptr<Order> make_order(int id, double price) {
    return std::make_unique<Order>(Order{id, price});
}

void process() {
    std::unique_ptr<Order> order = make_order(1, 182.35);
    std::cout << order->price << "\n";
}   // order's destructor runs here, automatically calling delete on the Order
```

`std::unique_ptr<T>` owns a heap-allocated `T` exclusively — exactly one `unique_ptr` can own a given object at a time. It cannot be copied (copying would mean two owners), only **moved** (Lesson 10 covers exactly what that means). When the `unique_ptr` is destroyed — because its scope ends — it automatically calls `delete` on the object it owns. There is no runtime overhead versus a raw pointer; it's purely a compile-time safety wrapper. **Always prefer `std::make_unique<T>(...)` over `new T(...)`** — it's exception-safe and slightly more concise.

## std::shared_ptr — shared ownership

```cpp
#include <memory>

std::shared_ptr<Order> order1 = std::make_shared<Order>(Order{1, 182.35});
std::shared_ptr<Order> order2 = order1;  // both now own the same Order

std::cout << order1.use_count() << "\n";  // 2 — two shared_ptrs own this object

// the Order is only actually deleted once BOTH order1 and order2
// have gone out of scope or been reset — whichever happens last
```

`std::shared_ptr<T>` allows multiple owners of the same heap object, tracked via an internal reference count. The object is destroyed only when the last `shared_ptr` referring to it is destroyed or reset. This flexibility costs something real: a small amount of memory for the reference count, and atomic increment/decrement operations on copy and destruction — measurable overhead in a tight loop. Use `std::shared_ptr` only when ownership genuinely needs to be shared (e.g. a `MarketDataCache` object referenced by several independent subsystems); default to `std::unique_ptr` otherwise.

## Rules of thumb

- Prefer `std::unique_ptr` as your default smart pointer; reach for `std::shared_ptr` only when shared ownership is a real requirement, not a convenience.
- Prefer `std::make_unique`/`std::make_shared` over calling `new` directly.
- Never manually `delete` an object owned by a smart pointer — that's a double-free waiting to happen.
- If a function just needs to *use* an object a smart pointer owns, without taking ownership, pass a plain reference or raw pointer/observer — not another smart pointer.

## Key terms

| Term | Meaning |
|---|---|
| RAII | Tying a resource's acquisition and release to an object's constructor/destructor |
| std::unique_ptr | Smart pointer with exclusive, non-copyable ownership of a heap object |
| std::shared_ptr | Smart pointer with shared, reference-counted ownership of a heap object |
| use_count() | The number of shared_ptr instances currently owning an object |

## Recap

RAII ties resource cleanup to object lifetime so it happens automatically and reliably, and `std::unique_ptr`/`std::shared_ptr` apply that pattern to heap memory — meaning raw `new`/`delete` should almost never appear in the code you write from here on. Next up, Lesson 9: Memory Bugs & Sanitizers, where you'll learn to find the bugs that happen when these rules get broken.
