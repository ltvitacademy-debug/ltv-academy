# Lesson 26 — Running a Collaborative Purple Team Exercise

**Chapter 7 · Purple Team Operations · Lesson 2 of 4**

## What you'll learn

- How a real purple team exercise is planned before anyone executes a
  single technique
- Why techniques are run one at a time, with red announcing and
  executing while blue watches live
- What happens the moment a technique isn't detected — and why that's
  the most valuable moment in the whole session
- How a facilitator keeps a multi-technique exercise productive
  instead of turning into an unfocused back-and-forth

## Planning: picking techniques before the room ever opens

A purple team exercise doesn't start with "let's see what happens." It
starts with a short, prioritized list of specific techniques to test —
usually chosen from recent threat intelligence relevant to the
organization's industry (ransomware groups' known TTPs, a technique
seen in a recent incident, a gap flagged by a prior red team report).
Each technique gets a defined success criterion: what should the SIEM
or EDR actually do when this runs? Someone is assigned to facilitate
and scribe — tracking results in real time isn't optional, because the
whole value of the exercise depends on an accurate record of what
happened and when.

## Execution: one technique, announced, watched live

Inside the session, red doesn't run a stealthy multi-stage attack chain
the way a real red team engagement would. Instead, red announces a
single, specific technique — "I'm about to run `T1059.001`, a malicious
PowerShell command, on this test host" — and executes it right then, at
a known timestamp. Blue is already watching the SIEM and EDR console in
real time, and the whole room finds out together, within seconds,
whether anything fired.

```
PURPLE TEAM EXERCISE — one cycle
1. Red announces the technique (name + timestamp)
2. Red executes it against the agreed test host
3. Blue checks the SIEM/EDR for an alert in real time
4. Result logged: detected? time to detect? alert quality?
5. If detected cleanly -> move to the next technique
6. If not -> diagnose together, fix, RE-RUN to confirm
```

## The gap is the point

When a technique doesn't trigger an alert, that's not a failure of the
exercise — it's the exercise working exactly as intended. Red and blue
immediately start asking why, together, instead of writing it down for
someone to investigate later: is the right log source even being
collected? Does a detection rule exist but use the wrong field? Is the
threshold tuned so high that this exact behavior falls under it? The
defender tunes or writes a rule on the spot, and then — critically —
red re-runs the exact same technique to confirm the fix actually works,
before the group moves on. Skipping that re-run is the single most
common way purple team exercises quietly fail to produce real
improvement.

## Keeping a multi-technique session on track

A real exercise might work through a dozen or more techniques across a
day or across several sessions. A facilitator keeps it moving: timeboxing
each technique so one stubborn gap doesn't consume the whole session,
making sure the scribe's tracker captures technique ID, timestamp,
detected/not-detected, time-to-detect, and the remediation owner for
anything left open, and making sure the group doesn't drift into
unrelated debugging. Anything that can't be fixed live gets a named
owner and a deadline — it still doesn't wait for a report nobody reads.

## Key terms

| Term | Meaning |
|---|---|
| Technique list | The short, prioritized set of specific attacker techniques chosen for the exercise, usually driven by threat intelligence |
| Facilitator/scribe | The role tracking results in real time — technique, timestamp, detection status, time-to-detect, remediation owner |
| Re-run | Executing the same technique again after a fix, to confirm the detection gap is actually closed before moving on |
| Time-to-detect | How long it took the SIEM/EDR to produce an alert after the technique executed — a core metric tracked per technique |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
is a missed detection during a purple team exercise treated as a good
outcome for the session, and what step must happen right after a gap
gets fixed, before the group moves to the next technique?
