# Lesson 23 — The Public Storage Bucket Problem, and How to Actually Prevent It

**Chapter 6 · Data Protection in the Cloud · Lesson 3 of 4**

## What you'll learn

- How a storage bucket or container actually ends up publicly
  exposed — the handful of root causes behind most of these incidents
- What S3 Block Public Access actually blocks, at the account level
  and the bucket level, and why it's the single most effective
  control here
- The Azure Storage equivalents: the account-level "Allow Blob public
  access" setting and container-level public access levels
- Why private endpoints and continuous configuration-drift detection
  matter even after public access is blocked

## This keeps happening for a small number of repeatable reasons

Over the past decade, a long list of organizations has had sensitive
data exposed through a publicly readable S3 bucket or Azure Blob
container — researchers and reporters have found exposed buckets
belonging to telecoms, consulting firms, media companies, and
government contractors, usually holding customer records, internal
documents, or credentials. The infrastructure underneath those buckets
was never breached in any of these cases. The bucket was simply
reachable by anyone who found its name or stumbled across it in a scan.

The root causes are a short, repeatable list:

1. **A legacy ACL grants access to "Everyone" / `AllUsers`.** S3's
   original access-control-list system predates IAM policies, and an
   object or bucket ACL can grant read access to the special `AllUsers`
   group — easy to set by accident when copying permissions between
   objects, and easy to miss because ACLs don't show up where most
   engineers look first (bucket policy, IAM).
2. **A bucket policy or container access level is set to public for
   convenience**, often temporarily, to make a static website or a
   shared download work — and then never reverted.
3. **Nobody is watching for drift.** A setting that was private on
   day one can be flipped by anyone with sufficient permissions at any
   later point, and without continuous monitoring, that change goes
   unnoticed until someone outside the organization finds it first.

## S3 Block Public Access: the control that actually works

Block Public Access is AWS's answer to the ACL and policy problem, and
it's deliberately blunt: it's a set of four settings that can **override**
any ACL or bucket policy that would otherwise grant public access, at
two levels:

- **Account level** — applies to every bucket in the account,
  including future ones, which is why security teams push to enable
  it account-wide as a baseline rather than relying on every bucket
  owner to configure it correctly themselves.
- **Bucket level** — applies to one specific bucket, for the rare
  cases where a bucket genuinely needs to be public (a static website,
  public release artifacts) and the account-wide setting would block
  that intentionally.

The four settings are: block public ACLs, block public policies (new
ones can't be applied), ignore existing public ACLs, and restrict
public buckets (ignores any bucket policy that grants public access
even if one exists). Turned on together at the account level, no
individual bucket owner can accidentally make a bucket public anymore
— not through an ACL, not through a policy — regardless of what
anyone configures on that bucket afterward. This is why Block Public
Access, enabled account-wide, is the single highest-leverage control
against this entire class of incident.

## The Azure equivalent: two settings, two levels

Azure Storage has a parallel structure, also split across account and
container level:

- **"Allow Blob public access"** — an account-level setting (on the
  storage account itself) that, when disabled, makes it impossible for
  *any* container in that account to be set to public, no matter what
  its own setting says. This is the direct analog of S3's account-level
  Block Public Access, and for the same reason: it should be the
  default posture, not something configured per-container.
- **Container public access level** — set per-container, to Private
  (no anonymous access), Blob (anonymous read of blob data only), or
  Container (anonymous read of blob data *and* container/blob
  listing — the most dangerous of the three, since it lets anyone
  enumerate everything in the container). This setting only has any
  effect at all if the account-level setting above allows it.

Azure Policy can additionally enforce "Allow Blob public access =
Disabled" across every storage account in a subscription, denying
deployment of any account that doesn't comply — the same account-wide
guarantee S3 gets from Block Public Access.

## Beyond "not public": private endpoints and drift detection

Blocking public access solves the "wide open to the internet" failure
mode, but two more controls round this out in a real environment:

- **Private endpoints** (Azure Private Link, AWS VPC endpoints for
  S3) route traffic to the storage service entirely over the private
  network, never touching the public internet at all — and a bucket
  policy or storage firewall rule can require that traffic arrive only
  through that private path, which blocks access even from a
  legitimate AWS/Azure account outside your network.
- **Continuous drift detection** — AWS Config rules (e.g.
  `s3-bucket-public-read-prohibited`) and Azure Policy evaluate
  storage configuration on an ongoing basis, not just at deployment
  time, and can auto-remediate or alert the moment a setting drifts
  back toward public. This closes the gap that most real incidents
  fall into: a setting that was correct once, then silently changed.

Encryption, from the earlier lessons in this chapter, never substitutes
for any of this — an encrypted object with a public ACL is still a
publicly readable object; encryption protects data if it's exfiltrated
through a channel other than the normal read path, it does nothing
against a channel that was never restricted in the first place.

## Key terms

| Term | Meaning |
|---|---|
| S3 Block Public Access | Four account- or bucket-level settings that override any ACL/policy that would grant public access |
| "Allow Blob public access" | Azure Storage's account-level toggle; disabling it makes every container's public setting ineffective |
| Container public access level | Azure's per-container setting: Private, Blob (anonymous blob read), or Container (anonymous read + listing) |
| Private endpoint / VPC endpoint | Routes storage traffic over the private network, never touching the public internet, independent of the public-access settings above |
| Configuration drift | A previously correct, private setting being changed later, caught only by continuous monitoring (AWS Config, Azure Policy), not a one-time check |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
is enabling Block Public Access (or "Allow Blob public access =
Disabled") at the *account* level a stronger control than fixing every
individual bucket's or container's own access setting, and why does
encrypting an object do nothing to stop a public-ACL exposure?
