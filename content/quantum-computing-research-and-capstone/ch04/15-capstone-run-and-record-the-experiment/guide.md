# Capstone: Run & Record the Experiment

With the build validated (Lesson 14), it's time to actually submit jobs to real hardware. This lesson is about doing that in a way that produces a trustworthy, analyzable record — not just a folder of disconnected numbers.

## What you'll learn

- What metadata every real-hardware run needs recorded alongside the measurement data
- How to apply Lesson 4's controls (interleaving, fixed conditions) when you're the one submitting jobs, not just reading about it
- A practical run log format you can reuse for any capstone
- How to handle the realities of shared cloud hardware queues without compromising your experimental design
- A worked run log entry for the GHZ/ZNE capstone

## What metadata every run needs

Every job you submit to real hardware should have recorded, at the moment it runs, not reconstructed later from memory: the exact device name, the calibration/backend-properties timestamp (most providers expose this via an API call at run time), the exact circuit (ideally the literal transpiled circuit object, not just your source parameters), the shot count, and a timestamp for when the job was submitted versus when it actually executed (queue time itself is diagnostically useful data, not just overhead). Reconstructing this after the fact is unreliable — devices recalibrate, and "which device state did this run actually use" is unanswerable later if you didn't capture it at the time.

## Applying Lesson 4's controls in practice

Lesson 4 taught you to interleave control and treatment runs to average out hardware drift. In practice, on a real queue, this means: submit your control and treatment (or your two qubit-count conditions) jobs close together in real time rather than batching all of one condition on Monday and the other on Friday — even though the queue system, not you, ultimately decides exact execution order. If your provider's queue makes same-day execution of both conditions impractical, document that limitation explicitly in your run log and later in your report's limitations section (Lesson 20), rather than silently treating a drift-confounded comparison as controlled.

## A practical run log format

A simple structured log — one row per job — covering: run ID, date/time submitted, date/time executed, device name, calibration timestamp, circuit identifier (which qubit count, which scaling factor), shot count, and a link or path to the raw result data. This doesn't need to be sophisticated — a plain spreadsheet or a JSON-lines file is enough — but it needs to exist and be filled in *as you go*, not reconstructed afterward. This log is also exactly what Lesson 9's diagnostic checklist and Lesson 17's unexpected-results handling will need as raw material if anything looks off later.

## Realities of shared cloud hardware queues

Real queue behavior you should expect and plan around: queue position and wait time vary by time of day and overall platform demand; some providers prioritize differently for paid vs. free tiers; a device can go offline for maintenance mid-project, which may force a hardware switch you'll need to document as a real limitation, not hide. None of this is a flaw in your experimental design — it's the actual operating environment applied quantum computing research runs in, and documenting it honestly (rather than pretending your conditions were cleaner than they were) is itself good research practice.

## A worked run log entry

| Run ID | Submitted | Executed | Device | Calibration ts | Circuit | Shots | Data path |
|---|---|---|---|---|---|---|---|
| ghz3-zne-f1.0-run1 | 14:02 | 14:19 | ibm_[device] | 13:45 same day | 3-qubit GHZ, scale=1.0 | 1024 | /data/ghz3/f1.0_run1.json |
| ghz5-zne-f1.0-run1 | 14:03 | 14:41 | ibm_[device] | 13:45 same day | 5-qubit GHZ, scale=1.0 | 1024 | /data/ghz5/f1.0_run1.json |

Submitting the 3- and 5-qubit, scale=1.0 jobs within a minute of each other, both executing against the same calibration window, is exactly the interleaving Lesson 4 called for — made concrete and auditable.

## Key terms

| Term | Meaning |
|---|---|
| Calibration timestamp | A record of when a device's noise/error characteristics were last calibrated, essential for interpreting a run |
| Run log | A structured, as-you-go record of every job's metadata and data location |
| Queue time (as data) | The wait between job submission and execution, itself diagnostically relevant, not just overhead |

## Check yourself

A device goes offline for scheduled maintenance halfway through your planned runs, forcing you to finish on a different (but same-model) device. Using this lesson's guidance, what should you do about this in your run log and eventually your report, rather than just continuing as if nothing happened?
