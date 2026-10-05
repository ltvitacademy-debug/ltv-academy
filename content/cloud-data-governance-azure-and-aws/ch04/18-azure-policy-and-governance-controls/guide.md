# Lesson 18 — Azure Policy and Governance Controls

**Chapter 4 · Security and Compliance · Lesson 18 of 25**

## What you'll learn

- How Azure Policy turns a rule into an enforced or audited condition across real resources
- The full assignment flow: finding Policy, picking a definition, and setting its scope
- Why a policy's version matters, and what happens when you pin or float it
- How to read a compliance result and trace it back to the policy assignment that produced it

## A policy is a condition plus an effect

**Azure Policy** evaluates resources against conditions defined in a **policy definition**, and applies an **effect** when a resource matches — common effects include `Audit` (flag it, don't block it), `Deny` (block the operation outright), and `DeployIfNotExists` (automatically remediate by deploying a compliant configuration). This is a different mechanism from Azure RBAC (Lesson 8): RBAC controls *who* can do *what*; Policy controls *what shape* a resource is allowed to have, regardless of who's creating it.

## Finding and opening Policy

Everything starts the same way most Azure services do — searching for it directly in the portal:

![Screenshot of the Azure portal search box, searching for "policy", with the Policy service highlighted in results.](/courses/cloud-data-governance-azure-and-aws/ch04/18-azure-policy-and-governance-controls/search-policy.png)
*Policy, found like any other Azure service — no separate portal required, unlike Purview.*

Inside, the **Assignments** page under Authoring is both where existing assignments live and where new ones start:

![Screenshot of the Policy Assignments page, showing counts of total, initiative, and policy assignments, with Assign policy highlighted.](/courses/cloud-data-governance-azure-and-aws/ch04/18-azure-policy-and-governance-controls/select-assignments.png)
*48 total assignments in this example — 14 initiatives (bundles of policies) and 34 individual policy assignments.*

## Choosing a definition, and its version

**Assign Policy** opens a multi-tab wizard. After setting scope, the **Policy definition** picker searches a large catalog of built-in definitions (plus any custom ones an organization has authored):

![Screenshot of the Available Definitions panel, searching for "Audit VMs" and showing the matching built-in policy with its latest version.](/courses/cloud-data-governance-azure-and-aws/ch04/18-azure-policy-and-governance-controls/select-available-definition.png)
*Searching built-in definitions — each one lists its latest available version.*

Built-in policy definitions are versioned, and an assignment can either **float** (automatically pick up new minor/patch versions as Microsoft updates the definition) or **pin** to an exact version. Floating is the default and usually the right call for a straightforward audit policy; pinning matters more for a `Deny` or `DeployIfNotExists` policy where an unreviewed definition change could suddenly start blocking or auto-remediating things differently than expected.

## Reading compliance results

Once assigned, a policy's effect doesn't appear instantly — Azure evaluates resources on a cycle, and results land on the **Compliance** page:

![Screenshot of the Policy Compliance page, showing overall resource compliance percentage, a compliance donut chart, and a table listing one non-compliant assignment.](/courses/cloud-data-governance-azure-and-aws/ch04/18-azure-policy-and-governance-controls/policy-compliance.png)
*25% overall compliance in this scope — one assignment, one non-compliant resource out of one evaluated.*

Each row traces directly back to an assignment, and selecting it drills into exactly which resources are non-compliant — the same "control → real resources" pattern Lesson 17 showed in Defender for Cloud's dashboard, because Defender for Cloud's regulatory compliance controls are frequently backed by Azure Policy assignments under the hood.

## Key terms

| Term | Meaning |
|---|---|
| Policy definition | The condition a resource is evaluated against, plus the effect applied on a match |
| Effect | What happens on a match: Audit, Deny, DeployIfNotExists, and others |
| Assignment | A policy definition applied at a specific scope (subscription, resource group, etc.) |
| Initiative | A bundle of multiple policy definitions, assigned and tracked together |
| Compliance state | Whether a given resource currently satisfies an assigned policy |

## Lab

Assign the built-in "Audit VMs that do not use managed disks" policy to a test resource group, following the same Basics tab flow shown above. After a few minutes, check the Compliance page and confirm the assignment appears with a compliance state, even if 0 VMs exist yet in that scope.

## Check yourself

- What's the functional difference between Azure RBAC and Azure Policy — what does each one actually control?
- Why might an organization deliberately pin a Deny policy to an exact version instead of letting it float?
- Looking at the Compliance page screenshot, what two numbers would you check first to understand how bad a non-compliant assignment actually is?
