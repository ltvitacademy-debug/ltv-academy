# Lesson 20 — Testing an API Wrapper

**Chapter 4 · Building a Simple API Wrapper · Lesson 20 of 22**

## What you'll learn

- Why tests for `AIClient` shouldn't call the real API
- Mocking `session.post` so tests are fast, free, and deterministic
- Writing a test that proves the retry loop from Lesson 18 actually works
- The shape of a healthy test suite for a client like this one

## Why not call the real API in tests

A real call costs real money, takes real network time, and — the real
problem — isn't deterministic. You can't reliably make the live API
return a `429` on command just to test your retry logic. Tests for
`AIClient` should test *your code's behavior*, not Anthropic's servers.

## Mocking the HTTP call

Python's `unittest.mock` lets you replace `session.post` with a stand-in
that returns whatever you tell it to, without a real network call:

```python
from unittest.mock import patch, MagicMock

def test_send_message_success():
    client = AIClient(api_key="test-key")
    fake_resp = MagicMock(status_code=200)
    fake_resp.json.return_value = {"content": [{"text": "Hi!"}]}

    with patch.object(client.session, "post", return_value=fake_resp):
        result = client.send_message("claude-sonnet-5", [])

    assert result["content"][0]["text"] == "Hi!"
```

No API key, no network, no cost — and it runs in milliseconds.

## Proving the retry loop actually works

This is the real payoff: you can simulate a `429` followed by a success,
and prove Lesson 18's retry loop does what it claims:

```python
def test_retries_on_rate_limit():
    client = AIClient(api_key="test-key")
    rate_limited = MagicMock(status_code=429, headers={})
    success = MagicMock(status_code=200)
    success.json.return_value = {"content": [{"text": "ok"}]}

    with patch.object(client.session, "post",
                       side_effect=[rate_limited, success]):
        with patch("time.sleep"):  # don't actually wait in tests
            result = client.send_message("claude-sonnet-5", [])

    assert result["content"][0]["text"] == "ok"
```

`side_effect` makes the mock return a different response each call —
`429` first, then success — and patching `time.sleep` means the test
doesn't actually pause for real seconds.

## A healthy test suite for this client

Most tests should be exactly like these: mocked, fast, covering your
client's logic (retries, error types, header parsing). A small handful of
separate **integration tests**, that do call the real API, are useful too
— but they cost money and shouldn't run automatically on every commit.

## Key terms

| Term | Meaning |
|---|---|
| Mock | A stand-in object that returns controlled, fake data |
| `side_effect` | Makes a mock return different values on successive calls |
| Unit test | Fast, isolated test of your code's logic, no real network call |
| Integration test | A slower test against the real API, run deliberately |

## Lab

Write a test, `test_raises_after_exhausting_retries`, that gives the mock
three consecutive `429` responses and asserts `client.send_message(...)`
raises `RateLimitError`.

## Check yourself

Why does `test_retries_on_rate_limit` patch `time.sleep` as well as
`session.post`? What would happen to the test if it didn't?
