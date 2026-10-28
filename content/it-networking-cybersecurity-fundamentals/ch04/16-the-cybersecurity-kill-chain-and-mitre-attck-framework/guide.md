# Lesson 16 — The Cybersecurity Kill Chain and the MITRE ATT&CK Framework

**Chapter 4 · Cybersecurity Foundations: Core Concepts · Lesson 16 of 32**

## What you'll learn

- The seven stages of the Lockheed Martin Cyber Kill Chain, in order
- What the MITRE ATT&CK framework actually is and who maintains it
- The difference between what each framework is good for
- Why SOC analysts reference both when triaging a real incident

## The Cyber Kill Chain: an attack has stages

Lockheed Martin developed the **Cyber Kill Chain** to describe the stages a typical intrusion
moves through, borrowing the military idea that breaking any single link in an attacker's
chain stops the whole attack. The seven stages, in order, are:

1. **Reconnaissance** — the attacker researches the target: employee names on LinkedIn,
   technologies in job postings, exposed services found by scanning.
2. **Weaponization** — the attacker builds the actual tool, such as a malicious document
   or an exploit paired with a backdoor.
3. **Delivery** — the weapon reaches the target, commonly through a phishing email, an
   infected USB drive, or a compromised website.
4. **Exploitation** — the delivered weapon triggers, taking advantage of a vulnerability to
   run code on the victim's system.
5. **Installation** — the attacker installs persistent malware so they can maintain access
   even after a reboot.
6. **Command & Control (C2)** — the compromised system phones home to an attacker-controlled
   server, giving the attacker a remote channel to issue commands.
7. **Actions on Objectives** — the attacker finally does what they came to do: stealing data,
   encrypting files for ransom, or pivoting deeper into the network.

The practical value of the model is that defense doesn't require catching every stage — it
only requires breaking one link anywhere in the chain to stop the attack from reaching its
goal.

## MITRE ATT&CK: the real-world catalog of how attacks actually happen

Where the kill chain describes a general life cycle, the **MITRE ATT&CK framework** is a
different kind of tool: a free, publicly maintained knowledge base of real adversary
**tactics** (the attacker's goal at a given stage, like "Persistence" or "Lateral
Movement") and **techniques** (the specific method used to achieve that goal, like a
particular registry-key trick or a specific credential-dumping tool), built from actual
documented intrusions and used industry-wide by defenders, vendors, and red teams alike.
Each technique has its own ID and detailed documentation, which means a report that says
"the attacker used technique T1059 (Command and Scripting Interpreter)" means the exact
same specific thing to every analyst who reads it, anywhere in the industry.

## Two frameworks, two different jobs

The kill chain is a simple, linear story useful for explaining an attack's overall arc and
for conversations with non-technical stakeholders. ATT&CK is a much deeper, non-linear
matrix of hundreds of specific real-world techniques, useful for the technical work of
figuring out exactly what an attacker did and what to detect next time.

## Why SOC analysts use both

When a Security Operations Center (SOC) analyst triages a real incident, the kill chain
answers "where are we in this attack, and how far have they gotten" — useful for deciding
urgency and what to stop first. ATT&CK then answers "exactly which technique did they use at
this step, and what other techniques does this same adversary group typically pair it
with" — useful for building the specific detection rule or closing the specific gap that let
it happen. Used together, the kill chain gives the narrative and ATT&CK gives the technical
precision.

## Key terms

| Term | Meaning |
|---|---|
| Cyber Kill Chain | Lockheed Martin's seven-stage model of how a typical intrusion progresses |
| Command & Control (C2) | The channel a compromised system uses to communicate back to an attacker |
| MITRE ATT&CK | A public, continuously updated knowledge base of real-world adversary tactics and techniques |
| Tactic vs. technique | A tactic is the attacker's goal at a stage; a technique is the specific method used to achieve it |

## Check yourself

An analyst stops an attack at the Delivery stage by blocking a phishing email before anyone
clicks it. Why does breaking the chain there still count as a full defensive success, even
though the attacker had already completed Reconnaissance and Weaponization?
