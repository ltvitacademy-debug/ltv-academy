# Lesson 19 — AWS Organizations and Service Controls · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

AWS Organizations and Service Controls — governance at the level of whole AWS
accounts, not single resources.

## S2 · SCREENSHOT (OU hierarchy)

Accounts group into organizational units, nested into a tree under one root, with
one account designated the management account.

## S3 · SCREENSHOT (accounts in OU)

Which service control policies apply to an account depends entirely on which OU
that account currently sits in.

## S4 · SCREENSHOT (SCP list)

The console shows both halves — policies attached directly to this OU, and
policies inherited from every parent OU above it, all the way to the root.

## S5 · CODE (deny CloudTrail SCP)

A service control policy is a ceiling, never a grant. This one denies CloudTrail
tampering — no IAM policy anywhere in a covered account can override that deny.

## S6 · OUTRO CARD

Next up: auditing and logging in the cloud — exactly what that SCP was protecting.
