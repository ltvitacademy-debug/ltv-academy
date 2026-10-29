# Lesson 25 — AI Red-Teaming: What It's Actually Testing For

**Chapter 7 · AI Governance, Red-Teaming, and Compliance · Lesson 1 of 4**

## What you'll learn

- Why AI red-teaming is a formal, authorized assessment practice —
  scoped and sanctioned like the penetration testing you've already
  studied — not freeform attacking
- What a red-team engagement is systematically testing for: the same
  categories this course has already covered, now run end-to-end
  against a deployed system
- The real, published methodology and tooling behind AI red-teaming,
  including MITRE ATLAS and Microsoft's AI Red Team practice
- How an AI red-team engagement is scoped, executed, and reported —
  and why that discipline is what separates it from someone just
  "trying to jailbreak the chatbot"

## Red-teaming is authorized testing, not freeform attacking

You've already learned penetration testing methodology elsewhere in
this path: a defined scope, written authorization, rules of
engagement, a time-boxed engagement, and a formal report with
findings a client can act on. **AI red-teaming is that same discipline
applied to an AI system.** It is not a developer idly trying to get a
chatbot to say something embarrassing. It's a planned, authorized
exercise — run by an internal team, a specialized vendor, or a mix of
both — against a specific, in-scope AI system, with a defined set of
objectives, a defined time window, and a written report at the end.
Microsoft's own AI Red Team, which publishes its methodology
publicly, describes the goal the same way any penetration test does:
simulate the actions of a real adversary under realistic constraints,
so the organization learns what actually breaks before an attacker
finds it in production.

## What it's systematically testing for

A real AI red-team engagement doesn't improvise. It works through a
test plan built from the same risk categories you've already studied
in this course, now exercised against the live, deployed system
rather than discussed in the abstract:

- **Prompt injection and jailbreaks** (Chapter 2) — can the system's
  instructions be overridden by attacker-supplied content, whether
  typed directly or hidden in a document the model is asked to
  summarize?
- **Data leakage** (Chapters 3 and 4) — can the engagement extract
  system prompts, retrieved documents outside the tester's
  authorization, or fragments of training data the model has
  memorized?
- **Harmful-output generation** (Chapters 2 and 5) — can the system be
  pushed, through adversarial phrasing or crafted inputs, into
  producing content that violates its own policy — unsafe
  instructions, disallowed content, or outputs a classifier was
  supposed to block?
- **Agent and tool-use abuse** (Chapter 6) — if the system can take
  actions (call APIs, execute code, modify data), can an attacker get
  it to take an action outside its intended authority?

Each category maps to a concrete, repeatable test case, not a vague
"try to break it" instruction. That's what makes it systematic rather
than opportunistic.

## Real frameworks behind the practice

This isn't an invented exercise — AI red-teaming is grounded in
published, industry-adopted references:

- **MITRE ATLAS** (Adversarial Threat Landscape for Artificial-
  Intelligence Systems) catalogs real adversary tactics and techniques
  against ML systems, mirroring the structure of MITRE ATT&CK. Teams
  use it the way a traditional red team uses ATT&CK: to build a test
  plan from documented, real-world attacker behavior instead of
  starting from scratch.
- **NIST's AI Risk Management Framework**, and its Generative AI
  Profile (NIST AI 600-1), name red-teaming explicitly as a method
  under the framework's "Measure" function — a way to generate
  evidence about how a system actually behaves under adversarial
  conditions.
- **Microsoft's AI Red Team** and open-source tools like **PyRIT**
  (Python Risk Identification Toolkit for generative AI) give teams a
  repeatable way to automate large batches of adversarial test prompts
  against a target system and score the results.

## How an engagement is scoped and run

An AI red-team engagement follows the same shape as the pentest
lifecycle you already know, adapted to an AI target:

1. **Scoping and authorization** — which system, which environments,
   which test categories are in bounds, and a written sign-off from
   whoever owns the risk.
2. **Threat-informed test design** — building concrete test cases from
   frameworks like MITRE ATLAS and the categories above, tailored to
   this system's specific architecture (does it retrieve documents?
   does it call tools?).
3. **Execution** — running the test cases against the live or staging
   system, logging every prompt, response, and outcome.
4. **Reporting** — findings tied to evidence, severity, and a
   reproducible test case, handed to the owning team exactly like a
   pentest report.
5. **Retest** — confirming a fix actually closes the finding, not just
   that the original test case now happens to fail.

## Key terms

| Term | Meaning |
|---|---|
| AI red-teaming | A formal, authorized, scoped assessment that systematically tests a deployed AI system against defined adversarial categories, reported like a penetration test |
| MITRE ATLAS | A published, MITRE-maintained catalog of real adversary tactics and techniques against machine learning systems, structured like MITRE ATT&CK |
| Rules of engagement | The written scope, authorization, and boundaries that make a red-team test authorized activity rather than unauthorized attacking |
| PyRIT | Microsoft's open-source Python Risk Identification Toolkit for automating adversarial test prompts against generative AI systems |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
is AI red-teaming described as "systematic" rather than "freeform,"
and name two of the specific categories (from earlier chapters) a real
engagement's test plan is built around.
