# Multiprocessing & Parallelism

Vectorization, Numba, and Cython all speed up work on a single CPU core. Multiprocessing is a different lever entirely: running independent chunks of work on *multiple* cores at once. It's the right tool specifically for CPU-bound Python code, and understanding why requires understanding the one piece of CPython internals that makes threads the wrong tool for that job: the GIL.

## What you'll learn

- The GIL (Global Interpreter Lock) and why it makes threads useless for CPU-bound Python work
- `concurrent.futures.ProcessPoolExecutor` and `multiprocessing.Pool`
- `joblib.Parallel` as a higher-level, often more convenient alternative
- Serialization (pickling) overhead and why it matters for what you send to worker processes
- A real measured example, including a case where parallelism actively makes things worse

## The GIL: why threads don't help CPU-bound code

CPython — the standard Python implementation — has a **Global Interpreter Lock (GIL)**: at any instant, only one thread can be executing Python bytecode, even on a multi-core machine. Threads are genuinely useful in Python for I/O-bound work (waiting on a network request or disk read releases the GIL while waiting), but for CPU-bound work — the kind this chapter has been about, number crunching that keeps the CPU busy the whole time — multiple Python threads don't run truly in parallel at all; they take turns on one core. To actually use multiple cores for CPU-bound work, you need multiple *processes*, each with its own Python interpreter and its own GIL.

## `ProcessPoolExecutor` and `multiprocessing.Pool`

`concurrent.futures.ProcessPoolExecutor` is the modern, straightforward way to run a function across a pool of worker processes:

```python
from concurrent.futures import ProcessPoolExecutor

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def count_primes(n):
    return sum(1 for x in range(n, n + 20_000) if is_prime(x))

if __name__ == "__main__":
    chunks = [2_000_000 + i * 20_000 for i in range(16)]
    with ProcessPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(count_primes, chunks))
```

Note the `if __name__ == "__main__":` guard — required on Windows (and safe everywhere) because spawning a new process re-imports the module, and without the guard, that re-import would try to spawn the pool again, recursively. `multiprocessing.Pool` is the older, lower-level API that does the same basic job (`Pool(4).map(count_primes, chunks)`); `ProcessPoolExecutor` is generally the more convenient modern default, with the same `Future`-based interface as its thread-pool counterpart.

## `joblib.Parallel`: a higher-level alternative

`joblib` wraps multiprocessing with a more convenient, research-friendly API, and is already a dependency of scikit-learn and widely used in the broader data/quant Python stack:

```python
from joblib import Parallel, delayed

results = Parallel(n_jobs=4)(delayed(count_primes)(n) for n in chunks)
```

`delayed` wraps a function call so it can be queued up for a worker rather than executed immediately — the generator expression builds a list of deferred calls, and `Parallel` distributes them across `n_jobs` worker processes. For many research scripts, `joblib.Parallel` is less boilerplate than managing a `ProcessPoolExecutor` directly, especially when you're parallelizing something simple like a parameter sweep.

## Serialization overhead

Every argument sent to a worker process, and every return value sent back, has to be **pickled** (serialized) by the parent, sent across a pipe, and **unpickled** by the worker. For small, simple arguments (integers, short strings, small arrays) this overhead is negligible compared to real CPU-bound work. But if you're sending a huge DataFrame to every worker, or getting back a huge result, that serialization cost is real and can dominate the runtime — and it's a big part of why handing a *tiny* task to a worker process is often a net loss, as the next section measures directly.

## A real measured example — including when it backfires

Running the `count_primes` example above (16 chunks of CPU-bound primality checks) with `os.cpu_count() == 4` on this machine, measured with `time.perf_counter()`:

```
cpu_count: 4, chunks: 16
serial (single process):       2.258 s
ProcessPoolExecutor(2 workers): 1.338 s
ProcessPoolExecutor(4 workers): 1.119 s
```

Going from 1 to 2 workers roughly halved the time (2.258 → 1.338 s), and 4 workers improved on that further, though not to a full additional 2x — process startup and coordination overhead eat into the theoretical speedup, which is normal and expected.

Now the opposite case — a trivially cheap task (`x + 1`) run 200 times, serial vs. parallel:

```
serial tiny task x200:            0.025 ms
ProcessPoolExecutor tiny x200:  320.703 ms
```

The parallel version was over 12,000x *slower*. Spinning up a process pool and pickling 200 tiny tasks back and forth costs vastly more than the actual computation. This is the single most important practical lesson about multiprocessing: it has real, fixed per-task overhead, so it only pays off when each unit of work is expensive enough on its own — a rule of thumb is each task should take at least tens of milliseconds, ideally more, before parallelizing it across processes is worth considering.

## Key terms

| Term | Meaning |
|---|---|
| GIL (Global Interpreter Lock) | CPython's lock allowing only one thread to execute Python bytecode at a time |
| `ProcessPoolExecutor` | Modern pool of worker processes, each with its own interpreter and GIL |
| `joblib.Parallel` / `delayed` | Higher-level, lower-boilerplate parallel execution, common in the data/ML Python stack |
| Pickling | Serializing Python objects to send them to/from worker processes; has real overhead |
| Task granularity | How much work one parallelized task does; too small and overhead dominates |

## Recap

CPU-bound Python work needs multiple processes, not threads, because of the GIL; `ProcessPoolExecutor` and `joblib.Parallel` both distribute work across cores, but the measured examples showed real speedup on expensive tasks (roughly 2x with 4 workers here) and a dramatic *slowdown* (over 12,000x) when the task granularity was too small for the pickling and process overhead to be worth it. Next lesson closes Chapter 3 with a decision framework tying together profiling, complexity, Numba, Cython, and multiprocessing into one checklist for when Python is — and isn't — too slow.
