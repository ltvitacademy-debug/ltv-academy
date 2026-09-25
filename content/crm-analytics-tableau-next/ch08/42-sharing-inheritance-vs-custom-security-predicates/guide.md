# Sharing Inheritance vs. Custom Security Predicates

There are two ways to protect the rows of a CRM Analytics dataset. **Sharing inheritance** borrows the sharing rules you already built in Salesforce. **Custom security predicates** are filters you write yourself. Most real designs use both, and the skill is knowing which to reach for. This lesson gives you a decision framework and the pitfalls on each side.

## What you'll learn

- What sharing inheritance is and what it does for you
- What it can't do, and why a predicate is still required alongside it
- When a custom predicate is the better tool
- A practical way to choose

## Sharing inheritance: reuse what Salesforce already knows

You already invested in Salesforce's sharing model: organization-wide defaults, the role hierarchy, sharing rules, and manual shares. Rebuilding all of that as predicates would be slow and error-prone. **Sharing inheritance** lets a dataset built from a Salesforce object apply that object's sharing logic to the dataset's rows, so a user sees the rows they could see in Salesforce.

The appeal is accuracy and maintenance. When an admin changes a sharing rule in Salesforce, analytics follows that logic instead of drifting out of sync with a hand-written predicate. It also spares you from encoding role hierarchies, which are painful to express as a predicate.

## The limits you must plan for

Sharing inheritance has constraints. Two of the ones documented by Salesforce are worth knowing in principle:

- A dataset inherits sharing from **one Salesforce object**, even if the dataset was built from several. Settings in the dataset and the recipe or dataflow that produced it need to be consistent.
- Inheritance can't always be honored, for example when a user's access exceeds documented limits. In those cases you need a **security predicate as a fallback**, which decides row visibility when sharing can't be applied. Salesforce documentation says that if you use sharing inheritance, you should also set a security predicate for exactly that reason.

Exact limits, supported objects, and behaviors change from release to release, so treat this lesson as a map and check the current Analytics security documentation before designing. Never memorize a number from a blog post.

Sharing inheritance also only applies to Salesforce object data. It says nothing about rows that came from a warehouse.

## Custom security predicates: when you need control

A custom predicate is the right tool when:

- The data isn't from Salesforce. Warehouse revenue, product usage, or uploaded files have no Salesforce sharing to inherit.
- The rule isn't a Salesforce sharing rule. For example, "reps see their region, based on a territory column in the dataset."
- A dataset combines several objects and one inherited object can't represent the intended access.
- You need a predictable, easy-to-explain rule that auditors can read.

The cost is maintenance. A predicate that encodes region access must be updated when territories change, and nothing in Salesforce will remind you. Document each one.

## A quick decision guide

1. Is the dataset a straightforward view of one Salesforce object? Consider **sharing inheritance**, plus a fallback predicate.
2. Does it mix in external data? Use a **custom predicate** on a mapping column, and decide explicitly what rows without a mapping should do.
3. Is the access rule really a business rule rather than a sharing rule? Use a **custom predicate**.
4. Not sure? Start with the simplest, most restrictive option, then loosen deliberately after testing with real users.

Whichever you choose, write down which datasets rely on which approach. That inventory is the first thing an auditor asks for.

## Recap

Sharing inheritance reuses Salesforce's sharing logic but has limits and needs a predicate as a fallback. Custom predicates handle external data and business rules but require ongoing upkeep. Pick per dataset, and document the choice.

## Check yourself

A dataset joins Opportunity data with warehouse quota figures. Can sharing inheritance protect the quota rows? What would you use?
