# Lesson 6 — Identity and Access Management in the Cloud · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter two starts with the layer every other governance control depends on: identity.

## S2 · STEPS — Why identity comes first

Of the four governance layers, identity is the one everything else depends on. You can't restrict access to sensitive data for a principal the system can't reliably identify. You can't enforce policy without a trustworthy way to know who's asking. You can't produce a meaningful audit log if "someone did something" is the best you can say.

## S3 · STEPS — Authenticate, then authorize

Three concepts recur across every cloud IAM system. A principal is anything that can be granted permissions — a user, group, application, or service identity. Authentication is proving you are who you claim to be. Authorization, once authenticated, is what you're actually allowed to do. Those two steps happen on every single request, even when it's invisible to the user.

## S4 · STEPS — Two services vs. one

Here's the structural difference to keep straight for the rest of this chapter. Azure splits identity into two services: Entra ID handles authentication and directory identity, and Azure RBAC handles resource-level authorization. AWS handles both inside one service, IAM. "Can this user log into the portal" is an Entra ID question. "Can this user delete this storage account" is an Azure RBAC question. In AWS, one service answers both.

## S5 · OUTRO

Next lesson goes hands-on with the first of these three: Microsoft Entra ID, with real screenshots from the admin center.
