# Lesson 17 — Securing AI Systems

**Chapter 4 · Security, Access and Monitoring · Lesson 17 of 30**

## What you'll learn

- Why AI systems have a security surface traditional application security doesn't fully cover
- The AI-specific risks: model theft/extraction, adversarial inputs, data poisoning, and insecure model files
- A concrete, real example of one of these risks and the fix the industry adopted for it
- The baseline controls that address this surface

## A wider surface than a normal application

Securing a traditional application means protecting its code, its infrastructure, and the data it touches. An AI system has all of that, plus a new category of risk that comes from the model itself being both a sensitive asset and an unusual kind of attack surface. The model's weights can be stolen. Its behavior can be manipulated through the inputs it's given, not just through a code vulnerability. The data used to train it can be deliberately poisoned long before anyone notices.

This is why Chapter 4 exists as its own chapter: the governance controls from Chapter 3 — documentation, registry, versioning, approval — answer "is this model trustworthy to deploy." This chapter answers "is it staying trustworthy, and is it protected, once it's live."

## Four AI-specific risks

- **Model theft / extraction** — an attacker queries a deployed model repeatedly and uses the responses to reconstruct a close approximation of it, effectively stealing the intellectual property without ever touching the underlying file.
- **Adversarial inputs** — inputs deliberately crafted to fool a model into a wrong output, exploiting how the model actually makes decisions rather than a software bug.
- **Data poisoning** — an attacker who can influence training data (or data a model continues to learn from) inserts bad examples designed to corrupt the model's behavior in a chosen direction.
- **Insecure model files** — some common model file formats execute arbitrary code when loaded, meaning a malicious model file isn't just bad data, it can be a direct attack on whoever loads it.

## A real, verifiable example

That last risk has a concrete, well-documented example worth knowing. Python's `pickle` format, long used to save and load trained models, deserializes by executing arbitrary code — a malicious `.pkl` file can run anything on the machine that loads it, not just "produce a bad prediction." This is a real, long-documented security issue with the format itself, not a hypothetical.

The industry's response was the `safetensors` format: a file format for model weights designed specifically so that loading a model never executes code — it only reads declared tensor data.

```python
# Risky: pickle.load executes arbitrary code embedded in the file
model = pickle.load(open("model.pkl", "rb"))

# Safer: safetensors only reads declared tensor data, never executes code
from safetensors.torch import load_file
weights = load_file("model.safetensors")
```

*A real, documented contrast — not every model-security control is this concrete, but this one is a useful, verifiable example of the category.*

## Baseline controls

- **Access control on model artifacts** — weights and registry entries aren't public; Lesson 18 covers this in depth.
- **Rate limiting and monitoring on inference endpoints** — the first defense against extraction, since it requires many queries.
- **Input validation and anomaly detection** — catching adversarial-looking inputs before they reach the model.
- **Provenance checks on training data** — knowing where data came from (Chapter 2 of this course) is also a security control, not just a quality one.
- **Safe file formats and signed artifacts** — preferring formats like `safetensors` and verifying a model file's integrity before loading it.

## Key terms

| Term | Meaning |
|---|---|
| Model extraction | Reconstructing a close copy of a deployed model by repeatedly querying it |
| Adversarial input | An input deliberately crafted to make a model produce a wrong output |
| Data poisoning | Deliberately corrupting training data to manipulate a model's future behavior |
| `safetensors` | A model-weight file format designed to avoid the code-execution risk of formats like `pickle` |

## Lab

For a model you're familiar with (or the fraud-detector example from earlier lessons), list which of the four AI-specific risks above would be most relevant to it, and name one concrete control from the baseline list that would address each one you listed.

## Check yourself

Can you name the four AI-specific security risks this lesson covers, and explain — using the real pickle-versus-safetensors example — why a model file itself can be a direct security risk, not just a source of bad predictions?
