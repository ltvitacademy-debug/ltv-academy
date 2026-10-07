# Script — Module Versioning & Structure

## Segment 1 (title)

Last lesson's VPC module pinned version tilde-greater-than 5.0 without ever explaining what that actually means. Left unpinned, a registry module can quietly upgrade to a new major version the next time someone runs an init with upgrade, changing behavior Northbridge Retail never asked for. This lesson closes out the chapter: version constraints, standard module structure, and when a pattern actually deserves its own module at all.

## Segment 2 (code: version constraint operators)

Tilde-greater-than is called the pessimistic constraint operator, and it's the one you'll reach for most often. Tilde-greater-than 5.0 lets Terraform pick up 5.1, 5.9, anything in the 5-dot-x line, but it won't jump to 6.0 on its own — because registry modules are expected to follow semantic versioning, so a major version bump is the project's own signal that something might genuinely break.

## Segment 3 (code: the standard folder structure)

A reusable module, whether it's local or published, follows one consistent layout: main dot tf holds the resources themselves, variables dot tf lists every input, outputs dot tf lists every exposed value, and a README describes how to actually use it. Terraform doesn't enforce any of this, but it's a strong convention — and that README is literally what renders on a module's registry page if it's ever published there.

## Segment 4 (steps: when to extract a module)

Not everything belongs inside a module. A one-off resource used exactly once, in exactly one place, stays inline — there's nothing to reuse. A pattern Northbridge Retail needs repeated across dev, staging, and production earns its own module, every time. And turning everything into a module "for consistency" just adds extra sources and versions to track, with no real payoff to show for it.

## Segment 5 (outro)

That closes out modules and reuse entirely — writing them, giving them a real interface, pulling in published ones, and versioning them responsibly. Chapter 5 moves on to deploying real infrastructure on Azure, starting with the azurerm provider in the very next lesson.
