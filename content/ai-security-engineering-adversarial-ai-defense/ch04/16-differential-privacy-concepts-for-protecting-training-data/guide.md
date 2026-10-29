# Lesson 16 — Differential Privacy Concepts for Protecting Training Data

**Chapter 4 · Model Extraction and Inversion Attacks · Lesson 4 of 4**

## What you'll learn

- What differential privacy actually guarantees, in plain terms —
  and what it deliberately does *not* promise
- What the privacy budget (epsilon) controls, and why it's a dial,
  not a switch
- How DP-SGD applies that guarantee during model training itself,
  not just to query results
- Where differential privacy is already deployed in production
  today, and why it's the strongest defense in this chapter against
  everything covered in Lessons 13–15

## What differential privacy actually guarantees

Every defense so far in this chapter has been operational: limit
queries, monitor patterns, minimize output. Differential privacy is
different in kind — it's a **mathematical guarantee**, not an
operational control, and it bounds something very specific: *how much
the presence or absence of any single record in a dataset can change
the output of a computation performed on that dataset.*

Put concretely: if a hospital's model is differentially private, then
whether or not one specific patient's record was included in training
barely changes what the model outputs, for any query, by any amount
you can precisely quantify in advance. That's the formal answer to
membership inference from Lesson 14 — if removing any one record
can't meaningfully change the model's behavior, there's no reliable
signal left for a shadow model to detect that record's presence at
all.

## Epsilon: the privacy budget, as a dial

The strength of that guarantee is controlled by a parameter usually
written **epsilon (ε)**, called the **privacy budget**. Smaller
epsilon means a stronger guarantee — the model's output is less
sensitive to any single record, achieved by adding more statistical
noise. Larger epsilon means a weaker guarantee and less noise. This
is a real, unavoidable **tradeoff dial**, not a toggle: more privacy
costs you some model accuracy or query precision, because the noise
that provides the mathematical guarantee is the same noise that
blurs the signal. A **delta (δ)** parameter is often paired with
epsilon to allow a vanishingly small probability that the bound is
exceeded, which is typically necessary to make the mechanism
practical. Choosing ε is a genuine engineering and policy decision —
it has to be set deliberately, with the sensitivity of the data and
the acceptable accuracy loss both on the table, not left at whatever
a library's default happens to be.

The mechanism that actually adds the noise, in the simplest case, is
calibrated to the *sensitivity* of the computation — how much a
single record could possibly change the raw answer — so that the
noise added is just enough to mask that worst case, no more:

```
# Laplace mechanism, conceptually:
true_answer = compute_statistic(dataset)
noisy_answer = true_answer + Laplace_noise(scale = sensitivity / epsilon)
# smaller epsilon -> larger scale -> more noise -> stronger guarantee
```

## DP-SGD: privacy during training, not just at query time

Lessons 13–15 all defend a model that's already trained, at the point
where it answers queries. Differential privacy can go one step
further back and protect the **training process itself**, which is
what makes it the strongest defense against inversion and membership
inference specifically — if no single record was ever allowed to
leave much of a fingerprint on the model's parameters in the first
place, there's less for an attack at query time to exploit.

Abadi et al.'s 2016 paper "Deep Learning with Differential Privacy"
introduced **DP-SGD**: a modified version of the standard
stochastic-gradient-descent training loop that (1) **clips** each
training example's gradient contribution to a bounded maximum norm,
so no single unusual record can dominate a training step, and (2)
adds calibrated noise to the clipped, aggregated gradient before the
model's weights are updated. Done consistently across training, with
careful accounting of the cumulative privacy budget spent across all
the training steps, this produces a model with a provable differential
privacy guarantee baked into its parameters — not just its API
responses.

## Where this is actually deployed today

Differential privacy isn't a research curiosity sitting in papers.
The **U.S. Census Bureau** adopted differential privacy for the 2020
Census specifically to prevent exactly the kind of re-identification
risk this chapter has been building toward — protecting individual
households' data while still publishing statistically useful
population counts. **Apple** has used differentially private
mechanisms for collecting usage telemetry (such as popular emoji and
typing data) from devices without being able to tie any single
report back to an individual user. **Google** has published and
open-sourced differential privacy libraries used in similar
telemetry and analytics contexts. These are large-scale, real
production deployments of the exact mathematical guarantee described
above — proof that the privacy/accuracy tradeoff is one organizations
actually choose to make when the data is sensitive enough to justify it.

## Key terms

| Term | Meaning |
|---|---|
| Differential privacy | A mathematical guarantee bounding how much any single record's presence or absence can change a computation's output |
| Privacy budget (epsilon, ε) | The parameter controlling how strong that guarantee is — smaller ε means more noise and stronger privacy, at a cost to accuracy |
| Sensitivity | How much a single record could possibly change a computation's raw result; noise is calibrated to this to mask the worst case |
| DP-SGD | A training algorithm (Abadi et al., 2016) that clips per-example gradients and adds calibrated noise, producing a model with a provable DP guarantee baked into its parameters |

## Check yourself

You're the one closing out this chapter — you should be able to
explain, without looking: why does bounding how much any single
record can influence a model's output directly defend against
membership inference, and why is choosing epsilon a tradeoff rather
than a setting you can just maximize for safety?
