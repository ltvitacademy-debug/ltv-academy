# Types, Variables & Control Flow

C++ is a statically typed language: every variable has a type known at compile time, and that type never changes. This is different from Python, where a variable can hold an `int` one moment and a `str` the next. In this lesson you'll learn the built-in types you'll use constantly in quant code, how `auto` and type inference work, and the control-flow constructs — `if`, loops, `switch` — that structure every C++ program.

## What you'll learn

- The fundamental built-in types (`int`, `double`, `bool`, `char`) and why their exact size matters for financial data
- `const` and why you should default to it
- Type inference with `auto`, and when it helps versus when it obscures
- `if`/`else`, `for`, `while`, and range-based `for` loops
- `enum class` for representing a fixed set of named values, like an order side

## Built-in types

```cpp
int quantity = 500;           // signed integer, typically 32 bits
long shares_outstanding = 7'500'000'000L;  // wider integer for big counts
double price = 182.35;        // 64-bit floating point — use for most prices
float approx_vol = 0.18f;     // 32-bit floating point — rarely needed here
bool is_filled = false;       // true or false
char side = 'B';              // a single character: 'B' for buy, 'S' for sell
```

A few things matter more in finance than in a typical app:

- Prefer `double` over `float` for prices and calculations — the extra precision avoids compounding rounding errors across millions of calculations.
- Integer types have fixed sizes (`int` is commonly 32 bits, `long long` is at least 64). Counting shares or nanosecond timestamps in a plain `int` can silently overflow — use `long long` or a fixed-width type like `int64_t` from `<cstdint>` when the range matters.
- Never compare floating-point values with `==`. Prices accumulate rounding error; compare against a small tolerance instead (`std::abs(a - b) < 1e-9`).

## const by default

```cpp
const double tick_size = 0.01;   // cannot be reassigned after initialization
double last_price = 100.00;      // can change — this one actually should
```

Mark a variable `const` whenever you don't intend to reassign it. This isn't just style: it lets the compiler catch accidental reassignment as an error, and it documents intent for the next reader — in a pricing function, seeing `const double` tells you immediately that value is an input, not an accumulator.

## Type inference with auto

```cpp
auto quantity = 500;            // deduced as int
auto price = 182.35;            // deduced as double
auto name = std::string("AAPL"); // deduced as std::string, not const char*

std::vector<double> prices = {100.1, 100.2, 99.8};
for (auto& p : prices) {        // avoids spelling out the iterator/reference type
    p *= 1.01;
}
```

`auto` is most valuable when the type is long or unimportant to the reader (iterator types, lambda types) and least valuable when spelling out the type actually helps someone understand the code — use judgment, not `auto` everywhere.

## Control flow

```cpp
double price = 101.25;
double reference = 100.00;

if (price > reference) {
    std::cout << "Trading above reference\n";
} else if (price < reference) {
    std::cout << "Trading below reference\n";
} else {
    std::cout << "At reference\n";
}

// classic for loop
for (int i = 0; i < 5; ++i) {
    std::cout << "Tick " << i << "\n";
}

// range-based for — preferred when you don't need the index
std::vector<double> fills = {100.1, 100.3, 100.2};
for (double f : fills) {
    std::cout << f << "\n";
}

// while loop
int retries = 0;
while (retries < 3) {
    ++retries;
}
```

## enum class for fixed sets of values

```cpp
enum class Side { Buy, Sell };

void log_order(Side s, double price) {
    if (s == Side::Buy) {
        std::cout << "BUY at " << price << "\n";
    } else {
        std::cout << "SELL at " << price << "\n";
    }
}
```

`enum class` (as opposed to a plain, older-style `enum`) is scoped — you must write `Side::Buy`, never just `Buy` — and it won't silently convert to an `int`. That makes it far safer than using raw integers or strings to represent something like an order side, a trade status, or an option type.

## Key terms

| Term | Meaning |
|---|---|
| Static typing | Every variable's type is fixed at compile time and never changes |
| auto | Compiler-deduced type, inferred from the initializer |
| const | Marks a variable as not reassignable after initialization |
| enum class | A scoped, type-safe way to represent a fixed set of named values |

## Recap

C++'s built-in types, `const`, `auto`, and the familiar `if`/`for`/`while` control-flow constructs are the raw material every program is built from — and small choices, like `double` over `float` or `enum class` over a raw integer, prevent entire categories of bugs in financial code. Next up, Lesson 4: Functions & References, where you'll learn how to pass this data around efficiently.
