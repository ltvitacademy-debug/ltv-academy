# Common Reproducibility Pitfalls

Most reproduction attempts fail for a small set of recurring reasons, not because the original result was fraudulent. Recognizing these pitfalls in advance saves you from wasting days debugging your own code when the actual gap is somewhere else entirely — in what the paper didn't report, how the baseline was tuned, or which version of a dataset was used.

## What you'll learn

- Why missing or unreported random seeds make a single comparison meaningless
- How undisclosed hyperparameter sweeps inflate reported numbers
- Why cherry-picked or under-tuned baselines are one of the most common sources of inflated claims
- How dataset version and split drift silently changes what's being measured
- Why some results are simply compute-dependent and won't reproduce on different hardware

## Missing random seeds and single-run comparisons

Neural network training is stochastic: the same code with a different random seed can produce a meaningfully different final number, especially on smaller datasets or smaller models where variance is proportionally larger. A paper that reports a single run per condition, with no seed averaging and no variance reported, cannot support a strong claim about which method is better — the entire reported gap might be within normal seed-to-seed noise. When you reproduce such a result, run multiple seeds yourself if at all possible, and treat a single-run comparison (yours or theirs) as a weak signal rather than a settled conclusion.

## Undisclosed hyperparameter sweeps

A subtler version of the same problem: if the authors tuned their proposed method's hyperparameters on the test set, or selected the best of several sweeps and reported only that run, the reported number is optimistic in a way that a single clean run from you won't match. This isn't always deliberate misconduct — it's often a byproduct of how iterative research actually happens, where the version that "worked" is the one that gets written up. The practical defense is to check whether the paper describes a validation-set-based hyperparameter selection process at all; if it doesn't, treat the reported number as an upper bound rather than an expected value.

## Cherry-picked or under-tuned baselines

A new method can look better than it is simply because the comparison baseline wasn't tuned as carefully as the new method was — a stale hyperparameter configuration copied from an older paper, a baseline run for fewer steps, or a baseline evaluated on an easier variant of the task. Papers With Code and similar leaderboards are useful here precisely because they let you cross-check a reported baseline number against other papers' reported numbers for the same baseline; a baseline number that's unusually low compared to its own literature is a signal worth investigating before you trust the comparison.

## Dataset version and split drift

"The same dataset" is not always the same data. Datasets get revised, rebalanced, or get additional cleaning passes between a paper's publication and when you download it; benchmark splits sometimes change between versions of a library; and some widely used datasets have had documented label errors discovered and partially corrected over time. Always record the exact dataset version, split file, and any preprocessing script hashes you used, and check whether the paper specifies theirs — if it doesn't, that's itself worth flagging in your write-up.

## Compute-dependent results

Some results are sensitive to batch size, numerical precision (fp32 vs. fp16/bf16), or hardware-specific kernel implementations in ways the paper may not fully disclose. Training dynamics can shift when batch size changes (which also typically requires adjusting the learning rate to match), and mixed-precision training can produce slightly different numerical outcomes than full precision even with the same logical hyperparameters. If your reproduction runs on different hardware or at a different batch size than the original, treat any gap as a hypothesis to investigate rather than an automatic sign of a bug in your code.

```yaml
# reproducibility_checklist.yaml — fill in before reporting a reproduction attempt
paper_result:
  reported_metric: ""
  reported_value: null
  seeds_reported: null          # how many seeds did THEY run?
  variance_reported: false
your_attempt:
  code_source: "official"       # official | reimplementation
  seed_list: [0, 1, 2]           # run more than one
  dataset_version: ""
  batch_size: null
  precision: "fp32"              # fp32 | fp16 | bf16
  hardware: ""
  matches_reported_within_tolerance: null
```

## Key terms

- **Seed variance** — the spread in results across random seeds, which can be large enough to explain a reported improvement on its own
- **Hyperparameter sweep leakage** — reporting only the best run from a sweep without disclosing the sweep, inflating the apparent result
- **Baseline tuning gap** — a comparison baseline that received less tuning effort than the proposed method
- **Dataset drift** — a dataset's version, split, or labels changing between a paper's publication and your own download
