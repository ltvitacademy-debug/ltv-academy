# Lesson 18 — Knowledge Bases & Articles

**Chapter 5 · Implementing Knowledge Management · Lesson 18 of 32**

## What you'll learn

- The two real tables behind Knowledge Management: `kb_knowledge_base` (the container) and
  `kb_knowledge` (each individual article)
- Why a company implements more than one Knowledge Base, segmented by audience, instead of one
  giant pile of articles
- The real fields on a `kb_knowledge` record: Short description, Text, Workflow state, Knowledge
  Base, and Category
- How Knowledge Base-level permissions set the default audience, and how article-level overrides
  narrow that default for one specific article

## Two tables, two different jobs

ITSM Foundations covered Knowledge Management as an ITIL practice: capture what people already
know, so the next person doesn't have to re-solve the same problem. Implementing it means two real
tables. `kb_knowledge_base` is the container — think of it as the book itself: a Self-Service
Knowledge Base, an IT Staff Knowledge Base, an HR Knowledge Base. `kb_knowledge` is each individual
article — a page inside one specific book. Every `kb_knowledge` record carries a Knowledge Base
reference field pointing at exactly one `kb_knowledge_base`, so an article always belongs to one
book, never floats unassigned.

## Why a company implements more than one Knowledge Base

A default, single-Knowledge-Base instance works fine until content has to serve two very different
audiences. A password-reset article belongs in front of every end user. A runbook describing how
to restart a production integration, with internal hostnames and escalation contacts, does not.
Implementing two Knowledge Bases — a public-facing **Self-Service** KB and an internal **IT
Staff** KB — is the real mechanism for that split. It is a decision made at the container level,
not article by article: who can even browse this book in the first place, before any individual
page's own permissions come into play.

## The real fields on an article

A `kb_knowledge` record carries: **Short description** (the title shown in search results and
article lists), **Text** (the actual article body, rich text), **Workflow state** (Draft, Review,
Published, or Retired — covered in depth across the next two lessons), **Knowledge Base** (the
container it belongs to), and **Category** (a taxonomy field used to group related articles inside
one Knowledge Base, like folders inside the book).

## Layering Knowledge Base permissions with article-level overrides

Each `kb_knowledge_base` record carries default **Can Read** and **Can Contribute** user criteria —
who may browse that book, and who may author or edit pages in it, as a baseline that applies to
every article inside. Most articles never need anything more specific than that default. An
individual `kb_knowledge` record can still carry its own narrower permission override when one
article genuinely needs a tighter audience than the rest of its Knowledge Base — a security
incident postmortem living inside the otherwise broadly readable IT Staff KB, for instance. Setting
the default once at the Knowledge Base, and reserving overrides for the exception, is what keeps
permissions manageable as the article count grows into the hundreds.

## Key terms

| Term | Meaning |
|---|---|
| `kb_knowledge_base` | The container record — one Knowledge Base, e.g. Self-Service or IT Staff |
| `kb_knowledge` | One individual article record, always referencing exactly one Knowledge Base |
| Workflow state | The article's lifecycle field: Draft, Review, Published, or Retired |
| Category | A taxonomy field grouping related articles inside one Knowledge Base |
| Can Read / Can Contribute | The Knowledge Base-level permission baseline, overridable per article |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what real-world reason would
lead a company to implement a separate Self-Service Knowledge Base and IT Staff Knowledge Base,
rather than one Knowledge Base with article-level permissions doing all the work?
