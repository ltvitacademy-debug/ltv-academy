# Lesson 6 — Signature-Based vs. Anomaly-Based Detection

**Chapter 2 · Intrusion Detection & Prevention Systems · Lesson 6 of 32**

## What you'll learn

- How signature-based detection decides traffic is malicious, and why it's fast but blind to new attacks
- How anomaly-based detection decides traffic is suspicious without ever knowing the specific attack in advance
- The real tradeoff between the two: speed and precision vs. broader coverage and more false positives
- Why most modern detection platforms run both approaches at the same time rather than picking one

## Signature-based detection: matching what's already known

**Signature-based detection** works by comparing traffic — a specific byte sequence in a packet's payload, a particular exploit's fingerprint — against a database of known attack patterns. It's the same basic idea as traditional antivirus matching a file against a list of known malware hashes, applied instead to packets crossing the wire. The strength of this approach is real: when a signature-based rule fires, an analyst can generally trust it, because it's matching something a vendor or researcher has already documented in detail, and the false-positive rate for well-written signatures is low.

The weakness is just as real: signature-based detection is **only ever as good as its signature database**. An attacker using a brand-new technique — one nobody has written a signature for yet — sails straight through completely undetected, no matter how obviously malicious that traffic would look to a human analyst reviewing it after the fact.

## Anomaly-based detection: flagging what's different

**Anomaly-based detection** takes the opposite approach. Instead of looking for a specific known pattern, it builds a **baseline** of what normal looks like for a given network or system — typical traffic volume, which protocols run at which times, how systems usually talk to each other — and then flags anything that deviates meaningfully from that baseline. Because it isn't tied to a documented signature, anomaly-based detection can catch a genuinely **novel, never-before-seen attack** that a signature-based engine would miss entirely.

That coverage comes at a cost: a **higher false-positive rate**. Traffic that's legitimately unusual but completely harmless — a one-time bulk data transfer, a new application rolling out — can trip the same alarm as an actual attacker, because the anomaly engine has no way to know the difference between "unusual and malicious" and "unusual and fine."

## The hybrid approach most real tools use

In practice, most modern detection platforms — including Suricata — don't force a choice between the two. They run **both engines side by side**: the signature engine handles known threats fast and with very few false alarms, while the anomaly engine watches everything else, including attacks nobody has documented yet. Running them together gives a SOC broad coverage without giving up the precision signatures provide on the threats that are already well understood.

## Key terms

| Term | Meaning |
|---|---|
| Signature-based detection | Matches traffic against a database of known attack patterns; fast and precise, blind to novel attacks |
| Anomaly-based detection | Flags traffic that deviates from a learned baseline of normal behavior; catches novel attacks, more false positives |
| Baseline | The model of "normal" behavior an anomaly-based engine learns and compares live traffic against |
| False positive | A detection match on traffic that was actually legitimate |

## Check yourself

A brand-new attack technique appears in the wild with no published signature yet. Which of the two detection approaches has a real chance of catching it anyway, and why does the other approach structurally miss it?
