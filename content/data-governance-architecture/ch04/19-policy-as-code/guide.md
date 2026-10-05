# Lesson 19 — Policy as Code

**Chapter 4 · Security and Platform Architecture · Lesson 19 of 30**

## What you'll learn

- What "policy as code" means architecturally: governance rules expressed as versioned, testable files instead of settings clicked in a console
- Two real examples of policy-as-code syntax: Azure Policy's JSON definitions and Open Policy Agent's Rego language
- Why expressing policy as code enables the same CI/CD discipline application teams already use for their own code
- The real tradeoff: auditability and scale versus a steeper learning curve than a UI checkbox

## What policy as code means

Instead of an administrator clicking through a console to set a permission or a compliance rule by hand, the rule is written as a file in a known syntax, checked into source control, and applied programmatically. The policy becomes an artifact with its own history — who changed it, when, and why — the same way application code already has that history, rather than a setting whose change log lives only in an admin's memory or a support ticket.

## Example: Azure Policy (JSON)

Azure Policy definitions are JSON documents built around a `policyRule`, which pairs a condition (`if`) with an enforcement `effect` (such as `deny`, `audit`, or `append`). A simplified, illustrative example enforcing that a resource's location must be in an approved list:

```
{
  "policyRule": {
    "if": {
      "not": {
        "field": "location",
        "in": "[parameters('allowedLocations')]"
      }
    },
    "then": {
      "effect": "deny"
    }
  }
}
```

This mirrors the real, documented shape of an Azure Policy definition (`policyRule` → `if` → `then.effect`) — the specific condition shown here is a simplified illustrative example, not a copy of any one organization's actual policy.

## Example: Open Policy Agent (Rego)

Open Policy Agent (OPA) is a general-purpose, vendor-neutral policy engine — policies are written in its own language, Rego, and evaluated against any JSON input you give it, which is why OPA shows up across cloud infrastructure, Kubernetes, and CI/CD policy checks alike, not tied to one vendor's product. An illustrative Rego policy, built on Rego's real, documented syntax, denying access to a resource tagged confidential unless the requester holds a data-steward role:

```
package governance.access

default allow := false

allow if {
  input.resource.tags.classification != "confidential"
}

allow if {
  input.resource.tags.classification == "confidential"
  input.user.role == "data-steward"
}
```

## Why this enables CI/CD-style governance

Because the policy is a text file, it can go through a pull request, get reviewed by a second person, run through automated tests checking whether it correctly denies the cases it should, and be rolled back with a version-control revert if it causes a problem — the same discipline application teams already use for their own code, now applied to governance rules instead of application logic. Lesson 21 (Governance Automation) builds directly on this by wiring policy-as-code checks into an actual running pipeline, rather than leaving them as files someone has to remember to apply.

## The tradeoff

A console checkbox is discoverable and low-effort for a single one-off change; policy as code demands someone who can read and write the syntax, plus a place to store and deploy the resulting files, which is real overhead for a small team making occasional changes. The payoff — audit history, testability, and consistency across hundreds of resources — scales up as the number of policies and resources grows. It's a poor fit for an organization with a handful of resources and genuinely overkill there, and close to mandatory once that number is in the hundreds, where no human could reliably click through every setting by hand anyway.

## Key terms

| Term | Meaning |
|---|---|
| Policy as code | Governance or compliance rules expressed as versioned, testable files rather than console settings |
| Azure Policy | Microsoft's policy-as-code service, with definitions written as JSON (`policyRule`, `if`, `then.effect`) |
| Open Policy Agent (OPA) | A vendor-neutral policy engine evaluating rules written in Rego against arbitrary JSON input |
| Rego | OPA's own policy-definition language |

## Lab

Take one access rule you already know (from this lesson's examples, or from any system you use) and write it in plain English as an "if / then" statement — a condition and an effect — the same shape both Azure Policy and Rego actually use underneath their different syntax.

## Check yourself

Can you explain what policy as code means architecturally, identify the `if`/`then.effect` shape in an Azure Policy JSON definition, and explain why expressing governance rules as code enables the same review-test-rollback discipline application code already has?
