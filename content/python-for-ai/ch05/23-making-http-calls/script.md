# Lesson 23 — Making HTTP Calls · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A bare GET request only gets you so far. Real API calls — including every
AI API call — almost always need query parameters, custom headers, or a
JSON body you're sending. This lesson covers all three.

## S2 · CODE: Query parameters

Instead of hand-building a URL with question marks and ampersands, pass a
dictionary to params, and requests builds the query string for you —
correctly encoding special characters along the way. Print response dot
url afterward to see exactly what got sent.

## S3 · CODE: POST with a JSON body

Most AI APIs expect you to POST data — a prompt, a set of messages — as
JSON. Pass a Python dict to the json parameter, and requests serializes
it and sets the right content-type header automatically. params builds a
query string; json builds the request body — two different places data
travels.

## S4 · CODE: Headers and timeout

Headers carry metadata about the request, most often authentication. Pass
a dictionary to the headers parameter. And always pass a timeout — without
one, a request that never gets a response can hang your program
indefinitely. Ten seconds is a common, safe default.

## S5 · STEPS: Three parameters, three jobs

Three parameters, three different jobs. params shapes the URL's query
string. json shapes the request body. headers carries metadata like
authentication. Mixing those up is one of the most common beginner bugs
when calling an API.

## S6 · OUTRO CARD

Query parameters, a JSON body, headers, and a timeout — that's a complete,
real HTTP call. Next lesson: reading what comes back, including when
something goes wrong.
