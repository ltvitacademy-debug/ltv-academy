# The qsharp Python Package Workflow

Calling one operation from Python, as in the previous lesson, is the smallest possible example. The real workflow — initializing a target profile, running many shots efficiently, inspecting resource estimates, and submitting to Azure Quantum — is what you'll actually use on a real project.

## What you'll learn

- How `qsharp.init(...)` configures what you're compiling against
- The difference between `qsharp.eval(...)` for one-off calls and `qsharp.run(...)` for repeated sampling
- How to get resource-estimate data from Python, not just the CLI
- How the `azure-quantum` package's `Workspace`/`submit()` fits in as the next step after local development

## Initializing the session

`qsharp.init(...)` sets up the compilation target before you run anything — in particular, the **target profile**, which determines what subset of Q# language features and gate sets you're compiling against (a profile matching a real hardware target is more restrictive than the default simulator-oriented profile, since real fault-tolerant-era hardware won't support arbitrary mid-circuit classical logic the way a simulator can):

```python
import qsharp

qsharp.init(target_profile=qsharp.TargetProfile.Base)
```

Choosing the right profile early matters because code that compiles fine against the permissive default profile can fail to compile against a restrictive hardware-oriented profile — catching that mismatch locally, before submission, is exactly what initializing against the right profile up front is for.

## `qsharp.run(...)` for repeated sampling

The previous lesson's `Counter` over a Python loop works, but it calls back into the Q# runtime once per shot. `qsharp.run(...)` does the equivalent sampling natively, in one call, which is both faster and the more idiomatic way to collect many shots:

```python
results = qsharp.run("PrepareAndMeasure()", shots=1000)
# results is a Python list of 1000 outcomes, e.g. ['Zero', 'One', 'Zero', ...]
```

This is the version you'd actually use once you're past a one-off sanity check and into real experiment code — the Python-level loop from the previous lesson is worth knowing because it shows exactly what's happening underneath, but `qsharp.run(...)` is what you'd call in practice.

## Getting resource estimates from Python

The resource estimator from Chapter 3 isn't CLI-only — the same `qsharp` package can produce an estimate directly in a Python session, letting you fold "is this even feasible on future hardware" into the same script or notebook as your correctness checks:

```python
estimate = qsharp.estimate("MyAlgorithm()")
print(estimate)   # structured report: physical qubits, runtime, logical qubits, error budget
```

Keeping this in the same Python session as your development loop means you can, for example, sweep a few algorithm variants and compare their resource-estimate reports side by side with `pandas`, without ever leaving the notebook.

## Handing off to Azure Quantum with `azure-quantum`

Once you're ready to move beyond local simulation, the `azure-quantum` package's `Workspace` connects the same compiled program to a real workspace target:

```python
from azure.quantum import Workspace

workspace = Workspace(
    subscription_id="<subscription-id>",
    resource_group="rg-quantum-dev",
    name="qsharp-dev-workspace",
    location="eastus",
)

job = workspace.submit(qsharp_program, target="ionq.simulator", shots=1000)
```

This is the same submission model from Chapter 3's lessons, just invoked from the same Python session you've been developing in, rather than switching to the CLI — `qsharp` handles local compilation and simulation, `azure-quantum` handles the cloud submission, and both operate on the same underlying compiled program.

## Key terms

| Term | Meaning |
|---|---|
| Target profile | A `qsharp.init(...)` setting controlling which Q# language/gate-set subset you compile against |
| `qsharp.run(shots=N)` | Native repeated sampling of an operation, returning a Python list of outcomes |
| `qsharp.estimate(...)` | Produces a resource-estimate report from Python, without leaving the session |
| `azure-quantum` Workspace | The Python object connecting a compiled program to a real Azure Quantum workspace for job submission |

## Check yourself

Why might code that compiles and runs fine under the default target profile fail to compile under a more restrictive hardware-oriented profile -- and why is catching that locally, before submission, more valuable than discovering it after a real job fails?
