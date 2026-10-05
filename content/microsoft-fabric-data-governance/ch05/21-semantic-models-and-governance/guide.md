# Lesson 21 — Semantic Models and Governance

**Chapter 5 · Governed Analytics · Lesson 21 of 25**

## What you'll learn

- Why a semantic model is a governance surface, not just a reporting layer
- What its item page actually shows an owner and a reviewer
- The three real permission levels — Read, Build, Reshare — and what each one lets a person do
- How a governed request path replaces an ad-hoc "can someone send me the file?" message

## A semantic model carries governance with it

A semantic model doesn't just hold relationships and measures. Every semantic model in Fabric is also a Fabric item, and like any item it carries an **owner**, an inherited **sensitivity label**, and its own **Permissions** tab — the same governance surface Chapter 3's item permissions and Chapter 4's catalog applied to every other Fabric item.

![A semantic model's item page in the OneLake catalog, showing its Overview tab selected, with Owner, Refreshed time, and a "Public" sensitivity label, plus a Tables list with column names and descriptions.](/courses/microsoft-fabric-data-governance/ch05/21-semantic-models-and-governance/onelake-item-overview-tab.png)

*A real semantic model's Overview tab — owner, sensitivity label, and documented tables and columns, all in one place before anyone builds a report against it.*

The **Overview** tab here answers the question a report author should ask before building anything: who owns this, is it current, and what does "Public" or a stricter label actually mean for what I'm allowed to do with it. **Lineage**, **Monitor**, and **Permissions** sit right next to it as tabs on the same page — governance isn't a separate destination from the model itself.

## Read, Build, and Reshare

A semantic model's governance isn't just who can see it — it's what level of access they have, and that comes down to three real permission levels:

| Permission | What it lets someone do |
|---|---|
| Read | View content built against the model (a report, for example) — not touch the model itself |
| Build | Create new reports directly against the model, in Desktop or the service |
| Reshare | Grant Read access to other people, without needing the owner |

An owner reaches this from the item's **Manage permissions** page — in Desktop, the ribbon's Security group:

![Power BI Desktop ribbon with the Security group open, showing Manage roles and Manage permissions buttons, with Manage permissions highlighted.](/courses/microsoft-fabric-data-governance/ch05/21-semantic-models-and-governance/semantic-model-manage-permissions.png)

*Manage permissions is where an owner grants Build, Read, or Reshare to specific people or groups — not a blanket "everyone in the workspace" setting.*

This is a narrower, more deliberate grant than workspace roles from Lesson 5. A workspace Viewer can already read a model sitting in that workspace — but Build and Reshare on a specific model is its own decision, made by that model's owner, independent of anyone's workspace role.

## A governed request path

What happens when someone without Build access wants to create a report from an existing model? Rather than emailing the owner and hoping, Fabric lets the owner configure exactly what a requester sees:

![A "Request access" settings dialog for a semantic model, showing two options — an email request sent to the owner, or custom written instructions — with a 193-character instructions box already filled in.](/courses/microsoft-fabric-data-governance/ch05/21-semantic-models-and-governance/build-permission-dialog.png)

*An owner can route every access request straight to a documented process instead of an inbox.*

1. The requester clicks **Request access** on a model they can see but can't build against.
2. The owner has pre-configured one of two paths: an email request routed straight to them, or written instructions pointing to the actual access process (a security group to join, for instance).
3. Either way, the request — and who approved it — is traceable, the same auditability principle Lesson 15's activity logs apply everywhere else in Fabric.

## Key terms

| Term | Meaning |
|---|---|
| Semantic model item page | The model's own governance surface — owner, sensitivity label, Lineage/Monitor/Permissions tabs |
| Read | View content built from the model, not the model itself |
| Build | Create new reports directly against the model |
| Reshare | Grant Read access to others without the owner's involvement |
| Request access | A configurable, traceable path for someone to ask for Build permission |

## Lab

Open (or imagine) a semantic model you don't own in a shared workspace. Find its Manage permissions page and identify: who is the owner, what sensitivity label did it inherit, and if you clicked Request access right now, would you get an email draft or a written instructions box? Write down which one your own team's semantic models should use, and why.

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why is Build a separate, narrower grant from simply being able to see a semantic model in a workspace?
