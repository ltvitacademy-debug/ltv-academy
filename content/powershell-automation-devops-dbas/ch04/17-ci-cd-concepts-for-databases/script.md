# Script — CI/CD Concepts for Databases

## Segment 1 (title)

Chapter Three built the foundation: database objects in Git, reviewed through pull requests. Chapter Four is about automating what happens next — CI/CD, applied to schemas just as concretely as it applies to application code.

## Segment 2 (code: CI validates every change)

Continuous Integration means every proposed change gets validated automatically. For a database project, that's building the .sqlproj — parsing every object script and failing if anything is inconsistent. CI doesn't deploy anything; it just answers whether the schema is internally valid.

## Segment 3 (steps: deployment vs delivery)

Continuous Deployment means a validated, merged change applies to a target environment automatically. Continuous Delivery is more cautious — automated up to production, then a deliberate human trigger. Teams often pick delivery for production specifically, since a bad database change is much harder to fully undo.

## Segment 4 (steps: the full chain)

A realistic pipeline chains these together: commit, CI builds and validates the project, deploy to test, run automated tests, then deploy to production — either fully automatically or with an approval gate.

## Segment 5 (outro)

None of this replaces the review gate from Lesson 16 — it automates what happens after a change is approved. Next up: automated deployment of database changes, the real DACPAC and SqlPackage mechanics behind that CD step.
