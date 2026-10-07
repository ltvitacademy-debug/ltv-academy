# Secrets Detection

Chapter 3 covered where secrets *should* live — a vault, never a config file. This lesson covers what happens when that discipline slips: a developer pastes a real API key into a script "just to test it," commits, and pushes. Secrets detection is the automated scan that catches that moment, in code and in git history, before — or right after — it happens.

## What you'll learn

- How secrets detection tools find credentials, using both pattern matching and entropy analysis
- What a real finding looks like in a tool like gitleaks
- Why a secret committed to git history isn't fixed by deleting the line in a later commit
- The difference between catching a leak after a push and blocking it before one

## Two ways to recognize a secret

Secrets detection tools use two complementary techniques. **Pattern matching** looks for known shapes — an AWS access key always starts with `AKIA` followed by sixteen characters, a GitHub token has its own recognizable prefix. **Entropy analysis** catches the rest: a string that doesn't match any known pattern but has the high randomness characteristic of a generated secret, as opposed to an English sentence or a normal identifier.

Tools like **gitleaks** and **trufflehog** scan a repository's current files and its entire commit history for both. Here's what a real gitleaks finding looks like on the command line:

```
Finding:     AKIAIOSFODNN7EXAMPLE
Secret:      AKIAIOSFODNN7EXAMPLE
RuleID:      aws-access-key-id
Entropy:     3.684
File:        services/checkout/config/settings.py
Line:        42
Fingerprint: 8f2a1c9:services/checkout/config/settings.py:aws-access-key-id:42
```

Every field matters for triage: the rule that matched, the exact file and line, an entropy score, and a fingerprint that lets the same finding be tracked (and suppressed, once handled) across repeated scans.

## Deleting the line doesn't delete the leak

If a developer at Northbridge Retail commits an AWS key, realizes the mistake, and deletes it in the next commit, the key is still sitting in git history — anyone who clones the repository, or who finds it through a scan of historical commits, can still retrieve it. The only real fix once a secret has been pushed is to **rotate it**: generate a new credential, revoke the old one at the source (IAM, the vault, wherever it was issued), and treat the committed value as permanently compromised. This connects directly back to Chapter 3 — if the secret had come from Key Vault or Secrets Manager instead of being hardcoded, rotating it is a routine operation, not an emergency.

## Catching it before the push, not just after

GitHub's secret scanning runs against pushed code and can alert a repository owner after the fact. **Push protection** goes a step further: it scans a push *before* GitHub accepts it, and blocks the push outright if it matches a known secret pattern, giving the developer a chance to remove it before it ever reaches a shared branch — let alone git history permanently. Many teams layer a local **pre-commit hook** running gitleaks on top of that, catching the mistake on the developer's own machine, before it ever leaves their laptop.

## Key terms

- **Secrets detection** — automated scanning for credentials in code and git history
- **Entropy analysis** — flagging high-randomness strings that resemble generated secrets, even without a known pattern
- **Push protection** — blocking a push before it's accepted if it contains a recognized secret pattern
- **Credential rotation** — issuing a new secret and revoking the old one, the only real fix once a secret has been pushed
