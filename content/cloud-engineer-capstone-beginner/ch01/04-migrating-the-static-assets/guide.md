# Lesson 4 — Migrating the Static Assets to Blob Storage

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 4 of 10**

## What you'll learn

- How to create a blob container inside the storage account from Lesson 3
- How to choose the right access tier for product images, and why that choice is obvious once
  you know how the images are actually used
- How to move the files and point the catalog app at their new location
- Why validating the move means more than "the upload command didn't error"

## Creating the container

Blob storage needs a container before it can hold anything — the namespace inside the storage
account where the actual image files will live:

```
az storage container create \
  --account-name stdriftwoodimages \
  --name product-images \
  --auth-mode login
```

`product-images` is a flat namespace, the same way every blob container is — the catalog app's
existing folder structure (say, `products/jackets/`, `products/boots/`) can be kept as part of
each blob's name, and the Azure Portal will display it as if it were folders, even though the
underlying storage stays flat.

## Choosing the access tier

Every blob lives in one of three access tiers, and the right one for product images is decided
by one question: how often are these files actually read? Driftwood's product images are viewed
constantly — every time a shopper opens the catalog, every time a product page loads. That's the
textbook case for the **Hot** tier: highest storage cost, but lowest access cost and no retrieval
delay, exactly right for data read all the time. Cool or Archive would save a little on storage
but add latency or a multi-hour rehydration delay neither customer-facing images nor a launch
deadline can afford.

```
az storage blob upload-batch \
  --account-name stdriftwoodimages \
  --destination product-images \
  --source ./on-prem-export/product-images \
  --tier Hot
```

`upload-batch` moves every file in the exported local folder into the container in one command,
rather than uploading each image individually — the practical choice once you're moving hundreds
of product photos instead of one test file.

## Pointing the app at the new location

Moving the files is only half the job — the catalog app still has code that builds image URLs
from the old local file path. Every blob in a container has a public, predictable URL:

```
https://stdriftwoodimages.blob.core.windows.net/product-images/jackets/trailhead-jacket-01.jpg
```

The app's image-rendering logic gets updated to build URLs in that shape instead of the old
local path — the specific line of code differs by app, but the pattern is the same: replace a
local file-path prefix with the storage account's blob endpoint.

## Validating the move is real, not assumed

An upload command returning without an error doesn't prove the migration worked — it only
proves the upload didn't fail. Real validation means:

- **Count check**: the number of blobs in `product-images` matches the number of image files
  that existed on-prem. `az storage blob list --account-name stdriftwoodimages --container-name
  product-images --output table` and compare the count.
- **Spot check**: open a handful of image URLs directly in a browser — including at least one
  from every product category — and confirm they load and look correct, not corrupted or
  truncated.
- **App check**: load the catalog app's product pages (even if it's still running on-prem for
  now) with the updated image URLs, and confirm images render where the old local-path images
  used to appear.

Only after all three checks pass is this piece of the migration actually done — not just
"uploaded."

## Key terms

| Term | Meaning |
|---|---|
| Blob container | The namespace inside a storage account where the product image files live |
| Hot access tier | Lowest access cost, no retrieval delay — the right tier for frequently viewed images |
| `upload-batch` | Uploads every file in a local folder to a container in one command |
| Count/spot/app check | The three-part validation that an upload actually succeeded, not just ran without error |

## Lab

Create the `product-images` container, upload a small sample set of test images at the Hot
tier, and run all three validation checks above against that sample before assuming the
approach will work for the real product catalog.

## Check yourself

You're ready for Lesson 5 when you can explain, from memory, why product images belong in the
Hot tier rather than Cool or Archive, and why an upload command finishing without an error isn't
the same thing as a validated migration.
