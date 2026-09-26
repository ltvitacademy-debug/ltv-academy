# Reproducibility

Picture this: you present a model's accuracy on Monday. On Thursday your manager reruns your notebook and gets a slightly different number. Or a teammate clones your project and it crashes on their laptop. Neither of you did anything wrong on purpose. The analysis simply wasn't reproducible: it depended on randomness, library versions, file locations, or data that nobody wrote down.

Reproducibility means that someone else, or you six months from now, can rerun your work and get the same result. It is the last habit in our reliable-code chapter, and it costs only a few lines.

## What you'll learn

- How random seeds make "random" results repeatable
- Where randomness hides in pandas and scikit-learn
- How to record and pin your library versions
- How to avoid hard-coded file paths
- How to fingerprint your input data

## Control the randomness

Computers generate pseudo-random numbers from a starting value called a **seed**. Same seed, same sequence. NumPy's recommended approach is to create a generator with an explicit seed:

```python
import numpy as np

a = np.random.default_rng(42).normal(size=3)
b = np.random.default_rng(42).normal(size=3)
c = np.random.default_rng().normal(size=3)
d = np.random.default_rng().normal(size=3)

print(a)  # [ 0.30471708 -1.03998411  0.7504512 ]
print(b)  # [ 0.30471708 -1.03998411  0.7504512 ]
print(np.array_equal(a, b))  # True
print(np.array_equal(c, d))  # False
```

The two seeded generators agree exactly, while the two unseeded ones almost never do. The number 42 has no special meaning; pick any integer and keep it.

Randomness also hides inside pandas and scikit-learn, and they take a `random_state` argument:

```python
from sklearn.model_selection import train_test_split

df.sample(n=3, random_state=42)
train, test = train_test_split(df, test_size=0.3, random_state=42)
```

On a ten-row illustrative table, sampling three rows with `random_state=42` returns order IDs `[9, 2, 6]` every single time, and the split's test set is the same rows on every run. Get in the habit of setting `random_state` everywhere you split, sample, shuffle, or train a model that uses randomness.

## Pin your environment

The same code can behave differently across library versions. Record exactly what you used. In our environment:

```
numpy==1.23.1
pandas==1.4.3
scikit-learn==1.1.2
```

Create a virtual environment for each project, then capture what's installed:

```
python -m venv .venv
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

The first line creates an isolated environment, the second writes every installed package and its version to a file, and the third lets a teammate recreate that environment. Commit `requirements.txt` next to your code. Also note your Python version (`python --version`) in your README.

## Don't hard-code paths

`pd.read_csv("C:/Users/alex/Desktop/orders.csv")` works on exactly one computer. Build paths relative to the script instead:

```python
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "data" / "orders_raw.csv"

fingerprint = hashlib.sha256(RAW.read_bytes()).hexdigest()
print(RAW.name, RAW.exists(), len(fingerprint))
```

Running it prints `orders_raw.csv True 64`. `Path(__file__)` locates the script itself, so the project works wherever it's cloned. (In a notebook, `__file__` doesn't exist; use paths relative to the project folder instead, as in the previous lessons.)

## Fingerprint and protect your data

The `sha256` line above produces a 64-character fingerprint of the file's exact bytes. If the raw data changes by even one character, the fingerprint changes. Print it or save it alongside results, and you can prove which data version produced them. Also treat raw data as read-only: cleaning code should read from `data/raw` and write to a different place, never overwrite the original.

## A reproducibility checklist

- Seed every random step and record the seed.
- Pin versions in `requirements.txt`.
- Use relative paths built with `pathlib`.
- Keep raw data untouched and fingerprint it.
- Restart and run everything from scratch before you share.

## Recap

Seeds make randomness repeatable, pinned requirements make environments repeatable, relative paths make projects portable, and fingerprints make data traceable. With these, your Thursday number matches your Monday number.

Next comes the Capstone, where we use everything in this course on one dataset, end to end.
