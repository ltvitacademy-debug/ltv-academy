# Working With Jupyter Notebooks

Almost every example in the rest of this course — NumPy experiments, plots, small quantum simulations — is meant to be run and modified interactively, one piece at a time, rather than executed top-to-bottom as a single script. Jupyter notebooks are the standard tool for that style of work in scientific Python, and this lesson covers how to use one effectively.

## What you'll learn

- What a notebook actually is: cells, a kernel, and persistent state between runs
- The difference between code cells and Markdown cells, and when to use each
- How execution order (not just top-to-bottom order on the page) determines what a notebook actually does
- Useful built-in "magic" commands for scientific work
- How to export a notebook and why that matters for sharing results

## Cells, the kernel, and persistent state

A notebook is a sequence of **cells** — small, independently runnable chunks of code or text — connected to a single running Python process called the **kernel**. When you run a code cell, its code executes in the kernel, and any variables it defines stay alive in the kernel's memory for every other cell to use, not just the one where they were defined:

```python
# Cell 1
x = np.array([1, 0], dtype=complex)
```

```python
# Cell 2 (run after Cell 1)
print(x)   # [1.+0.j 0.+0.j]  -- x is still in memory from Cell 1
```

This persistence is what makes notebooks good for exploration: you can build up a NumPy array in one cell, inspect it, tweak a gate matrix in the next cell, and re-run just that part without re-running everything from scratch. It is also the single most common source of notebook confusion — more on that below.

## Code cells vs. Markdown cells

A notebook mixes two cell types. **Code cells** run Python and show output directly beneath them (printed text, a number, a plot). **Markdown cells** render formatted text — headings, bullet points, bold/italic, even LaTeX math like `$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$` — and are meant for explaining what the surrounding code is doing, not for running anything. A well-organized notebook alternates between the two: a Markdown cell explaining what's about to happen, then a code cell doing it, repeated down the page. This is also exactly the shape this course's own lesson guides follow — explanation, then a runnable example.

## Execution order is not reading order

The most important thing to internalize about notebooks: **the order cells actually ran in the kernel is not necessarily the order they appear on the page.** Each executed code cell shows a number in brackets, like `In [3]:`, recording which execution it was — the third thing run in that kernel session, regardless of where it sits visually. If you run cell 1, then cell 2, then go back and edit cell 1 and run it again, cell 1 now shows a *higher* execution number than cell 2, even though it's physically above it. This is exactly how a notebook "works when I run cells in this order" but then fails, confusingly, the moment someone runs it top-to-bottom with **Restart Kernel and Run All**. That command is the real test of whether a notebook is actually correct: it clears all kernel memory and reruns every cell strictly in page order, exposing any hidden dependency on an earlier out-of-order run.

## Useful magic commands

Jupyter supports special commands, called **magics**, prefixed with `%` (affecting one line) or `%%` (affecting the whole cell), that aren't plain Python but are handled by the notebook environment itself:

```python
%matplotlib inline      # show plots directly below the cell that made them
%who                     # list every variable currently defined in the kernel
%reset -f                # clear all variables from the kernel (use before Run All to sanity-check)
```

`%timeit` is especially relevant for this course once you start comparing a vectorized NumPy operation against a plain Python loop over the same data — it runs a line of code repeatedly and reports timing statistics for it. The exact numbers it reports depend on your specific machine and current system load, so this course won't print invented timing results; run `%timeit` yourself when you want to see how much a vectorized NumPy call actually saves on your hardware.

## Exporting and sharing a notebook

A notebook file (`.ipynb`) stores cells, their outputs, and metadata as JSON — it's not a plain `.py` script, and it won't run with `python notebook.ipynb`. To share results outside the notebook environment, you export:

```bash
jupyter nbconvert --to script my_notebook.ipynb    # produces a plain .py file
jupyter nbconvert --to html my_notebook.ipynb       # produces a shareable, static HTML page with outputs
```

Exporting to a plain script is also a useful correctness check in its own right: if the exported `.py` file runs top-to-bottom without errors, that's further confirmation the notebook doesn't secretly depend on cells having been run out of their page order.

## Key terms

| Term | Meaning |
|---|---|
| Kernel | The single running Python process behind a notebook; holds all variables currently in memory across every cell |
| Cell | An individual runnable (code) or renderable (Markdown) block making up a notebook |
| Execution count (`In [n]`) | The number showing which numbered run in the kernel session produced a given cell's current output, independent of page position |
| Magic command | A special `%` or `%%`-prefixed instruction handled by the notebook environment itself rather than by the Python interpreter |
| Restart Kernel and Run All | The command that clears kernel memory and reruns every cell strictly top-to-bottom, the real test of whether a notebook works independent of out-of-order execution |

## Check yourself

You run cells in the order 3, 1, 2 while exploring, and everything works. A classmate opens your notebook and chooses "Restart Kernel and Run All," and it fails with a `NameError`. Using what you learned about execution order, explain what almost certainly went wrong and how you would track it down.
