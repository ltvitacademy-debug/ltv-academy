# Lesson 6 — Insecure Output Handling · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Every risk in this lesson comes from one assumption: that because it came from "our AI," a response is safe to treat as trusted. It isn't.

## S2 · STEPS — The core mistake

A model's output is exactly as untrusted as a user's input, because an attacker who can influence what goes in — through a crafted prompt, a jailbreak, or an injection — can influence what comes out. If your application acts on that output without validation, the attacker's influence passes straight through.

## S3 · CODE — What it looks like

Rendering raw model text directly into a page's HTML, running model-generated code automatically, or interpolating generated text straight into a shell command or SQL query all skip the validation step any other untrusted input would get.

## S4 · STEPS — Four failure modes

Raw HTML rendering opens cross-site scripting. Auto-executing generated code runs attacker-influenced logic with the app's own permissions. A server fetching a model-generated URL can become a path into internal infrastructure. Interpolating output into a shell or SQL query inherits ordinary injection risk.

## S5 · STEPS — The defense pattern

Treat model output exactly like input from an anonymous user. Escape or sanitize before rendering. Sandbox any code execution with no access to secrets. Allowlist destinations before any server-side fetch. Always use parameterized queries and commands, never string interpolation.

## S6 · OUTRO

That closes Chapter One's risk categories. Chapter Two shifts from defending against failures to measuring them — starting with how to build an eval dataset that actually tests what matters.
