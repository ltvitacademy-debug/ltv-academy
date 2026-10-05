# Lesson 2 — PII and Personal Data

**Chapter 1 · Sensitive Data Foundations · Lesson 2 of 30**

## What you'll learn

- What PII (Personally Identifiable Information) means, and the difference between direct and quasi-identifiers
- The classic re-identification research showing how dangerous quasi-identifiers really are
- How "personal data" under GDPR is a broader concept than the US-centric term PII
- A preview of sensitive/special-category PII, covered fully in Lesson 3

## Direct identifiers: the obvious ones

**PII — Personally Identifiable Information** — is information that can identify a specific individual. The easy cases are **direct identifiers**: a full name, a Social Security number, a passport number, an email address, a phone number. On their own, each one points at exactly one person. These are the fields everyone already treats as sensitive, and they're usually the first thing a security or privacy review flags.

## Quasi-identifiers: the dangerous ones

**Indirect identifiers**, also called **quasi-identifiers**, don't look dangerous individually, which is exactly the problem. A ZIP code alone doesn't identify you — thousands of people share it. A birth date alone doesn't either. But **combined**, a small number of quasi-identifiers can narrow a dataset down to one specific person, even if every direct identifier has been stripped out.

The research that made this concrete: computer scientist **Latanya Sweeney**, in her landmark study *"Simple Demographics Often Identify People Uniquely"* (Carnegie Mellon, 2000), showed that the combination of just three widely available fields — **5-digit ZIP code, full date of birth, and gender** — uniquely identifies a large majority of the U.S. population. Strip the name and SSN from a dataset, and it can still re-identify most of the people in it, as long as those three quasi-identifiers survive. This is why "anonymized" datasets that still carry ZIP, birth date, and gender often aren't anonymous at all.

## PII vs. the broader concept of "personal data"

PII is a **U.S.-centric** term, and it's narrower than it sounds. **GDPR**, the EU's data protection regulation, uses a broader concept instead: **personal data** — "any information relating to an identified or identifiable natural person." This definition doesn't require the information to directly name someone; anything that could be linked back to a specific person counts, including things many US PII definitions wouldn't catch on their own — an IP address, a device ID, a cookie identifier, or location history. If you're working under GDPR, thinking only in terms of "is this PII" will miss data the regulation still protects.

## A preview: sensitive / special-category data

Not all PII carries the same stakes. A subset — things like **health information, biometric data (fingerprints, facial recognition templates), and detailed financial account data** — gets treated with extra caution because exposure can cause direct, serious harm to the person. GDPR calls this **special category data** and subjects it to stricter rules than ordinary personal data. Lesson 3 covers this category, and the related but distinct idea of organizational "confidential" data, in full.

## Key terms

| Term | Meaning |
|---|---|
| PII | Personally Identifiable Information — data that can identify a specific individual |
| Direct identifier | A field that identifies someone on its own (name, SSN, passport number, email) |
| Quasi-identifier | A field that doesn't identify someone alone, but can when combined with others (ZIP, birth date, gender) |
| Personal data (GDPR) | Any information relating to an identified or identifiable natural person — broader than PII |
| Special category data | Health, biometric, and other high-stakes personal data subject to extra protection under GDPR |

## Lab

List five pieces of information a typical online retailer holds about you (name, address, purchase history, device type, browsing session ID, etc.). For each, mark it as a direct identifier, a quasi-identifier, or neither — and note which ones would count as "personal data" under GDPR's broader definition even if they wouldn't typically be flagged as PII in a US context.

## Check yourself

Can you explain the difference between a direct identifier and a quasi-identifier, state the three quasi-identifiers in Sweeney's re-identification finding, and explain why GDPR's "personal data" is broader than the term PII?
