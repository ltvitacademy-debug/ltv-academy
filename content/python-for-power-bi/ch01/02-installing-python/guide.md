# Lesson 2 — Installing Python for Power BI

**Chapter 1 · Getting Started · Lesson 2 of 20**

## What you'll learn

- Where to get the right Python installer for Power BI
- The one checkbox during setup that saves you a real headache later
- Installing the two libraries Power BI's Python integration actually requires
- How to confirm the install worked, before you ever open Power BI

## Getting the right installer

Download Python from the official source — **python.org**, not the
Microsoft Store version. Power BI's Python integration runs scripts
directly through `python.exe` from a folder you point it at (Lesson 3), and
the Microsoft Store's sandboxed install can cause exactly the kind of path
problems that make that connection fail. Grab the current stable release
for Windows.

## The one setup checkbox that matters

During installation, check **Add python.exe to PATH** on the very first
screen, before clicking "Install Now." Skipping this is the single most
common reason a working Python install still can't be found later — by
Power BI, or by anything else on your machine that expects to run `python`
from a terminal.

## Installing the two required libraries

Power BI's Python integration needs exactly two libraries beyond Python
itself. Open a terminal (Command Prompt or PowerShell) and run:

```
pip install pandas
pip install matplotlib
```

**Pandas** is what makes data import possible at all — Power BI can only
pull in a Pandas DataFrame, nothing else (Lessons 6-7 cover this
structure in depth). **Matplotlib** is what powers the Python visual
Lesson 19 builds. `pip` is Python's package installer; it ships with every
modern Python installer automatically, so there's nothing extra to set up
before running these two commands.

## Confirming it worked

Before touching Power BI at all, confirm the install from the same
terminal:

```
python --version
pip show pandas
pip show matplotlib
```

Each command should print a real version number. If `python --version`
comes back with an error instead, the PATH checkbox from earlier was
likely missed — reinstall and check it this time, rather than trying to
work around it.

## What's next

With Python, Pandas, and Matplotlib installed and confirmed, Lesson 3
walks through the Power BI-side setting that actually connects the two —
the exact screen where you point Power BI Desktop at this installation.

## Key terms

| Term | Meaning |
|---|---|
| `pip` | Python's package installer, used to add libraries like Pandas |
| PATH | The system setting that lets you run `python` from any terminal |
| Pandas | The library Power BI requires for any Python-sourced data |
| Matplotlib | The plotting library behind Power BI's Python visual |

## Lab

1. Download and install Python from python.org, checking **Add python.exe
   to PATH** during setup.
2. Open a terminal and run `pip install pandas` followed by
   `pip install matplotlib`.
3. Confirm all three with `python --version`, `pip show pandas`, and
   `pip show matplotlib` — each should return a real version number
   before you move on.

## Check yourself

You're ready for Lesson 3 when `python --version`, `pip show pandas`, and
`pip show matplotlib` all return real version numbers in your terminal —
not an error.
