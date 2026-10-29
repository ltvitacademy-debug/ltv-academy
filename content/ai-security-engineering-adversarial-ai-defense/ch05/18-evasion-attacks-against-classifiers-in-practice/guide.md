# Lesson 18 — Evasion Attacks Against Classifiers in Practice

**Chapter 5 · Adversarial Examples and Evasion Attacks · Lesson 2 of 4**

## What you'll learn

- What an **evasion attack** is, and how it differs from the lab-style
  image example you just saw
- Why evading a malware classifier or a spam filter is a fundamentally
  harder problem for an attacker than perturbing an image
- The real distinction between feature-space and problem-space
  attacks, and why that distinction is the whole story in production
- What this means for any security team that has deployed a
  classifier as part of a detection pipeline

## From "an adversarial example" to "an evasion attack"

Lesson 17 established the mechanism: a small, deliberate perturbation
that moves a correctly classified input across a model's decision
boundary. An **evasion attack** is what happens when that mechanism
gets pointed at a model whose job is security detection — a malware
classifier, a spam or phishing filter, a network intrusion detector —
with a specific goal: get something malicious past the model at
inference time, after the model is already deployed and making
real decisions.

The goal isn't academic anymore. If an attacker can reliably evade a
malware classifier, the payoff is a malicious file being delivered
instead of quarantined. If they can evade a spam filter, the payoff is
a phishing email landing in an inbox instead of a junk folder. That's
why this category of research gets taken seriously by security teams,
not just ML researchers — it maps directly onto detection controls
your organization may already depend on.

## Why malware and spam are harder than pandas

Here's the constraint that the image example doesn't have to deal
with: a perturbed malware file still has to be malware. It has to
execute, carry its payload, and do whatever it was built to do. A
perturbed phishing email still has to deliver its malicious link and
still has to read as a convincing message to the human it's targeting.
You can't just add arbitrary "noise" to a binary the way you can add
noise to pixel values — most byte-level changes will corrupt the file
or break its functionality outright.

This is the difference security researchers describe as **feature-space**
versus **problem-space** attacks. A feature-space attack perturbs the
numeric feature vector a classifier actually sees — convenient for
research, because the math works the same way it does for images. A
problem-space attack has to work in the real artifact: the actual PE
file, the actual email, the actual network packet. Published research
on evading machine-learning-based malware detectors — including
Grosse et al.'s 2017 work, *Adversarial Examples for Malware Detection*
— specifically grapples with this: a change that looks small in
feature space has to be translated into a real, **functionality-
preserving** modification to the file itself, such as appending
padding bytes or injecting unused code sections, without breaking what
the malware does. That translation step is where most of the real
difficulty — and most of the real research — actually lives.

## Spam and phishing filters: the "good word attack"

Text classifiers face their own version of this problem. Published
research on evading spam and phishing filters describes **good word
attacks** — inserting or substituting words and characters that the
filter's training data associates heavily with legitimate mail,
diluting the signal the filter relies on, without destroying the
message's ability to actually phish its target. The same idea shows
up as homoglyph substitution (swapping visually similar characters)
and deliberate misspellings designed to survive tokenization while
still reading naturally to a human recipient. None of this requires
touching the model's weights — it only requires understanding, or
guessing at, what the model's decision depends on.

## Why this matters even if you never build an attack

You will probably never be asked to craft an evasion attack against a
production system — and this course isn't teaching you to. What you
do need, as a security engineer, is the mental model: any classifier
your organization relies on for detection is itself part of the attack
surface, not just part of the defense. An adaptive adversary will probe
its decision boundary the same way they'd probe a firewall rule set.
That reframing is what justifies the next two lessons — what defenses
actually buy you, and how a team tests a model's robustness before
trusting it in production.

## Key terms

| Term | Meaning |
|---|---|
| Evasion attack | An attack at inference time against a deployed classifier, aimed at getting a malicious or undesired input past detection |
| Feature-space attack | A perturbation applied directly to the numeric feature vector a model sees, without necessarily mapping back to a valid real-world artifact |
| Problem-space attack | A perturbation applied to the real artifact itself (file, email, packet) that must still be realizable and functional |
| Functionality-preserving perturbation | A problem-space change to malware or another artifact that evades detection while the artifact still does what it was built to do |
| Good word attack | Inserting or substituting words/characters a spam or phishing filter associates with legitimate mail, to dilute its detection signal |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
is a feature-space perturbation that "works" in a research paper not
automatically a real-world evasion attack, and what has to be true of
a problem-space perturbation for it to actually matter?
