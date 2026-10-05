# Lesson 1 — Data Security and Privacy Concepts

**Chapter 1 · Sensitive Data Foundations · Lesson 1 of 30**

## What you'll learn

- What "data security" means, and the CIA triad (confidentiality, integrity, availability) that defines it
- What "data privacy" means, and how it differs from security
- Why a system can be fully secure and still violate privacy — and why a privacy policy is worthless without security behind it
- How this course is structured, from here through classification, access control, and applied case studies

## Data security: protecting data itself

**Data security** is the practice of protecting data from unauthorized access, alteration, or destruction. It's usually explained through three properties, known together as the **CIA triad**:

- **Confidentiality** — only people who are authorized to see the data can see it. Encryption, access controls, and authentication all serve confidentiality.
- **Integrity** — the data is accurate and hasn't been tampered with, whether by an attacker, a bug, or an honest mistake. Checksums, audit logs, and validation rules all serve integrity.
- **Availability** — the data is there and usable when the people who legitimately need it, need it. Backups, redundancy, and disaster recovery all serve availability.

Notice what the CIA triad does *not* ask: it never asks whether the data should have been collected in the first place, or whether the people it's about agreed to how it's being used. Security is about **protecting** data — full stop — regardless of what that data is or how it got there.

## Data privacy: governing appropriate use

**Data privacy** is a different question: it's about the rights and obligations around how **personal data** — data about identifiable people — is collected, used, and shared. Privacy asks questions security never does: Did the person know this data was being collected? Did they agree to it? Is it being used for the purpose they were told, or some other purpose? Can they see what's held about them, correct it, or ask for it to be deleted?

Where security is about keeping data safe, privacy is about using it **appropriately** — with notice, consent, and limits that respect the person the data describes.

## Related, but genuinely distinct

These two ideas travel together so often that it's tempting to treat them as the same thing. They aren't, and the gap between them matters:

- A system can be **perfectly secure** — strongly encrypted, tightly access-controlled, fully audited — and still **violate privacy**, if it collects or uses someone's personal data in ways they never agreed to. Locking a filing cabinet doesn't make it okay that you put a stranger's medical history in it without asking.
- Conversely, a **privacy-respecting policy is worthless without security behind it**. An organization can write the most careful consent language and data-use policy in the world, but if that data sits in a database anyone can read, the policy is just paper. Security is what makes privacy promises enforceable in practice, not just on paper.

Think of security as the lock, and privacy as the rule about who's allowed to ask for the key and why. You need both; neither one substitutes for the other.

## Where this course goes from here

This lesson sets up the vocabulary for the rest of the course. Lesson 2 digs into **PII** — personally identifiable information — the specific category of data that privacy rules exist to protect. Lesson 3 draws the line between **sensitive** and **confidential** data more broadly. From there, the course covers the major **regulations** (GDPR, CCPA, HIPAA, SOX), **privacy by design**, **classification schemes**, **access control**, concrete ways to **protect data**, the data **lifecycle** and compliance obligations, and finally applied case studies that put all of it together.

## Key terms

| Term | Meaning |
|---|---|
| Data security | Protecting data from unauthorized access, alteration, or destruction |
| CIA triad | Confidentiality, integrity, and availability — the three properties data security protects |
| Data privacy | The rights and obligations governing how personal data is collected, used, and shared |
| Confidentiality | Only authorized people can see the data |
| Integrity | The data is accurate and hasn't been improperly altered |
| Availability | The data is accessible to legitimate users when they need it |

## Lab

Pick an app or service you use regularly (a bank, a health app, a social network). Write one sentence describing how it protects your data (security) and one sentence describing what it's told you — or hasn't told you — about how your data is used (privacy). If you can't answer the privacy sentence, that's itself the point of this lesson.

## Check yourself

Can you state the three properties of the CIA triad from memory, explain how data privacy differs from data security, and give an example of a system that could be secure but still violate privacy?
