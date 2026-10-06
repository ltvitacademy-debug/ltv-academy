# Lesson 5 — Asset Locations and Asset Key Flexfields

**Chapter 1 · Fixed Assets Fundamentals · Lesson 5 of 33**

## What you'll learn

- What the location flexfield tracks and why it's hierarchical
- How location data supports property tax reporting and physical audits
- What an asset key flexfield is and how it differs from a location
- When a company actually needs a key flexfield versus when it doesn't

## Location: where the asset physically sits

Every asset in Oracle Fusion Assets can carry a **location**, built from a **location flexfield** — a configurable, segmented structure that typically runs from broad to specific: country, state or province, city, building, floor, and so on. A delivery van and a server might both belong to "Computer Equipment," but their locations tell very different stories: the van's location might just be a city depot, while the server's location drills all the way down to a specific data center room and rack.

Location isn't just bookkeeping trivia. It drives two things companies genuinely need:

- **Property tax reporting.** Many US states and counties assess property tax based on where tangible personal property physically sits as of a given date. A company with equipment scattered across multiple counties needs accurate location data to file correctly in each jurisdiction.
- **Physical inventory and audit.** Periodically, someone has to walk the floor with a scanner or a clipboard and confirm the assets on the books are actually where the books say they are. Without location data captured at addition, that exercise is just guessing.

## Asset key flexfields: an alternate way to identify an asset

A **key flexfield** is a separate, optional, segmented structure used to identify or group assets by something *other* than category and location — commonly a project, a cost center, an employee, or an internal tag number scheme a company already uses outside Oracle Fusion. Where location answers "where is it," the asset key flexfield answers whatever question the company needs to ask that category and location can't — for example, "which capital project funded this?"

Not every implementation needs one. A company with a simple category and location structure that already answers every reporting question it has may never turn the key flexfield on. A company tracking assets by both internal department *and* an external grant or project code, where neither fits cleanly into category or location, is the kind of case a key flexfield exists for.

## Segment design is a one-time decision with long consequences

Both the location flexfield and the asset key flexfield are configured with a fixed number of segments and a fixed structure before assets start getting added against them. Changing a flexfield's segment structure after thousands of assets already reference it is disruptive — so, much like category design in Lesson 4, this is a setup decision worth getting right from real reporting requirements, not guessed at.

## Key terms

| Term | Meaning |
|---|---|
| Location flexfield | The configurable, hierarchical segment structure recording where an asset physically sits |
| Asset key flexfield | An optional, separate segment structure identifying or grouping assets by something other than category or location |
| Flexfield segment | One configurable piece of a flexfield's structure (e.g., "state," "building") |

## Lab

Fictional company **Meridian Fabrication Co.** has two manufacturing plants, one in Ohio and one in Texas, and also tracks which assets were funded by a specific state manufacturing grant versus general capital spending. Propose a location flexfield structure for the two plants, and explain whether Meridian needs an asset key flexfield for the grant-tracking requirement, and why.

## Check yourself

Without looking back, can you explain the difference between what a location flexfield tracks and what an asset key flexfield tracks, and name one real business reason a company needs accurate location data?
