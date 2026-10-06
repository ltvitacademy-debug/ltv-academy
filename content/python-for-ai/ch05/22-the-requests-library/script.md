# Lesson 22 — The requests Library · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every AI API call — whether you write it by hand or a provider SDK does
it for you — boils down to an HTTP request and a response. This lesson
introduces requests, the library this entire chapter is built around.

## S2 · CODE: Your first request

pip install requests gets you the library. requests dot get sends a GET
request to a URL and hands you back a Response object — not raw text, not
a dictionary, an actual object with its own attributes and methods for
everything you'd want to know about what came back.

## S3 · CODE: The Response object's core pieces

status_code is a plain integer — the HTTP status code. text is the entire
response body as a string. headers gives you a dictionary of the
response's own headers, like content type. These three attributes cover
most of what you'll read off a response.

## S4 · CODE: Parsing JSON automatically

Rather than parsing text yourself, call dot json, and requests hands you
back a real Python dictionary or list directly. This is the method you'll
use constantly for the rest of this chapter — nearly every AI API returns
JSON.

## S5 · STEPS: Why requests exists

Python ships its own built-in way to make HTTP requests, but it's verbose
and awkward for anything beyond the simplest case. requests wraps that
complexity behind a small, readable API, which is exactly why it became
the standard every AI SDK is itself built on top of.

## S6 · OUTRO CARD

Install it, call get, read status_code and json — that's the foundation
for this entire chapter. Next lesson: query parameters, POST requests,
and sending your own JSON body.
