# Lesson 2 — Installing Python & Environments

**Chapter 1 · Python Fundamentals · Lesson 2 of 37**

## What you'll learn

- Where to get the real Python installer (python.org, not a third-party site)
- The one installer checkbox that trips up almost every beginner
- How to confirm the install worked from a terminal
- What a virtual environment is, and why every real Python project uses one

## Get the real installer

Go to **python.org/downloads** and download the installer for your operating system directly from the official site. Avoid random "Python download" links from search ads or third-party download sites — you want the installer built and signed by the Python Software Foundation itself.

## The checkbox that matters most

When the Windows installer opens, it shows an **"Add python.exe to PATH"** checkbox — and it's unchecked by default. If you skip it, your computer won't know what `python` means when you type it in a terminal, and you'll get a confusing "not recognized" error later. Check that box before clicking **Install Now**. (On macOS, the official installer handles this automatically; Linux distributions usually ship Python already.)

## Confirm it worked

Once installed, open a terminal (Command Prompt, PowerShell, or Terminal on macOS) and run:

```
python --version
pip --version
```

Both should print real version numbers — something like `Python 3.12.4` and `pip 24.0`. If you get a "not recognized" error, the PATH checkbox above is almost always the cause.

## A code editor: VS Code + the Python extension

This course uses **Visual Studio Code**, a free editor from Microsoft. After installing VS Code, open the Extensions view and search "python" — install the official **Python extension from Microsoft** (the one with the blue checkmark, millions of installs). It adds syntax highlighting, autocomplete, and — critically — the ability to run and debug Python files directly inside the editor.

## Virtual environments: one project, one set of tools

A **virtual environment** is an isolated copy of Python just for one project, with its own installed packages, separate from every other project on your machine. Without one, installing a package for Project A can silently break Project B if they need different versions of the same library — a real, common problem once you're working on more than one thing. Create one with:

```
python -m venv .venv
```

This creates a `.venv` folder holding an isolated Python just for that project. In VS Code, use the **"Select Interpreter"** command to point the editor at `.venv`'s Python instead of your system-wide install — VS Code will mark it "Recommended" once it finds it. From then on, every package you install and every file you run uses that isolated environment. Chapter 4 of this path covers `venv` and `pip` in depth; for now, just know it exists and why it matters.

## Key terms

| Term | Meaning |
|---|---|
| PATH | A list of folders your OS searches when you type a command name |
| `python --version` | Confirms Python installed correctly and shows which version |
| Virtual environment | An isolated, per-project copy of Python and its installed packages |
| `.venv` | The conventional folder name for a project's virtual environment |

## Check yourself

Before Lesson 3, make sure `python --version` and `pip --version` both work in your terminal, and that you understand in one sentence why a virtual environment keeps one project's packages from breaking another's.
