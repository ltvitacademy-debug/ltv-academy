# Lesson 18 — venv & pip · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every real Python project depends on third-party libraries — requests,
openai, anthropic, pandas. This lesson covers the two tools that make
installing those libraries safe and project-specific: venv and pip.

## S2 · STEPS: The isolation problem and its fix

Without a virtual environment, every project shares one global Python
install. Project A needs one version of a library, Project B needs
another, and installing one breaks the other. A virtual environment fixes
that: its own Python, its own installed packages, completely isolated per
project.

## S3 · CODE: Creating and activating a venv

python dash m venv dot venv creates an isolated environment folder.
Activate it — Scripts Activate ps1 on Windows, source bin activate on Mac
and Linux — and your prompt shows dot venv to confirm it's active. Run
deactivate with no arguments to leave it and return to your system
Python.

## S4 · CODE: Installing with pip

With the environment active, pip install only touches this project's
isolated copy, never your system Python. Pin an exact version with double
equals when you need reproducibility. pip list shows what's installed, pip
uninstall removes a package.

## S5 · CODE: Confirming which Python you're using

A classic beginner trap: you installed a package, but your code still
can't find it, because the venv was never actually activated. Running
this one-liner tells you exactly which Python executable is active — it
should point inside dot venv, not your system install.

## S6 · OUTRO CARD

One command to create an isolated environment, one to activate it, and
pip installs packages only inside it. Next lesson: requirements.txt, which
captures an entire environment's packages in one reproducible file.
