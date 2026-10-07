# Drift Detection

Even with a disciplined CI/CD pipeline and policy checks, someone can still open the Azure Portal or AWS Console and change a resource by hand — maybe to fix an urgent incident at 2 a.m. That's **drift**: the real infrastructure no longer matching what Terraform's configuration and state say it should be. This lesson covers catching it before it causes a surprise.

## What you'll learn

- What drift is and realistic ways it happens even on a disciplined team
- How a scheduled `terraform plan` detects drift without changing anything
- How to read a plan diff that shows unexpected changes instead of the usual "no changes"
- What to do once drift is found: update the config, or re-apply to correct it

## How drift happens

Northbridge's on-call engineer gets paged at 2 a.m. because the checkout service is down. The fastest fix is bumping a VM's size directly in the Azure Portal, right then, to get traffic flowing again. That's the right call in the moment — but the next `terraform plan` now disagrees with reality, because the `.tf` file still says the old VM size.

## Detecting it: a scheduled plan

`terraform plan` never changes anything by itself — it only compares desired configuration and state against the real infrastructure and reports the difference. Running it on a schedule, even with nothing merged, catches exactly this kind of out-of-band change:

```yaml
# .github/workflows/drift-check.yml
on:
  schedule:
    - cron: "0 7 * * *"   # every morning
jobs:
  drift-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: infra
      - run: terraform plan -detailed-exitcode
        working-directory: infra
```

`-detailed-exitcode` makes the step exit `2` instead of `0` when there are pending changes, so the CI job itself fails and someone gets notified — instead of the drift sitting silently until the next scheduled apply surprises everyone.

## Reading a drift plan

A clean plan says "No changes." A drift plan instead shows an unexpected update, with no pull request behind it:

```
  # azurerm_linux_virtual_machine.checkout will be updated in-place
  ~ resource "azurerm_linux_virtual_machine" "checkout" {
      ~ size = "Standard_B2s" -> "Standard_D2s_v3"
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```

That `~ size = "Standard_B2s" -> "Standard_D2s_v3"` line is the tell — Terraform thinks the VM should be `Standard_B2s`, but it's actually running as `Standard_D2s_v3` now, because someone changed it by hand.

## Resolving drift: two directions

Once drift is found, there are only two honest responses. Either the manual change was legitimate and should stick — in which case update the `.tf` file to match reality and commit that change through the normal review process — or the manual change was a mistake or purely temporary, in which case running `terraform apply` puts it back to what the configuration says it should be. What you should never do is leave it unresolved; silent drift is exactly the "nobody knows what's real" problem this whole course exists to prevent.

## Key terms

| Term | Meaning |
|---|---|
| Drift | When real infrastructure no longer matches the configuration and state Terraform has on record |
| Scheduled plan | Running `terraform plan` on a timer to detect drift without applying anything |
| `-detailed-exitcode` | A plan flag that exits non-zero when there are pending changes, useful for CI alerting |
| Resolving drift | Either updating configuration to match a legitimate manual change, or re-applying to correct an unwanted one |
