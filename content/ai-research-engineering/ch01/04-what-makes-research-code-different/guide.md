# What Makes Research Code Different

This lesson closes out the chapter by looking directly at the code itself. The last three lessons described the role, the boundary with product engineering, and the daily rhythm. Here we get concrete about what research code actually looks like on screen — why it's scrappier in some places and stricter in others than most new research engineers expect, and how to read that difference as a deliberate design choice rather than as bad practice.

## What you'll learn

- The "it just needs to run once to get the number" mentality, and when it's appropriate
- Why notebooks and one-off scripts coexist with heavily tested shared libraries in the same codebase
- How rapid iteration trades against robustness, and why research teams accept that trade differently than product teams
- What a research engineer still never skips, no matter how scrappy the rest of the script is

## "It just needs to run once"

A huge share of research code exists to answer a single question and then gets thrown away. A researcher wants to know whether a new initialization scheme changes the loss curve's shape in the first thousand steps. The script that answers that question doesn't need a configuration system, doesn't need to handle a dataset other than the one it was pointed at, and doesn't need to survive being run by someone else next month. It needs to produce one correct plot, today. Labs like Anthropic and OpenAI are explicit in their public engineering writing that a large fraction of research code is exactly this kind of disposable, single-purpose script — and that trying to make every such script production-quality would slow the whole research process down for no benefit.

This is different from cutting corners carelessly. The researcher still has to be confident the number is *correct* — just not that the script is reusable, well-documented, or robust to inputs it will never see.

## Notebooks vs. modules: two code styles, two purposes

Research codebases routinely contain two very different kinds of code side by side:

- **Exploratory code** — Jupyter notebooks, quick scripts, throwaway plotting code. Optimized for speed of iteration: you can run a cell, look at a number, change one line, run it again, all in seconds. Nobody expects this code to be elegant, and most of it is deleted or forgotten within days.
- **Shared library code** — the training loop, the data pipeline, the eval harness, anything many experiments import and depend on. This code gets the same rigor a product codebase would: tests, code review, type hints, documentation. A bug here doesn't invalidate one experiment — it can silently invalidate every experiment that touched it that week.

```python
# Exploratory: lives in a notebook cell, dies when the question is answered
losses = []
for step in range(1000):
    loss = quick_train_step(model, batch)
    losses.append(loss)
plt.plot(losses)  # eyeball it, done

# Shared library: imported by every experiment on the team, tested, reviewed
class TrainingLoop:
    def __init__(self, model, optimizer, config: TrainingConfig):
        self.model = model
        self.optimizer = optimizer
        self.config = config

    def run_step(self, batch) -> StepMetrics:
        """One optimizer step. Covered by tests in test_training_loop.py."""
        ...
```

The skill isn't picking one style — it's correctly recognizing, for any given piece of code, which category it belongs in.

## Rapid iteration over robustness — but never over correctness

Research teams accept far more fragility than product teams would tolerate, in exchange for speed. A script that only works for exactly the one dataset shape it was written against, that has no error handling, that would confuse anyone else who opened it — all of that is an acceptable trade if it let the researcher test three hypotheses today instead of one. What's never traded away is *correctness of the specific result being reported*. A fast script that silently computes the wrong metric is worse than no script at all, because it produces false confidence instead of an honest "I don't know yet."

This is why experienced research engineers build a small set of habits that stay constant even in the scrappiest script: sanity-checking a metric against a known baseline, printing intermediate values instead of trusting a black box, and re-running anything that produced a surprising result before believing it. Chapter 6 of this course goes deep on exactly these verification habits.

## What never gets skipped

- **Trusting the number.** Even a disposable script has to produce a result the researcher would stake their reputation on, at least for that one run.
- **Reproducibility of the *claim*, if not the script.** The script itself might be throwaway, but if the result matters, someone needs to be able to redo the experiment — even if "redo" means rewriting the script from the paper's description rather than rerunning the original file.
- **Not touching shared infrastructure casually.** Scrappy experimentation happens in a researcher's own sandbox, not by hot-patching the training library everyone else depends on.

## Key terms

- **Disposable script** — code written to answer one question once, not meant to be reused, maintained, or run by anyone else
- **Shared library code** — the small core of a research codebase (training loop, data pipeline, eval harness) that gets production-grade testing and review because many experiments depend on it
- **Correctness vs. robustness** — the trade research code makes: giving up handling every possible input, while never giving up confidence that the specific reported result is right
- **Sanity check** — a quick, habitual verification (comparing to a known baseline, printing an intermediate value) used to catch a silent bug before trusting a result
