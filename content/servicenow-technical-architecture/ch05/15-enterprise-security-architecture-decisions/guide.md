# Lesson 15 — Enterprise Security Architecture Decisions

**Chapter 5 · Security Architecture · Lesson 15 of 32**

## What you'll learn

- Why this lesson doesn't re-teach ACLs, SSO, or encryption — Security &
  Access Controls Chapters 1-6 already did that
- The difference between designing one good ACL and setting an
  instance-wide ACL **strategy** every team is required to follow
- Why the SSO/Identity Provider decision belongs to the Technical
  Architect, and spans the whole application portfolio, not one instance
- How a Technical Architect sets a standing encryption **policy** instead
  of deciding encryption field-by-field as requests come in

## You already know the mechanics — this lesson is about the standing policy

ServiceNow Security & Access Controls covered the real mechanics in
depth: defense in depth as a layered model, advanced ACL and scripted
ACL design, role architecture, SSO and MFA configuration, Edge
Encryption and column-level encryption, security operations (Security
Incident Response, vulnerability response), and governance/audit. An
admin or developer applies those mechanics correctly on a request-by-
request basis — a new ACL here, a new role there, a new encrypted
field when Legal asks for one. A Technical Architect's job is
different: setting the **standing policy** that every one of those
individual decisions has to follow, so the instance doesn't end up
with forty teams each inventing their own answer to the same
question.

## Deciding the ACL/role strategy, not just one ACL

A single well-designed ACL is easy to get right in isolation. The
architecture problem shows up when fifty teams each design their own
ACLs and roles with no shared convention: one team names roles
`finance_read`, another names the equivalent `fin_viewer`, a third
embeds department logic directly into ACL scripts instead of role
membership. None of these choices is wrong in isolation — together,
they make the instance impossible to audit, because nobody can answer
"who can see this table" without reading every ACL by hand.

The Technical Architect's job is to set the **strategy** every team
builds against: a role-naming convention (e.g. `[domain]_[table-
group]_[access-level]`, so `finance_ap_write` is self-documenting), a
rule for when a new role is justified versus reusing an existing one,
and a standard for where business logic lives — in role membership
and ACL conditions, reviewable in `sys_security_acl`, never buried in
a scripted ACL that only the original author understands. This is a
governance artifact, not a single configuration record: it's usually
written up as an Architecture Decision Record (Lesson 3) and enforced
through architecture review of new scoped applications.

## The enterprise SSO/Identity Provider decision

Security & Access Controls Chapter 3 taught you how to configure SSO
and MFA inside one ServiceNow instance. The Technical Architect
question is upstream of that configuration: **which Identity
Provider does the whole organization standardize on**, and how does
authentication federate across the organization's entire application
portfolio — ServiceNow, the HR system, the finance system, internal
tools — not just this one instance? Choosing Azure AD/Entra ID,
Okta, or Ping Identity as the enterprise IdP is a decision made once,
at the enterprise level, usually by a security architecture team the
CTA sits on — not re-decided per application. The CTA's specific
responsibility within that decision is making sure ServiceNow's SAML/
OIDC configuration, multi-factor enforcement, and session-timeout
policy align with whatever the enterprise IdP standard already
requires, so ServiceNow isn't the one system with a different login
experience and a different security posture than everything else the
organization runs.

## Setting the data-encryption strategy, not deciding per field

Security & Access Controls Chapter 4 taught Edge Encryption and
column-level encryption as mechanisms. Deciding **which categories of
data require which kind of encryption** is a standing policy
decision, not a per-field judgment call made the day a new table
ships. A real policy looks like: all fields holding SSNs, national
ID numbers, or payment card data get column-level encryption,
enforced by a data classification tag checked during scoped
application review; fields holding data under a specific regulatory
scope (HIPAA, GDPR-restricted categories) get Edge Encryption so the
plaintext never reaches ServiceNow's cloud infrastructure at all;
everything else is evaluated against the policy, not reinvented. The
value of deciding this once, as policy, is that a new table shipped
by any team is encrypted correctly by default — the team doesn't have
to independently rediscover what "sensitive" means.

## Key terms

| Term | Meaning |
|---|---|
| Security architecture strategy | A standing, documented convention (role naming, ACL structure, encryption classification) every team on the instance must follow, not a single configuration decision |
| Enterprise Identity Provider (IdP) | The single IdP (e.g. Azure AD, Okta) the whole organization's application portfolio federates authentication through — decided above the level of any one application |
| Data classification policy | A standing rule for which categories of data require Edge Encryption or column-level encryption, applied automatically rather than decided per field |
| Architecture Decision Record (ADR) | The written artifact (Lesson 3) that captures a security strategy decision and the reasoning behind it, so it outlives the person who made it |

## Check yourself

A new scoped application team asks you to approve a custom role
called `billing_special_access` with no documented naming convention
behind it, and a new field holding customer bank account numbers with
no encryption applied yet. What two standing policies — not two
one-off approvals — should already exist on this instance to make
both of those requests self-evidently wrong, without you having to
make a judgment call each time?
