# Thread Pools & Task-Based Parallelism

Creating a `std::thread` per unit of work is fine for two or three long-running jobs, but it falls apart once you have thousands of small, short tasks — pricing a thousand options, say. Creating and destroying an OS thread has real overhead, and the OS context-switches between too many threads instead of doing useful work. This lesson introduces the thread pool: a fixed set of worker threads that pull tasks from a shared queue, plus `std::async`/`std::future` for getting a result back from a task.

## What you'll learn

- Why one-thread-per-task doesn't scale, and what a thread pool fixes
- The shape of a minimal thread pool: fixed workers, a task queue, a condition variable
- `std::async` and `std::future` for a simpler, single-task version of the same idea
- Why task granularity (how big each task is) matters for a pricing workload

## The problem with one thread per task

Suppose you need to price a thousand options, independently, as fast as possible. Launching a thousand `std::thread`s is a bad idea: each OS thread reserves its own stack (often megabytes), thread creation and teardown cost real, measurable time, and the OS scheduler has to context-switch between far more threads than you have CPU cores, which wastes time rather than saving it.

## The fix: a fixed pool of workers

A thread pool starts a small, fixed number of worker threads — typically close to `std::thread::hardware_concurrency()`, the number of cores available — and keeps them alive for the program's lifetime. Work is submitted as small units (tasks) onto a shared queue; each worker loops, pulling a task off the queue and running it, using exactly the mutex/condition_variable pattern from Lesson 22:

```cpp
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <functional>
#include <vector>

class ThreadPool {
public:
    explicit ThreadPool(size_t n) {
        for (size_t i = 0; i < n; ++i) {
            workers_.emplace_back([this] { worker_loop(); });
        }
    }

    void submit(std::function<void()> task) {
        {
            std::lock_guard<std::mutex> lk(m_);
            tasks_.push(std::move(task));
        }
        cv_.notify_one();
    }

    ~ThreadPool() {
        {
            std::lock_guard<std::mutex> lk(m_);
            stop_ = true;
        }
        cv_.notify_all();
        for (auto& w : workers_) w.join();
    }

private:
    void worker_loop() {
        while (true) {
            std::function<void()> task;
            {
                std::unique_lock<std::mutex> lk(m_);
                cv_.wait(lk, [this] { return stop_ || !tasks_.empty(); });
                if (stop_ && tasks_.empty()) return;
                task = std::move(tasks_.front());
                tasks_.pop();
            }
            task();   // run outside the lock
        }
    }

    std::vector<std::thread> workers_;
    std::queue<std::function<void()>> tasks_;
    std::mutex m_;
    std::condition_variable cv_;
    bool stop_ = false;
};
```

Threads are created once, in the constructor. `submit()` just pushes a task and wakes a worker; the same number of OS threads handles any number of submitted tasks, which is the whole point.

## std::async: a simpler single-task tool

For a one-off "run this and give me the result later," `std::async` is much less code than building a pool, and it returns a `std::future<T>` you can call `.get()` on to retrieve the result (blocking if it isn't ready yet):

```cpp
#include <future>

double price_option(double spot, double strike);

int main() {
    std::future<double> fut = std::async(std::launch::async, price_option, 100.0, 105.0);
    // ... do other work while it prices ...
    double price = fut.get();   // blocks until ready, then returns the result
}
```

`std::launch::async` requests a genuinely separate thread; without it, the implementation is allowed to run the task lazily on whatever thread calls `.get()`, which can surprise you if you were counting on real concurrency. For many independent tasks, a thread pool (or a library built on one) is the better tool — `std::async` tends to create a new thread per call, with the exact same scaling problem a hand-rolled one-thread-per-task loop has.

## Task granularity matters

A thread pool only helps if each task does enough work to be worth the overhead of queuing and dequeuing it. Submitting a thousand tasks that each do one multiplication wastes more time coordinating than computing; submitting ten tasks that each price a hundred options amortizes that overhead across real work. As a rule of thumb for a pricing workload, chunk the work so each task takes at least tens of microseconds — profiling (Lesson 30) is how you confirm the right chunk size for your actual workload.

## Key terms

| Term | Meaning |
|---|---|
| Thread pool | A fixed set of long-lived worker threads pulling tasks from a shared queue |
| `std::async` | Runs a callable asynchronously, possibly on a new thread, returning a `std::future` |
| `std::future<T>` | A handle to a result that may not be ready yet; `.get()` blocks until it is |
| `hardware_concurrency()` | Reports the number of concurrent threads the hardware can usefully run |
| Task granularity | How much work one submitted task does; too fine wastes time on overhead |

## Recap

One thread per task doesn't scale past a handful of jobs; a thread pool amortizes thread-creation cost across a fixed set of workers pulling from a shared queue, and `std::async`/`std::future` give you the same idea for a single ad hoc task. Getting the task size right matters as much as the pool itself. Next up, Lesson 25: Lock-Free Ideas Overview, a conceptual look at what it takes to coordinate threads without locks at all.
