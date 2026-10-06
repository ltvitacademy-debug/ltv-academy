# Lesson 13 — Integration Users and Security · Voiceover script

Segments map 1:1 to slides. Chapter 3 · Authentication and Security · Lesson 13 of 19.

---

## S1 · TITLE CARD

Chapters 1 and 2 assumed credentials existed; Lesson 11 and 12 covered how those credentials prove identity. This lesson asks the question a consultant actually has to answer on a real project: whose credentials should those be?

## S2 · STEPS CARD

The answer is almost never a specific employee's own login. A dedicated integration user is a service identity, not tied to one person, so the integration keeps working after that employee changes roles or leaves the company. It's named clearly as what it is — something like integration dot a p dot bank feed — so no one mistakes it for a human account during a security review. And it's owned by IT or security, so password rotation and access review don't depend on one person remembering to do it.

## S3 · STEPS CARD

Beyond just being dedicated, that integration user should follow least privilege: only the specific job and duty roles tied to the data it actually touches, only the business units it's built for, and read-only access wherever the integration never needs to write.

## S4 · CODE CARD

The failure modes of skipping this are concrete, not theoretical. Use a personal login and the integration breaks the moment that employee leaves, or the moment their password gets reset for an unrelated reason. Grant broader access than needed and you've created unnecessary audit risk. A dedicated, scoped integration user avoids all three.

## S5 · OUTRO CARD

A named, dedicated, least-privilege integration user — that's the security foundation underneath every integration this course has described. Next lesson, we look at what happens when a call to that integration doesn't succeed, and what's actually worth retrying.
