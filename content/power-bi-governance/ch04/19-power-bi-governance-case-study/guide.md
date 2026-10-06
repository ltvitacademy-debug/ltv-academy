# Lesson 19 — Power BI Governance Case Study

**Chapter 4 · Lifecycle and Enterprise BI · Lesson 19 of 20**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How tenant governance, security, trust, and lifecycle management connect as one system, not four separate projects
- What actually breaks when any one of those four pieces is missing
- How to recognize this same pattern in your own organization's Power BI estate

## The scenario (fictional, illustrative)

**Meridian Outdoor Supply**, a fictional mid-sized outdoor gear retailer, has a familiar problem: three regional managers each built their own "Weekly Sales Flash" report in their own workspace, pulling from slightly different copies of the same underlying data. At Monday's leadership meeting, three different "total weekly revenue" numbers show up in three different slide decks, and nobody can say with confidence which one is right. This is a realistic composite of the kind of problem this course exists to solve — not a real company's data.

## Chapters 1-2, applied: one source instead of three copies

The governance team's first move isn't a security audit — it's consolidation. One workspace, assigned to the Sales domain, becomes the owned home for the Weekly Sales dataset, and the two duplicate copies get retired. Row-level security on the single remaining semantic model filters each region's data automatically, so regional managers don't need their own separate copies just to see only their own region. A Confidential sensitivity label, applied at the dataset's source, travels automatically into every report and export built on top of it — exactly the protection this career path's earlier labeling lessons covered, now applied at the one place that actually matters.

## Chapter 3, applied: earning trust, then proving it held

With one dataset instead of three, the team certifies it — a named owner, a documented nightly refresh, reviewed against Meridian's written certification criteria. A few months later, the source system changes a column's data type. Before the change ships, the team runs impact analysis on the certified dataset and finds it would silently break four downstream reports across two workspaces — including the one the CFO opens every Monday. They fix the dependent measures first. After the change, usage metrics confirm regional managers are actually using the certified report instead of quietly rebuilding their own copies again, and the audit log shows exactly who touched the dataset during the transition, in case anything needs to be traced back later.

## Chapter 4, applied: a pipeline instead of a shortcut

The schema change itself doesn't go straight to the report the CFO uses. It moves through a deployment pipeline: built and tested in Development, validated in Test against the compared-items view, and only then deployed to Production — the same workspace every regional manager and the CFO actually open. Rolled up to the tenant level, this single success story is one line in Meridian's enterprise governance dashboard: one more certified, labeled, pipeline-managed item, instead of three competing copies nobody fully trusted.

## The result

Three months later, there's one "Weekly Sales Flash," one number in every Monday deck, and a documented trail — from domain assignment through certification through the deployment that shipped the last schema change — that didn't exist when the three competing copies did.

## Key terms

| Term | Meaning |
|---|---|
| Domain | A tenant-level grouping of workspaces by business area, such as Sales |
| Consolidation | Retiring duplicate copies of content in favor of one governed source |
| Source of truth | The single, certified version of a dataset other content should be built from |

## Lab

Think of a "three different numbers in three different decks" situation you've seen or can imagine at your own organization or a hobby project. Walk it through this lesson's four-chapter sequence the way Meridian's was walked through: what would you consolidate (Chapters 1-2), what would you certify and verify (Chapter 3), and what would you move through a real pipeline instead of a shortcut (Chapter 4)?

## Check yourself

Without looking back, can you explain why Meridian's fix started with consolidating workspaces rather than jumping straight to certifying one of the three existing reports?
