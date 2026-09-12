# Lesson 85 — Designing Dashboards for Desktop & Mobile

**Chapter 14 · Dashboards · Lesson 85 of 95**

## What you'll learn

- Why a single dashboard doesn't automatically work well on every device
- **Device-specific layouts** — how Tableau lets one dashboard have a
  different arrangement for Desktop, Tablet, and Phone
- **Auto-Generate Layout** vs. building a phone layout by hand
- Practical mobile design rules: what to cut, what to stack, and what to
  keep untouched

## Why one layout doesn't fit every screen

Everything in this chapter so far — containers, KPI headers, actions,
navigation — assumes a reasonably wide canvas. A dashboard built at
1200×800 with a four-column KPI row and a wide map looks correct on a
laptop and unusable squeezed onto a phone screen: text too small to read,
touch targets too close together, four columns collapsed into an
unreadable strip. Rather than forcing you to maintain three separate
workbooks, Tableau lets one dashboard define alternate layouts per device
class.

## Device-specific layouts

From the **Device Preview** button in the Dashboard pane, you can add a
layout for **Phone**, **Tablet**, or a custom size, on top of the
**Default** (desktop) layout you've already built. Each device layout
reuses the exact same worksheets and objects — you're not rebuilding
content, only rearranging and resizing which pieces show, and in what
order.

![Tableau's Device Designer, showing the Phone layout selected, an "Auto-Generate Layout" option in a context menu, next to a live phone-sized preview of a "Sales and Profit by Customer" scatter plot dashboard.](/courses/tableau/ch14/85-designing-for-desktop-and-mobile/dashboard_dsd_automatic_phone_new.png)
*Auto-Generate Layout takes your desktop dashboard and produces a first-pass phone arrangement automatically — a starting point, not a finished product.*
Source: [Tableau Help — Create Dashboard Layouts for Different Device Types](https://help.tableau.com/current/pro/desktop/en-us/dashboards_dsd_create.htm)

**Auto-Generate Layout** is the fast path: Tableau stacks your existing
objects vertically in roughly the order they appear on the desktop layout,
scaled to fit a phone-width screen. It's a genuinely useful starting point,
but it rarely produces a finished result on its own — a KPI row that reads
cleanly as four columns on desktop needs to actually become a stacked
column of four rows on phone, not four columns squeezed into a strip too
narrow to read.

The alternative — building the phone layout manually — gives you full
control: hide objects that don't make sense on a small screen, resize the
ones that remain, and reorder what appears first. Manual is more work, but
for a dashboard you actually intend people to use on their phones (rather
than one where mobile support is an afterthought), it's worth the time.

## What real mobile dashboards look like

![Two real phone-device dashboards side by side: a "Segment" sales dashboard with quarterly stacked bar charts and Region/Quarter filters at the top, and a "Website Traffic" dashboard with a map, a Visits metric, and a trend line — both shown on actual phone frames.](/courses/tableau/ch14/85-designing-for-desktop-and-mobile/mobile_dsds.png)
*Both real phone layouts: filters at the top, one primary chart per screen's worth of scrolling, generous touch targets.*
Source: [Tableau Help — Create Dashboard Layouts for Different Device Types](https://help.tableau.com/current/pro/desktop/en-us/dashboards_dsd_create.htm)

Notice what both real examples share: filters live at the top, easy to
reach with a thumb before scrolling; each screen's worth of content
foregrounds one primary chart rather than trying to show four at once; and
nothing depends on hover, since phones don't have a mouse pointer to hover
with.

## Practical rules for a phone layout

| Desktop pattern | Phone equivalent |
|---|---|
| KPI row (4 columns, Horizontal container) | Stack vertically, or keep only the 1-2 most critical KPIs |
| Hover-triggered highlight/filter actions | Switch to Select — there's no hover on a touchscreen |
| Wide multi-column detail table | Cut to essential columns, or replace with a summary chart |
| Dense scatter plot with many marks | Simplify, or move to a secondary/detail screen reached by navigation |
| Small click targets (tiny buttons, thin bars) | Enlarge — touch targets need real room, unlike a precise mouse pointer |

The single most important rule underneath all of these: a phone layout is
not a scaled-down desktop layout, it's a different information hierarchy.
Decide what a phone viewer actually needs first (usually: the headline
number and maybe one chart), and build outward from that, rather than
starting from the desktop version and shrinking everything until it
technically fits.

## Key terms

| Term | Meaning |
|---|---|
| Device-specific layout | An alternate arrangement (Phone, Tablet, custom) of the same dashboard content, per device class |
| Device Designer | The Tableau Desktop interface for building and previewing device-specific layouts |
| Auto-Generate Layout | A one-click starting layout Tableau produces automatically for a device size |
| Device Preview | The panel used to preview how a dashboard renders on a chosen device size |

## Lab

1. Open a dashboard you've built earlier in this chapter. Use Device
   Preview to add a Phone layout, and try Auto-Generate Layout first to
   see its starting point.
2. Manually adjust that phone layout: hide at least one object that
   doesn't belong on a small screen, and change any Hover-triggered action
   to Select for the phone layout specifically.

## Check yourself

You're ready for Lesson 86 when you can explain why Auto-Generate Layout is
a starting point rather than a finished mobile design, and name at least
two concrete adjustments (from the table above) you'd make when converting
a desktop KPI row into a phone layout.
