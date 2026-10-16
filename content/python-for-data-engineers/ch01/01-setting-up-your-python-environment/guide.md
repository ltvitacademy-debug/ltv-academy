# Lesson 1 — What Is Python & Setting Up Your Environment

**Chapter 1 · Python for Data Engineers · Lesson 1 of 48**

## What you'll learn

- What Python actually is, and why it's the default language for data
  engineering work (not just "popular" — specifically useful for this job)
- Installing Python and confirming it's on your PATH
- The difference between the Python REPL (interactive shell) and running
  a saved `.py` script — and why real pipelines live in scripts, not the REPL
- `print()`, comments, and your first real script

## What is Python, and why data engineers use it

Python is a general-purpose, interpreted language — you write code, and
the Python interpreter reads and runs it directly, with no separate
compile step. That matters for data engineering because most of the job
is: pull data from somewhere (a file, an API, a database), reshape it,
and push it somewhere else. Python has mature, well-tested libraries for
every one of those steps — `pandas` for reshaping tables, `requests` for
APIs, `pyodbc`/`sqlalchemy` for databases — which is why it became the
default glue language for pipelines, over something like Java or C++.
You'll meet all of those libraries later in this course. Chapters 1 and
2 are the core language underneath all of them.

## Installing Python and checking your setup

Download Python from [python.org](https://www.python.org/downloads/)
(on Windows, check "Add Python to PATH" during install). Once it's
installed, confirm it from a terminal:

```bash
python --version
```

You should see something like `Python 3.12.4`. This course assumes
Python 3.10 or newer — a few things you'll see later (like certain
dictionary and type-hint behaviors) depend on a reasonably recent
version. If `python` isn't recognized, the installer didn't add it to
your PATH, and you'll need to reinstall with that box checked, or add
it manually.

## REPL vs. running a script

Type `python` alone at a terminal and you land in the REPL (Read-Eval-Print
Loop) — an interactive prompt where each line runs immediately:

```python
>>> 2 + 2
4
>>> print("checking the connection")
checking the connection
```

The REPL is great for testing a one-liner or checking how a function
behaves. But it disappears the moment you close the terminal — nothing
you typed is saved. A real pipeline needs to run unattended, on a
schedule, the same way every time, which means it has to live in a
saved file. Create `check_setup.py` in a folder for this course:

```python
# check_setup.py
print("Python is installed and ready.")
print("This script will become a data pipeline by Chapter 6.")
```

Run it from the terminal with:

```bash
python check_setup.py
```

That `python <filename>.py` pattern — running a saved script from the
terminal — is how every real script in this course gets executed,
including every ETL pipeline you'll build starting in Chapter 6.

## Comments and print()

The line starting with `#` above is a comment — Python ignores it
entirely. Comments exist for the next human reading the file (often
you, in six months), not for the interpreter. Use them to explain *why*
a piece of code exists, not to restate what it obviously does:

```python
# Good: explains a non-obvious reason
# Skipping rows with a blank customer_name — see ticket DE-204.

# Not useful: just restates the code
# This adds 1 to count.
count = count + 1
```

`print()` writes text to the terminal. It looks trivial, but it's your
primary debugging tool for the next few chapters, before you learn
proper logging in Chapter 7 — when a script doesn't behave the way you
expect, a well-placed `print()` showing you a variable's value is often
the fastest way to find out why.

## Key terms

| Term | Meaning |
|---|---|
| Interpreter | The program that reads and runs your Python code directly, with no separate compile step |
| REPL | Interactive prompt (`python` with no file) where each line runs immediately and nothing is saved |
| Script | A saved `.py` file you run with `python filename.py`; how real, repeatable code is stored |
| Comment | Text after `#`, ignored by the interpreter, written for human readers |
| `print()` | Writes text to the terminal — your main tool for checking what a script is doing |

## Lab

Create a script called `intro.py` that:

1. Prints your name and the message `"is starting the Python for Data
   Engineers course."`
2. Prints a comment-documented line that prints the current chapter
   number and lesson number using two variables, `chapter` and `lesson`,
   set to `1` and `1`.
3. Run it from the terminal with `python intro.py` and confirm the
   output appears exactly as you expect.

```python
# intro.py
name = "Your Name"
print(name, "is starting the Python for Data Engineers course.")

# Tracking position in the course
chapter = 1
lesson = 1
print("Currently on chapter", chapter, "lesson", lesson)
```

## Check yourself

Without looking back: why does a real pipeline need to live in a saved
script instead of being typed into the REPL each time? And what's the
difference between what a comment does for Python versus what it does
for you?
