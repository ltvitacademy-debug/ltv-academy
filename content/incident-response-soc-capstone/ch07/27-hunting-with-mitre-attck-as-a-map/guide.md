# Lesson 27 — Hunting with MITRE ATT&CK as a Map

**Chapter 7 · Threat Hunting Methodology · Lesson 27 of 32**

## What you'll learn

- How to use the MITRE ATT&CK framework you already know as a structured source of hypotheses,
  instead of guessing what to hunt for next
- The difference between hunting one technique at a time and systematically working through a
  tactic
- What a real ATT&CK **coverage heat map** is, and what it's actually for
- Why coverage gaps — techniques you've never hunted for — are themselves worth hunting down

## From one hypothesis to a systematic map

The earlier networking and cybersecurity fundamentals course introduced MITRE ATT&CK as a public,
continuously updated knowledge base of real adversary **tactics** (the attacker's goal, like
Persistence or Lateral Movement) and **techniques** (the specific method, like a particular
credential-dumping tool, each with its own ID — T1059, T1021, and so on). Lesson 25 already named
ATT&CK as one real source of hunting hypotheses. This lesson is about doing that systematically:
instead of picking one technique when something happens to come to mind, you work through the
matrix itself, tactic by tactic, and ask "have we actually hunted for evidence of this one?"

## Hunting a tactic, not just a technique

Picture the **Lateral Movement** tactic — an attacker who has already gained a foothold trying to
move to other systems in the environment. ATT&CK lists multiple techniques under that one tactic,
including **T1021 (Remote Services)**: using legitimate remote-access tools like RDP or WinRM to
hop between machines. A hypothesis built directly from that technique: "an attacker with a
compromised account may be using RDP to move between hosts in a pattern that doesn't match normal
admin behavior." That's a specific, testable hypothesis exactly like Lesson 25's — the only
difference is where it came from: a named tactic and technique in a published matrix, not a guess.

## Coverage: what you've actually hunted for

Working through a tactic one technique at a time naturally produces a record of what's been
checked. Teams that do this seriously track it as **coverage** against the ATT&CK matrix — often
visualized as a **heat map** using the free **MITRE ATT&CK Navigator** tool, where each technique
cell gets shaded by whether it's been hunted for, has a detection rule already covering it, or
hasn't been looked at yet. That map turns "what should we hunt next" from a guess into a read of
the board: the unshaded cells are exactly the techniques nobody has checked.

## Gaps are hypotheses waiting to be written

A coverage gap isn't just a record-keeping detail — it's the next hunt. If the heat map shows that
**Persistence** techniques are well covered but nothing under **Credential Access** has ever been
hunted for, that gap itself becomes the next hypothesis to form and run through Lesson 26's loop.
Used this way, ATT&CK stops being a reference chart you look up after an incident and becomes the
actual map that tells a hunting program where to go next, systematically, instead of wherever an
analyst's attention happens to land.

## Key terms

| Term | Meaning |
|---|---|
| ATT&CK tactic | The attacker's goal at a stage, such as Persistence or Lateral Movement |
| ATT&CK technique | The specific, ID-numbered method used to achieve a tactic, such as T1021 Remote Services |
| Coverage | A record of which ATT&CK techniques a team has actually hunted for or built detections for |
| Heat map (ATT&CK Navigator) | A visualization, built with MITRE's free Navigator tool, shading matrix cells by hunt/detection coverage |

## Check yourself

A team's ATT&CK coverage heat map shows Persistence techniques well hunted but Credential Access
techniques completely unshaded. Explain how that gap itself becomes a specific, testable
hypothesis for the next hunt, rather than just a line item on a chart.
