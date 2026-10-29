# Lesson 26 — Governance Policy That Works the Same Way Everywhere

**Chapter 7 · Multi-Cloud Cost and Governance · Lesson 2 of 4**

## What you'll learn

- Why Azure Policy, AWS Service Control Policies, and on-prem change
  control are three different languages for enforcing the same intent
- Why maintaining three separate rule sets for one control inevitably
  drifts, even when every rule starts out identical
- How policy-as-code tools like Open Policy Agent and HashiCorp
  Sentinel sit above the native enforcement layer instead of replacing
  it
- How to separate a governance *control* from its per-cloud
  *enforcement mechanism*, and why that separation is the whole point

## One control, three native languages

The governance model from an earlier course established what has to
be true everywhere — no public storage, encryption at rest mandatory,
every resource tagged and owned, no untracked production changes. The
problem this lesson addresses isn't deciding *what* the rules are;
it's that each environment enforces rules in its own native language.
Azure Policy evaluates JSON policy definitions with effects like
`deny`, `audit`, and `append`, applied through management groups.
AWS enforces account-level guardrails through Service Control Policies
in AWS Organizations, backed by AWS Config rules that continuously
check resource state. On-prem has neither — governance there usually
means change-control process and a CMDB, enforced by people, not by an
API.

Writing the same control three times, once per environment, is exactly
as error-prone as it sounds.

## Where triplicated policy drifts

Say the rule is "no storage resource is publicly readable." You write
an Azure Policy definition for it, a Service Control Policy for AWS,
and a change-control checklist item for on-prem. Six months later, a
new storage SKU ships on one cloud and nobody updates that cloud's
rule to cover it. Now the control exists on paper in three places but
is only actually enforced in two. Nobody notices until an audit — or
an incident — surfaces the gap. The rules didn't fail because anyone
wrote them wrong; they failed because keeping three independent
implementations of one intent in sync forever was never realistic.

## Policy-as-code as a layer above, not a replacement

This is the real argument for a policy-as-code layer: tools like Open
Policy Agent, written in its Rego policy language, or HashiCorp
Sentinel, built to evaluate Terraform plans before they apply, let you
express one control once and run it against infrastructure destined
for either cloud. If your provisioning already flows through Terraform
— and in a hybrid, multi-cloud estate it generally should — a Sentinel
or OPA policy can block a non-compliant plan before it ever reaches
Azure Resource Manager or an AWS API call, regardless of which one it
was headed for.

Crucially, this doesn't retire Azure Policy or AWS Config. Resources
created outside Terraform — through the Azure portal, a console
click, an emergency change — still need native, always-on enforcement
at the control-plane level. Policy-as-code catches problems at
provisioning time; native policy engines catch everything else,
continuously, after the fact. You want both, not one instead of the
other.

## The real goal: shared intent, not shared syntax

Consistency across providers was never about the rules looking
identical in every console. It's about the same question — "would
this configuration violate the control we agreed on?" — producing the
same answer whether the resource is in Azure, in AWS, or sitting in a
rack on-prem. A control catalog that names each control once, maps it
to its enforcement mechanism per environment, and gets evaluated by a
shared policy-as-code layer wherever provisioning is automated, is what
makes that true without requiring three teams to maintain three
parallel rulebooks forever.

## Key terms

| Term | Meaning |
|---|---|
| Service Control Policy (SCP) | AWS Organizations' mechanism for enforcing account-level guardrails across member accounts |
| Policy-as-code | Expressing a governance control as code (e.g., Rego, Sentinel) evaluated against infrastructure before or during provisioning |
| Open Policy Agent (OPA) | An open-source policy engine using the Rego language, usable across clouds and tools, not tied to one provider |
| Control catalog | A single list of governance intents, each mapped to its native enforcement mechanism per environment |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
does maintaining the same control as three separate native policy
definitions tend to drift over time, and what job does a policy-as-code
layer do that native per-cloud policy engines still have to do anyway?
