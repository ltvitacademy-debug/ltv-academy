# AI-Assisted Analysis in Tableau Next

Tableau Next is described by Tableau as an agentic analytics platform, and Agentforce is part of its design rather than an add-on. This lesson explains what the AI assistance does, how you invoke it, and how to use it without giving up your judgment. Names and packaging in this area are moving quickly: current Tableau and Trailhead material variously refers to the analytics skills Data Pro, Concierge, and Inspector, and to "Tableau Agent" as the overall assistant, and some capabilities are labeled beta. Check current release notes before promising anything to a stakeholder, and expect an administrator to have to enable the features first.

## What you'll learn

- The three analytics skills and the job each one does
- What the assistant panel looks like and how you ask questions
- Why the quality of a semantic model shapes the quality of AI answers
- A habit for verifying AI output before you share it

## The three skills

As of this writing, Tableau's help describes three Agentforce analytics skills in Tableau Next:

- **Data Pro** helps analysts and data stewards build semantic models faster, by suggesting relationships between data objects and generating calculated fields. It supports the work from Lesson 26 rather than replacing your judgment about it.
- **Concierge** answers business questions in natural language and returns interactive visualizations, aimed at people consuming analysis rather than building it. Salesforce marketing material also mentions root causes and suggested next steps.
- **Inspector** monitors metrics and alerts people when something changes, such as a threshold being crossed or an unusual trend. Trailhead labeled the proactive alerts capability beta at the time of writing.

## What it looks like

Salesforce's documentation shows an assistant panel opening beside a metric page. It introduces itself as an AI agent for analytics, and offers starter prompts such as asking for the top insight, how the metric has trended, and what drove the recent change. Trailhead says you look for the Agentforce icon at the top right of a dashboard or metric detail page. You type a question in your own words, and the answer comes back with a visualization and an explanation.

## Why the semantic model matters

An AI assistant can only work with what the model tells it. If fields are named cryptically, relationships are wrong, or two definitions of "revenue" exist, an assistant will confidently use whatever it finds. This is why Chapter 6 matters so much: clear names, well-defined metrics, and correct relationships improve both human and AI analysis. Think of the semantic model as the context you are giving the AI.

## Using it well

- **Be specific.** Ask for open pipeline by stage for this quarter, not "how are sales?"
- **Check the definition.** When you see a number, look at which measure and filters produced it.
- **Cross-check one figure.** Reproduce a headline number from a report or a SOQL query you trust before you present it.
- **Treat it as a starting point.** The assistant proposes views and explanations. You decide what is true and what is worth acting on.
- **Mind permissions.** Answers should respect the data access rules in Data 360, but confirm this with your admin.

## Recap

Agentforce brings analytics skills into Tableau Next for modeling, question answering, and monitoring. They accelerate work, but they inherit the quality of your semantic model and they do not replace verification. Names and availability change often, so check current documentation.
