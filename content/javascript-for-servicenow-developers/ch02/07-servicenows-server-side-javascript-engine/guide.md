# Lesson 7 — ServiceNow's Server-Side JavaScript Engine

**Chapter 2 · JavaScript for Server-Side Scripting · Lesson 7 of 32**

## What you'll learn

- Why ServiceNow server-side scripts ran on Mozilla Rhino, an ES5-level JavaScript engine, for most of the platform's history
- What changed when ServiceNow migrated to a GraalVM-based engine running in Rhino-compatibility mode, around the Quebec release
- Why the platform's own API objects — GlideRecord, `gs`, and the rest — look exactly the same even though the underlying engine changed
- Why you'll still run into plenty of ES5-style code in real instances, even on a modern release
- Which modern JavaScript syntax is now actually safe to write in server-side scripts

## Why Rhino, and why it mattered

ServiceNow's platform runs on Java. For over a decade, every server-side script you wrote — Business Rules, Script Includes, Scheduled Jobs — executed inside Mozilla Rhino, a JavaScript engine written in Java and embedded directly in the platform. Rhino was a reasonable choice when ServiceNow adopted it, but it only ever implemented ECMAScript 5 (ES5), the JavaScript spec from 2009. No `let`, no `const`, no arrow functions, no template literals, no classes, no `for...of`. If an older Business Rule you're reading looks dated, that's Rhino's ES5 ceiling, not a stylistic choice someone made.

## The GraalVM migration

Around the Quebec release, ServiceNow swapped Rhino for GraalVM's JavaScript engine, GraalJS, configured to run in "Rhino-compatibility mode." GraalJS is a modern, actively maintained engine that supports ES6 and later. Running it in compatibility mode means two things at once: the engine itself understands modern syntax, but it's tuned to preserve Rhino's exact runtime quirks, so millions of lines of existing customer scripts across every instance keep running unchanged.

Practically, this means that on a current instance you can now write:

```javascript
// Valid on a modern (GraalVM-based) ServiceNow instance:
const incidentGR = new GlideRecord('incident');
incidentGR.addQuery('priority', 1);
incidentGR.query();

const openHighPriority = [];
while (incidentGR.next()) {
  openHighPriority.push(incidentGR.getUniqueValue());
}

gs.info(`Found ${openHighPriority.length} high priority incidents`);
```

Every line of ES6+ here — `const`, the template literal inside `gs.info()` — is now valid, where it would have thrown a syntax error under old Rhino.

## What changed, and what deliberately didn't

It's worth being precise about the boundary. The *syntax* of the language moved forward. The *API surface* — GlideRecord, GlideSystem (`gs`), GlideDateTime, GlideAjax, and every other Glide object — did not change at all. Those APIs were designed for Rhino's ES5 object model, and they still work exactly the same way, with exactly the same method names, on the new engine. GraalJS in compatibility mode doesn't redesign GlideRecord to be more "modern" — it just lets you call the same old GlideRecord methods using new language syntax if you choose to.

```javascript
// Old style (ES5) — still 100% valid today:
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
    gs.log('Incident: ' + gr.number);
}
```

```javascript
// New style (ES6+) — also valid today, same API:
const gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
    gs.log(`Incident: ${gr.number}`);
}
```

Both scripts above do exactly the same thing. Neither is "more correct." The second is just easier to read once you're used to template literals.

## Why you'll still see ES5 code everywhere

This matters for a real reason: most ServiceNow instances are years old, with Business Rules and Script Includes written long before the GraalVM migration. That code was written in ES5 because ES5 was the only option at the time, and it was never rewritten — if it works, nobody touches it. As a developer, you need to read ES5-style `var` and string concatenation fluently, even while you write new scripts with `let`, `const`, and template literals going forward. Don't assume an instance is "behind" just because its scripts look old; assume the scripts predate the engine change.

## Key terms

| Term | Meaning |
|---|---|
| Rhino | The original Java-based JavaScript engine ServiceNow used for server-side scripts; supports only ES5 syntax |
| GraalVM / GraalJS | The modern JavaScript engine ServiceNow migrated to, around the Quebec release |
| Rhino-compatibility mode | How GraalJS runs on ServiceNow: a modern engine that preserves Rhino's exact runtime behavior |
| ES5 | ECMAScript 5 (2009) — the syntax level Rhino supported: `var`, no arrow functions, no template literals |
| ES6+ | ECMAScript 2015 and later — `let`/`const`, arrow functions, template literals, classes; now valid server-side |

## Check yourself

A coworker says, "Our instance is on a recent release, so I can finally rewrite GlideRecord itself to use modern syntax." What's wrong with that statement — and what, specifically, did the GraalVM migration actually change versus leave untouched?
