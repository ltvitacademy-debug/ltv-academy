# Lesson 18 — Why Client Scripts Need a Bridge to the Server

**Chapter 4 · GlideAjax & Client-Server Communication · Lesson 18 of 32**

## What you'll learn

- Where a Client Script actually runs, and what that location does and doesn't give it access to
- Why the browser is never trusted to run a direct database query
- What GlideAjax is, in one sentence, and the four-step round trip it performs
- Why this round trip is asynchronous, and what that will matter for later in this chapter

## Client Scripts run in the browser, not on the server

Chapter 3 lived entirely in server-side JavaScript: Business Rules and Script Includes that run
inside ServiceNow's Rhino/GraalVM engine, with full `GlideRecord` access to the database. A Client
Script is a different animal. It is downloaded to, and executed by, the user's **browser** — the
same JavaScript engine that runs any web page. That's why a Client Script can reach `g_form` (the
form the user is looking at) and `g_user` (the logged-in user's session info): those are
client-side APIs, built for exactly this environment.

What a Client Script cannot do is run a `GlideRecord` query directly. `GlideRecord` is a
server-side class — it doesn't exist in the browser's JavaScript at all. If you try to reference
it in a Client Script, you get an error, not a result.

## Why the browser can't be handed direct database access

This isn't an arbitrary restriction — it's a security boundary. The browser is code running on a
machine ServiceNow doesn't control, in a session a user could inspect, modify, or script against
with their browser's own developer tools. If a Client Script could issue arbitrary database
queries directly, any user with access to the browser's console could rewrite that query to read
or write records far outside what their role should allow. The server is the only place database
access can be checked against ACLs (Access Control Lists) and trusted business logic on every
single call. So the platform draws a hard line: the browser can ask, but only the server can
touch the database.

## GlideAjax: the bridge

GlideAjax is ServiceNow's standard mechanism for crossing that line safely. It lets a Client
Script call one specific, pre-approved method on the server and get a result back — without a
full page reload, and without ever giving the browser direct database access.

The round trip, step by step:

```
1. Client Script          var ga = new GlideAjax('MyScriptInclude');
   (runs in browser)      ga.addParam('sysparm_name', 'myMethod');
                          ga.addParam('sysparm_param1', someValue);

2. GlideAjax call         The browser sends an asynchronous request to the
                          server, naming the Script Include and method.

3. Script Include         The named method runs on the server, with full
   (runs on server)       GlideRecord access, and builds a result string.

4. Callback                Once the server responds, a callback function in
   (runs in browser)      the Client Script receives that result and acts on it.
```

Only step 3 ever touches the database. Steps 1, 2, and 4 are the browser asking a question and
reading an answer — never querying anything directly itself.

## Why this round trip is asynchronous

Step 2 doesn't block the browser while it waits for the server. The Client Script keeps running
past the `GlideAjax` call immediately; the result only becomes available later, inside the
callback function from step 4, whenever the server actually responds. This matters because it's
easy to assume the answer is ready on the very next line of code — it isn't. Chapter 5's lesson on
Asynchronous Client Scripts picks this exact behavior up in depth, including the mistakes it
causes when a script assumes the callback has already run.

## Key terms

| Term | Meaning |
|---|---|
| Client Script | JavaScript that runs in the user's browser, with access to `g_form`/`g_user` but not `GlideRecord` |
| GlideAjax | ServiceNow's standard client-to-server bridge: calls one server-side method and returns its result |
| Script Include | A reusable server-side JavaScript class; the method GlideAjax actually calls lives here |
| Asynchronous | The callback runs later, when the server responds — not on the next line after the call |
| ACL (Access Control List) | Server-side rule the platform checks before any database read or write is allowed |

## Check yourself

Without looking back: why can't a Client Script just call `GlideRecord` directly to read a
record, and what two things happen on the server, but never in the browser, during a GlideAjax
round trip?
