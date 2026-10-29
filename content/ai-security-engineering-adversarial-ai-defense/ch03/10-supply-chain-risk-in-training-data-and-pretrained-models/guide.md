# Lesson 10 — Supply Chain Risk in Training Data and Pretrained Models

**Chapter 3 · Data Poisoning and Training-Time Attacks · Lesson 2 of 4**

## What you'll learn

- Why almost nobody trains a model entirely from scratch anymore, and
  what that means for your real attack surface
- How this maps directly onto the software supply chain risk you
  already know from dependency management — applied to model weights
  and datasets instead of packages
- The real, documented pickle-deserialization risk in older model
  checkpoint formats, and why `safetensors` exists
- Practical, real mitigations: provenance checks, format choice, and
  vetting publishers before you load anything

## The ML supply chain looks like the software supply chain

You already understand software supply chain risk: a project pulls in
open-source packages it didn't write, and a compromised dependency
becomes a compromised application. Modern ML works the same way.
Almost no one trains a large model from zero — teams pull a pretrained
model from a hub like Hugging Face, fine-tune it on their own data, and
ship it. That pretrained model, and the dataset it was built from, are
both **third-party dependencies** with exactly the same category of
risk as an npm package or a PyPI wheel: you didn't write them, you
can't fully verify what's inside, and you're trusting the publisher.

The difference is that the ML ecosystem's supply chain tooling is far
less mature. There's no widely adopted SBOM equivalent for models yet.
What exists instead are **model cards** and **dataset cards** —
documentation pages publishers attach describing training data,
intended use, and known limitations. They're useful, but they're
self-reported, not independently verified the way a signed package
checksum is.

## A real, documented risk: pickle deserialization

Older PyTorch model checkpoints were commonly saved using Python's
`pickle` format. Pickle's design flaw is well known and documented: it
can execute arbitrary code during deserialization, meaning simply
*loading* a malicious checkpoint file — not running it, just loading
it — could execute attacker-controlled code on your machine. This is
exactly the kind of supply chain risk that doesn't require tricking a
model into misbehaving; it compromises the machine loading the file
before the model is even used.

This is why Hugging Face introduced and now promotes `safetensors` as
the default checkpoint format. Safetensors stores only tensor data
with no executable logic in the deserialization path, closing off the
arbitrary-code-execution risk that pickle-based checkpoints carry. If
you're evaluating a pretrained model today, the format it ships in is
itself a real, concrete security signal.

## Dataset supply chain risk

The same logic applies to training and fine-tuning datasets pulled
from public sources — large web-scraped corpora inherit whatever
mislabeled, low-quality, or adversarial content existed in their
source material, simply because nobody manually reviewed billions of
examples. A dataset's publisher, collection methodology, and any
published audits of it are the dataset equivalent of checking a
package's maintainer and changelog before adding a dependency.

## Real mitigations

- **Prefer safetensors over pickle-based checkpoints** wherever a
  publisher offers both; treat a pickle-only release as a reason to
  dig further before loading it.
- **Check publisher reputation and model/dataset cards** the same way
  you'd check a package maintainer's history — official
  organization accounts, download counts, and community review carry
  real signal.
- **Pin and hash-verify** model weights and dataset files you depend
  on, so an unexpected change to a hosted file doesn't silently flow
  into your next training run.
- **Scan before loading**, using the hub's own scanning tools (Hugging
  Face runs automated pickle-import scanning on uploaded files) as a
  first filter, not a substitute for your own review.
- **Watch for name-similarity / typosquatting** on model and dataset
  hubs, the same risk npm and PyPI face from lookalike package names.

## Key terms

| Term | Meaning |
|---|---|
| ML supply chain | The chain of pretrained models, datasets, and libraries a project depends on but didn't create itself |
| Model card / dataset card | Publisher-provided documentation of a model's or dataset's training data, intended use, and limitations |
| Pickle deserialization risk | The documented ability of Python's pickle format to execute arbitrary code when a malicious file is loaded |
| Safetensors | A tensor-only checkpoint format with no executable deserialization path, created specifically to close the pickle risk |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
does loading a malicious pickle-based checkpoint put you at risk even
before you run the model, and what concrete change did safetensors
make to close that gap?
