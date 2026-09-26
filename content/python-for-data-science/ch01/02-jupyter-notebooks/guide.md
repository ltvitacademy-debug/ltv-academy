# Jupyter Notebooks

Most data work does not happen in a single script that you run top to bottom. It happens as a conversation: load some data, look at it, try a transformation, look again, draw a chart, adjust. A **Jupyter notebook** is built for exactly that rhythm. It lets you write a few lines of Python, run them, and see the result directly underneath, then carry on from where you left off.

This lesson shows you how to start Jupyter, how cells work, and the one trap that catches almost every beginner: hidden state.

## What you'll learn

- What a notebook is: cells, a kernel, and saved output
- How to launch JupyterLab and run cells
- How notebooks display results, including tables
- Why running cells out of order causes confusing bugs
- How to use Markdown cells and a few helpful magic commands

## Starting Jupyter

Activate your project environment from Lesson 1, then install and launch JupyterLab:

```bash
pip install jupyterlab
jupyter lab
```

Your browser opens a workspace showing your project folder. Choose Python 3 under Notebook to create a new file with the `.ipynb` extension. (The classic Jupyter Notebook interface and the notebook editor built into VS Code work the same way; the concepts here apply to all of them.)

## Cells and the kernel

A notebook is a list of **cells**. There are two kinds you will use constantly:

- **Code cells** hold Python. Press Shift+Enter to run the cell and move to the next one.
- **Markdown cells** hold formatted text: headings, bullet lists, explanations. Use them to write down why you are doing each step.

Behind the notebook is a **kernel**, a running Python process. Every code cell you run is sent to that one kernel, which remembers everything: every variable, every import, every function you have defined. That memory is what makes notebooks feel interactive, and it is also where the trouble starts.

## How results appear

When a cell finishes, Jupyter displays the value of the **last expression** in the cell. You do not need `print`:

```python
total = 100
total * 2
```

The output shown under that cell is `200`. If you do use `print`, the printed text appears first, and then the last expression's value is shown after it. When the last expression is a pandas DataFrame, which you will meet in Chapter 3, Jupyter renders it as a formatted table rather than plain text. Charts from matplotlib show up inline too.

## The hidden state trap

Because the kernel remembers everything, the order in which you run cells matters, not the order in which they appear on the page. Consider two cells:

```python
# Cell 1
x = 10

# Cell 2
x = x * 2
x
```

Run Cell 1, then Cell 2, and you see `20`. Now run Cell 2 again without touching Cell 1. You see `40`, because `x` is already 20 when the cell runs a second time. Nothing on the screen warns you that the notebook has drifted away from its top-to-bottom story.

This is how a notebook ends up "working" on your machine but failing for a colleague: it depended on a variable you deleted from the page but not from the kernel's memory. Two habits prevent it:

1. Regularly choose **Restart Kernel and Run All Cells** from the Kernel menu. This wipes the memory and runs every cell from the top. If the notebook survives, it is trustworthy.
2. Notice the number in the brackets beside each code cell. It is the order the cells actually ran in. If the numbers are jumbled, the story is jumbled.

## Handy extras

Jupyter's underlying shell, IPython, supports **magic commands** that begin with a percent sign. Two useful ones:

```python
%timeit sum(range(1000))
```

`%timeit` runs a statement many times and reports the average time, useful when comparing two ways of doing something. Lines starting with an exclamation mark run in the system shell, so `!python --version` prints the Python version from inside a notebook. Output will vary by machine; the mechanics are the point.

## Saving and sharing

A notebook file is JSON that stores your code and, by default, the outputs from the last run. That is convenient for sharing results and inconvenient for version control, and we will handle both in Chapter 7. For now, remember that a notebook saved with outputs still needs a clean Restart and Run All before you trust it.

## Recap

- A notebook is a list of code and Markdown cells backed by one kernel that remembers everything.
- The last expression in a cell is displayed automatically.
- Run order matters. Use Restart Kernel and Run All Cells to check your work.
- Next lesson: variables, types, and control flow, the core of the Python language itself.
