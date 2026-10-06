# Script — Security for Custom Applications

## Segment 1 (title)

Everything you've built so far has been wide open to anyone with admin access testing it. A real application needs a deliberate answer to one question, asked constantly: who should see, edit, or delete this record, and why? Salesforce answers it in layers, from the object down to the individual field.

## Segment 2 (steps: the layers outside in)

Three layers, checked in order. Object-level security: can this user see the object at all, and create, read, edit, delete on it — set by profiles and permission sets. Field-level security: within an accessible object, which specific fields can they see or edit. And record-level security: of the records they could see, which ones do they actually have access to — driven by org-wide defaults, the role hierarchy, and sharing rules.

## Segment 3 (code: profiles vs permission sets)

A profile is the mandatory baseline — every user has exactly one. It sets object and field access, page layouts, login hours. Permission sets layer extra access on top, and a user can have many — that's how you grant one extra object to a handful of people without cloning a whole profile. Permission set groups bundle several permission sets into one assignable unit. Salesforce's own guidance: keep profiles minimal, lean on permission sets for everything beyond the baseline.

## Segment 4 (steps: a practical model)

For a new custom app, a sensible default: set the new objects' org-wide default to Private unless there's a clear reason otherwise. Grant access through a dedicated permission set for the app, not the base profile, so it's assignable independently. Use sharing rules for the predictable exceptions — a queue, a regional role. Reserve manual and Apex-managed sharing for the genuine one-offs.

## Segment 5 (code: honest limits)

Security isn't forgiving-additive — a user needs object access, and field access, and record access. A gap in any one layer blocks them even if the other two are wide open. And a master-detail child inherits its parent's sharing; it can never be more open than the parent. Object design from chapter one ripples straight into security here.

## Segment 6 (outro)

Object, then field, then record — in that order, every time. Next: moving this finished, secured application out of the sandbox and into production.
