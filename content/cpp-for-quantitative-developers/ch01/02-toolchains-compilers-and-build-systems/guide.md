# Toolchains, Compilers & Build Systems

Before you can write a single meaningful C++ program, you need to understand the pipeline that turns source code into something the CPU can actually run. Unlike Python, there's no interpreter reading your code line by line — C++ is compiled ahead of time into machine code, through a chain of distinct tools. This lesson walks through that chain: the compiler, the stages it runs internally, and the build systems that manage compiling real, multi-file projects.

## What you'll learn

- The difference between a compiler, a linker, and a build system, and what each one actually does
- The four stages a C++ source file passes through on its way to an executable
- How to compile a single file by hand with `g++` or `clang++`
- Why real projects use a build system (CMake) instead of typing compiler commands by hand

## Compiler, linker, build system — three different jobs

It's easy to lump these together, but they solve different problems:

- **Compiler** (`g++`, `clang++`, MSVC's `cl.exe`) — translates one `.cpp` source file into machine code (an object file). It only ever looks at one translation unit at a time.
- **Linker** — combines multiple object files (and libraries) into a single executable or shared library, resolving references between them — e.g. your `main.cpp` calling a function defined in `pricer.cpp`.
- **Build system** (CMake, Make, MSBuild) — decides *which* files to compile, in what order, with what flags, and only recompiles what actually changed. For anything bigger than one file, you need this layer, or you'll be typing the same long command by hand forever.

## The four stages of compilation

Every `.cpp` file passes through four stages before it becomes part of a running program:

1. **Preprocessing** — handles everything starting with `#`: `#include` pastes in header file contents, `#define` expands macros, `#ifdef` includes or excludes code conditionally.
2. **Compilation** — translates the preprocessed C++ into assembly language for the target CPU architecture.
3. **Assembly** — the assembler turns that assembly code into an object file (`.o` on Linux/macOS, `.obj` on Windows) — machine code, but not yet a runnable program.
4. **Linking** — the linker stitches one or more object files together with any required libraries into a final executable.

You can see all four stages manually:

```cpp
// pricer.cpp
#include <iostream>

double fair_value(double spot, double rate, double time) {
    return spot * (1.0 + rate * time);
}

int main() {
    std::cout << fair_value(100.0, 0.05, 1.0) << "\n";
    return 0;
}
```

```bash
g++ -E pricer.cpp -o pricer.i      # stop after preprocessing
g++ -S pricer.i  -o pricer.s       # stop after compilation (assembly)
g++ -c pricer.s  -o pricer.o       # stop after assembly (object file)
g++ pricer.o     -o pricer         # link into final executable
./pricer                            # runs, prints 105
```

In practice you'd just run `g++ pricer.cpp -o pricer`, and the compiler driver runs all four stages for you — but knowing they exist matters once you hit a cryptic linker error and need to know which stage actually failed.

## Compiling by hand with a real command

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, quant world\n";
    return 0;
}
```

Save this as `hello.cpp` and compile it with:

```bash
g++ -std=c++20 -O2 -Wall -Wextra hello.cpp -o hello
```

- `-std=c++20` selects the C++20 language standard (this course targets C++17/20 features throughout).
- `-O2` enables optimization — important once you start measuring performance.
- `-Wall -Wextra` turns on extra compiler warnings; treat warnings as bugs waiting to happen.
- `-o hello` names the output executable `hello` (or `hello.exe` on Windows).

## Why real projects use CMake

A single `g++` command stops scaling the moment you have more than a handful of files, multiple platforms, or external libraries. CMake solves this by generating the actual build files (Makefiles, Visual Studio projects, Ninja files) from a simple, portable description:

```cmake
cmake_minimum_required(VERSION 3.20)
project(QuantPricer CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(pricer
    src/main.cpp
    src/pricer.cpp
)
```

A typical workflow: `cmake -B build` generates the build system into a `build/` directory, then `cmake --build build` compiles the project, recompiling only files that changed since the last build. Every production-grade C++ codebase you'll touch professionally is driven by a build system like this, not by hand-typed compiler invocations.

## Key terms

| Term | Meaning |
|---|---|
| Compiler | Translates one `.cpp` file into an object file of machine code |
| Translation unit | A single preprocessed `.cpp` file, as the compiler sees it |
| Linker | Combines object files and libraries into a final executable |
| CMake | A cross-platform tool that generates build files for a project description |

## Recap

Source code becomes a running program through four stages — preprocessing, compilation, assembly, and linking — carried out by a compiler and a linker, and for anything beyond a toy example, orchestrated by a build system like CMake rather than hand-typed commands. Next up, Lesson 3: Types, Variables & Control Flow, where you'll start writing the actual C++ that fills these files.
