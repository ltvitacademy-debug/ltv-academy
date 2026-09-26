# Script — Jupyter Notebooks

## Segment 1 (title)

Most data work is a conversation. Load some data, look at it, try something, look again. Jupyter notebooks are built for that rhythm.

## Segment 2 (steps)

A notebook is a list of cells. Code cells hold Python, and you run one with Shift and Enter. Markdown cells hold headings and explanations, so you can write down why you are doing each step. Behind every notebook is a kernel, one running Python process that remembers every variable and import from every cell you have run.

## Segment 3 (code)

To start, activate your environment, run pip install jupyterlab, then jupyter lab. Your browser opens a workspace where you create a notebook. When a cell finishes, Jupyter shows the value of the last expression, so you do not even need print. And when that value is a pandas table, which you will meet in Chapter 3, Jupyter draws it as a neat, formatted table.

## Segment 4 (code)

Here is the trap that catches almost every beginner. Cell one sets x to ten. Cell two doubles x and shows it. Run them in order and you see twenty. Run cell two again, and you see forty, because the kernel remembers that x was already twenty. Nothing on screen warns you that the notebook has drifted from its top to bottom story.

## Segment 5 (steps)

Three habits prevent this. Restart the kernel and run all cells regularly. If the notebook survives, you can trust it. Watch the number beside each code cell, because it shows the real order cells ran in. And keep your notebook top to bottom, so anyone can follow it. Magic commands like percent timeit are handy for timing code, but they do not change these rules.

## Segment 6 (outro)

A trustworthy notebook is one that runs clean from a fresh kernel. Next lesson, we dig into the Python language itself: variables, types, and control flow.
