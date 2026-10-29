# Lesson 30 — Lab: Responding to a Simulated Cloud Credential Compromise

**Chapter 8 · Capstone: Securing a Multi-Cloud Environment · Lesson 30 of 32**

## What you'll learn

- How to run a real detection-containment-remediation walkthrough for a compromised Azure service
  principal, using the Activity Log the way Lesson 27 taught
- How to run the same three phases for a compromised AWS IAM access key, using CloudTrail instead
- Why containment on both clouds means disabling the credential immediately, *before* a full
  investigation finishes — not after
- How the enumerate-escalate-persist-act sequence from Lesson 25 shows up as concrete, readable log
  entries once you know exactly what to search for

## The scenario

Meridian Finworks' nightly reporting job uses an Azure service principal, `meridian-reporting-sp`,
with Reader access scoped to the finance resource group — and separately, an automated data-sync
job on AWS uses an IAM user with an access key, `meridian-sync-user`, scoped to one S3 bucket. This
lab simulates both credentials being compromised on the same night, and walks the detection,
containment, and remediation phases exactly as a real security engineer would run them under time
pressure.

## Part A — Azure: the compromised service principal

### Detection

A SOC alert fires on an anomalous sign-in. The Azure Activity Log (Lesson 27) shows the real
sequence:

```
2026-10-27T23:14:02Z  Sign-in: meridian-reporting-sp  from 185.220.101.47 (unexpected ASN)
2026-10-27T23:14:19Z  Microsoft Graph: directoryRoles/list  (enumeration — matches Lesson 25's T1087)
2026-10-27T23:15:03Z  Microsoft Graph: applications/list, appRoleAssignments/list
2026-10-27T23:16:47Z  Azure AD: addPassword on application "meridian-reporting-sp"
```

1. Confirm the sign-in location (`185.220.101.47`) doesn't match any Meridian office, VPN exit, or
   known automation IP range — this is the first hard signal, not just an anomaly score.
2. Recognize `addPassword` on the application registration for exactly what it is: the attacker
   adding a *second* credential, the persistence step Lesson 25 described — meaning rotating the
   original secret alone will not remove their access.

### Containment

3. Disable the service principal's sign-in immediately: set `accountEnabled` to `false` on the
   associated enterprise application, which blocks every credential tied to it — old and newly
   added — without waiting for the investigation to finish.
4. Pull the full credential list on the app registration and delete every client secret, including
   the one the attacker added, not just the one that was known to have leaked.

### Remediation

5. Re-enable the service principal only after issuing one brand-new secret, and store it through
   Key Vault (Lesson 22) instead of the environment variable it was previously read from.
6. Review every Microsoft Graph permission grant on `meridian-reporting-sp` and cut anything beyond
   the read-only finance scope it actually needs — the compromise is also the moment to apply the
   least-privilege rewrite from Lesson 29, not just restore what existed before.

## Part B — AWS: the compromised IAM access key

### Detection

CloudTrail (Lesson 27) shows the matching pattern for `meridian-sync-user`:

```
23:21:10  GetCallerIdentity                 (enumeration)
23:21:14  ListBuckets, GetBucketPolicy       (enumeration)
23:22:01  CreateAccessKey  on meridian-sync-user   (persistence — Lesson 25's T1098.001)
23:24:33  PutObject  on s3://meridian-customer-data/  (outside the sync job's normal bucket)
```

7. Flag the `CreateAccessKey` event as the persistence step: a second access key now exists on the
   same IAM user, independent of whichever key actually leaked.
8. Flag the `PutObject` call against `meridian-customer-data` as the "actual abuse" stage from
   Lesson 25's sequence — a bucket this automation user was never meant to touch.

### Containment

9. Deactivate (don't yet delete) **every** access key on `meridian-sync-user` — the original and
   the attacker-created one — using `aws iam update-access-key --status Inactive` for each key ID,
   which immediately blocks both without destroying evidence.
10. Attach an explicit **deny-all** inline policy to the IAM user as a second layer, in case any
    still-valid temporary session tokens exist outside the key itself.

### Remediation

11. Delete both deactivated keys once the investigation confirms no further use is needed, and
    issue one new key, stored the same way Lesson 22 covered for AWS secrets.
12. Narrow `meridian-sync-user`'s policy to `s3:GetObject`/`s3:PutObject` on the one bucket the sync
    job actually uses — the same least-privilege rewrite pattern from Lesson 29, applied here as
    part of remediation instead of as a separate hardening pass.

## Why containment comes before the full investigation finishes

Both paths disable the credential within minutes of detection, long before every log entry has
been reviewed. That ordering is deliberate: Lesson 28 established that containment shouldn't wait
for complete certainty, because every additional minute a compromised identity stays active is
another `PutObject`, another `addPassword`, another enumeration call an attacker can make.

## Key terms

| Term | Meaning |
|---|---|
| `addPassword` / `CreateAccessKey` | The specific log events that reveal an attacker's persistence step — a second credential added to the identity they already compromised |
| `accountEnabled: false` | Disabling an Azure application/service principal's ability to sign in at all, blocking every credential tied to it at once |
| Deactivate before delete (AWS keys) | Setting a key to `Inactive` first preserves it as evidence while immediately blocking its use, instead of deleting it outright |
| Containment before full investigation | Disabling a compromised credential as soon as it's confirmed, without waiting for every log entry to be reviewed first |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does rotating only the
*originally leaked* secret or key fail to fully remove an attacker's access in both Part A and
Part B of this lab, and what single log event in each cloud reveals why?
