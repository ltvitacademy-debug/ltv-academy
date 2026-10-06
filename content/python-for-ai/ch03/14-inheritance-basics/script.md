# Lesson 14 — Inheritance, Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

AI SDKs lean heavily on inheritance — a base exception class with specific
errors beneath it, a base client with specialized clients built on top.
This lesson covers how that actually works in Python.

## S2 · STEPS: What a subclass gets for free

Write class Child in parentheses Parent, and four things follow. The
subclass inherits every attribute. It inherits every method. It can
override any method by redefining it. And super lets it call the parent's
original version when it wants to add to it rather than replace it.

## S3 · CODE: A base class and a subclass

APIClient defines send as a placeholder that just raises an error — a
signal that subclasses are expected to fill it in. EchoClient inherits
init automatically without redefining it, and overrides send with a real
implementation. Calling EchoClient's init still sets api_key, purely
through inheritance.

## S4 · CODE: Extending with super

LoggingClient wants to add a log_prefix on top of what APIClient already
does. Instead of repeating the api_key line, it calls super dot init,
which runs APIClient's original init for it. Then it adds its own
attribute. This is the standard pattern for extending, not just replacing,
a parent's setup.

## S5 · CODE: Which version actually runs

Build a LoggingClient and call send — its own overridden version runs,
printing the debug prefix first. Python always checks the object's own
class before falling back to the parent, which is exactly how overriding
works.

## S6 · OUTRO CARD

Subclass, override, super to extend instead of replace — that's
inheritance in a nutshell. Next lesson: dataclasses, a shortcut for
classes that are mostly just structured data.
