# Script — Drift Detection

## Segment 1 (title)

Even with a disciplined pipeline, someone can still open a console and change a resource by hand. That's drift — real infrastructure no longer matching what Terraform's configuration says it should be. Let's catch it before it causes a surprise.

## Segment 2 (steps)

Imagine Northbridge's on-call engineer gets paged at 2 a.m. and bumps a VM's size directly in the Portal to get traffic flowing again. The right call in the moment — but now the .tf file disagrees with reality.

## Segment 3 (code)

Terraform plan never changes anything by itself, it only reports differences. Running it on a schedule, even with nothing merged, catches this kind of out-of-band change. The detailed exit code flag makes the step fail when anything is pending, so someone actually gets notified.

## Segment 4 (code)

A clean plan says "no changes." A drift plan instead shows an unexpected update with no pull request behind it — here, Terraform thinks the VM should be one size, but it's actually running as another, because someone changed it by hand.

## Segment 5 (outro)

Once drift is found, either update the config to match a legitimate change, or reapply to correct an unwanted one — never leave it unresolved. Next up, Lesson 33: secrets handling, keeping credentials out of your files entirely.
