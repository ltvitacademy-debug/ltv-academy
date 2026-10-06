# Capstone Kickoff

**Chapter 8 · Capstone · Lesson 35 of 37**

Seven chapters of Python syntax, data structures, OOP, environments, HTTP calls, async, and testing all lead here. The capstone is one project: a command-line tool that takes a prompt from the user, calls a real API, and prints a formatted result — built, tested, and debugged using exactly the tools this course covered.

## What you'll learn

- The capstone's scope: what you're building and what "done" looks like
- The specific skills from Chapters 1–7 this project pulls together
- How the two remaining lessons are structured
- A sketch of the file layout before writing any code

## What you're building

A small CLI tool, `ask.py`, that a user runs from a terminal like this:

```
python ask.py "Summarize the plot of Romeo and Juliet in two sentences."
```

It reads the prompt from the command line, sends it to an API, and prints the response — with real error handling if the network call fails, a `--help` flag, and a handful of unit tests proving the parts that don't need a live network call actually work.

## What "done" looks like

- Accepts a prompt as a command-line argument (not hard-coded)
- Makes a real HTTP call using `requests` (Chapter 5) with proper headers and error handling
- Handles a missing API key, a timeout, and a bad response without crashing with a raw traceback
- Has at least two `pytest` tests (Chapter 7) covering the parts that don't require a live network call
- Uses type hints (Chapter 7) on at least the main functions

## Skills this project pulls together

- **Ch1–2:** functions, error handling, dictionaries for parsing JSON responses
- **Ch3:** a small class to wrap the API client, the way Lesson 17 did
- **Ch4:** a `requirements.txt` so the project is reproducible
- **Ch5:** `requests`, headers, and the error-handling patterns from Lessons 22–26
- **Ch7:** type hints, a couple of real tests, and debugging technique if something breaks along the way

## The two lessons ahead

Lesson 36 is the build itself — the CLI's argument parsing, the client class, the API call, and error handling, piece by piece. Lesson 37 wraps up: running it for real, what to add next, and how to talk about this project in an interview.

## Recap

- The capstone is one CLI tool, `ask.py`, that takes a prompt as an argument and calls a real API.
- "Done" means: real CLI arguments, a real HTTP call with error handling, a few passing tests, and type hints on the main functions.
- This project deliberately reuses skills from every earlier chapter — it's a synthesis, not new material.
- Next lesson: building it, piece by piece.
