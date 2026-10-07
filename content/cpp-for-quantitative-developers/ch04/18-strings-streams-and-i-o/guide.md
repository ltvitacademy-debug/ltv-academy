# Strings, Streams & I/O

Every piece of quant infrastructure eventually has to read a CSV of historical prices, parse a config file, or print a formatted report — and in C++ all three go through `std::string` and the stream classes. This lesson covers the text-handling tools you'll reach for constantly: `std::string`, `std::stringstream`, and file I/O with `<fstream>`.

## What you'll learn

- `std::string` operations: concatenation, substrings, and searching
- `std::stringstream` for parsing and building strings, field by field
- Reading and writing files with `std::ifstream` / `std::ofstream`
- A worked example: parsing a comma-separated price line

## `std::string` basics

`std::string` manages its own memory, supports `+` for concatenation, and offers `substr`, `find`, and comparison operators directly.

```cpp
#include <string>

std::string symbol = "AAPL";
std::string exchange = "NASDAQ";
std::string tag = symbol + ":" + exchange;   // "AAPL:NASDAQ"

std::size_t pos = tag.find(':');
std::string onlySymbol = tag.substr(0, pos); // "AAPL"
```

`find` returns `std::string::npos` (not a valid position, a very large sentinel value) when the search fails — always check for it before using the result.

## `std::stringstream`: parsing and building text

`std::stringstream` lets you treat a string like a stream, extracting typed values with `>>` the same way you would from `std::cin`.

```cpp
#include <sstream>

std::string line = "AAPL,101.25,500";
std::stringstream ss(line);
std::string symbol, field;
double price;
int qty;

std::getline(ss, symbol, ',');
std::getline(ss, field, ',');
price = std::stod(field);
ss >> qty;
```

It also works in reverse — building a formatted string field by field:

```cpp
std::stringstream out;
out << symbol << " @ " << price << " x " << qty;
std::string report = out.str();   // "AAPL @ 101.25 x 500"
```

## File I/O with `<fstream>`

`std::ifstream` reads from a file, `std::ofstream` writes to one; both behave like any other stream once opened.

```cpp
#include <fstream>

std::ifstream in("prices.csv");
std::string line;
std::vector<double> prices;
while (std::getline(in, line)) {
    std::stringstream ss(line);
    std::string symbol, field;
    std::getline(ss, symbol, ',');
    std::getline(ss, field, ',');
    prices.push_back(std::stod(field));
}
in.close();

std::ofstream out("report.txt");
out << "Loaded " << prices.size() << " prices\n";
out.close();
```

Always check `in.is_open()` (or test the stream in a boolean context) before reading — a missing file doesn't throw by default, it just leaves the stream in a failed state.

## Putting it together: parsing a CSV line

Combining `getline` and `stringstream` is the standard pattern for row-by-row CSV parsing without pulling in a third-party library:

```cpp
struct Tick { std::string symbol; double price; long size; };

Tick parseTick(const std::string& csvLine) {
    std::stringstream ss(csvLine);
    std::string field;
    Tick t;
    std::getline(ss, t.symbol, ',');
    std::getline(ss, field, ','); t.price = std::stod(field);
    std::getline(ss, field, ','); t.size  = std::stol(field);
    return t;
}
```

## Key terms

| Term | Meaning |
|---|---|
| `std::string` | Owning, resizable text type with `+`, `substr`, `find`, etc. |
| `std::string::npos` | Sentinel returned by `find` when the search fails |
| `std::stringstream` | Treats a string as a stream for parsing (`>>`) or building (`<<`) text |
| `std::ifstream` / `std::ofstream` | Input/output file streams from `<fstream>` |
| `std::getline` | Reads a line (or up to a delimiter) from any stream |

## Recap

`std::string` and the stream classes (`stringstream`, `ifstream`, `ofstream`) share one consistent `>>`/`<<` interface for reading and writing text, which is why the same `getline` + `stringstream` pattern parses both an in-memory CSV line and an entire file. Next up, Lesson 19: Lambdas & Functional Style.
