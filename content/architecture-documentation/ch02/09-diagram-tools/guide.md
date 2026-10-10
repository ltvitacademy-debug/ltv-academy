# Lesson 9 — Diagram Tools

**Chapter 2 · Communicating Architecture · Lesson 9 of 17**

## What you'll learn

- The real trade-off between GUI diagramming tools and text-based ("diagram-as-code") tools
- What Salesforce's native Schema Builder is good for and where it stops being enough (building on Lesson 2)
- How tools like Lucidchart, diagrams.net, and Visio compare for architecture documentation
- Why diagram-as-code tools (Mermaid, PlantUML) solve a specific problem GUI tools don't: version control

## Two families of tool

Diagramming tools split into two broad families, and the choice between them is a real trade-off, not just a matter of taste. **GUI diagramming tools** — Lucidchart, diagrams.net (formerly draw.io), Microsoft Visio — let an architect drag, drop, and connect shapes visually, which is fast for exploring a layout and produces polished, presentation-ready output. **Diagram-as-code tools** — Mermaid, PlantUML, and similar — define a diagram as plain text in a small declarative syntax, which a rendering engine then turns into the visual diagram. Neither family is strictly better; they solve different problems well.

## GUI tools: Lucidchart, diagrams.net, Visio

These tools share the core strength of visual, direct manipulation — an architect can quickly rearrange a cluttered diagram by dragging boxes around, which is genuinely hard to do efficiently in a text-based tool. They differ mainly in cost and ecosystem: Lucidchart is a popular commercial, cloud-based tool with strong real-time collaboration and widely used template libraries, including Salesforce-specific architecture shape libraries that some teams adopt. diagrams.net is free and open-source, usable standalone or embedded in tools like Confluence, and a common choice where licensing cost matters. Visio is Microsoft's long-established desktop/cloud diagramming tool, often already licensed in organizations running Microsoft 365, with deep integration into that ecosystem. All three export to common image formats (PNG, SVG) suitable for embedding in a Solution Design Document.

## Diagram-as-code: Mermaid and PlantUML

A diagram-as-code tool represents a diagram as text — for example, Mermaid's sequence-diagram syntax lets an architect write something like `A->>B: requestData` and `B-->>A: returnResult` and have it render into the lifelines, messages, and arrowheads Lesson 5 described, without ever dragging a shape by hand. This solves a problem GUI tools genuinely don't: **version control**. A diagram stored as a text file can live in the same Git repository as the rest of a Salesforce DX project, get reviewed in a pull request the same way code does, and show a clean line-by-line diff when it changes — exactly the kind of "what changed and why" history that Lesson 15's review-and-currency practices depend on. A diagram stored as a binary file in a GUI tool's proprietary format can't be diffed the same way; a reviewer sees "the image changed" with no way to see what changed within it.

The trade-off is real: diagram-as-code tools have less visual polish out of the box, a learning curve for the syntax, and less fine-grained control over exact visual layout than dragging shapes by hand. Teams that version their documentation alongside code — increasingly common for Salesforce DX-based projects — often accept that trade-off deliberately.

## Where Schema Builder and its extensions fit

Lesson 2 already covered Salesforce's native **Schema Builder**: it draws a live ERD-style view straight from org metadata and offers Auto-Layout to arrange it automatically, but it's built for live exploration of the current org, not for producing a durable, annotatable, exportable documentation artifact. Third-party tools exist specifically to bridge that gap — browser extensions that read the Schema Builder canvas and export it as Mermaid syntax, a CSV, or an image — letting an architect start from the org's real, current metadata rather than redrawing the whole data model by hand in a separate tool. Starting from a metadata-accurate export and then adding the annotation, legend, and version stamp a real documentation artifact needs (Lesson 8) is a reasonable middle path between "redraw everything from scratch" and "just screenshot Schema Builder and call it done."

## Choosing a tool for a given document

| Need | Reasonable choice |
|---|---|
| Fast, polished diagram for an executive summary (Lesson 11) | GUI tool (Lucidchart, diagrams.net, Visio) |
| Diagram that must version alongside a DX project's code in Git | Diagram-as-code (Mermaid, PlantUML) |
| Starting point for an ERD matching the org's real, current metadata | Schema Builder export, refined in whichever tool the team standardizes on |
| Large team needing shared templates and real-time co-editing | A cloud GUI tool with collaboration built in (e.g., Lucidchart) |

No single tool is the "correct" answer for every document in a Solution Design Document — what matters, per Lesson 8, is that whichever tool produces a given diagram, the result still follows the documentation set's agreed notation standard.

## Key terms

| Term | Meaning |
|---|---|
| GUI diagramming tool | A tool where diagrams are built by visually dragging and connecting shapes (Lucidchart, diagrams.net, Visio) |
| Diagram-as-code | A tool where a diagram is defined as plain text in a declarative syntax and rendered automatically (Mermaid, PlantUML) |
| Diffability | The ability to see exactly what changed between two versions of a diagram, which text-based diagrams support and binary GUI-tool files generally don't |

## Lab

Take the sequence diagram you drew by hand in Lesson 5's lab (Flow → Apex → Platform Event → tax API → subscribing trigger). Write the equivalent diagram using Mermaid's sequence-diagram text syntax (you don't need a renderer — writing the correct `participant`, `->>`, and `-->>` lines by hand is the point of the exercise). Then write two sentences: one on what was easier about the text syntax versus dragging shapes, and one on what was harder.

## Check yourself

Can you name the core trade-off between GUI diagramming tools and diagram-as-code tools? Can you explain what "diffability" means and why it matters for a documentation set that lives alongside code in Git? Can you explain why Schema Builder, even with a third-party export extension, still benefits from a documentation pass afterward rather than being used as the final artifact as-is?
