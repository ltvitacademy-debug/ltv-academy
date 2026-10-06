# Lesson 24 — Flow Versioning and Deployment

**Chapter 4 · Reliable and Scalable Flows · Lesson 24 of 31**

## What you'll learn

- What happens to the old flow version when you save changes
- How "Save as a New Version" differs from overwriting the flow you're editing
- Where to find a flow's full version history and switch which one is active
- Why only one version of a flow can ever be active at a time

## Saving a flow doesn't overwrite history — it creates a new version

Every time you save changes to an existing flow, Flow Builder doesn't quietly edit the version you started from. It offers a **Save As** choice, and selecting **A New Version** creates a brand-new, numbered version of the flow — leaving every prior version intact, still viewable, and still in the flow's history.

![The Save As dialog: "Save As" dropdown set to "A New Version," with Flow Label "Save At Risk Account" and a disabled Flow API Name field.](/courses/salesforce-flow-automation/ch04/24-flow-versioning-and-deployment/save-as-new-version.png)

This matters because it means editing a flow is never destructive by accident — Version 3 doesn't erase Version 2. What it *does* do is sit there, inactive, until someone deliberately activates it.

## Only one version can be active

A flow definition can have many saved versions, but only **one version can be active at any time**. From the **Flows** list in Setup, each flow has a version dropdown where you can jump straight to activating a specific one:

![The Setup Flows list: a table of flow definitions (Guided Opp Create, Close Case and Tasks, and others) with Process Type and Active columns, an orange arrow pointing to the row-level dropdown that opens Activate/Deactivate for that flow's versions.](/courses/salesforce-flow-automation/ch04/24-flow-versioning-and-deployment/flow-detail-activate-link.jpg)

Inside Flow Builder itself, the **Versions** menu (accessible from the flow's name at the top) shows the full list for that flow, with the currently active one clearly marked:

![Flow Builder's Versions menu, open from the flow name "Defer Opp Tasks — V2": Version 2 marked Active with a checkmark, Version 1 marked Deactivated with an external-link icon to open it.](/courses/salesforce-flow-automation/ch04/24-flow-versioning-and-deployment/versions-menu-list.png)

Activating a new version automatically deactivates whichever version was active before — you never end up with two active versions running at once.

## Deployment is version management, applied deliberately

"Deploying a flow" in practice usually means: build and test a new version (often starting in a sandbox), confirm it behaves correctly — ideally with Debug and a saved Flow Test, from the previous lesson — and then activate that specific version in the target org. Because old versions stay around deactivated rather than disappearing, rolling back from a bad deployment is as simple as reactivating the last known-good version from the Versions list, rather than trying to reconstruct it from memory.

## Key terms

| Term | Meaning |
|---|---|
| Save As A New Version | The default save behavior — creates a new numbered version, doesn't overwrite the old one |
| Active version | The single version of a flow currently running for real users; only one at a time |
| Versions menu | Flow Builder's list of every saved version of the current flow, with the active one marked |
| Deactivated version | A saved, intact version that isn't currently running but can be reactivated at any time |

## Check yourself

A flow is on Version 4 (active). You discover Version 4 has a bug and Version 3 worked correctly. What's the fastest way to recover, and why does flow versioning make this possible without rebuilding anything?
