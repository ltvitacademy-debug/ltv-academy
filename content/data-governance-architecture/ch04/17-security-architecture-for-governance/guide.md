# Lesson 17 — Security Architecture for Governance

**Chapter 4 · Security and Platform Architecture · Lesson 17 of 30**

## What you'll learn

- The three security layers governance depends on — authentication, authorization, and encryption — and which one governance architecture actually lives in
- Defense in depth, applied specifically to data governance rather than network security
- Why the metadata/catalog layer itself needs to be secured with the same rigor as the data it describes
- This chapter's path, from broad security architecture (this lesson) down to specific platforms and automation

## Three layers: authentication, authorization, encryption

- **Authentication** — proving who you are: an identity provider, single sign-on, a service principal. Governance architecture assumes this layer already exists and is correct. It can't fix a broken identity system; it depends on one.
- **Authorization** — deciding what an already-authenticated identity is allowed to do. This is where governance architecture actually lives: role-based and attribute-based access control, row- and column-level policies — the specific subject of Lesson 18.
- **Encryption** — protecting data at rest and in transit, regardless of who's asking. Governance treats this as a baseline it assumes rather than a mechanism it implements. Governance's job is making sure the *right* data is classified and routed to the *right* encryption and handling requirements, not implementing the encryption algorithm itself.

## Defense in depth, for governance specifically

Classic defense in depth stacks several independent security layers so that one failure doesn't expose everything on its own — a network perimeter, host security, and application security are a familiar version of this. Applied to governance specifically, the layers look like: classification (what is this data), access policy (who is allowed to see it), masking (what do they actually see once they're allowed in), and audit logging (what did they actually do once inside). These are four independent layers. A misconfigured access policy is a real problem — but a masking policy attached to the same sensitivity tag, as covered in Lesson 16's classification-driven masking example, is a second, independent line of defense that doesn't depend on the access policy having been configured correctly in the first place.

## Securing the governance layer itself

The catalog and metadata layer built in Chapter 3 knows genuinely sensitive facts on its own: which tables hold personal data, who owns what, exactly what a masking policy is protecting and why. If that metadata layer itself is readable by everyone, an attacker doesn't need to breach the underlying data at all — they can simply read the catalog to learn where the valuable data lives and precisely how it's protected, which is often a faster path to a breach than attacking the data directly. Governance architecture has to secure its own metadata layer with at least the same rigor as the data that layer describes, not treat the catalog as exempt because "it's just metadata."

## This chapter's path

This chapter moves from the broad shape of security architecture (this lesson) to access-control mechanisms specifically (Lesson 18), to expressing those mechanisms as versioned, testable code (Lesson 19), to seeing how four real platforms actually implement all of it (Lesson 20), and finally to automating enforcement so none of it depends on a human remembering to run a check (Lesson 21).

## Key terms

| Term | Meaning |
|---|---|
| Authentication | Proving who an identity is |
| Authorization | Deciding what an authenticated identity is allowed to do — where governance architecture lives |
| Defense in depth | Stacking independent security layers so one failure doesn't expose everything |
| Metadata layer security | Protecting the catalog/metadata layer itself, not just the data it describes |

## Lab

For one sensitive dataset you know of (work or personal), write down which of the four governance-specific defense-in-depth layers — classification, access policy, masking, audit logging — currently exist for it, and which are missing. If classification is missing, note what would need to happen before the other three layers could even be built on top of it.

## Check yourself

Can you name the three security layers and say which one governance architecture lives in, explain defense in depth as applied to governance specifically, and explain why the metadata/catalog layer itself needs its own security rather than being treated as exempt?
