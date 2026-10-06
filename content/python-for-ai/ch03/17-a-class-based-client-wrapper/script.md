# Lesson 17 — A Class-Based Client Wrapper · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Time to close out this chapter by building something of your own. We'll
combine everything so far — init and self, a dataclass response, and
history tracking — into one small client wrapper, the same shape Chapter
5 will plug a real network call into.

## S2 · STEPS: Three jobs, one wrapper

A client wrapper has three jobs. Hold credentials and config once, in
init. Do the actual work in a method. And remember what happened so far,
in an instance attribute. Let's build exactly that.

## S3 · CODE: The wrapper class

AIClientWrapper stores api_key, base_url, and an empty history list in
init — per-instance state, independent for every wrapper you build. The
ask method appends each prompt to history, then returns a dataclass
AIResponse instead of a raw string. That mocked reply line is exactly
where Chapter 5 plugs in a real request.

## S4 · CODE: Using the wrapper

Construct one client, call ask twice, and r1 dot text gives you the
structured response. len of client dot history is now 2 — the wrapper
remembers every prompt sent through it, something a plain function
couldn't do without a global variable.

## S5 · CODE: Why the mock swaps out cleanly

The public shape never changes: construct with api_key, call ask, get
back an AIResponse. Chapter 5 only touches the one mocked line inside ask
— swapping it for a real requests dot post call — while every line of
code that uses this client stays exactly the same.

## S6 · OUTRO CARD

Credentials in init, behavior in a method, memory in an instance
attribute — that's a real client wrapper, and you just built one. Next
chapter: virtual environments and package management, so you can actually
install requests and make this call for real.
