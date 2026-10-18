# Recording Random Seeds, Shots & Backend Versions

Lesson 14 pins down *which code*. Lesson 15 pins down *which environment*. This lesson pins down the last piece: the specific run-time parameters — random seed, shot count, backend version — without which "reproduce this result" is still underspecified even with the first two solved.

## What you'll learn

- Why a random seed alone is not enough; the backend's own version also affects what a seed produces
- A structured metadata record to attach to every reported experimental result
- How to record seeds across multiple layers (simulator seed, transpiler seed) without missing one
- Why real-hardware runs need a different kind of record (calibration timestamp) instead of a seed
- A worked example assembling a complete, reproducible result record

## A seed alone isn't enough

`AerSimulator(seed_simulator=42)` makes a specific run's shot-by-shot outcomes reproducible, *given* a specific version of `qiskit-aer`. If the simulator's internal pseudorandom number generator algorithm or its usage pattern changes between versions — a real possibility during any major version transition (Chapter 1) — the same seed on a different version can produce different sampled outcomes. This means the random seed and the exact backend/SDK version (Lesson 15) have to be recorded *together*; neither one alone is sufficient.

## The layers of randomness in a real pipeline

A full pipeline often has more than one source of randomness that needs recording, not just the obvious "shots" seed:

- **`seed_simulator`** — controls the simulator's sampling of measurement outcomes from the underlying probability distribution.
- **`seed_transpiler`** — controls randomized heuristics the transpiler may use for qubit layout and routing (Lesson 6); this affects the *circuit structure* that actually runs, which can in turn affect noise sensitivity on real hardware.
- **Classical optimizer seed** — in a hybrid variational algorithm, the classical optimizer (e.g. a gradient-free optimizer's initial point or stochastic step) may have its own seed, entirely separate from anything quantum.

A result record that captures `seed_simulator` but not `seed_transpiler` or the optimizer's seed is only partially reproducible — re-running with the recorded simulator seed but a different transpiler seed can still produce a structurally different transpiled circuit.

## A structured metadata record

Attach a record like this to every reported result, ideally generated programmatically rather than typed by hand (so it can't silently drift from what actually ran):

```python
from dataclasses import dataclass, asdict
import json

@dataclass
class ExperimentRecord:
    git_commit: str
    experiment_tag: str
    sdk_name: str
    sdk_version: str
    backend_name: str
    seed_simulator: int | None
    seed_transpiler: int | None
    shots: int
    timestamp_utc: str

def save_experiment_record(record: ExperimentRecord, path: str):
    with open(path, "w") as f:
        json.dump(asdict(record), f, indent=2)

record = ExperimentRecord(
    git_commit="a1b2c3d",
    experiment_tag="exp-ghz-5q-2026-10-18",
    sdk_name="qiskit", sdk_version="1.2.4",
    backend_name="aer-simulator",
    seed_simulator=42, seed_transpiler=7,
    shots=1024, timestamp_utc="2026-10-18T14:30:00Z",
)
save_experiment_record(record, "results/exp-ghz-5q-2026-10-18/metadata.json")
```

Committing this JSON file alongside the tagged commit (Lesson 14) means every piece needed for reproduction — code, environment, and run-time parameters — lives in one retrievable place.

## Real hardware needs a different record: calibration timestamp

Real hardware has no "seed" in the simulator sense — physical noise isn't seeded pseudorandomness, it's a property of the device's current calibration state, which drifts over time (Chapter 1). For hardware runs, record the **calibration timestamp** (when the backend's error rates were last calibrated) instead of a seed, since that's the piece of context that actually explains why a hardware result might differ between two runs on the "same" backend weeks apart:

```python
record.backend_name = "ibm_brisbane"
record.seed_simulator = None  # not applicable to real hardware
record.calibration_timestamp = backend.properties().last_update_date.isoformat()
```

## Worked example: assembling a complete record

For a GHZ fidelity experiment on a simulator, the complete, reproducible record requires: the git tag (Lesson 14) identifying the code, the lockfile (Lesson 15) identifying the environment, and this lesson's `ExperimentRecord` identifying `seed_simulator=42`, `seed_transpiler=7`, `shots=1024`. Any one of these three missing makes the result non-reproducible even if the other two are present — they're jointly necessary, not independently sufficient.

## Key terms

| Term | Meaning |
|---|---|
| `seed_simulator` | A seed controlling a simulator's sampling of measurement outcomes from the underlying probability distribution |
| `seed_transpiler` | A seed controlling randomized transpiler heuristics (e.g. qubit layout), affecting which circuit structure actually runs |
| Experiment record | A structured, saved metadata file capturing every run-time parameter (seeds, shots, backend, version) needed to reproduce a result |
| Calibration timestamp | The recorded time a real hardware backend's error-rate calibration was last updated, used in place of a seed for hardware runs |

## Check yourself

A result record captures `seed_simulator=42` and `shots=1024` but not `seed_transpiler`. A later re-run with the recorded seed and shots still produces a visibly different fidelity number. Using this lesson's content, explain the most likely reason why.
