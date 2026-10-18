# The QuantumCircuit Class

Every circuit you'll ever build in Qiskit, no matter how advanced, starts from the same object: `QuantumCircuit`. It's the blueprint — a container that records which qubits exist, which classical bits exist, and the ordered sequence of operations you apply to them, before anything is ever simulated or run.

## What you'll learn

- The two quickest ways to construct a `QuantumCircuit`
- How to build a circuit from explicit `QuantumRegister` and `ClassicalRegister` objects, and why you'd bother
- How to inspect a circuit visually with `qc.draw()`
- The structural properties `num_qubits` and `depth()` and what they actually mean
- Why `QuantumCircuit` is a static plan, not a running computation

## Building a circuit the quick way

The fastest way to get a working circuit is to pass `QuantumCircuit` the number of qubits you want, and optionally the number of classical bits:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2)        # 2 qubits, 0 classical bits
qc2 = QuantumCircuit(2, 2)    # 2 qubits, 2 classical bits
```

This is the pattern you'll use constantly for quick experiments. The qubits are unnamed and addressed only by integer index (`0`, `1`, ...), which is perfectly fine for small, throwaway circuits where you don't need descriptive labels.

## Building a circuit with explicit registers

Once circuits get larger, or once you're combining multiple logical groups of qubits into one circuit, addressing everything by bare integer gets confusing. `QuantumRegister` and `ClassicalRegister` let you name a group of bits and build the circuit from those named groups instead:

```python
from qiskit import QuantumRegister, ClassicalRegister, QuantumCircuit

qr = QuantumRegister(2, 'q')
cr = ClassicalRegister(2, 'c')
qc = QuantumCircuit(qr, cr)
```

This produces a circuit functionally identical to `QuantumCircuit(2, 2)`, but now the qubits and classical bits carry the register name `q` and `c` in diagrams and in any multi-register circuit, which matters a lot once a circuit combines, say, a `QuantumRegister(3, 'data')` and a `QuantumRegister(1, 'ancilla')` — the names tell you at a glance which qubits are doing what job. You'll see this pattern again once algorithms need dedicated "helper" qubits that aren't part of the main computation.

## Inspecting a circuit with `draw()`

A `QuantumCircuit` object by itself is just data — a list of instructions. To actually see the circuit as a diagram, call `.draw()`:

```python
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

print(qc.draw())           # ASCII/text diagram, works anywhere
qc.draw('mpl')              # matplotlib rendering, for notebooks/scripts that display figures
```

The default `draw()` call renders a text diagram directly in your terminal or notebook output — no extra dependencies required. Passing `'mpl'` instead renders a proper graphical circuit diagram using Matplotlib, which is the version you'll usually want when presenting a circuit or debugging visually in a notebook. Get comfortable reading the text version first, since it's the one you'll see most often while iterating quickly.

## Structural properties: `num_qubits` and `depth()`

A `QuantumCircuit` object exposes properties that describe its own shape, independent of what any simulation produces:

```python
qc = QuantumCircuit(3)
print(qc.num_qubits)   # 3
print(qc.depth())      # 0
```

`num_qubits` is simply how many qubits the circuit was built with. `depth()` counts the longest chain of sequentially-dependent operations in the circuit — roughly, how many "layers" of gates have to happen one after another. A freshly created circuit with no gates added yet has a depth of exactly `0`, since there's nothing sequential to count. As you add gates, depth grows, and later lessons will use it to reason about how long a circuit takes to run on real hardware, where every extra layer is extra time for errors to creep in.

## Key terms

| Term | Meaning |
|---|---|
| `QuantumCircuit` | Qiskit's core object representing a circuit as an ordered sequence of gates on a fixed set of qubits/classical bits |
| `QuantumRegister` | A named, sized group of qubits used to build a circuit with readable labels instead of bare integers |
| `ClassicalRegister` | A named, sized group of classical bits, typically used to receive measurement outcomes |
| `qc.draw()` | Renders the circuit as a diagram; default is text, `qc.draw('mpl')` gives a graphical Matplotlib version |
| `num_qubits` | The total number of qubits a circuit was constructed with |
| `depth()` | The number of sequential "layers" of operations in a circuit; an empty circuit has depth `0` |

## Check yourself

You're about to build an algorithm that needs 3 "data" qubits and 1 separate "ancilla" (helper) qubit, and you want the eventual circuit diagram to clearly show which qubits belong to which group. Would you reach for `QuantumCircuit(4)` or for explicit `QuantumRegister` objects, and why?
