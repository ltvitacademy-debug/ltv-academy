# Lesson 6 — Insecure Output Handling

**Chapter 1 · AI-Specific Security Risks · Lesson 6 of 25**

## What you'll learn

- The core mistake behind insecure output handling
- Four concrete ways it shows up in real applications
- Why "the model is usually right" is exactly the wrong mental model for security
- The defense pattern that closes most of these at once

## The core mistake

Every risk in this lesson comes from one assumption: that because a response came from "our AI," it's safe to treat as trusted, well-formed content. It isn't. A model's output is, from a security standpoint, exactly as untrusted as a user's input — because an attacker who can influence what goes into the model (through a crafted prompt, a jailbreak, or an indirect injection from Lesson 1) can influence what comes out. If your application acts on that output without validation, the attacker's influence passes straight through to whatever that output touches.

## Four concrete failure modes

**Rendering raw output as HTML (cross-site scripting).** If a chat UI takes the model's text and injects it directly into the page's HTML without escaping it, and an attacker can get the model to include a `<script>` tag or an event handler in its response, that script runs in the victim's browser with the victim's session.

**Executing generated code.** Some applications run model-generated code automatically — in a notebook-style tool, an "AI coding assistant" with auto-run enabled, or a function that evaluates a generated expression. If the model (via a jailbreak or injection) is steered into generating something harmful, and it runs unsandboxed, the application just executed attacker-influenced code with its own permissions.

**Server-side requests to model-generated URLs.** If a server fetches a URL that the model generated or extracted from a document — say, to retrieve an image or verify a link — and that URL can point anywhere, including internal infrastructure, this becomes a server-side request forgery (SSRF) path into your own internal network.

**Passing output to a shell or database query.** If generated text is interpolated directly into a shell command or a SQL query instead of being treated as a parameter, it inherits the exact same injection risk any unsanitized user input would carry.

## Why "the model is usually right" is the wrong frame

It's tempting to reason, "the model is well-behaved 99.9% of the time, so this is a low-probability edge case." That's the wrong frame for a security control. Security isn't about the common case — it's about what a motivated attacker can make happen in the uncommon case, on purpose, repeatedly, until it works once. A control that only needs to fail once to cause real damage has to be evaluated against the worst case the model can be pushed into, not the average case.

## The defense pattern

Nearly every failure mode above closes with the same underlying move: **treat model output exactly like you'd treat input from an anonymous user**, and apply the same controls you already know how to apply:

- **Escape or sanitize before rendering** — never inject raw model text into HTML without the same escaping you'd apply to any user-submitted content.
- **Sandbox any code execution**, with no access to secrets, the filesystem, or the network, and a hard resource limit.
- **Allowlist destinations for any server-side fetch**, rather than trusting a model-generated URL to be safe.
- **Always use parameterized queries and commands** — never string-interpolate model output into SQL or a shell call.

## Key terms

| Term | Meaning |
|---|---|
| Insecure output handling | Trusting and acting on model output without validating it like any other untrusted input |
| SSRF (server-side request forgery) | Tricking a server into making a request to an unintended, often internal, destination |
| Sandboxing | Running code in an isolated environment with no access to real secrets or systems |

## Lab

Think of one AI-powered feature you've used that displays generated content (a summary, a code snippet, a generated image caption). Write one sentence for each: what would happen if that output contained an HTML tag? What would happen if it contained a URL? You're reasoning through the failure mode, not testing it live.

## Check yourself

Can you explain, in your own words, why treating model output with the same suspicion as user input closes most of the specific failure modes in this lesson, rather than needing a separate fix for each one?
