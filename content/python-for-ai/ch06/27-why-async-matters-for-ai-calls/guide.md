# Why Async Matters for AI Calls

**Chapter 6 · Async Python for AI Workloads · Lesson 27 of 37**

Every AI API call you've made so far in this course has been synchronous: your program stops dead, waits for the response, and only then moves to the next line. That's fine for one call. It falls apart the moment your program needs to make ten.

## What you'll learn

- Why AI API calls are "I/O-bound" and what that means for your program
- What a synchronous program is actually doing while it waits on a network response
- Why the cost of waiting compounds when you call multiple APIs one at a time
- Why async — not more CPU, not more threads by default — is the right fix for this specific problem

## The synchronous bottleneck

```python
import time
def call_ai_api(prompt):
    time.sleep(1)   # simulated network wait
    return f"response to: {prompt}"

start = time.time()
call_ai_api("hello")
print(f"{time.time()-start:.1f}s")  # 1.0s — nothing else happened that whole second
```

`time.sleep(1)` here is standing in for what a real call to an AI provider does: send bytes over the network, wait for the model to generate a response, receive bytes back. Python has nothing useful to do during that second, so it just... waits.

## Three calls, one at a time

```python
start = time.time()
call_ai_api("summarize doc 1")
call_ai_api("summarize doc 2")
call_ai_api("summarize doc 3")
print(f"{time.time() - start:.1f}s")
# 3.0s — each call waits for the one before it to finish first
```

Nothing here overlaps. Call two doesn't start until call one is completely done, even though call one spent its entire second doing nothing but waiting. Ten calls at a second each is ten full seconds, guaranteed, no matter how fast your own code is.

## I/O-bound vs. CPU-bound

This distinction is why async is the right tool here specifically:

- **CPU-bound** work (crunching numbers, looping over a big list) keeps the processor busy the whole time. Async doesn't help — the CPU is the bottleneck.
- **I/O-bound** work (waiting on a network response, reading a file, waiting on a database) leaves the CPU sitting idle while something *else* — a server, a disk — does the work. This is exactly what an AI API call looks like.

Async exists to fix the second case: instead of a CPU idling through every wait, it lets your program start another task during that idle time.

## What's coming

The next three lessons build up to running the three-call example above concurrently — all three requests in flight together, finishing in roughly one second total instead of three. That starts with the `async` and `await` keywords themselves.

## Recap

- Synchronous code blocks completely while it waits on network I/O — the CPU does nothing useful during that time.
- AI API calls are slow enough (often a full second or more) that blocking adds up fast once you make more than one.
- "I/O-bound" means the CPU is idle, not busy — exactly the condition async is built to exploit.
- Async won't make a single call faster; it lets you overlap *multiple* slow calls instead of serializing them.
- Next lesson: the `async` and `await` keywords themselves.
