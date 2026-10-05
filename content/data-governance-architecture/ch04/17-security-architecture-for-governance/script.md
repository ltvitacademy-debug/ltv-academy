# Lesson 17 — Security Architecture for Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Chapter Four: Security and Platform Architecture. This lesson sets the broad shape before we get specific.

## S2 · STEPS — Three layers

Security architecture has three layers. Authentication — proving who you are — governance assumes this already works. Authorization — deciding what an authenticated identity can do — this is where governance architecture actually lives. Encryption — protecting data regardless of who's asking — governance makes sure the right data gets routed to it, it doesn't implement the algorithm itself.

## S3 · STEPS — Defense in depth for governance

Classic defense in depth stacks independent layers so one failure doesn't expose everything. For governance specifically: classification, access policy, masking, and audit logging. A misconfigured access policy is a real problem — but a masking policy on the same sensitivity tag is a second, independent line of defense that doesn't depend on the first one being right.

## S4 · STEPS — Securing the catalog itself

The catalog built in Chapter Three knows which tables hold sensitive data and exactly how they're protected. If that layer is readable by everyone, an attacker doesn't need to breach the data — reading the catalog tells them exactly where to look and how it's defended. The metadata layer needs the same rigor as the data it describes.

## S5 · STEPS — This chapter's path

This chapter moves from this broad shape to access-control mechanisms specifically, to writing those mechanisms as code, to seeing how four real platforms implement it, and finally to automating enforcement so none of it depends on a human remembering.

## S6 · OUTRO

Next lesson: access control architecture — RBAC, ABAC, and where enforcement actually happens.
