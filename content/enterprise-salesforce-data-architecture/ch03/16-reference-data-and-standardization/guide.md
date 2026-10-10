# Lesson 16 — Reference Data and Standardization

**Chapter 3 · Ownership and Consistency · Lesson 16 of 26**

## What you'll learn

- How reference data differs from both master data and transactional data
- Why unstandardized reference data is one of the most common causes of broken enterprise reporting
- The case for centralizing a code list once, rather than letting every system keep its own
- Which Salesforce mechanisms exist for holding reference data, and when each one fits
- Who should be allowed to change a reference-data list, and why that has to be governed too

## Three kinds of data, and reference data is the smallest

Chapter 3 so far has talked about master data (customers, products — Lesson 15) and ownership of data generally (Lesson 14). **Reference data** is a third, narrower category: the controlled lists of values that other data is validated against or categorized by — country codes, currency codes, status values, industry categories, unit-of-measure codes. Reference data doesn't describe a business event (that's transactional data) and it isn't itself the subject of the record (that's master data) — it's the vocabulary everything else gets expressed in. A Country field on an Account record is master data about that Account; the list of valid country values it's allowed to contain is reference data.

## Why unstandardized reference data breaks reporting

Reference data problems are quiet. They don't throw errors — they just make reports wrong in ways that take a long time to notice. The textbook case: "Industry" exists as a free-text field in Salesforce, so reps type "Healthcare," "Health Care," "Medical," and "Healthcare Services" for what should be the same category. The same field exists as a governed picklist with twelve fixed values in the ERP, and a third, differently-organized list in the marketing automation tool. Ask "what's our largest industry segment?" and each system gives a different answer — not because the underlying customers changed, but because each system's reference data disagrees about what the categories even are. Nobody notices until an executive dashboard produces numbers that don't reconcile, and by then the mismatched data has been accumulating for years.

## Centralize the list, not necessarily the storage

The standard fix is **standardization**: one governed list of valid values, with every consuming system either using that exact list or mapping its own values to it in a documented, maintained crosswalk. This does *not* require every system to physically share one database table — it requires agreement on what the valid values and their meanings are, and a process for keeping each system's copy in sync when the list changes. A new country gets added, a currency gets deprecated, a status value gets renamed — the change happens once, in one governed place, and every downstream copy is updated through a deliberate process rather than drifting independently.

## Salesforce's own tools for holding reference data

Salesforce gives you several mechanisms for storing and enforcing reference data inside the platform, each suited to a different situation:

| Mechanism | Fits when | Limitation |
|---|---|---|
| Standard picklist | A short, rarely-changing list used on one or a few objects | Values are stored per-field; reusing the same list across many fields means re-entering it each time |
| Global value set | The same list of values needs to be reused across multiple picklist fields and objects | Still a Salesforce-only construct — other systems need their own copy or a sync process |
| Custom metadata type | A reference list needs structure beyond a flat value list — codes with descriptions, effective dates, or related attributes — and needs to be deployable like code | Requires more setup than a picklist; overkill for a simple five-value status list |
| Custom object | The reference list needs to be edited by business users at runtime without a deployment, or needs its own access controls | Carries more overhead (security, page layouts) than true reference data usually needs |

None of these solve the cross-system standardization problem by themselves — they're where Salesforce's *side* of a reference-data list lives. The standardization work is still deciding, across every system that touches the data, which list is authoritative and how the others map to it.

## Governing the list itself

A reference-data list needs its own light governance, separate from the data it validates. Someone has to own the list — who can add a new industry category, who approves retiring an old currency code, and how a change gets communicated to every downstream consumer before it breaks their reporting. This is a smaller-scale version of the data-ownership question from Lesson 14, but it's easy to overlook precisely because reference data feels too small and boring to need a named owner — right up until someone adds "Healthcare - Pediatric" to a picklist without telling anyone, and every report segmented by industry quietly stops matching the prior quarter's numbers.

## Key terms

| Term | Meaning |
|---|---|
| Reference data | Controlled lists of values used to validate or categorize other data (country codes, status values, categories) |
| Standardization | Establishing one governed, authoritative version of a reference-data list that other systems align to |
| Global value set | A Salesforce picklist value list defined once and reused across multiple fields and objects |
| Custom metadata type | A Salesforce construct for structured, deployable reference data with attributes beyond a flat value list |
| Crosswalk | A documented mapping between one system's reference-data values and another system's equivalent values |

## Lab

A company's "Industry" classification exists in three places: a free-text field in Salesforce (reps type whatever they want), a governed twelve-value picklist in the ERP, and a separately maintained list of industry tags in the marketing automation platform. Quarterly reporting on "revenue by industry" produces three different top-segment answers depending on which system runs the report. Propose a standardization plan: which list should become authoritative, what Salesforce mechanism the Salesforce side should migrate to, what the crosswalk to the other two systems needs to cover, and who should own approving future changes to the list.

## Check yourself

Can you explain the difference between reference data, master data, and transactional data using an example other than Industry or Country? Can you describe why standardizing reference data doesn't require merging it into one physical database, and what it does require instead?
