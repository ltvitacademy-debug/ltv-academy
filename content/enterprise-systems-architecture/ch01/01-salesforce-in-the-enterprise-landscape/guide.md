# Lesson 1 — Salesforce in the Enterprise Landscape

**Chapter 1 · Salesforce in the Enterprise · Lesson 1 of 22**

## What you'll learn

- Why a System Architect's job starts where an Application Architect's job stops: at the edge of the Salesforce org
- The difference between designing *inside* one platform and designing *across* an enterprise's whole systems landscape
- The categories of systems a System Architect typically has to account for around any Salesforce implementation
- Why "it works in Salesforce" and "it works for the enterprise" are two different standards of done

## A different vantage point

Every architecture credential you've earned so far — Data Architect, Sharing and Visibility Architect, Application Architect — answers questions that stay inside the boundary of a single Salesforce org: how should these objects relate to each other, who can see which records, how should this one application scale. Those are real, hard problems, and they matter. But they all assume the org is the whole picture.

It never is. In a real enterprise, Salesforce is one application running alongside a general ledger in an ERP, an employee record in an HR system, a product catalog in a PIM, a support ticket history in a legacy helpdesk nobody wants to touch, and a data warehouse that finance reads every morning. The System Architect credential — and the discipline this course teaches — exists because someone has to be responsible for how all of those systems fit together, not just how well any one of them is built.

## What "enterprise" actually changes

Moving from application architecture to enterprise architecture changes the questions you ask before you change the answers you give:

- Instead of "what's the best object model for this process," you ask "which system should own this data at all, and does Salesforce even need a copy of it."
- Instead of "how do I make this flow performant," you ask "how many systems does this business event need to reach, and in what order, when it fires."
- Instead of "what permission set does this user need," you ask "what does this user's identity look like across every system they touch, and who is responsible for keeping that consistent."

None of this replaces the application-level architecture skills you already have. A System Architect still needs to know Salesforce deeply — governor limits, sharing architecture, integration APIs, all of it. What changes is the scope of what you're accountable for getting right.

## The systems around Salesforce

Across most mid-size and large enterprises, a System Architect will typically encounter some version of the following neighbors to Salesforce, which the next lesson covers in more detail: ERP systems holding the financial system of record, HR/HCM systems holding the employee master, a data warehouse or lakehouse consolidating reporting, middleware or an integration platform brokering traffic between systems, and often one or more legacy systems that predate the current architecture entirely and can't simply be switched off. Each of these has its own owners, its own release cycles, and its own idea of what data it's authoritative for — and Salesforce has to coexist with all of it, not quietly replace it.

## Key terms

| Term | Meaning |
|---|---|
| System Architect | The architecture role responsible for how Salesforce fits into and interacts with the broader enterprise systems landscape, as distinct from the Application Architect's focus on one app |
| Enterprise systems landscape | The full set of applications, platforms, and data stores an organization operates, of which Salesforce is one |
| Systems landscape boundary | The line separating what one system owns and is responsible for from what belongs to its neighbors |
| ERP | Enterprise Resource Planning system — typically the system of record for financials, procurement, and inventory |
| HCM/HRIS | Human Capital Management / HR Information System — typically the system of record for employee data |

## Lab

Pick a company you know well — a past employer, or a well-known public company you can research. List every system you can identify that this company almost certainly runs alongside any CRM: at minimum, an ERP/finance system, an HR system, and a data warehouse or BI tool. For each one, write one sentence on what you think that system is the authoritative source for, and one sentence on what would break if Salesforce tried to silently keep its own separate copy of that same data without any connection back to the source system.

## Check yourself

Can you explain, in your own words, the difference between an Application Architect's scope and a System Architect's scope? Can you name at least three categories of systems a System Architect has to account for that have nothing to do with Salesforce's own configuration?
