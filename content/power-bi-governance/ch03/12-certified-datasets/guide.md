# Lesson 12 — Certified Datasets

**Chapter 3 · Trust and Quality · Lesson 12 of 20**

## What you'll learn

- How an admin turns certification on for the organization, and who gets to grant it
- What should actually be true about a dataset before it earns the Certified badge
- The moment a certifier actually produces that badge
- That certification isn't limited to datasets — it extends to apps and other content too

## Turning certification on

Lesson 11 showed the Certified option grayed out for most users. That's not an accident — certification is off, and gated, until a tenant admin deliberately turns it on.

![Screenshot of the Fabric admin portal's Certification setting, showing it enabled for the entire organization with options to apply it to specific security groups instead.](/courses/power-bi-governance/ch03/12-certified-datasets/certification-setup-dialog.png)
*An admin enables certification for the organization and decides who gets to grant it — everyone, or specific security groups only.*

This single setting answers the most important governance question about certification before a single dataset gets touched: **who is allowed to certify?** The admin can open it to the entire organization, restrict it to specific security groups, or even delegate the decision to domain admins. Most organizations land somewhere narrow — a small, named group of data stewards — because a badge anyone can grant isn't worth much.

## What should be true before you certify

Certification only means something if it's backed by an actual standard. A reasonable bar for certifying a dataset:

- **A known, accountable owner** — a named person or team, not "whoever built it"
- **A documented, reliable refresh schedule** — not "it refreshes whenever someone remembers"
- **Reviewed accuracy** — someone with authority has checked it against your org's written certification criteria, the same criteria referenced in the endorsement settings screen

Skip this step and "Certified" just becomes a second Promoted badge with extra friction — which defeats the entire point of having two tiers.

## The moment it happens

Once someone actually holds certifier rights, applying the badge itself is the same simple action Lesson 11 showed: select Certified on the item's settings.

![Screenshot of the Endorsement and discovery settings with Certified selected, outlined in a red box.](/courses/power-bi-governance/ch03/12-certified-datasets/power-bi-certify-content.png)
*Once a user holds certifier rights, selecting Certified on a dataset is what actually produces the badge.*

Everything before this point — the review, the owner check, the refresh verification — is process the organization enforces outside the tool. Power BI itself only enforces *who* is allowed to click the button.

## Beyond datasets

"Certified Datasets" is this lesson's focus, but the concept doesn't stop at datasets. Published apps carry their own endorsement option too.

![Screenshot of a published Power BI app's settings, with the "..." menu open showing an Endorse this app option, outlined in a red box.](/courses/power-bi-governance/ch03/12-certified-datasets/power-bi-app-settings.png)
*Apps carry their own Endorse option too — the same certification concept applies beyond just datasets and reports.*

The same two questions apply no matter what you're certifying: does this meet our written criteria, and does the person clicking "Certified" actually have the right to make that call.

## Key terms

| Term | Meaning |
|---|---|
| Certification setting | The tenant-level admin control that turns certification on and decides who can grant it |
| Certifier | A user who has been granted the right to apply the Certified badge |
| Certification criteria | An organization's written standard a dataset must meet before certification |

## Lab

Draft a one-paragraph certification criteria statement for a dataset at your own organization (or an imagined one): what makes it eligible, who's allowed to certify it, and how often it gets re-reviewed. This is exactly the document a real governance team would link from the "How do I get my dataset certified?" prompt shown in Lesson 11's screenshots.

## Check yourself

Without looking back, can you name the one tenant-level setting that controls who's allowed to certify content, and explain why a narrow group of certifiers protects the value of the badge more than a wide-open one does?
