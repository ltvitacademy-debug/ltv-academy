# Setting Up the Q# Development Environment

Before you can allocate a single qubit, you need somewhere for Q# code to actually compile and run. Unlike Qiskit, where `pip install qiskit` gets you most of the way there, Q# has two genuinely different real entry points, and picking the right one matters for how the rest of this course will feel.

## What you'll learn

- The two real ways to write and run Q# today, and when each makes sense
- How to install the modern Azure Quantum Development Kit (QDK)
- What a minimal Q# project looks like on disk
- How to run your first program locally against the built-in simulator
- Why Azure Quantum itself isn't touched yet at this stage

## The two real entry points

Today's QDK gives you two legitimate ways to work, and they're not interchangeable conveniences — they suit different workflows:

**Standalone `.qs` project, driven by VS Code.** You install the "Azure Quantum Development Kit (QDK)" extension from the VS Code marketplace. It gives `.qs` files syntax highlighting, real-time type checking, and — critically — a "▷ Run" code lens that appears directly above any operation marked `@EntryPoint()`. Click it (or use the Debug lens) and VS Code compiles and runs the program against the local simulator, showing the result in the output panel. This is the closest Q# equivalent to running a standalone script, and it's the right choice when your quantum program is the whole deliverable — not a step inside a larger Python analysis.

**Python/Jupyter via the `qsharp` package.** You `pip install qsharp qsharp-widgets` instead. Inside a notebook, `import qsharp` gives you a Python object you use to compile and run Q# source, either by writing Q# into a `%%qsharp` notebook cell or by passing Q# source strings into `qsharp.eval(...)` / `qsharp.run(...)` from Python. This is the right choice when you want to pull measurement histograms into Python plotting, feed results into existing Python code, or — later in this course — use `qsharp-widgets` to render an Azure Quantum resource-estimate report inline in a notebook. (This is the successor to the older, now-retired standalone IQ# Jupyter kernel; the modern approach is this `qsharp` Python package, not a separate kernel install.)

Both entry points compile the exact same Q# language — you're not learning two different dialects, just two different harnesses around the same compiler.

## Installing the modern QDK

For the VS Code path: install VS Code itself if you don't have it, then open the Extensions panel and install "Azure Quantum Development Kit (QDK)" from Microsoft. No separate .NET SDK or Python install is required for this path — the extension bundles its own compiler.

For the Python/Jupyter path: you need a working Python 3 environment, then:

```bash
pip install qsharp qsharp-widgets
```

`qsharp-widgets` is optional for simple runs but required later for rendering resource-estimate reports and histograms directly in a notebook cell.

## What a minimal Q# project looks like

A standalone Q# project is just a folder with two things: a small JSON manifest named `qsharp.json` at the project root (its presence is what tells the VS Code extension "this folder is a Q# project," so things like multi-file compilation work correctly), and a `src/` directory holding your `.qs` source files, conventionally starting with `src/Main.qs`:

```
my-first-project/
├── qsharp.json
└── src/
    └── Main.qs
```

Inside `src/Main.qs`, every runnable program needs exactly one operation marked `@EntryPoint()` — that's what the Run code lens and the compiler look for as the program's starting point:

```qsharp
namespace MyFirstProject {
    @EntryPoint()
    operation Main() : Result {
        use q = Qubit();
        H(q);
        return M(q);
    }
}
```

If you're working in Jupyter instead, you don't need a `qsharp.json`/`src/Main.qs` structure at all — you write the operation directly in a `%%qsharp` cell and call it from a plain Python cell afterward with `qsharp.run("MyFirstProject.Main()", shots=100)`.

## Running locally before touching Azure Quantum

Everything above runs entirely on your machine, against the QDK's built-in simulator — no Azure account, subscription, or workspace is involved yet. The simulator comes in two flavors you'll meet by name later in the course: a sparse-state simulator (efficient for programs with limited entanglement) and a full-state simulator (exact, but its memory cost doubles with every additional qubit). For now, the point is simply that local simulation is the default, zero-setup way to check that a Q# program compiles and behaves as expected, before any Azure Quantum resource estimation or hardware submission enters the picture — those come later in this course once an Azure Quantum workspace is actually needed.

## Key terms

| Term | Meaning |
|---|---|
| QDK (Azure Quantum Development Kit) | The current official Q# toolchain, distributed as a VS Code extension and as the `qsharp`/`qsharp-widgets` Python packages |
| `@EntryPoint()` | The attribute marking which operation a Q# program starts execution from |
| `qsharp.json` | The manifest file at a Q# project's root that marks the folder as a Q# project |
| `%%qsharp` cell magic | The Jupyter cell marker that lets you write raw Q# source directly inside a notebook cell |
| Local simulator | The QDK's built-in simulator that runs a Q# program on your own machine with no Azure account required |

## Check yourself

You're prototyping a short Q# operation and want to immediately pull its measurement results into a Python plotting library (matplotlib) for a histogram. Which of the two entry points described above would you set up, and what's the first command or click that gets you a running program?
