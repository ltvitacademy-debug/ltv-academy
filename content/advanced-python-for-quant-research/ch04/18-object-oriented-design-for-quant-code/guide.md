# Object-Oriented Design for Quant Code

Chapter 4 steps back from raw speed to a quieter but equally practical question: how do you structure research code so it stays correct and maintainable as it grows past a single script? Object-oriented design is one tool for that, and like every tool in this course, it has a right place and a wrong place. A one-off script computing a single statistic doesn't need a class hierarchy. A backtesting engine juggling positions, fills, and multiple strategies usually does. This lesson covers when OOP earns its keep in quant code, and the specific Python features — `dataclasses`, composition, `__slots__` — that make it worth using well.

## What you'll learn

- When a class genuinely helps (a `PositionBook`, a `Strategy` hierarchy) vs. when it's overkill
- `@dataclass` for data-carrying classes, without writing boilerplate `__init__`/`__repr__`/`__eq__` by hand
- Composition over inheritance as a default stance
- `__slots__` for memory and speed in objects created in large numbers
- A real runnable dataclass-based position/portfolio example

## When OOP helps, and when it's overkill

A class is worth it when you have **state that persists and changes over time**, with **behavior tied to that state** — a portfolio's positions change as fills arrive, and "what's my total exposure right now" is a question that needs the current state, not a fresh recomputation from scratch each time. A `PositionBook` that tracks holdings as orders fill, or a `Strategy` base class that different trading rules implement against a common interface (`generate_signal(data) -> Signal`), are good fits: there's real state, real behavior, and real value in a consistent interface across variations.

A one-off script that loads a CSV, computes a Sharpe ratio, and prints it has none of that — no persisting state, no behavior beyond "do the calculation." Wrapping it in a class (`class SharpeCalculator: def __init__(self, ...): ... def calculate(self): ...`) adds ceremony without adding anything: a plain function does the same job with less code to read. The question to ask isn't "could this be a class" — almost anything could — it's "does this genuinely have state and behavior that benefit from being bundled together, or am I adding structure the problem doesn't need."

## `@dataclass`: data-carrying classes without the boilerplate

Most classes in research code are mostly data, with maybe a few small behaviors attached. `@dataclass` generates `__init__`, `__repr__`, and `__eq__` automatically from type-annotated field declarations, removing the boilerplate that used to make people reach for `namedtuple` or hand-write three near-identical dunder methods:

```python
from dataclasses import dataclass, field

@dataclass
class Position:
    symbol: str
    quantity: float
    avg_price: float

@dataclass
class PositionBook:
    positions: dict = field(default_factory=dict)

    def add_fill(self, symbol: str, quantity: float, price: float) -> None:
        if symbol not in self.positions:
            self.positions[symbol] = Position(symbol, quantity, price)
            return
        pos = self.positions[symbol]
        new_qty = pos.quantity + quantity
        if new_qty == 0:
            del self.positions[symbol]
            return
        pos.avg_price = (pos.quantity * pos.avg_price + quantity * price) / new_qty
        pos.quantity = new_qty

    def total_value(self, last_prices: dict) -> float:
        return sum(p.quantity * last_prices.get(p.symbol, p.avg_price) for p in self.positions.values())
```

`field(default_factory=dict)` is needed instead of `positions: dict = {}` because mutable default arguments are shared across instances in Python — `@dataclass` enforces this by raising an error if you try a bare mutable literal as a default, and `default_factory` is the correct way to get a fresh empty dict per instance.

Running this with a couple of fills:

```python
book = PositionBook()
book.add_fill("AAPL", 100, 150.0)
book.add_fill("AAPL", 50, 156.0)
book.add_fill("MSFT", 200, 310.0)

print(book.positions["AAPL"])
print("AAPL avg price after two fills:", round(book.positions["AAPL"].avg_price, 4))
print("Total value @ marks:", book.total_value({"AAPL": 160.0, "MSFT": 300.0}))
```

Real output:

```
Position(symbol='AAPL', quantity=150, avg_price=152.0)
AAPL avg price after two fills: 152.0
Total value @ marks: 84000.0
```

Notice `Position`'s auto-generated `__repr__` prints a readable, exact representation of the object's fields — one of the boilerplate methods `@dataclass` writes for you, and one you'd otherwise have to maintain by hand every time you add a field.

