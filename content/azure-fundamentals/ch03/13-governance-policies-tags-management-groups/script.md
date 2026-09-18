# Script — Governance: Policies, Tags & Management Groups

## Segment 1 (title)

RBAC controls who can do what. Azure Policy controls what's allowed to exist at all, regardless of who's creating it — a rule like "only allow resources in East US," enforced automatically, even against someone with full Contributor rights.

## Segment 2 (code: deny vs audit)

A policy can deny a non-compliant deployment outright, or just audit it — flagging violations without blocking them, useful while you're still figuring out what your rules should be.

## Segment 3 (code: tags)

A tag is a name/value pair attached to a resource, like CostCenter: Marketing. Tags don't change how a resource works — they change how you can find, group, and bill it later, which is how Cost Management's accountability principle actually gets implemented.

## Segment 4 (screenshot: management group hierarchy)

A management group sits above subscriptions, letting you apply RBAC and Policy once at the top and have it flow down to every subscription underneath — one more layer above the resource-group nesting from Lesson 5.

## Segment 5 (outro)

That closes Chapter 3. Next up: Compliance Basics, the last lesson of this chapter, then Chapter 4 moves from concepts to hands-on practice in Azure.
