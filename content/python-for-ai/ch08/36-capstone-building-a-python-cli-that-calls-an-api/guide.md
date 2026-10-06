# Capstone: Building a Python CLI Tool That Calls an API

**Chapter 8 · Capstone · Lesson 36 of 37**

Time to build `ask.py` for real. This lesson walks through every piece in order: parsing a command-line argument, wrapping the API call in a small class, handling the failures that actually happen over a network, and writing tests for the parts that don't need a live connection.

## What you'll learn

- Laying out the project's three files before writing any logic
- Parsing a CLI argument with `argparse`
- Wrapping the API call in a class, the way Lesson 17 did
- Handling real failure modes without a raw traceback
- Testing the client with a mocked network call

## The file layout

```
ask-cli/
├── ask.py            # CLI entry point + client class
├── requirements.txt  # requests, pytest — pinned
└── test_ask.py       # unit tests, mocking the network
```

Three files, deliberately small. `ask.py` holds both the command-line logic and the API client; `test_ask.py` stays separate so the tests can import from `ask.py` without running it.

## Parsing the CLI argument

```python
import argparse

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Ask an AI API a question.")
    parser.add_argument("prompt", help="The prompt to send")
    return parser.parse_args()
```

`argparse` is the standard-library way to build a CLI. `add_argument("prompt", ...)` makes `prompt` a required positional argument — run `ask.py` with no prompt, and `argparse` prints a usage message and exits on its own, no extra code needed.

## The client class

```python
class CompletionClient:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def ask(self, prompt: str) -> str:
        resp = requests.post(URL, json={"prompt": prompt})
        resp.raise_for_status()
        return resp.json()["text"]
```

This is the same pattern from Lesson 17: a class that holds configuration (`api_key`) in `__init__` and exposes one clear method, `ask()`. `resp.raise_for_status()` — from Lesson 24 — turns a bad HTTP status into an exception immediately, instead of silently returning garbage.

## Handling failures without crashing

```python
try:
    print(client.ask(args.prompt))
except requests.exceptions.Timeout:
    print("Error: request timed out", file=sys.stderr)
    sys.exit(1)
except requests.exceptions.HTTPError as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
```

A real CLI tool shouldn't dump a raw Python traceback at a user. Catching the specific `requests` exceptions from Chapter 5 and printing a one-line message to `stderr` — with a non-zero `sys.exit(1)` so other programs can detect the failure — is what separates a script from a tool.

## Testing the client without a live network call

```python
from unittest.mock import patch

def test_ask_returns_text_on_success():
    client = CompletionClient(api_key="fake")
    with patch("ask.requests.post") as mock_post:
        mock_post.return_value.json.return_value = {"text": "hi"}
        assert client.ask("hello") == "hi"
```

`unittest.mock.patch` replaces `requests.post` with a fake version for the duration of the `with` block, so the test runs instantly and never touches the real network — exactly the kind of test Lesson 31's checklist called for.

## Recap

- Three small files: `ask.py` (CLI + client), `requirements.txt`, `test_ask.py`.
- `argparse` handles argument parsing and usage messages with almost no code.
- The client class follows Lesson 17's pattern: config in `__init__`, one clear method.
- Catching specific exceptions and exiting with a clear message is what makes this a tool, not a script.
- `unittest.mock.patch` lets you test the client's logic without a real network call.
- Next lesson: running the finished tool, and wrapping up the capstone.