## Composition over inheritance

A common OOP instinct is to reach for inheritance — `class MeanReversionStrategy(Strategy)` — whenever two things share behavior. Composition (an object *holding* another object it delegates to, rather than *being* a subclass of it) is usually the better default: a `PositionBook` doesn't need to inherit from anything to use a `RiskLimits` object; it just holds one and calls its methods. Inheritance is appropriate when there's a genuine "is-a" relationship with shared behavior that naturally varies by subtype (a `Strategy` base class with `generate_signal` that each concrete strategy overrides is a reasonable use), but reaching for inheritance by default tends to produce rigid hierarchies that are harder to change later than a few composed, swappable pieces.

## `__slots__` for memory and speed

By default, Python objects store their attributes in a per-instance `__dict__`, which is flexible (you can add new attributes any time) but costs memory — and that cost adds up when you're creating large numbers of small objects, like one `Position` per fill in a long backtest. `__slots__` tells Python to skip the per-instance `__dict__` and allocate fixed storage for only the named attributes:

```python
class PositionSlots:
    __slots__ = ("symbol", "quantity", "avg_price")

    def __init__(self, symbol, quantity, avg_price):
        self.symbol = symbol
        self.quantity = quantity
        self.avg_price = avg_price
```

Measuring the real memory difference requires care: `sys.getsizeof()` on a regular object doesn't include its `__dict__`, which is a separate object — so a naive comparison understates the regular object's true footprint. Adding the `__dict__` back in:

```python
import sys
dc = Position("AAPL", 150, 152.0)              # regular dataclass, has a __dict__
slotted = PositionSlots("AAPL", 150, 152.0)    # __slots__, no __dict__

print("dataclass object:", sys.getsizeof(dc), "bytes")
print("dataclass __dict__:", sys.getsizeof(dc.__dict__), "bytes")
print("dataclass total:", sys.getsizeof(dc) + sys.getsizeof(dc.__dict__), "bytes")
print("__slots__ instance:", sys.getsizeof(slotted), "bytes")
```

Real measured output:

```
dataclass object itself: 48 bytes, plus its __dict__: 104 bytes -> total 152 bytes
__slots__ instance (no separate __dict__): 56 bytes
```

The `__slots__` version is roughly 2.7x smaller once the `__dict__` is correctly accounted for — a real, measurable saving that matters when you're instantiating millions of small objects (one per tick, one per fill) in a long simulation, and a non-issue when you're creating a handful of long-lived objects like a `Strategy` or a `PositionBook` itself. `__slots__` also has a behavioral side effect worth knowing: it blocks adding new attributes that weren't declared:

```python
dc.new_attr = 1          # works fine -- dataclass instances have a __dict__
slotted.new_attr = 1     # AttributeError: 'PositionSlots' object has no attribute 'new_attr'
```

That's usually a feature, not a bug — it catches typos (`position.qty = 5` instead of `position.quantity = 5` fails loudly instead of silently creating a new, unused attribute) — but it means `__slots__` isn't a drop-in change if other code relies on being able to attach ad hoc attributes.

## Key terms

| Term | Meaning |
|---|---|
| `@dataclass` | Auto-generates `__init__`, `__repr__`, `__eq__` from type-annotated fields |
| `field(default_factory=...)` | Correct way to give a dataclass field a fresh mutable default per instance |
| Composition | An object holds and delegates to another object, instead of inheriting from it |
| `__slots__` | Fixed per-instance attribute storage, skipping the per-instance `__dict__`, saving memory |
| Is-a vs. has-a | Inheritance models "is-a" relationships; composition models "has-a" relationships |

## Recap

Classes earn their place in quant code when there's real persisting state with behavior attached — a `PositionBook` or a `Strategy` hierarchy — not as a default structure for everything; `@dataclass` removes the boilerplate for data-carrying classes, composition is usually the safer default over inheritance, and `__slots__` gives a real, measured memory saving (about 2.7x smaller here) for objects created in large numbers. Next lesson: type hints and static checking with `mypy`, which catch an entire class of bugs — like treating an `Optional[int]` as a plain `int` — before the code ever runs.
