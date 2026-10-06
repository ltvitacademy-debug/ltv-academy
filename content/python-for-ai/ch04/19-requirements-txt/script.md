# Lesson 19 — requirements.txt · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A virtual environment isolates one project's packages, but it only lives
on your machine. requirements.txt is the plain-text file that lets
anyone — a teammate, a server, your future self on a new laptop — rebuild
that exact same environment with one command.

## S2 · CODE: What's in the file

It's just a plain list — one package per line, with a version. requests,
openai, python-dotenv, pytest, each pinned to an exact release. No special
syntax beyond that.

## S3 · CODE: Generating it automatically

Rather than typing this by hand, pip freeze lists every package currently
installed in your active environment, at the exact version installed.
Redirect it straight into a file, and you've captured your entire
environment in one command.

## S4 · CODE: Installing from the file

On a different machine, or a fresh environment on the same one, create a
new venv, activate it, and run pip install dash r requirements dot txt.
One command, and you end up with an environment that matches the original
exactly.

## S5 · CODE: Pinning styles

Double equals pins an exact version — the safest choice for an
application you deploy, since everyone gets identical behavior. Greater
than or equal, or a range, is looser — more common in a published library
that wants to stay compatible across versions rather than forcing one
exact one.

## S6 · OUTRO CARD

One file, one command, and anyone can reproduce your exact environment.
Next lesson: what happens when two packages in that file want conflicting
versions of the same dependency.
