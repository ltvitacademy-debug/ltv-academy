# PII Redaction Reference

An extended, real, working version of the `redact()` function from Lesson 19 — the same pattern,
with the two additional identifiers that lesson's own lab asks you to add, plus the honest limits
of what pattern matching alone can and can't catch. Use this as a starting point before a prompt
or response is logged (Lesson 13), sent to a third-party model provider, or added to an eval
dataset (Lesson 7).

## The extended pattern

```python
import re

PATTERNS = {
    "email":       r"[\w.+-]+@[\w-]+\.[\w.-]+",
    "phone":       r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b",
    "ssn":         r"\b\d{3}-\d{2}-\d{4}\b",
    "credit_card": r"\b(?:\d[ -]*?){13,16}\b",
    "ip_address":  r"\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b",
}

def redact(text: str) -> str:
    for label, pattern in PATTERNS.items():
        text = re.sub(pattern, f"[{label.upper()}]", text)
    return text


if __name__ == "__main__":
    sample = (
        "Please contact me at jordan.ellis@example.com or 555-234-9871. "
        "My SSN is 512-34-7890 and my card is 4111 1111 1111 1111. "
        "I was connecting from 192.168.1.42 when this happened."
    )
    print(redact(sample))
    # "Please contact me at [EMAIL] or [PHONE]. "
    # "My SSN is [SSN] and my card is [CREDIT_CARD]. "
    # "I was connecting from [IP_ADDRESS] when this happened."
```

## What this catches, and what it doesn't

| Catches reliably (direct identifiers) | Does NOT catch (quasi-identifiers) |
|---|---|
| Email addresses | A name with no fixed shape ("my manager Sarah Chen") |
| Phone numbers (common US formats) | A location mentioned in prose ("the Austin office") |
| Social Security numbers | A combination of ZIP code + birth date + job title |
| Credit card numbers | Any detail that only identifies someone in combination with others |
| IPv4 addresses | IPv6 addresses (a different pattern would be needed) |

Regex catches direct identifiers reliably because they have a fixed, learnable shape. It
structurally cannot catch a name or a location mentioned in ordinary prose, and it cannot reason
about whether several individually-harmless fields (a ZIP code, a birth date, a job title)
combine to identify one specific person — that's what Lesson 19 calls a quasi-identifier problem,
and no amount of regex tuning closes that gap.

## Where to go next

Production-grade PII handling layers a Named Entity Recognition model on top of this pattern
matching specifically to catch names, locations, and organizations — Microsoft's open-source
**Presidio** project (pattern matching + NER + a configurable confidence threshold) is the real,
concrete example Lesson 19 points to. Treat the function above as the first layer worth having in
place today, not the complete answer.

## A starter logging policy, to adapt

Before wiring this into a real pipeline, write down (per Lesson 13's lab) which fields get
logged in full, which get redacted, and for how long logs are retained. A one-paragraph example:

> All support-chatbot prompts and responses are passed through `redact()` before being written
> to the log store. Redacted logs are retained for 90 days for debugging, then deleted. Raw,
> unredacted bodies are never written to persistent storage; if a specific incident requires the
> original text, it is pulled from the live session only, with access logged.
