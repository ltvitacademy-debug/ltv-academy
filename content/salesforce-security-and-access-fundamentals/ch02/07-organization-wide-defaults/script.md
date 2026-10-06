# Script — Organization-Wide Defaults

## Segment 1 (title)

Chapter 1 settled what a user can do. Chapter 2 starts on which records they can actually see — and it starts at the floor: organization-wide defaults.

## Segment 2 (screenshot: OWD edit page)

OWD sets the baseline access every user has to records they don't own, before the role hierarchy, sharing rules, or manual sharing add anything on top. Nothing below it in the stack can see further than OWD allows — those mechanisms only ever open access wider, never narrower. And it's set per object, not once for the whole org — Opportunity might be wide open while a sensitive custom object stays locked down.

## Segment 3 (steps: three levels)

Private means only the owner, and the role hierarchy above them, can see the record. Public Read Only means everyone can view it but only the owner and hierarchy can edit. Public Read/Write means everyone can view and edit. Every object's OWD actually has two columns too — internal access for employees, external for portal and community users — and external can never be more open than internal.

## Segment 4 (screenshot: decision tree)

Picking the right level comes down to three questions about the most restricted user who needs the object at all: will there ever be a record they shouldn't see? Private. Can they see everything but shouldn't edit everything? Public Read Only. Otherwise, Public Read/Write.

## Segment 5 (screenshot: layers diagram)

OWD is the base of a stack this whole chapter builds — role hierarchy, sharing rules, and manual sharing each sit above it, and each one only ever widens what OWD already allows.

## Segment 6 (outro)

OWD sets the floor. Up next: the role hierarchy — the first automatic layer that opens that floor up, through management chains.
