# Lesson 11 — Territory Management

**Chapter 2 · Advanced Sharing · Lesson 11 of 24**

## What you'll learn

- Why sales organizations need a sharing model distinct from role hierarchy
- The four building blocks of Enterprise Territory Management: Territory Model, Territory Type, Territory, and Territory Model State
- How territory-based access is granted, and how it differs from role-hierarchy access
- Why modeling before activation exists, and what the archive/activate lifecycle is for
- Scale and recalculation considerations an architect weighs before recommending territories

## Why role hierarchy isn't enough for sales orgs

Role hierarchy assumes a static, mostly-permanent reporting structure, and it grants access along a single dimension — who reports to whom. Sales organizations routinely need a *second*, independent axis of access: a rep covering the Southeast region needs visibility into every account in that geography regardless of which manager happens to own those accounts on paper, and that geographic assignment can change quarterly as territories get redrawn. Modeling that entirely through role hierarchy means re-parenting roles (and re-running sharing recalculation) every time territory lines move. **Enterprise Territory Management** (Territory Management 2.0) exists to give sales orgs that second axis as a first-class, independently-managed structure, without entangling it with the role hierarchy used for everything else.

## The four building blocks

Enterprise Territory Management is built from four related pieces, each with its own Setup screen:

- **Territory Settings** — the org-wide switch and global configuration that turns the feature on. Enabling it is a one-way decision: once active, it cannot be disabled.

![Salesforce Setup's Territory Settings page showing the option to enable Enterprise Territory Management.](/courses/sharing-and-visibility-architecture/ch02/11-territory-management/territory-settings.png)
*Setup > Territory Settings — enabling Enterprise Territory Management is irreversible for the org.*

- **Territory Type** — a category that groups territories sharing a common trait, such as "Named Account" or "Geographic." Every territory must belong to exactly one type, and the type carries a priority used when a record is visible through more than one territory path.

![Salesforce Setup's Territory Types list showing a New Territory Type button.](/courses/sharing-and-visibility-architecture/ch02/11-territory-management/territory-types.png)
*Setup > Territory Types — the category layer that every individual territory must belong to.*

- **Territory Model** — the container for an entire territory hierarchy. A model can hold the full tree of territories, their user and account assignments, and the rules that generate those assignments — and an org can have only one **active** model at a time, though it can hold several inactive/planning models simultaneously.

![Salesforce Setup's Territory Models list showing existing models and a New Territory Model button.](/courses/sharing-and-visibility-architecture/ch02/11-territory-management/territory-models.png)
*Setup > Territory Models — each model is a self-contained hierarchy; only one can be Active org-wide.*

- **Territory** (and **Territory Model State**) — the individual nodes inside a model's hierarchy, created from the model's View Hierarchy page, each optionally overriding the default user access levels (Account, Opportunity, Case) that territory membership grants. A territory's state — Planning, Active, or Archived — tracks where its parent model sits in the model lifecycle.

![The Create Territory screen inside a Territory Model's hierarchy view in Salesforce Setup.](/courses/sharing-and-visibility-architecture/ch02/11-territory-management/create-territory.png)
*Create Territory, reached from a model's View Hierarchy page — this is where the actual tree gets built.*

## How territory-based access is actually granted

Access flows from **territory membership**, not from a role. A user assigned to a territory gets access to the accounts assigned to that same territory, at whatever access level the territory specifies for Account, Opportunity, and Case (these can each be set independently, and can differ from the org-wide default read/write assumptions). Territories form a hierarchy of their own — a user assigned higher up can be given visibility into child territories' accounts too, the same "higher sees lower" pattern role hierarchy uses, but running on a completely separate tree that an admin can reshape without touching a single role record.

## Why modeling exists before activation

An architect's biggest practical concern with territories is that getting the hierarchy wrong in production is expensive to unwind — reassigning thousands of accounts and recalculating sharing for every affected user is not a quick edit. Enterprise Territory Management's answer is the **Planning** state: a model can be fully built out, including account and user assignments, while still inactive, so an admin can preview exactly what the resulting access would look like before committing. Only one model is ever Active at a time; moving a planning model to Active (and the previous active model to Archived) is the activation event that actually triggers the sharing recalculation across the org.

## Scale and performance considerations

Each territory model supports up to 1,000 territories, which is generous for most sales orgs but has come up as a real constraint for very large enterprise deployments spanning hundreds of named-account teams across geographies and product lines — an architect sizing a territory design needs to check that ceiling early, not after the hierarchy is half-built. Reassigning a large number of accounts between territories, or activating a new model outright, triggers a sharing recalculation job across every account and its related records; for orgs with large data volumes this is the same category of operation covered in Chapter 3's discussion of sharing recalculation, and it's not something to schedule casually during business hours.

## Key terms

| Term | Meaning |
|---|---|
| Territory Model | The container for one complete territory hierarchy; only one model org-wide can be Active |
| Territory Type | The category every territory belongs to, carrying a priority for overlapping access paths |
| Territory | An individual node in a model's hierarchy, with its own user/account assignments and access-level overrides |
| Territory Model State | Planning, Active, or Archived — tracks a model's position in its lifecycle |
| Territory membership | The access-granting relationship between a user and a territory, independent of role hierarchy |

## Lab

In a sandbox with Enterprise Territory Management enabled, create a Territory Type called "Named Account," then create a new Territory Model in Planning state. Inside that model's hierarchy, create a top-level territory and one child territory, each with different Account access-level overrides (e.g., parent grants Read, child grants Read/Write). Assign a test user to the child territory and a different test user to the parent, assign a test account to the child territory, and confirm both users can see it — then confirm only the child-territory user has edit rights, matching the override you configured.

## Check yourself

Why does Enterprise Territory Management model access through a separate hierarchy rather than reusing role hierarchy? What is the Planning state actually protecting the org against, and why is model activation treated as a significant, recalculation-triggering event rather than a routine save?
