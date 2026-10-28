# Lesson 31 — Case Study: Remediating a CSPM Finding

**Chapter 8 · Capstone: Securing a Hybrid Cloud Environment · Lesson 31 of 32**

## What you'll learn

- How a real Cloud Security Posture Management finding showed up against Caldwell Logistics' own storage account from Lesson 30
- How to actually investigate why a misconfiguration happened, instead of just fixing it and moving on
- The real Azure CLI commands for confirming exposure and shutting it off at the right level
- Why re-scanning to confirm a fix is a required step, not an optional one

## The finding

A few weeks after Lesson 30's encryption work, Microsoft Defender for Cloud's posture dashboard flags `caldwelldocsstorage` with a high-severity recommendation: **storage account public access should be disallowed**. Specifically, the account-level `AllowBlobPublicAccess` setting is enabled, and one container, `invoices-shared`, has its public access level set to **Blob**, meaning anyone with the right URL can read every invoice PDF in it with no authentication at all. This is exactly the kind of finding Chapter 5 described CSPM tooling as being built to catch — not a theoretical risk, a live one, sitting on a storage account that's actually in use.

## Investigating why it happened

The instinct is to just flip the setting off and move on, but that doesn't explain how it got turned on in the first place, and without that answer it can easily happen again. Caldwell's team pulls the Azure **Activity Log** for `caldwelldocsstorage` and filters for `Set Storage Account Properties` operations. The log shows the change was made three weeks earlier by a contractor's account, around the same time an external auditor needed access to a batch of invoices for a compliance review. The contractor enabled public blob access to generate a quick, no-login link to share the files, intending to turn it back off once the audit wrapped — and, just like the hardcoded secret in Lesson 13, "later" never came.

## Confirming the actual exposure

Before remediating, the team confirms what was actually exposed, not just what was configured:

```
az storage container list --account-name caldwelldocsstorage \
  --query "[?properties.publicAccess!=null].{name:name, access:properties.publicAccess}"
```

This confirms `invoices-shared` is the only container with public access set, at the **Blob** level (individual blobs are readable with their URL, but the container can't be listed or browsed). Checking the storage account's diagnostic logs for anonymous `GET` requests shows a handful of hits from the auditor's known IP range and nothing else suspicious — the exposure existed, but nothing indicates it was actually found and exploited by anyone else in the three weeks it was open.

## Remediating

The fix happens at two levels. The account-level setting is the real kill switch — once it's off, no container on that account can be public, no matter what its individual setting says:

```
az storage account update --name caldwelldocsstorage \
  --allow-blob-public-access false

az storage container set-permission --account-name caldwelldocsstorage \
  --name invoices-shared --public-access off
```

Both commands run, not just the account-level one, so the container's own setting is clean if anyone looks at it directly later. For the next time someone outside the company needs a file, Caldwell's team documents the actual answer: generate a time-limited SAS token scoped to that one blob, not a public container.

## Confirming the fix and preventing a repeat

Remediating isn't the last step — Caldwell's team forces a fresh assessment from the recommendation's details page in Defender for Cloud and confirms the resource now shows as **Healthy** rather than waiting on the next automatic refresh cycle. To stop this from happening again regardless of who makes the next change, the team adds an Azure Policy with a **deny** effect on any storage account created or updated with `allowBlobPublicAccess` set to `true`, so the setting can't be turned back on even by accident.

## Key terms

| Term | Meaning |
|---|---|
| CSPM finding | A posture-management tool's flag that a specific resource is misconfigured against a security benchmark |
| AllowBlobPublicAccess | The account-level setting that must be enabled before any container's own public-access setting can take effect |
| Activity Log | Azure's record of control-plane operations, used here to find who changed the setting and when |
| SAS token | A time-limited, scoped credential for sharing one object without making anything publicly accessible |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why did the team run both the account-level and the container-level remediation command, when the account-level one alone would have closed the exposure?
