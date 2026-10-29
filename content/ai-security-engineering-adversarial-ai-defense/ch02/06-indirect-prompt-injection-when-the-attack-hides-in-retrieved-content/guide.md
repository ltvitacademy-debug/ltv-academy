# Lesson 6 — Indirect Prompt Injection: When the Attack Hides in Retrieved Content

**Chapter 2 · Prompt Injection Attacks and Defenses · Lesson 2 of 4**

## What you'll learn

- What indirect prompt injection is, and how it differs from the
  direct case you just covered in Lesson 5
- Why the end user can be completely innocent — and completely
  unaware — while the system they're using is still compromised
- The real ingestion paths this travels through: RAG pipelines,
  browsing agents, email- and document-processing assistants
- Why indirect injection is specifically harder to catch than direct
  injection, and what that implies for where your defenses have to
  live

## The same vulnerability, a different delivery route

Lesson 5 covered direct prompt injection: the attacker is the end
user, and the malicious text arrives through the chat box they're
typing into. Indirect prompt injection is the same underlying
weakness — an LLM that can't structurally distinguish instructions
from data — exploited through a completely different route. The
malicious instructions are planted in content the model will later
*retrieve and process on someone else's behalf*: a web page, a PDF,
an email, a calendar invite, a product review, a comment embedded in
a code repository. The end user never types anything suspicious.
They just ask a normal question, and the system fetches content that
was already waiting there, built to be read as a command.

OWASP's LLM01 category explicitly covers this as a subtype of prompt
injection, and for good reason: it's arguably the more dangerous of
the two, precisely because it breaks the assumption that "we're only
at risk from what our own users type."

## Where this actually travels

Think through the real ingestion paths an LLM application uses.
A retrieval-augmented generation (RAG) system pulls relevant chunks
out of a document store and hands them to the model as context before
it answers. A browsing agent fetches a live web page and summarizes
it. An email-triage assistant reads an inbox and drafts replies or
takes action on the user's behalf. A coding assistant reads comments
and README files inside a repository. In every one of these cases,
content that a human never personally vetted flows straight into the
model's context window, carrying the exact same authority, as far as
the model is concerned, as the developer's own instructions.

If an attacker can get text into *any* of those sources — a public
web page the agent is likely to visit, a document uploaded into a
shared knowledge base, an email sent to an inbox the assistant
monitors — they've found a delivery channel that doesn't require
tricking a single person. It only requires the automated pipeline to
do what it was built to do: fetch and read.

## Why it's harder to catch

Direct injection shows up in the one place every application already
logs and reviews: the user's turn. Indirect injection doesn't. It
rides in through a retrieval step that most teams built to move data,
not to be treated as an untrusted input channel in its own right. A
content filter tuned to watch user messages never sees the paragraph
sitting inside a PDF the RAG pipeline just indexed. And because the
injected text can sit dormant in a shared document store, it can
compromise an unrelated query from a completely different user, days
or weeks after it was planted — a kind of stored, multi-hop exposure
that direct injection doesn't have.

## What this should change about how you look at logs

The practical implication for recognition work: when you're
investigating an LLM application's behavior, don't stop at "what did
the user type." Ask what the model *retrieved* right before it acted
unexpectedly. An agent that takes an action with no clear link back
to the user's actual request, immediately after a browsing step or a
document lookup, is a strong signal worth tracing to its source
content — not just to the conversation turn that triggered it.
Lesson 7 picks up from here: why the obvious fix, filtering that
retrieved content for bad words, doesn't actually solve this.

## Key terms

| Term | Meaning |
|---|---|
| Indirect prompt injection | Malicious instructions planted in content an LLM retrieves and processes, rather than typed by the end user |
| RAG (retrieval-augmented generation) | A pipeline that fetches relevant document content and feeds it into the model's context before it answers |
| Trust boundary confusion | The model treats retrieved content with the same authority as developer instructions, because nothing marks the difference |
| Stored / multi-hop exposure | Injected content sitting dormant in a shared store that can compromise a later, unrelated query |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does a content filter built to watch user chat messages fail to
catch an indirect injection attack, even if that same filter would
have caught the identical text if a user had typed it directly?
