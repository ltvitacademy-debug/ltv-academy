# Lesson 11 — Endorsement: Promoted and Certified

**Chapter 3 · Trust and Quality · Lesson 11 of 20**

## What you'll learn

- The three endorsement levels in Power BI: None, Promoted, and Certified
- How any content owner can self-service a Promoted badge
- Why Certified requires a permission an admin has to grant first
- Where these badges actually show up for the people consuming your content

## Why endorsement exists

Every workspace fills up with reports, datasets, and dashboards, and not all of them are equally trustworthy. Someone's exploratory draft looks identical to the finance team's reviewed, production dataset — until a reader opens them and has no way to tell which one to trust. **Endorsement** is Power BI's answer: a visible badge, attached to the item itself, that follows it into search results, workspace lists, and apps.

## Promoting — a self-service signal

Any owner of a dataset, report, or other item can set it to **Promoted** from that item's settings, no special permission required.

![Screenshot of the Endorsement and discovery section in a Power BI dataset's settings, with the Promoted option selected and outlined in a red box.](/courses/power-bi-governance/ch03/11-endorsement-promoted-and-certified/power-bi-promote-content.png)
*Any content owner can select Promoted, right from the dataset's settings, to tell coworkers it's ready to use.*

Promoted is an opinion, not a review — it just says "the person who made this thinks it's good to use." That makes it useful for everyday collaboration, but it's deliberately a lighter-weight signal than what comes next.

## Certifying — an organizational signal

**Certified** sits one level above Promoted, and the setting looks almost identical — except most users will find the Certified option grayed out.

![Screenshot of the same Endorsement and discovery section, with the Certified option selected and outlined in a red box.](/courses/power-bi-governance/ch03/11-endorsement-promoted-and-certified/power-bi-certify-content.png)
*Certified sits one level above Promoted — and it's grayed out for most users until an admin grants them certifier rights.*

Certification is meant to represent an organizational review: someone with recognized authority — a data steward, a BI lead — has checked the content against the org's certification criteria (accuracy, a known owner, documented refresh schedule) and is putting their name behind it. Lesson 12 covers exactly how that permission gets granted and who should hold it.

## Three levels, one spectrum

| Level | Who sets it | What it signals |
|---|---|---|
| None | — (the default) | Appears in search; no trust signal either way |
| Promoted | Any content owner | "I think this is ready to use" |
| Certified | Only users granted certifier rights | "This was reviewed against org criteria" |

## Badges follow the content everywhere

Once set, these badges aren't confined to one settings screen — they travel with the item into every place a user might encounter it: search results, a workspace's content list, the item's details pane.

![Screenshot of a Power BI workspace list showing an Endorsement column with Master data, Certified, and Promoted badges next to different items, alongside a report's details panel showing it was endorsed as master data.](/courses/power-bi-governance/ch03/11-endorsement-promoted-and-certified/endorsement-badges.png)
*The same Promoted and Certified badges travel with the item into search results, workspace lists, and the app itself.*

That consistency is the entire point: a reader scanning a crowded workspace list, or searching for "revenue," sees the same badge no matter where they encounter the item, and can make a split-second trust decision without opening it.

## Key terms

| Term | Meaning |
|---|---|
| Endorsement | Power BI's system of visible trust badges attached to content |
| Promoted | A self-service badge any owner can apply — "ready to use" |
| Certified | An org-reviewed badge requiring a tenant-granted permission |
| Discoverable | A separate setting making endorsed content findable by users who don't yet have access |

## Lab

Pick three reports or datasets you use regularly (your own org's, or ones you've seen in this course's screenshots). For each, decide which endorsement level it *should* carry — None, Promoted, or Certified — and write one sentence justifying the call. If you'd promote one you don't own, note that you'd need to ask the actual owner, since promotion is set per item by whoever controls it.

## Check yourself

Without looking back, can you explain the one key difference between how a user gets to set Promoted versus how they get to set Certified — and why that difference exists?
