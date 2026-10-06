# Capstone: Wrap-Up & Portfolio Presentation

**Chapter 8 · Capstone · Lesson 37 of 37**

`ask.py` is built, tested, and handles failure without crashing. This final lesson covers running it end to end, what a strong next step looks like, and how to talk about this project — and this course — in an interview.

## What you'll learn

- Running the finished tool and reading its real output
- Three realistic next features, if you want to keep building
- How to describe this project in an interview, specifically
- What the next course in this path builds on top of everything here

## Running it for real

```
export API_KEY="sk-..."
python ask.py "What is a coroutine, in one sentence?"

# A coroutine is a function that can pause its own execution
# and resume later, instead of running start to finish in one go.
```

```
pytest test_ask.py
# 2 passed in 0.08s
```

That's the whole loop: set a real credential as an environment variable (Lesson 25's pattern, not a hard-coded string), run the tool with a real prompt, and run the test suite separately to confirm the logic still holds without needing that credential at all.

## Three realistic next steps

- **A `--model` flag** — let the user pick which model to call, with `argparse`'s `default=` and `choices=`
- **Retry on transient failure** — wrap the request in a small retry loop for a 429 or 503, with a short backoff
- **Async batch mode** — accept a file of prompts and process them with `asyncio.gather()` from Lesson 30, instead of one at a time

None of these are required for "done" — they're the kind of additions that turn a finished capstone into an ongoing portfolio piece.

## Talking about this project in an interview

Lead with the decisions, not just the result: *why* a class instead of a bare function (state plus one clear interface), *why* `return_exceptions=True` or specific exception handling instead of a bare `except:`, *why* the tests mock the network instead of hitting it. Interviewers remember a candidate who can explain a tradeoff more than one who can only describe what the code does.

## The course, in one line

Seven chapters took you from `print("hello")` to a tested, type-hinted CLI tool that calls a real API concurrently and recovers from failure — that arc *is* the job, compressed into one project.

## Recap

- Running `ask.py` end to end means a real environment variable, a real prompt, and a separate test run that needs neither.
- Realistic next steps: a `--model` flag, retry logic, and async batch mode using Lesson 30's `gather()` pattern.
- In an interview, explain the *decisions* behind the code, not just what it does.
- Next course in the AI Engineer path: **Git & GitHub for Software Engineers** — version control for exactly the kind of project you just built.
