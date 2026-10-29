# Lesson 25 — Hypothesis-Driven Threat Hunting

**Chapter 7 · Threat Hunting Methodology · Lesson 25 of 32**

## What you'll learn

- Why a real threat hunt starts with a specific, testable **hypothesis** instead of open-ended log browsing
- What separates a good hypothesis from a vague one, and why vague ones waste hunting time
- A concrete, worked example: hunting for a specific LOLBin-based evasion technique
- Where real hypotheses actually come from — threat intel, ATT&CK, and your own past incidents

## A hunt needs a question before it needs a query

Chapter 6 of the Sentinel course covered the hunting query itself — a KQL query run on demand,
not on a schedule, to look for activity that hasn't already triggered an alert. That's the tool.
This lesson is about what question you point it at. It's entirely possible to open a hunting
workspace, pick a log table, and just start scrolling — "let's see what's in the authentication
logs this week" — and that kind of unstructured, **exploratory hunting** does occasionally turn
something up. But it doesn't scale, it isn't repeatable, and it gives two different analysts
looking at the exact same data two completely different outcomes, depending entirely on what
happened to catch their eye. **Hypothesis-driven hunting** replaces that with a specific,
falsifiable statement about what an attacker might be doing in the environment right now,
written down before a single query runs.

## What makes a hypothesis actually good

A usable hunting hypothesis has to be **specific** and **testable** — specific enough that you
know exactly what evidence would confirm it, and testable enough that you can actually write a
query against real log data to go look for that evidence. "Something bad might be happening on
the network" isn't a hypothesis; it's a feeling, and there's no query that proves or disproves a
feeling. "An attacker may be using `rundll32.exe` to load and execute a malicious DLL, a known
technique for evading signature-based antivirus" is a real hypothesis — it names a specific
binary, a specific behavior, and a specific reason an attacker would use it, all of which point
straight at the process-creation log fields you'd actually query to test it.

## Working the example through

Take that hypothesis and make it concrete. A **LOLBin** — a Living-off-the-Land Binary — is a
legitimate, pre-installed Windows tool (`rundll32.exe`, `certutil.exe`, `mshta.exe`) that an
attacker repurposes to do something malicious, specifically because it's already trusted and
whitelisted on the endpoint. To hunt it, you don't browse logs randomly; you query
process-creation events for `rundll32.exe` launched with command-line arguments that don't match
its normal, legitimate usage in your environment — for example, pointing at a DLL sitting in a
user's Downloads or Temp folder instead of a System32 path. The hypothesis told you exactly which
process, which field, and which pattern to look for, before you ever opened the query editor.

## Where real hypotheses come from

Good hypotheses aren't invented from nothing. They come from **threat intelligence** — a report
describing a specific campaign or actor group's known techniques; from the **MITRE ATT&CK
framework** itself, picking a technique your organization hasn't actively hunted for yet (Lesson
27 builds directly on this); and from your own **past incidents** — a post-incident review that
turned up a gap is a ready-made hypothesis for the next hunt. A hypothesis grounded in one of
these three sources is testable precisely because it's grounded in how attackers actually behave,
not in guesswork.

## Key terms

| Term | Meaning |
|---|---|
| Hypothesis-driven hunting | Forming a specific, testable statement about attacker behavior before querying, rather than browsing logs unstructured |
| LOLBin | A Living-off-the-Land Binary — a legitimate, pre-installed tool an attacker repurposes maliciously because it's already trusted |
| Testable hypothesis | A hypothesis specific enough that a real query against log data can confirm or rule it out |
| Exploratory hunting | Unstructured log browsing with no prior hypothesis — occasionally useful, but not repeatable or scalable |

## Check yourself

Explain, in one sentence, why "an attacker may be using rundll32.exe to load a malicious DLL from
a non-standard path" is a testable hypothesis, while "something suspicious might be happening on
the network" is not.
