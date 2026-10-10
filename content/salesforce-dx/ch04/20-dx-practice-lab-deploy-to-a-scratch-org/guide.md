# Lesson 20 — DX Practice Lab: Deploy to a Scratch Org

**Chapter 4 · Practice · Lesson 20 of 22**

## What you'll learn

- The full round trip: create a scratch org, deploy to it, change something, sync back, tear it down
- How to verify a deploy actually worked rather than just assuming it did
- How source tracking behaves across this entire round trip
- The habit of disposing of a scratch org deliberately, not just abandoning it

## Continuing from Lesson 19

This lab assumes you finished Lesson 19's project — a generated project with a scratch org definition file and at least one real Apex class, committed to Git. Now you'll actually run it against a live org.

## Step 1: Create the scratch org

```bash
sf org create scratch --definition-file config/project-scratch-def.json --alias capstone-scratch --set-default --duration-days 3 --target-dev-hub DevHub
```

Three days is enough for this lab without leaving a long-lived org sitting around (Lesson 5).

## Step 2: Deploy your project into it

```bash
sf project deploy start --target-org capstone-scratch
```

Since this is the org's first deploy, it sends everything (Lesson 12). Watch the output for a success status on every component.

## Step 3: Verify it actually landed

Don't just trust a "Deployed Successfully" message blindly — open the org and check:

```bash
sf org open --target-org capstone-scratch
```

Navigate to Setup → Apex Classes and confirm your class from Lesson 19 is actually listed. This habit — verifying in the org, not just trusting the CLI's exit status — matters more once deploys get complex enough that a partial success is possible.

## Step 4: Make a change and sync it back

Edit your Apex class locally — change the greeting string it returns, for instance — then run:

```bash
sf project deploy start --target-org capstone-scratch
```

Because source tracking is active (it's a scratch org, tracked by default), this second deploy sends only the file you actually changed, not the whole project again (Lesson 12). Confirm this by watching the deploy output name only that one component.

## Step 5: Pull a change made directly in the org

In the scratch org's Setup, add a new custom field to a standard object (something small, like a text field on Account). Then run:

```bash
sf project retrieve start --target-org capstone-scratch
```

Confirm the new field's metadata now exists as a new file under `force-app/main/default/objects/Account/fields/` locally. Commit it to Git — this is the loop from Lesson 3 completing in practice.

## Step 6: Dispose of the scratch org deliberately

```bash
sf org delete scratch --target-org capstone-scratch --no-prompt
```

Don't just let it expire passively — deleting it yourself, once you're done, is the disposability habit Lesson 5 described, practiced rather than just read about.

## Key terms

| Term | Meaning |
|---|---|
| Round trip | Create org → deploy → change → sync → verify → dispose |
| Verification step | Checking the actual org state, not just trusting a CLI success message |
| Deliberate disposal | Deleting a scratch org once done, rather than letting it passively expire |

## Lab

Execute Steps 1 through 6 above in order, on a real scratch org if you have Dev Hub access, or by writing out exactly what you'd expect to see at each step (the deploy output, the retrieved field's file path, the delete confirmation) if you don't. Note specifically what changed about the deploy output between Step 2 (the full first deploy) and Step 4 (the single-file follow-up deploy), and why.

## Check yourself

Can you explain why Step 2's deploy sends everything while Step 4's deploy sends only one file? Can you describe what you'd check in Step 3 to verify a deploy actually worked, beyond the CLI's own success message?
