# Custom Allocators: Arena and Pool Allocation

Lesson 28 covered `reserve()`, passing by `const&`, and move semantics — all ways to avoid *unnecessary* allocation. This lesson covers what to do about the allocation you can't avoid: when a market-data processor or order-matching loop genuinely needs to create and destroy many small objects at high frequency, the general-purpose `new`/`delete` allocator's own overhead and unpredictability becomes the bottleneck. Custom allocators are how real low-latency systems take that cost back under their own control.

## What you'll learn

- Why general-purpose `new`/`delete` is a bad fit for high-frequency small allocations
- Arena (bump) allocation: the simplest possible custom allocator
- Pool allocation: fixed-size object reuse, including freed-slot reuse
- Where each pattern fits in a realistic market-data or order-processing pipeline

## Why general-purpose `new` is the wrong tool here

`new` and `delete` are general-purpose: they have to handle allocations of any size, track free blocks of varying sizes to satisfy future requests efficiently, and — in a multithreaded program — typically synchronize access to shared internal data structures. All of that generality has a real, measurable cost, and worse, that cost is *unpredictable*: a given `new` call might be fast (a free block of the right size is immediately available) or noticeably slower (the allocator has to search, split a larger block, or ask the OS for more memory). For a market-data processor allocating one small object per incoming tick thousands of times a second, that per-allocation variance is exactly the kind of tail-latency risk Lesson 42 will show you how to measure — and a custom allocator built for one specific, known use case can eliminate most of it.

## Arena (bump) allocation: the simplest possible allocator

An **arena allocator** (also called a bump allocator) pre-allocates one large block of memory up front, then satisfies every subsequent allocation request by simply advancing a pointer — no searching, no bookkeeping of individual free blocks:

```cpp
#include <cstddef>
#include <cstdint>
#include <new>

class Arena {
public:
    explicit Arena(size_t size_bytes)
        : buffer_(new uint8_t[size_bytes]), size_(size_bytes), offset_(0) {}

    ~Arena() { delete[] buffer_; }

    void* allocate(size_t bytes, size_t alignment = alignof(std::max_align_t)) {
        size_t aligned_offset = (offset_ + alignment - 1) & ~(alignment - 1);
        if (aligned_offset + bytes > size_) {
            throw std::bad_alloc();   // arena exhausted
        }
        void* ptr = buffer_ + aligned_offset;
        offset_ = aligned_offset + bytes;
        return ptr;
    }

    void reset() { offset_ = 0; }   // reclaim everything at once

private:
    uint8_t* buffer_;
    size_t size_;
    size_t offset_;
};
```

Allocation is just pointer arithmetic — about as fast as a custom allocator can possibly be. The tradeoff, and it's a real one: an arena has **no way to free an individual object**. Memory is only reclaimed all at once, via `reset()`. This is exactly the right fit for a scenario with a natural "batch" boundary — allocate freely while processing one market-data burst or one trading session's working set, then `reset()` the whole arena between batches — and exactly the wrong fit for objects with unpredictable, individually varying lifetimes.

## Pool allocation: fixed-size reuse, with individual frees

A **pool allocator** (or fixed-size free-list allocator) handles the case an arena can't: objects of one specific size that are created and destroyed individually and unpredictably, like `Order` objects arriving and getting filled or cancelled in no particular pattern. It pre-allocates a block big enough for many objects of that one fixed size, and threads a free list through the unused slots:

```cpp
#include <cstddef>
#include <cstdint>
#include <new>

template <typename T>
class PoolAllocator {
public:
    explicit PoolAllocator(size_t capacity)
        : buffer_(new uint8_t[capacity * sizeof(T)]), capacity_(capacity) {
        // Thread a free list through every slot: each slot's first
        // bytes hold a pointer to the next free slot.
        for (size_t i = 0; i < capacity_ - 1; ++i) {
            slot_at(i)->next = slot_at(i + 1);
        }
        slot_at(capacity_ - 1)->next = nullptr;
        free_list_ = slot_at(0);
    }

    ~PoolAllocator() { delete[] buffer_; }

    T* allocate() {
        if (!free_list_) throw std::bad_alloc();   // pool exhausted
        FreeSlot* slot = free_list_;
        free_list_ = slot->next;
        return reinterpret_cast<T*>(slot);
    }

    void deallocate(T* ptr) {
        FreeSlot* slot = reinterpret_cast<FreeSlot*>(ptr);
        slot->next = free_list_;
        free_list_ = slot;   // pushed back onto the free list for reuse
    }

private:
    struct FreeSlot { FreeSlot* next; };
    FreeSlot* slot_at(size_t i) {
        return reinterpret_cast<FreeSlot*>(buffer_ + i * sizeof(T));
    }

    uint8_t* buffer_;
    size_t capacity_;
    FreeSlot* free_list_ = nullptr;
};
```

Both `allocate()` and `deallocate()` are a handful of pointer operations — no searching for a free block of the right size (every slot already *is* the right size), and no OS involvement after the initial setup. This is the standard pattern for `Order` objects, incoming tick structs, or any other fixed-shape object that a trading system creates and destroys constantly at runtime.

## Placement new: constructing an object into memory you already own

Both allocators above hand back raw, uninitialized memory — they don't run `T`'s constructor. **Placement new** constructs an object at a specific, already-allocated address instead of also allocating memory for it:

```cpp
#include <new>

struct Order { double price; int quantity; };

PoolAllocator<Order> pool(10000);

void* raw = pool.allocate();
Order* order = new (raw) Order{100.25, 500};   // placement new: construct IN PLACE

// ... use order ...

order->~Order();        // must call the destructor explicitly -- placement
                         // new's matching delete does NOT do this for you
pool.deallocate(order);
```

Placement new is what separates "get me some memory" (the allocator's job) from "build a valid `Order` in that memory" (the constructor's job) — a distinction that's invisible with ordinary `new T(...)` (which does both at once) but becomes essential once the allocation strategy and the object's lifetime are managed by two different pieces of code.

## Key terms

| Term | Meaning |
|---|---|
| Arena (bump) allocator | Pre-allocates one block and satisfies allocations by advancing a pointer; frees everything at once via `reset()` |
| Pool allocator | Pre-allocates fixed-size slots with a free list, supporting individual allocate/deallocate at that one size |
| Placement new | Constructs an object at an already-allocated address, rather than also allocating memory for it |

## Check yourself

Why is an arena allocator a poor fit for `Order` objects that arrive and get cancelled or filled at unpredictable times, while a pool allocator handles that case well?
