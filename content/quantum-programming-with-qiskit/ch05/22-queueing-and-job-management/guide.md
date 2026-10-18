# Queueing & Job Management

Running on a simulator feels instant: submit, wait a fraction of a second, get results back in the same breath. Real IBM Quantum hardware is a shared resource used by many people at once, which means your job doesn't just run — it waits in line first, and understanding that lifecycle is part of actually using hardware well.

## What you'll learn

- The real job lifecycle: submit, queue, run, complete — all tracked by a job ID
- How to check job status and retrieve results, even after closing your session
- Why free-tier queue wait times vary and where to check them for real
- Why batching circuits into one job submission beats submitting many small jobs separately

## Submitting a job with a Runtime primitive

Jobs on real hardware go through a Runtime primitive — `SamplerV2` for getting measurement outcome distributions, or `EstimatorV2` for getting expectation values of observables. Submitting returns a job object immediately, before the job has actually run:

```python
from qiskit_ibm_runtime import SamplerV2 as Sampler

sampler = Sampler(mode=backend)
job = sampler.run([compiled_circuit], shots=4096)
print(job.job_id())
```

That `job.job_id()` string is your handle on this specific submission. Submission is asynchronous: your code doesn't block waiting for the hardware to actually execute the circuit — it hands the job to IBM's queue and gets back an ID you can check on later.

## The real job lifecycle

A submitted job moves through states you can poll:

```python
print(job.status())
```

Typical states include `QUEUED` (waiting behind other jobs on the same backend), `RUNNING` (currently executing on the hardware), `DONE` (finished successfully), and `ERROR` or `CANCELLED` (something went wrong, or you or the system cancelled it). Because the backend is shared, `QUEUED` is often where a job spends most of its real-world wall-clock time — not because anything is broken, but because other users' jobs are ahead of yours.

## Retrieving results later, even after closing your session

Because jobs run asynchronously server-side, you don't have to keep your Python session open and waiting. You can close everything, come back later — even from a different machine — and pull up the same job by its ID:

```python
retrieved_job = service.job(job_id)
result = retrieved_job.result()
```

This matters practically: if a job is going to sit in a multi-hour queue, there's no reason to leave a notebook running the whole time. Save the job ID, close the session, and retrieve the result whenever it's actually done.

## Free-tier queueing realities

Wait times on shared, lower-priority access tiers can range anywhere from a few minutes to many hours, depending on how popular the specific backend is and your account's priority tier at the time. There is no fixed number that stays true — it depends on real-time demand across everyone using that backend. Don't plan around a specific wait-time estimate from a tutorial or a course; check the current queue status directly on the IBM Quantum Platform dashboard, and expect it to vary noticeably between backends and over the course of a day.

## Job-management hygiene: batch your circuits

Each job submission effectively gets its own place in the shared queue. If you have ten circuits you want to run, submitting them as ten separate jobs means waiting through ten separate queue positions. Runtime primitives accept a list of circuits in a single `run()` call:

```python
job = sampler.run([circuit_1, circuit_2, circuit_3], shots=4096)
```

Batching like this submits all of them under one job ID, in one queue position, which is almost always faster in practice than submitting them one at a time — and it's considerate of the shared resource everyone else is also waiting on.

## Key terms

| Term | Meaning |
|---|---|
| Job ID | The unique identifier returned when a job is submitted, used to check status or retrieve results later |
| `job.status()` | Returns the job's current lifecycle state: `QUEUED`, `RUNNING`, `DONE`, `ERROR`, or `CANCELLED` |
| `service.job(job_id)` | Retrieves a previously submitted job by ID, even in a new session, since execution happens server-side |
| Queue | The shared, ordered line of jobs waiting to run on a given backend; most real-world wait time happens here |
| Batching | Submitting multiple circuits in one `run()` call instead of many separate job submissions, to avoid queueing repeatedly |

## Check yourself

You have five circuits you want to run on real hardware, and you know the backend you're targeting has a long queue right now. Explain, using what you learned about job submission and queueing, why submitting all five as one batched job is likely to get you all five results sooner than submitting them as five separate jobs.
