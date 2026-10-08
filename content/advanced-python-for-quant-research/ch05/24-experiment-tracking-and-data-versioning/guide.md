# Experiment Tracking & Data Versioning

"I changed the data and now I can't reproduce last week's result" is one of the most common real failure modes in quantitative research, and it is almost never a math bug. The signal code didn't change — the input did, often silently: a vendor restated a few fundamentals, a corporate action got applied, or someone re-ran a data pull that happened to land on a slightly different day's universe. Without a record of exactly which data and which parameters produced a given result, "reproduce last week's number" becomes archaeology. This lesson covers experiment tracking and data versioning, the two habits that turn that archaeology into a lookup.

## What you'll learn

- Why "the code didn't change" doesn't mean "the result should be reproducible"
- Experiment tracking: logging params, metrics, and artifacts per run (the idea behind tools like MLflow)
- Data versioning concepts: content-addressed storage, DVC-style data version control, and simply pinning a file plus its hash
- A real, runnable pattern for fingerprinting a dataset with `hashlib`
- How tracking and versioning combine into one reproducibility story

## The failure mode

A backtest result depends on three things: the code, the parameters, and the data. Version control (git) already handles the first one well. The second and third are where research quietly breaks: a notebook re-run six months later against a database table that has since been updated produces a different number, and nothing about the code or the git history explains why. The fix isn't "be more careful" — it's recording, at the time each run happens, exactly what went into it.

## Experiment tracking: params, metrics, artifacts

**Experiment tracking** is the practice of logging, for every run of an experiment: the input **parameters** (lookback window, universe, signal weights — whatever varies between runs), the resulting **metrics** (Sharpe ratio, hit rate, max drawdown), and any output **artifacts** (a plot, a results table, a serialized model). Frameworks like **MLflow** formalize this with a tracking server and a Python API — `mlflow.log_param("lookback", 20)`, `mlflow.log_metric("sharpe", 1.34)`, `mlflow.log_artifact("equity_curve.png")` — so that every run is queryable later: "show me every run where lookback was between 10 and 30, sorted by Sharpe." The conceptual value doesn't require the tool: even a plain CSV row per run, with a timestamp, the parameters, and the result, gets you most of the way there, as long as you actually write it down every time rather than relying on memory or chat history.

## Data versioning

Experiment tracking answers "what parameters produced this metric." It doesn't answer "was the *data* the same." That's **data versioning** — treating a dataset as something with a version, the same way code has a commit hash. Three levels of rigor, from lightest to heaviest:

- **Hash the file.** Compute a checksum (SHA-256) of the exact bytes used in a run and record it alongside the run's parameters and results. If the hash matches, the data was byte-identical; if it doesn't, something changed, and you know to look there first.
- **Pin a specific file.** Keep dated or versioned snapshots of a source file (`prices_2024-01-15.parquet` rather than overwriting `prices.parquet` in place), so "last week's data" is still sitting on disk, not overwritten.
- **Content-addressed storage (DVC-style).** Tools like **DVC** (Data Version Control) store large data files outside git but track them by content hash inside git, so checking out an old git commit also gets you the exact dataset that commit was built against — git's versioning semantics extended to data too big to put in git directly.

Most research teams don't need DVC's full machinery on day one; hashing matters immediately, and pinning snapshots is nearly free. Reach for content-addressed tooling once data files are large or numerous enough that manual snapshot management becomes its own burden.

## Fingerprinting a dataset with `hashlib`

A real, minimal version of data versioning: hash the exact bytes of the dataset you used, and store that hash as the "data version" alongside your run's parameters and results.

```python
import hashlib
import pandas as pd

df = pd.DataFrame({
    "date": pd.date_range("2024-01-01", periods=5, freq="D"),
    "ticker": ["AAPL"] * 5,
    "close": [192.53, 193.89, 191.04, 194.17, 195.71],
})

def fingerprint(frame: pd.DataFrame) -> str:
    # to_csv gives a stable byte representation to hash across runs
    raw = frame.to_csv(index=False).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()

v1 = fingerprint(df)
print("version:", v1)
# version: f20d7cf10064d08cd0dbc97d8bceb85254d67d893e64250a5daa82b149ce4c06

# Simulate a restated data point (vendor corrects one close price)
df_restated = df.copy()
df_restated.loc[2, "close"] = 191.50
v2 = fingerprint(df_restated)
print("version after restatement:", v2)
# version after restatement: 0325245f5a5f73844915cda846f07be0c79c0589f0a46d5b6e486129058f262d
print("same fingerprint?", v1 == v2)
# same fingerprint? False
```

That single-character change in one cell produces a completely different hash, which is exactly the property you want: the fingerprint can't accidentally match two datasets that differ, even subtly, and it catches the exact "the data was restated and nobody told me" scenario this lesson opened with. In practice, you'd log `fingerprint(df)` into your experiment-tracking record alongside the run's parameters and metrics — then "reproduce last week's result" becomes "find the run with this exact data fingerprint and these exact parameters," not guesswork.

## Key terms

| Term | Meaning |
|---|---|
| Experiment tracking | Logging parameters, metrics, and artifacts per run so results are queryable and comparable later |
| MLflow | A tracking framework providing a server and API for logging params/metrics/artifacts per run |
| Data versioning | Treating a dataset as having a version, analogous to a git commit hash for code |
| Content-addressed storage | Storing data keyed by a hash of its own content, as DVC does, so an exact version is always retrievable |
| Dataset fingerprint | A hash (e.g. SHA-256) of a dataset's exact contents, used to detect any change, however small |

## Recap

"I can't reproduce last week's result" is usually a data problem wearing a code problem's clothes — the fix is recording, per run, the parameters and metrics (experiment tracking) and a fingerprint of the exact data used (data versioning), down to hashing the file if nothing lighter-weight will do. Next lesson: building a research data layer, so that stable, versioned access to data doesn't depend on every script hardcoding its own file paths.
