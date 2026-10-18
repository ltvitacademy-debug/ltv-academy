# plot_histogram & Measurement Results

A counts dictionary like `{'00': 503, '11': 521}` is correct but hard to read at a glance. `plot_histogram` turns it into the bar chart you'd actually put in a report or a slide.

## What you'll learn

- How to call `plot_histogram` on a counts dictionary returned by a simulator or hardware run
- How to read the resulting bar chart: what the x-axis and y-axis represent
- How to compare two runs side by side with `plot_histogram([counts1, counts2], legend=[...])`
- What a real Bell-state histogram looks like, bar by bar, from verified numbers
- Why a zero-count outcome simply doesn't appear as a bar at all

## Turning counts into a chart

Once you have a counts dictionary from a run, visualizing it is one import and one function call:

```python
from qiskit.visualization import plot_histogram
from qiskit_aer import AerSimulator
from qiskit import transpile

sim = AerSimulator()
compiled = transpile(qc, sim)
result = sim.run(compiled, shots=1024).result()
counts = result.get_counts()

plot_histogram(counts)
```

`plot_histogram` takes the dictionary you already know how to read — keys are bitstrings, values are shot counts — and draws one vertical bar per bitstring that appears in the dictionary. The x-axis lists the measured outcomes (bitstrings such as `'00'`, `'01'`, `'10'`, `'11'`); the y-axis is either the raw count or, depending on the call, the normalized probability. There's no new data here — it's the exact same counts dictionary, just laid out so a human can compare bar heights instead of scanning dictionary values.

## Reading a real Bell-state histogram

Take the Bell-state circuit `qc.h(0); qc.cx(0,1)` followed by measurement. The exact theoretical probabilities are P(00) = 0.5, P(11) = 0.5, and P(01) = P(10) = 0 — entanglement means only the two "agreeing" outcomes are possible at all. A real seeded simulated draw at `shots=1024` produced:

```
{'00': 503, '11': 521, '01': 0, '10': 0}
```

Feed that dictionary into `plot_histogram(counts)` and here is exactly what you'd see: two bars, one labeled `00` and one labeled `11`, both reaching to roughly the middle of the chart's height (503 and 521 out of 1024 — close to the 50% line, as expected from the 0.5/0.5 theoretical split). The two bars are close to each other in height but not pixel-identical, which is the normal shot-noise wobble around a true 50/50 split. Critically, there is no bar at all for `01` or `10` — not a bar at zero height, but a complete absence from the chart, because `plot_histogram` only draws bars for keys present in the dictionary with a nonzero count. If you need `01` and `10` to visibly appear at zero (for example, to make a "these outcomes genuinely never happened" point explicit rather than implicit), you'd need to pass a counts dictionary that includes those keys with value 0 and confirm your Qiskit version renders zero-count keys — behavior that's worth checking against your installed version rather than assuming.

## Comparing runs side by side

A single histogram answers "what did this run produce?" The more common real question is "did run B look different from run A?" — comparing a noisy hardware run against an ideal simulation, or comparing two parameter settings. `plot_histogram` supports this directly by accepting a list of counts dictionaries:

```python
plot_histogram([counts_ideal, counts_hardware], legend=['ideal', 'hardware'])
```

This draws paired bars at each bitstring position — one bar per dictionary, color-coded and labeled per the `legend` list — so you can visually compare, say, an ideal simulator's clean 50/50 split against a noisy hardware run that leaks some probability into `01` and `10`. This is the practical day-to-day use of the side-by-side form: making noise, calibration drift, or parameter changes visible in one glance instead of diffing two dictionaries by eye.

## Key terms

| Term | Meaning |
|---|---|
| `plot_histogram(counts)` | Draws one bar per bitstring key present in a counts dictionary, sized by count or probability |
| x-axis | The measured bitstring outcome (e.g. `'00'`, `'11'`) |
| y-axis | The count (or normalized probability) for that outcome |
| Missing bar | A bitstring with zero count doesn't appear as a short bar — it's simply absent from the chart |
| `plot_histogram([c1, c2], legend=[...])` | Draws paired bars per outcome across multiple counts dictionaries for direct visual comparison |

## Check yourself

If you ran the same Bell-state circuit again at `shots=1024` and got `{'00': 498, '11': 526, '01': 0, '10': 0}` instead of the first run's `{'00': 503, '11': 521, '01': 0, '10': 0}`, would the two histograms look meaningfully different, and what would that difference (or lack of one) actually tell you about the circuit?
