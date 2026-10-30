# Lesson 10 — Wrap-Up: What You Migrated, and What's Next

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 10 of 10**

## What you'll learn

- A recap of the full Driftwood Outdoor Apparel project, start to finish
- Which real, transferable skills this project actually demonstrated
- Where Driftwood's cloud needs go from here, and why this project was deliberately just the
  first step

## What actually happened, start to finish

Nine lessons ago, this project started with one sentence from Priya Suresh: *"I want you to
migrate the catalog app to Azure before launch — the images, and the server itself."* Here's
everything that sentence turned into:

1. **Lesson 1** — turned the vague ask into a specific, written scope: workload, deadline,
   definition of done.
2. **Lesson 2** — split the migration into its two real pieces, static assets and VM workload,
   and wrote down what was deliberately left out.
3. **Lesson 3** — provisioned the real Azure resources: a tagged resource group, a storage
   account, and a virtual machine.
4. **Lesson 4** — moved the product images into a Blob Storage container at the Hot tier, and
   updated the app to read them from their new URLs.
5. **Lesson 5** — stood up the catalog application on `vm-catalog01`, opened exactly the
   network path it needed, and validated it actually served traffic.
6. **Lesson 6** — configured basic monitoring: a Log Analytics workspace, and a real CPU alert
   rule tied to a reusable Action Group.
7. **Lesson 7** — tested the whole system end to end, including actually triggering the alert
   rather than trusting it existed.
8. **Lesson 8** — wrote a short runbook so the migration doesn't live only in one person's head.
9. **Lesson 9** — presented a concrete cutover plan to Priya: readiness, mechanism, rollback
   trigger, and who's doing what.

## The real skills, underneath the tools

None of these lessons were really "about" the Azure CLI alone — each one used it to practice a
transferable skill:

| Lesson(s) | Tool skill | Underlying real skill |
|---|---|---|
| 1 | — | Requirements clarification |
| 2 | — | Scoping down to match the actual ask |
| 3–5 | `az group`, `az storage`, `az vm`, NSG rules | Provisioning deliberately, not by habit |
| 6 | Azure Monitor, Log Analytics, alert rules | Building visibility that didn't exist before |
| 7 | — | Validating by testing, not by assuming |
| 8–9 | — | Communicating clearly to a stakeholder and a team |

A hiring manager — or a real IT Manager like Priya — cares about this right-hand column far more
than which exact `az` flag you typed. The CLI commands are the vehicle; scoping, provisioning
with intent, real validation, and clear communication are what actually made this project
succeed.

## What this project deliberately left out

This Beginner project was scoped smaller than Driftwood's full cloud picture on purpose: one
app, one VM, no auto-scaling, no containers, no automated deployment pipeline, one stakeholder.
That wasn't a limitation to apologize for — it was the correct scope for the actual request, and
knowing how to scope down is as real a skill as knowing how to scope up.

## Where Driftwood's platform goes from here

One migrated application doesn't mean Driftwood's cloud journey is finished — it means the first
real workload is now running on Azure, tested, monitored, and documented. The business reasons
that justified this migration — more traffic, less tolerance for downtime, a team that's
starting to depend on these systems daily — don't stop applying just because this one project is
done. Driftwood's platform needs will keep growing well beyond what one app on one VM can carry,
in ways this Beginner project deliberately didn't try to solve. Exactly what that growth looks
like, and how to meet it, is its own project — not something to guess at here.

## Key terms

| Term | Meaning |
|---|---|
| Transferable skill | A capability (like requirements clarification) that matters independent of which specific tool is used |
| Scope discipline | Deliberately choosing what *not* to build, to match effort to the actual request |

## Lab

Write a short project summary, as if for a resume or portfolio, describing this Beginner
capstone in two or three sentences — focused on the skills demonstrated, not the Azure service
names.

## Check yourself

You're ready to move on when you can list, from memory, all nine lessons' real skill (not just
the Azure service used), and explain in one sentence why this project being "done" doesn't mean
Driftwood's cloud needs are finished.
