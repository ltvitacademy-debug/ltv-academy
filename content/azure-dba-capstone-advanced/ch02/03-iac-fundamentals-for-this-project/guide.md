# Lesson 3 — IaC Fundamentals for This Project

**Chapter 2 · Provisioning With Bicep · Lesson 3 of 26**

## What you'll learn

- Why Overlook's old "click it together in the Portal" approach failed the board's mandate
- What Infrastructure as Code (IaC) actually buys a healthcare company specifically
- Why this capstone uses Bicep, not Terraform, for this particular piece
- What Overlook's Bicep template needs to define before Lesson 4 writes it

## What click-ops actually cost Overlook

Overlook's existing Azure SQL environment — the one the Beginner and Intermediate capstones backed
up and tuned — was built the ordinary way most small teams build their first database: someone
opened the Azure Portal, clicked "Create a resource," filled in some fields, and clicked Create.
It worked. It is also, from a board-mandate perspective, a liability:

- **Nobody can say exactly how it was configured** without going and looking, screen by screen.
- **Nobody can review a change before it happens** — a Portal click either already happened or it
  didn't; there's no "diff" to look at first.
- **Nobody can rebuild it identically** if it needs to exist in a second region, or if it's ever
  lost — "click the same buttons again, in the same order, and hope" is not a disaster recovery
  plan a board will accept.

## What Infrastructure as Code actually buys here

**Infrastructure as Code** means the environment — the SQL server, the database, their settings —
is defined in a file, not in a sequence of clicks. That file can be read, reviewed, versioned, and
run again. For Overlook specifically, that converts three vague worries into three concrete
capabilities:

| Board worry | What IaC provides |
|---|---|
| "We don't know exactly what's configured" | The Bicep file *is* the configuration — readable, in one place |
| "Changes happen with no oversight" | A teammate can review the file's diff before `az deployment group create` runs it |
| "We couldn't rebuild this if we had to" | The same file deploys the same environment again, in a different resource group or region |

This is exactly the gap Lesson 1 identified: infrastructure nobody could reproduce or review is not
a foundation a board will accept for a system holding patient data.

## Why Bicep, specifically, for this piece

Azure offers more than one IaC approach, and this capstone picks Bicep deliberately:

- **Bicep is Azure-native** — no separate state file to manage, no third-party provider to
  configure; it compiles directly to an ARM template and deploys with the Azure CLI, which fits a
  team that's entirely on Azure (Overlook has no multi-cloud need here).
- **Bicep's syntax is close to the resource shapes Azure already documents** — a `resource` block
  with a type, an API version, and a `properties` object, which keeps the template readable to
  anyone who already knows the Azure Portal's own resource blades.
- **The automatic dependency behavior** — a resource declared as another's `parent`, as you'll see
  in Lesson 4 — means Bicep figures out deployment order on its own, without a separate dependency
  graph to maintain by hand.

## What this template actually needs to define

Lesson 4 writes the real resource blocks. Before that, the template's scope is deliberately narrow
and matches exactly what Overlook's board asked for:

1. An Azure SQL **logical server** — the administrative boundary the database lives inside.
2. An Azure SQL **database** — the actual data store, as the server's child resource.
3. **Parameters** for everything that differs between environments — names, location, and
   especially the admin password, which never belongs as literal text in the file (Lesson 5).

Nothing more. Firewall rules, auditing, and the failover group all get added in later chapters, on
top of this same foundation — this lesson's template is deliberately the smallest thing that's
still real infrastructure.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure as Code (IaC) | Defining infrastructure in a reviewable, versioned file instead of manual Portal clicks |
| Click-ops | The informal term for infrastructure built entirely through manual console clicks, with no record |
| Bicep | Azure's own IaC language, compiling to ARM templates, chosen here for its Azure-native fit |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: name the three board worries from
the table above, and the specific IaC capability that answers each one.
