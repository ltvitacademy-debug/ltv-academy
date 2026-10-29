# Lesson 2 — The OWASP Top 10 for LLM Applications

**Chapter 1 · AI and LLM Security Fundamentals · Lesson 2 of 4**

## What you'll learn

- What the OWASP Top 10 for LLM Applications is, who maintains it,
  and why it's the industry-standard risk catalog for this field
- The real categories in the current list, in plain language, with a
  concrete example of each
- Why most of these risks map to one root cause: untrusted content
  entering a model's context with no reliable code/data boundary
- How this list relates to the classic OWASP Top 10 you may already
  know from web application security

## What the list is, and why it matters

The **OWASP Top 10 for Large Language Model Applications** is a
community-maintained risk catalog published by the Open Worldwide
Application Security Project — the same organization behind the
OWASP Top 10 for web applications that's been a baseline reference
in appsec for two decades. It's maintained by a working group of
practitioners and updated as real-world incidents and research
reshape the field, and it exists for the same reason the original
list does: give security engineers, developers, and auditors a
common vocabulary for the risks that show up over and over in real
systems, so teams aren't reinventing threat models from scratch. If
you've used the classic Top 10 to structure a web app security
review, this is the same idea applied to systems built around large
language models.

## The categories, in plain language

**Prompt Injection** — Attacker-crafted input manipulates the model
into ignoring its original instructions or performing unintended
actions, either directly (the user types it) or indirectly (it
arrives hidden in a document, email, or web page the model is asked
to process).

**Insecure Output Handling** — Treating an LLM's output as safe,
trusted content and passing it downstream — into a database query, a
shell command, or rendered HTML — without the same validation and
sanitization you'd apply to any other untrusted input.

**Training Data Poisoning** — Corrupting the data used to train or
fine-tune a model so it learns biased, incorrect, or attacker-chosen
behavior that only becomes visible later, under specific conditions.

**Model Denial of Service** — Crafting inputs that consume
disproportionate compute or context-window resources, degrading
availability or inflating cost for every other user of the system.

**Supply Chain Vulnerabilities** — Risk inherited from third-party
models, training datasets, fine-tuning adapters, or plugins —
exactly the same class of problem as a vulnerable open-source
package, applied to the AI-specific supply chain.

**Sensitive Information Disclosure** — An LLM revealing confidential
data in its output: information memorized from training data, data
leaked from a connected tool or document, or secrets embedded
carelessly in a system prompt.

**Insecure Plugin Design** — Plugins or tools an LLM can call that
accept free-form input without their own validation, access control,
or rate-limiting, letting a manipulated model trigger unintended
actions through them.

**Excessive Agency** — Granting an LLM-based agent more functionality,
permissions, or autonomy than its task actually requires, so a
successful manipulation of the model can cascade into a real-world
action — sending an email, deleting a record, executing a trade.

**Overreliance** — Trusting LLM output as accurate or authoritative
without verification, in contexts where the model's output quality
directly drives decisions, code, or published content.

**Model Theft** — Unauthorized access to, copying of, or exfiltration
of a proprietary model's weights or architecture, which constitutes
theft of valuable intellectual property.

## The common thread

Read that list again and a pattern emerges: a large share of these
risks trace back to the same root cause covered in Lesson 1 — the
model has no reliable boundary between trusted instructions and
untrusted content, and no reliable boundary between its own
probabilistic output and something a downstream system should trust
automatically. Prompt Injection and Insecure Output Handling are
essentially the input-side and output-side expressions of that same
gap. Excessive Agency and Insecure Plugin Design are about what
happens when that gap gets wired directly into real actions. Keeping
that root cause in view makes the list far easier to remember than
treating each item as an unrelated, isolated risk.

## How this relates to the classic OWASP Top 10

This list doesn't replace the web application Top 10 — it sits
alongside it. An LLM-backed feature is still a web application
underneath: it still has authentication, authorization, an API
surface, and a database, and all of the classic risks (broken access
control, injection, security misconfiguration) still apply to that
surrounding system exactly as before. The LLM-specific list covers
the risks that are unique to the model sitting in the middle of that
system. A real production AI feature needs both lists, not one
instead of the other.

## Key terms

| Term | Meaning |
|---|---|
| OWASP Top 10 for LLM Applications | A community-maintained risk catalog from OWASP covering the risks specific to large language model applications |
| Indirect prompt injection | Prompt injection delivered through content the model processes (a document, email, or web page) rather than typed directly by the user |
| Excessive Agency | Giving an LLM-based agent more permissions or autonomy than its task requires, so a manipulated model can trigger real-world harm |
| Insecure Output Handling | Passing LLM output downstream without the same validation/sanitization applied to any other untrusted input |

## Check yourself

You're ready for Lesson 3 when you can name at least six of the ten
categories from memory, in your own words, and explain the one root
cause that connects Prompt Injection, Insecure Output Handling, and
Excessive Agency.
