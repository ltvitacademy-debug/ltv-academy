# Lesson 27 — Mapping Attacker Actions to MITRE ATT&CK in Real Time

**Chapter 7 · Purple Team Operations · Lesson 3 of 4**

## What you'll learn

- What the MITRE ATT&CK framework actually is: tactics (the attacker's
  goal) and techniques/sub-techniques (the specific method), each with
  a stable ID
- Why mapping every action to its ATT&CK ID live, during the exercise,
  removes ambiguity between red and blue
- How the ATT&CK Navigator turns a list of IDs into a visual coverage
  heat map the whole room can read at a glance
- How ATT&CK mapping lets you compare your own coverage against known
  real-world adversary behavior, not just a generic checklist

## ATT&CK: tactics are the why, techniques are the how

MITRE ATT&CK is a public, continuously maintained knowledge base of
real adversary behavior, organized around 14 tactics — the attacker's
goal at a given stage, like Initial Access, Privilege Escalation,
Lateral Movement, Command and Control, or Exfiltration. Under each
tactic sit techniques, and under many techniques sit sub-techniques,
each with a stable identifier: `T1059` is Command and Scripting
Interpreter; `T1059.001` is specifically PowerShell. The same technique
ID means the same thing everywhere — in a threat intel report, in a
red team's own notes, and in your blue team's detection coverage
matrix.

## Why mapping has to happen live, not afterward

In Lesson 26 you saw red announce a technique before executing it.
What actually gets announced is the ATT&CK ID, not a vague description:
"I'm about to run `T1003.001`, LSASS memory dumping, under Credential
Access" is unambiguous in a way "I'm going to try to grab some
passwords" is not. That precision matters because blue's own detection
coverage is organized by the same IDs — when red calls out `T1003.001`,
blue can instantly check their own matrix for whether a rule covering
that exact technique is supposed to exist, rather than guessing which
of several password-related detections might be relevant.

```
ANNOUNCED LIVE           LOGGED BY THE SCRIBE
"T1059.001 — PowerShell,  Tactic: Execution
 Execution tactic,        Technique: T1059.001
 running now"             Timestamp: 14:32:07
                          Detected: pending...
```

## The ATT&CK Navigator: coverage you can see

The MITRE ATT&CK Navigator is a free, real tool
(`mitre-attack.github.io/attack-navigator`) that renders the entire
matrix as a grid of tactics and techniques, color-codable cell by
cell. During a purple team exercise, the scribe or facilitator marks
each tested technique as it's resolved — green for detected cleanly,
yellow for detected but slow or noisy, red for not detected at all —
and by the end of the session the whole room is looking at an actual
heat map of where coverage is strong and where it isn't, instead of a
list buried in a spreadsheet.

## Comparing coverage against real adversaries, not a generic list

Because ATT&CK also catalogs specific known threat groups and the
exact technique sets they've been observed using, mapping your own
results to the same IDs lets you ask a much sharper question than "did
we test some things?" You can ask: "of the techniques this specific
ransomware group used in its last three publicly reported intrusions,
how many does our environment actually detect today?" That's the real
reason purple team exercises prioritize techniques from current threat
intelligence — the ATT&CK mapping is what makes that comparison
possible at all.

## Key terms

| Term | Meaning |
|---|---|
| Tactic | The attacker's goal at a given stage (e.g. Privilege Escalation, Exfiltration) — one of 14 in the ATT&CK matrix |
| Technique / sub-technique | The specific method used to accomplish a tactic, each with a stable ID (e.g. `T1059`, `T1059.001`) |
| ATT&CK Navigator | MITRE's free tool for visualizing ATT&CK coverage as a color-coded heat map across the full matrix |
| Detection coverage matrix | A blue team's own record of which ATT&CK techniques they believe they can detect, organized by the same IDs |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
does announcing a technique by its ATT&CK ID matter more than
describing it in plain language, and what does the ATT&CK Navigator
let a team see that a plain list of findings doesn't?
