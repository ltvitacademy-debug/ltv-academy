# Script — Secrets Detection

## Segment 1 (title)

Chapter 3 covered where secrets should live — a vault, never a config file. This lesson covers what happens when that discipline slips, and the automated scan that catches it in code and in git history.

## Segment 2 (steps)

Scanners use two techniques: pattern matching for known shapes, like an AWS key's recognizable prefix, and entropy analysis for strings that don't match a known pattern but look randomly generated rather than typed. Tools like gitleaks and trufflehog scan both current files and the entire commit history, not just the latest snapshot.

## Segment 3 (code)

A real finding lists the exact rule that matched, the file and line, an entropy score, and a fingerprint — everything needed to triage it and confirm it's fixed.

## Segment 4 (steps)

Deleting the line in a later commit doesn't delete the leak — it's still sitting in history. The only real fix is rotating the credential at its source. Push protection blocks a matching secret before GitHub even accepts the push, and a local pre-commit hook catches it even earlier, before it leaves the developer's machine.

## Segment 5 (outro)

If the secret had come from a vault instead of being hardcoded, rotating it is routine, not an emergency — which is exactly the point of Chapter 3. Next up, Lesson 18: infrastructure as code scanning.
