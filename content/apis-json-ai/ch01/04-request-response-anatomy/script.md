# Lesson 4 — Request/Response Anatomy · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every request has four parts: method, URL, headers, body. Every response
has three: status line, headers, body. Today we open both up and look at
exactly where each piece lives — in a real request, built in a real
tool.

## S2 · SCREENSHOT (echo-request — query params)

This is a real request, built in Postman — a tool used to construct and
test API calls by hand. See the query parameters table: spacecraft and
type, as separate key-value pairs. Those get appended to the URL after a
question mark — that's exactly where query parameters live.

## S3 · SCREENSHOT (request-builder — tabs and response status)

Here's a request with more going on: headers, cookies, test results —
all tabs on the same request and response. Down here, the response
status: 200 OK, 100 milliseconds, just over a kilobyte. That status line
is the very first thing a response tells you.

## S4 · SCREENSHOT (send-first-request — full body)

And here's the full picture: a GET request to postman-echo-dot-com
slash get, and its complete JSON response body — headers the server saw,
the URL it hit, all wrapped in that response's body. Everything this
lesson has described, in one real screen.

## S5 · CODE CARD (raw anatomy, labeled)

Strip away the tool's UI, and this is what's actually traveling over the
wire — a request line with the method and URL, headers, a blank line,
then an optional body. The response mirrors it: a status line instead of
a request line, then headers, then its own body.

## S6 · OUTRO CARD

Method, URL, headers, body on the way out — status line, headers, body
on the way back. Next lesson, we put this anatomy to work reading actual
API documentation.
