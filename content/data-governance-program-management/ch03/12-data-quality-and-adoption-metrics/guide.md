# Lesson 12 — Data Quality and Adoption Metrics

**Chapter 3 · Measuring Governance · Lesson 12 of 25**

## What you'll learn

- How data quality metrics roll up from individual rules into a program-level number
- Why adoption metrics are harder to collect than quality metrics, and why they matter more
- The specific metrics worth tracking in each category
- Why these two categories have to be read together, not separately

## From individual rules to a program-level number

If your organization runs a data quality program (this catalog's separate Data Quality Management course covers building one), you already have rule-level pass/fail results — completeness checks, format checks, referential integrity checks, each running against one table or one field. A governance program doesn't report at that level; a steering committee doesn't want a list of four hundred individual rule results. It wants a small number of **aggregate quality metrics** that roll those rules up:

- **Overall pass rate** across all active rules for a governed domain, often weighted by how critical each rule is
- **Critical-rule pass rate** — a separate, stricter number for just the rules someone decided actually block a process if they fail
- **Trend direction** — is the aggregate pass rate for this domain improving or declining quarter over quarter

The rollup is a judgment call, not a formula handed down by a standards body — someone has to decide which rules count as critical and how much weight the rest get. That decision itself should go through the governance workflow from Lesson 8, not get made silently by whoever built the dashboard.

## Why adoption is the harder number to get

Data quality metrics are relatively easy to compute — you already have the rule results sitting in a table. **Adoption metrics** measure something much fuzzier: are people actually changing their behavior because of governance, or is the program running in parallel to work nobody changed?

Useful adoption metrics include:

- **Percentage of new reports or dashboards built against approved, governed data sources** rather than an analyst's personal extract or an ungoverned spreadsheet
- **Steward engagement** — are assigned data stewards (Lesson 4) actually logging in, reviewing issues, and updating definitions, or is the title purely ceremonial
- **Business glossary usage** — are people actually looking up and using agreed-upon term definitions, versus still arguing about what "active customer" means in meetings
- **Policy acknowledgment and exception rates** — how many people have formally acknowledged a policy from Lesson 6, and how many exceptions are being requested against it

None of these come from a single system the way a quality rule's pass/fail does. They usually require pulling together usage logs from a BI platform, access logs from a catalog or glossary tool, and manual tracking of steward activity — which is exactly why adoption metrics are so often skipped. They shouldn't be. A program with a 99% quality pass rate and near-zero adoption has not actually changed anything about how the organization works.

## Reading the two together

Quality and adoption metrics tell different, complementary stories, and reading only one is misleading:

| Quality high, adoption high | Governance is actually working — act and tell this story |
| Quality high, adoption low | People haven't noticed or don't trust the governed data yet — this is a change-management problem, not a data problem (Chapter 4) |
| Quality low, adoption high | People are relying on data that isn't ready — fix the quality gap urgently |
| Quality low, adoption low | Program hasn't gotten traction yet — expected early, concerning if it persists |

## Key terms

| Term | Meaning |
|---|---|
| Aggregate quality metric | A rolled-up number (like overall pass rate) summarizing many individual data quality rule results |
| Critical-rule pass rate | A stricter pass-rate metric covering only rules designated as blocking |
| Adoption metric | A measure of whether people's actual behavior changed because of governance |
| Steward engagement | A measure of whether assigned data stewards are actively doing the role, not just holding the title |

## Lab

Pick one governed data domain you know (or invent a realistic one — "Customer," "Product," "Claims"). Write down one aggregate quality metric and one adoption metric for it. Then place that domain in one of the four quadrants from the "reading the two together" table above, and write two sentences on what you'd do next given that quadrant.

## Check yourself

Can you explain why adoption metrics are harder to collect than quality metrics? Can you name all four quadrants of the quality/adoption comparison and what each one means for a governance program?
