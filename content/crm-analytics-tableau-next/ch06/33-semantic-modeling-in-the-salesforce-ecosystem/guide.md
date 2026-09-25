# Semantic Modeling in the Salesforce Ecosystem

The previous lessons covered the idea of a semantic layer, central metrics, and governance. This lesson looks at how the pieces are actually built in Salesforce: the **semantic model**, created in the Semantic Model Builder and powered by Tableau Semantics. Product naming and features here are changing quickly, so treat the specifics as accurate as of this writing and check current release notes before relying on any detail.

## What you'll learn

- Where semantic models are built and what they are made of
- The modeling workflow: objects, relationships, calculated fields, metrics, test
- Who and what consumes a semantic model
- How this differs from CRM Analytics datasets

## Where the model lives

The Semantic Model Builder is available in **Tableau Next** and in **Data 360**, the product formerly called Data Cloud. In the Data 360 navigation there is a Semantic Layer area with Models and Metrics tabs. The model sits on top of the Data 360 data you learned in Chapter 4, and the same model can be used from Tableau Next.

## The building blocks

Current Salesforce documentation describes a semantic model as a data model plus business definitions on top of it:

- **Data objects**: data model objects (DMOs), data lake objects (DLOs), or calculated insights. Calculated insights from Chapter 4 can be reused here.
- **Relationships**: how objects join. The builder can offer suggested relationships, which you review rather than accept blindly.
- **Logical views**: combine and shape objects into a single view.
- **Calculated fields**: new dimensions or measures with logic that does not exist in the raw data. The builder includes a formula editor, and a "Draft with Einstein" option that can propose a formula from a plain-language prompt. Review any AI-drafted formula carefully, because it is a starting point, not an authority.
- **Metrics**: the governed KPIs from Lesson 31.
- **Parameters**: values users can change to alter a calculation.

The builder also offers a **Test Model** action and a YAML view of the model definition. Check current documentation for exactly what the YAML view supports.

## A modeling workflow

1. **Add data objects** that answer the business question, such as Account, Opportunity, and Lead.
2. **Define relationships** so measures roll up correctly across objects.
3. **Add calculated fields** for logic the raw data lacks, with clear names and descriptions.
4. **Define metrics** for the numbers the business steers by.
5. **Test the model** against numbers you already trust, such as a native report, before sharing it.

Because you already know SOQL and Salesforce reports, step 5 is where your earlier skills pay off: reconcile the model against a known-good source.

## Who consumes the model

- Tableau Next visualizations and dashboards
- Metrics and their automated insights
- Conversational, AI-assisted analytics, which rely on the business context in the model
- Tableau Desktop and Tableau Cloud, through the Tableau Semantics connector

That reach is the reason to invest here: one model, many consumers.

## How this differs from CRM Analytics

CRM Analytics, covered in Chapters 2 and 3, uses its own datasets, recipes, dashboards, and the SAQL query language. Semantic models are a separate, Data 360 and Tableau Next construct. Both are supported parts of the Salesforce analytics ecosystem, and which to use depends on your data location and audience, as discussed in Chapter 1. Check current guidance from Salesforce on how the two are expected to work together.

## Key terms

| Term | Meaning |
|---|---|
| Semantic Model Builder | The tool for creating semantic models in Tableau Next and Data 360 |
| Logical view | A combined, shaped view of data objects inside the model |
| Calculated field | A dimension or measure defined in the model |
| Test Model | A builder action for checking the model before use |

## Check yourself

You are building a model on Account, Opportunity, and a calculated insight. Which workflow step should catch a wrong join, and what would you check the model against?
