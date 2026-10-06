# Lesson 21 — Popular AI Libraries, Overview · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

This lesson is a map, not a deep dive — a tour of the Python libraries
you'll run into constantly while building AI applications, grouped by
what job each one does. You don't need to memorize all of them, just
recognize the category the next time you see a new one.

## S2 · STEPS: Four categories

Four categories cover almost everything. Provider SDKs wrap one AI
provider's API in Python objects. HTTP libraries make the actual network
requests underneath. Orchestration frameworks chain multiple AI calls and
tools together. And data and ML libraries handle the numbers and
structured data most AI applications eventually touch.

## S3 · CODE: Provider SDKs and HTTP

openai and anthropic are official client libraries — exactly the
client-response-error pattern from Lesson 16. Underneath both of them,
something is making real network requests, and that's requests — the
standard HTTP library, and the entire focus of Chapter 5, because
understanding raw HTTP is what makes every SDK predictable rather than
magic.

## S4 · CODE: Orchestration and data libraries

Once you're chaining retrieval, a model call, and tool use together,
frameworks like LangChain give you reusable pieces instead of one
unwieldy script. And numpy, pandas, scikit-learn, and torch show up
constantly even in API-driven AI work, any time structured data or
classic machine learning enters the picture.

## S5 · CODE: Inspecting what you have

pip show prints any installed package's version, summary, and where it
came from — the fastest way to check exactly what you have installed
when you're not sure.

## S6 · OUTRO CARD

Provider SDKs, HTTP, orchestration, data and ML — four categories, and
now you can place almost any AI-adjacent library you run into. Next
chapter, we put requests to work for real: working with APIs in Python.
