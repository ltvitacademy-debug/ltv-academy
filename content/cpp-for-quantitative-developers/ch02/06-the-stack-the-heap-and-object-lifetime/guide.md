# The Stack, the Heap & Object Lifetime

Chapter 2 is about memory — the subject that most separates C++ from almost every language you may have used before. Every object you create lives somewhere, and understanding exactly where, and for how long, is the foundation for everything that follows in this chapter: pointers, smart pointers, debugging memory bugs, and move semantics. This lesson introduces the two places memory comes from, and the rule that governs how long an object lives.

## What you'll learn

- The stack: fast, automatic, and strictly scoped
- The heap: flexible, manual, and the source of most serious C++ bugs
- Object lifetime and scope — exactly when a destructor runs
- Why returning a pointer to a stack-local object is a serious, common bug

## The stack

```cpp
void price_trade() {
    double price = 182.35;      // lives on the stack
    int quantity = 500;          // also on the stack
    double notional = price * quantity;
    std::cout << notional << "\n";
}  // price, quantity, and notional are all destroyed here, automatically
```

The **stack** is a region of memory that grows and shrinks automatically as functions are called and return. Every local variable declared inside a function lives on the stack, in a "stack frame" created when the function is entered. When the function returns, that whole frame is popped — every local variable is destroyed immediately and automatically. This is extremely fast (no allocation bookkeeping at all) and completely automatic — you never have to free stack memory yourself.

The catch: the stack has a fixed, fairly small size (often a few MB), and it strictly follows scope — a stack-allocated object cannot outlive the function (or block) that created it.

## The heap

```cpp
#include <memory>

double* price = new double(182.35);   // allocated on the heap
std::cout << *price << "\n";
delete price;                          // must be freed manually, or it leaks
```

The **heap** (also called dynamic memory) is a much larger pool of memory that you allocate explicitly with `new` and must free explicitly with `delete`. Unlike the stack, a heap allocation's lifetime has nothing to do with scope — it lives until you (or something on your behalf) calls `delete`, even if the function that created it has long since returned. That flexibility is exactly why the heap exists: it's how you return data that needs to outlive the function that built it, or build a data structure whose size isn't known until runtime.

It's also the source of the two most common categories of C++ bugs, covered fully in Lesson 9: forgetting to `delete` (a **memory leak**) and using memory after it's been `delete`d (a **dangling pointer** / use-after-free). Lesson 8 shows how smart pointers eliminate both by automating the `delete` call — but you need to understand raw `new`/`delete` first to appreciate what they're automating.

## Object lifetime and scope

```cpp
int main() {
    {
        Order o{1, 100.0, 50};   // o's scope begins
        std::cout << o.price << "\n";
    }                             // o's scope ends — destructor runs here

    std::cout << "o no longer exists\n";
    return 0;
}
```

Every stack-allocated object has a well-defined lifetime tied to its **scope** — the nearest enclosing `{ }` block. The object is constructed when execution reaches its declaration, and destroyed in the reverse order of construction when execution leaves the enclosing scope, whether that's the end of a block, a `return`, or an exception propagating out. This deterministic destruction (as opposed to a garbage collector's "sometime later") is the foundation of RAII, which you'll meet properly in Lesson 8.

## The classic dangling-pointer bug

```cpp
double* make_price() {
    double price = 182.35;   // local — lives on the stack
    return &price;            // BUG: returns the address of a destroyed object
}                              // price is destroyed here, before the caller sees it

int main() {
    double* p = make_price();
    std::cout << *p << "\n";  // undefined behavior — p points to dead memory
}
```

`make_price` returns a pointer to its local variable `price`. The moment `make_price` returns, `price`'s stack frame is popped and `price` ceases to exist — the returned pointer now points at memory that could be reused by anything else the program does next. Reading through it is **undefined behavior**: it might print the old value, garbage, or crash, unpredictably. The fix, previewed here and covered in full starting next lesson, is to either return by value (`double make_price()` — the stack value gets copied/moved out safely) or allocate on the heap and return ownership through a smart pointer.

## Key terms

| Term | Meaning |
|---|---|
| Stack | Fast, automatically-managed memory tied strictly to function/block scope |
| Heap | Manually-managed memory that lives until explicitly freed, independent of scope |
| Scope | The enclosing block that determines a stack object's lifetime |
| Dangling pointer | A pointer referring to memory that has already been freed or gone out of scope |

## Recap

Stack memory is fast, automatic, and scoped; heap memory is flexible but your responsibility to free, and mixing the two up — like returning a pointer to a stack-local variable — is one of the most common bugs in C++. Next up, Lesson 7: Pointers & References in Depth, where you'll learn pointer syntax, pointer arithmetic, and the rules that keep pointers safe.
