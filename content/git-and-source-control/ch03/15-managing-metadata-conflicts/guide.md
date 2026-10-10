# Lesson 15 — Managing Metadata Conflicts

**Chapter 3 · Salesforce Workflows · Lesson 15 of 17**

## What you'll learn

- Why Salesforce metadata conflicts are often noisier than typical code conflicts
- How to resolve a `package.xml` conflict without losing either side's intended components
- What makes Profile and Permission Set XML especially conflict-prone, and the usual mitigation
- How a validation-only deploy fits into resolving metadata conflicts safely

## Why metadata conflicts are their own category

Lesson 8 covered merge conflicts in general — Git sees two incompatible changes to the same lines and asks a human to decide. Salesforce metadata conflicts work the same way mechanically, but they have a reputation for being noisier and more error-prone than typical application code conflicts, for a specific reason: metadata is XML, and Git's conflict detection works line-by-line on text, with no understanding that XML elements can be reordered without changing meaning. Two developers can each add a genuinely unrelated `<members>` entry to the same list in a manifest, in a different order, and Git may flag that as a conflict even though neither change actually interferes with the other's intent.

## Resolving a package.xml conflict

`package.xml` is a manifest listing which metadata components a retrieve or deploy should include, grouped by type:

```xml
<<<<<<< HEAD
    <members>Account.Tier__c</members>
    <members>Account.Region__c</members>
=======
    <members>Account.Tier__c</members>
    <members>Account.RenewalDate__c</members>
>>>>>>> feature-renewal-tracking
    <name>CustomField</name>
```

The instinct to just "pick one side" is usually wrong here — in most real cases, both sides added a legitimately separate field, and the correct resolution is the **union** of both: keep every `<members>` entry from both sides (removing the one duplicate line, `Account.Tier__c`, that appears on both), not just one branch's list.

```xml
    <members>Account.Tier__c</members>
    <members>Account.Region__c</members>
    <members>Account.RenewalDate__c</members>
    <name>CustomField</name>
```

If a `package.xml` is generated (for example, by `sf project generate manifest`) rather than hand-maintained, it's often simpler and more reliable to resolve the conflict by regenerating the manifest from the already-merged source metadata, rather than hand-editing XML conflict markers at all.

## Why Profiles and Permission Sets are especially conflict-prone

Profile and Permission Set metadata files list permissions as long, alphabetically-ish ordered sequences of `<fieldPermissions>`, `<objectPermissions>`, and `<userPermissions>` blocks. Two developers each granting access to one different field on the same profile will often touch physically nearby lines in the file purely because of how the list happens to be ordered — producing a conflict even though the two changes are logically unrelated. This is common enough that some teams adopt a **git merge driver** — a tool configured (via `.gitattributes`) to merge specific file types using logic aware of their structure (treating the file as a set of independent permission entries) instead of Git's default line-based text merge, reducing false-positive conflicts on Profile and Permission Set XML specifically.

```
# .gitattributes
force-app/**/profiles/*.profile-meta.xml merge=ours
```

(A real structural merge driver is a more involved setup than this one-line example; the point to take away is that `.gitattributes` is the mechanism Salesforce teams use to tell Git "handle this file type differently.")

## Validating a resolved conflict before trusting it

Resolving an XML conflict by hand is exactly the kind of change that *looks* syntactically fine but could still be subtly wrong — a missing closing tag, a field reference that no longer matches anything in the merged org. Before trusting a resolved metadata conflict, run a **validation-only deploy** (a check-only deploy that runs all the validation Salesforce would do, including any required test execution, without actually saving the change to the org) against a sandbox or scratch org:

```bash
sf project deploy start --target-org validation-org --dry-run
```

A clean validation-only deploy is much stronger evidence that a resolved conflict is actually correct than just confirming the file parses as valid XML.

## Key terms

| Term | Meaning |
|---|---|
| package.xml | A manifest listing which metadata components a retrieve/deploy should include |
| Union resolution | Resolving a conflict by keeping both sides' legitimately separate additions, not picking one |
| Git merge driver | A tool configured via .gitattributes to merge a specific file type with structure-aware logic |
| Validation-only (check-only) deploy | A deploy that runs all validation, including tests, without saving changes to the org |

## Lab

Two developers each add a new custom field to the Account object's Profile access and to `package.xml` at the same time, on separate branches. Write out, as if resolving it yourself, the merged `package.xml` `<members>` block and the merged Profile `<fieldPermissions>` block, assuming both developers' fields are legitimately needed. Then write the exact `sf` command you'd run to validate the resolved result against a sandbox before trusting it.

## Check yourself

Can you explain why Git sometimes flags a conflict in package.xml even when both developers added genuinely unrelated components? Why is "union" usually the right resolution for a package.xml conflict, rather than picking one side?
