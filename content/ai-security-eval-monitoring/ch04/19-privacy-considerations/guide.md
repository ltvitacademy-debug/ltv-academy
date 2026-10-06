# Lesson 19 — Privacy Considerations: PII in Prompts

**Chapter 4 · Responsible AI & Governance · Lesson 19 of 25**

## What you'll learn

- Why personal data ends up inside AI systems in places teams don't expect
- The difference between direct identifiers and quasi-identifiers
- A real, working pattern for redacting common PII before it's logged or sent onward
- Why pattern-matching redaction catches the obvious cases and misses the rest — and what that means for how much to trust it

## Where PII actually enters an AI system

Lesson 13 flagged this in passing: a prompt or response can carry personal data, and most teams don't decide that on purpose — it just arrives. It shows up in more places than the obvious "the user typed their name":

- **Direct user input** — a support request that includes an account number or a home address
- **Retrieved context in a RAG system** — a document fetched to answer a question can itself contain other people's personal data
- **Conversation history** — a multi-turn chat can accumulate PII across turns even if no single message looks sensitive alone
- **Model output** — a model summarizing a document can reproduce the PII it was given, or in rare cases, generate something that resembles real personal data from training

## Direct identifiers vs. quasi-identifiers

Not all PII looks the same, and that distinction matters for what you can realistically catch:

- **Direct identifiers** have a recognizable shape — an email address, a phone number, a Social Security number — which makes them catchable with pattern matching.
- **Quasi-identifiers** don't look like PII on their own but can identify someone in combination — a ZIP code, a birth date, and a job title together can narrow down to one person even though none of the three is sensitive alone.

Pattern-based redaction is good at the first category and close to useless against the second.

## A real redaction pattern

This is a genuine, working approach — not the whole solution, but the first layer worth having in place before anything else:

```python
import re

PATTERNS = {
    "email": r"[\w.+-]+@[\w-]+\.[\w.-]+",
    "phone": r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b",
    "ssn":   r"\b\d{3}-\d{2}-\d{4}\b",
}

def redact(text):
    for label, pattern in PATTERNS.items():
        text = re.sub(pattern, f"[{label.upper()}]", text)
    return text
```

Run this (or an equivalent) before a prompt is logged (Lesson 13's omit-logs is the other half of this same problem), before it's sent to a third-party model provider if that matters for your compliance posture, or before it's included in a dataset used for Chapter 2's evals.

## Where regex stops being enough

Regex catches an email address reliably because an email address has a fixed, learnable shape. It does not catch "my manager Sarah Chen in the Austin office" — a name and a location with no fixed pattern at all. Production-grade PII handling generally layers a Named Entity Recognition model on top of pattern matching specifically to catch names, locations, and organizations that regex structurally can't. Microsoft's open-source Presidio project is a real example of this layered approach — pattern matching plus NER plus a configurable confidence threshold — worth knowing exists even if you don't adopt it directly.

## Key terms

| Term | Meaning |
|---|---|
| Direct identifier | PII with a recognizable fixed shape (email, phone, SSN) |
| Quasi-identifier | Data that isn't sensitive alone but can identify someone combined with other fields |
| Redaction | Replacing detected PII with a placeholder before storage or transmission |

## Lab

Take the redact() function above and extend the PATTERNS dictionary with one more direct identifier you think is commonly missed (a credit card number, an IP address). Write the regex and test it against one real-looking (but fake) example string.

## Check yourself

Can you explain why a regex-only redaction system would pass a compliance review for emails and phone numbers but still leak someone's identity through a combination of their ZIP code, birth date, and job title?
