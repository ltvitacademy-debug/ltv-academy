# Script — Buckets & Objects

## Segment 1 (title)

Now that you've got the object storage model down, let's get concrete about buckets and objects — the naming rules, the metadata, and how versioning actually works.

## Segment 2 (code: bucket naming rules)

Bucket names become part of a DNS hostname, so the rules are strict: three to sixty-three characters, lowercase letters, numbers, hyphens and periods only, and globally unique across all of AWS — not just your account. If someone else already took the name, it's gone for everyone.

## Segment 3 (steps: objects, versioned)

Turn on versioning and everything changes: a PUT to an existing key keeps the old version instead of overwriting it, a DELETE just adds a marker on top instead of erasing anything, and objects can be up to five terabytes — though anything past roughly a hundred megabytes should use multipart upload, splitting the object into parallel parts S3 reassembles.

## Segment 4 (outro)

Buckets and objects down. Next up: storage classes — how S3 Standard, Infrequent Access, and Glacier trade cost against retrieval time.
