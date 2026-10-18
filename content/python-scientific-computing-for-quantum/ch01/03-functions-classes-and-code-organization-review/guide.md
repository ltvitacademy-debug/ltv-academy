# Functions, Classes & Code Organization Review

This course assumes you already know Python's basics, but quantum simulation code has a specific habit of turning into an unreadable pile of matrix literals if you don't organize it deliberately. This lesson reviews functions and classes through that exact lens — using a small `Qubit` class as the running example.

## What you'll learn

- How to write functions with clear inputs/outputs instead of relying on loose, order-dependent variables
- How to design a class with `__init__`, instance attributes, and methods around a real physics object
- The difference between a method that reads state (like computing a probability) and one that changes it (like applying a gate)
- How `__repr__` makes debugging numerical code dramatically easier
- Why organizing code around meaningful objects matters more as a simulation grows past a few lines

## Functions: inputs, outputs, and avoiding hidden state

A function should take what it needs as arguments and return what it computes — not silently depend on, or silently modify, variables sitting outside it. Compare two ways of computing a measurement probability from two real amplitudes:

```python
# Fragile: depends on global variables existing with the right names
alpha = 0.6
beta = 0.8

def prob_zero():
    return alpha ** 2          # reads a variable from outside the function

# Robust: everything the function needs comes in as a parameter
def prob_zero(alpha: float) -> float:
    return alpha ** 2
```

The second version can be tested, reused, and reasoned about in isolation — you can call `prob_zero(0.6)` from anywhere and know exactly what it depends on. The first version works only by accident, as long as nothing else in the file ever reassigns `alpha`. As simulations grow to dozens of gates and multiple qubits, that kind of hidden dependency is where bugs hide.

## Classes: bundling state and behavior together

A qubit has state (its amplitudes) and behavior (computing probabilities, applying gates). A class is how Python lets you bundle both into one object instead of passing a loose collection of numbers between functions:

```python
import numpy as np

class Qubit:
    def __init__(self, alpha: complex, beta: complex):
        self.alpha = alpha
        self.beta = beta

    def probabilities(self) -> tuple[float, float]:
        """Return (P(0), P(1)) for this qubit's current state."""
        p0 = abs(self.alpha) ** 2
        p1 = abs(self.beta) ** 2
        return p0, p1

    def apply_gate(self, gate: np.ndarray) -> "Qubit":
        """Return a NEW Qubit after applying a 2x2 gate matrix."""
        state = np.array([self.alpha, self.beta], dtype=complex)
        new_state = gate @ state
        return Qubit(new_state[0], new_state[1])

    def __repr__(self) -> str:
        return f"Qubit(alpha={self.alpha:.4f}, beta={self.beta:.4f})"
```

```python
q = Qubit(0.6, 0.8)
p0, p1 = q.probabilities()
print(p0, p1)   # 0.36 0.64
print(q)        # Qubit(alpha=0.6000, beta=0.8000)
```

`Qubit(0.6, 0.8)` is already a valid, normalized state, since `0.6**2 + 0.8**2 == 1.0` — unlike the `[1, 0]` basis state from the previous lesson, this one has a genuine, unequal split between outcomes: a 36% chance of measuring `0` and a 64% chance of measuring `1`.

## Methods that read vs. methods that change

Notice that `probabilities()` only reads `self.alpha`/`self.beta` and returns new values — it never changes the qubit. `apply_gate()`, by contrast, returns a brand-new `Qubit` instance rather than overwriting `self.alpha`/`self.beta` in place. This is a deliberate design choice, not an accident: keeping state transformations explicit (old qubit in, new qubit out) makes it much easier to track, in a longer simulation, exactly which gate produced which state — you can keep every intermediate `Qubit` around and inspect it, rather than overwriting the same variable repeatedly and losing the history.

## Why `__repr__` earns its place immediately

Without a `__repr__` method, printing a `Qubit` object gives you Python's default, nearly useless output, something like `<__main__.Qubit object at 0x000001A2B3C4D5E6>` — a memory address, not the information you actually need while debugging. Defining `__repr__` once, as shown above, means every `print(q)` or bare `q` in a notebook cell shows you the actual amplitudes. This is a small amount of code that pays for itself the first time you're staring at a dozen qubit objects trying to figure out which one has the wrong state.

## Organizing a small simulation as it grows

For a single qubit and a couple of gates, you could write everything as loose functions. The moment you have multiple qubits, multiple gates, and code that applies gates in sequence, a class-based structure like `Qubit` keeps related data and behavior together instead of scattering `alpha`/`beta` pairs across many function arguments. The rule of thumb used throughout this course: if a group of values always travels together and has operations that only make sense on that group, it belongs in a class; if a computation is a pure, standalone transformation (like the `prob_zero` function above), a function is enough and a class would be overkill.

## Key terms

| Term | Meaning |
|---|---|
| Hidden state | A function silently reading or modifying a variable from outside its own parameters, making its behavior depend on invisible context |
| Instance attribute | Data stored on a specific object (e.g. `self.alpha`), set in `__init__` and available to every method on that object |
| `__repr__` | A class method controlling how an object prints/displays, essential for debugging numerical objects at a glance |
| Immutable update pattern | Returning a new object with updated state (as `apply_gate` does) instead of modifying the existing object in place |

## Check yourself

The `apply_gate` method returns a brand-new `Qubit` instead of modifying `self.alpha` and `self.beta` directly. Explain one concrete debugging advantage this design gives you once a simulation chains together five or six gates in a row.
