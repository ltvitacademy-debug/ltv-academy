# Lesson 10 — Access Governance Patterns · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson ties Entra ID, Azure RBAC, and AWS IAM together into patterns that apply across all three.

## S2 · STEPS — Groups, and the narrowest role

Two ideas have run through this entire chapter. Assign access to a group, not an individual — membership changes grant or revoke access automatically, with nothing to forget. And default to the narrowest job-function role that gets the job done, not a broad admin role — it's a smaller blast radius if compromised, and a one-line answer to "what can this identity actually do," instead of a long one.

## S3 · STEPS — Periodic access reviews

Access persists long after it's needed — a project ends, someone changes teams, and revoking the old access was nobody's specific job. An access review is a recurring, structured process that re-confirms access is still needed. Entra ID has this built in as Access reviews. AWS's IAM Access Analyzer does the equivalent job continuously, flagging unused permissions and external access.

## S4 · STEPS — Break-glass accounts

A break-glass account is a pre-provisioned emergency credential, kept in reserve for when normal access — including the identity system itself — is unavailable. It's deliberately excluded from the group-based, reviewed pattern, because its whole purpose is to work when those systems don't. Instead: vaulted offline, every use triggers an alert, every use gets audited. Both Microsoft and AWS recommend keeping at least two.

## S5 · STEPS — Just-in-time access

These patterns reduce who has access and how broad it is. Just-in-time access reduces how long it exists. Entra PIM makes a role eligible rather than permanently active — requested, time-boxed, and auto-expiring. AWS's STS AssumeRole does the same job through temporary credentials with a built-in expiration. Standing access to assume a role isn't the same as standing active access.

## S6 · OUTRO

Chapter 3 starts next, building on this identity foundation to cover where governed data actually lives — starting with Azure Data Lake Storage.
