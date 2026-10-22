# Lesson 9 — String & Date Handling

**Chapter 2 · JavaScript for Server-Side Scripting · Lesson 9 of 32**

## What you'll learn

- The native JavaScript string methods you'll use constantly in server-side scripts: `.substring()`, `.split()`, `.trim()`, `.indexOf()`, `.replace()`
- Template literals as a cleaner alternative to string concatenation
- Why ServiceNow provides its own `GlideDateTime` object instead of relying on native JavaScript `Date`
- The real `GlideDateTime` methods: constructing one, reading a display value, adding days, and comparing two dates
- When to reach for `GlideDateTime` versus when plain string methods are enough

## Native string methods you already know, used on real field values

Field values coming off a GlideRecord are plain JavaScript strings, so every native string method works on them exactly like it would anywhere else in JavaScript.

```javascript
var gr = new GlideRecord('incident');
gr.get('number', 'INC0010001');

var shortDesc = gr.getValue('short_description').trim();
var firstWord = shortDesc.split(' ')[0];
var hasVpn = shortDesc.toLowerCase().indexOf('vpn') !== -1;
var redacted = shortDesc.replace('password', '********');
var prefix = gr.getValue('number').substring(0, 3); // "INC"
```

`.trim()` strips stray leading/trailing whitespace a user typed into a field. `.split(' ')` breaks a string into an array on a delimiter. `.indexOf()` returns a position, or `-1` if the substring isn't found — that `-1` check is the standard way to test "does this string contain that text." `.replace()` swaps one substring for another. `.substring(start, end)` pulls out a slice by position.

Template literals (backtick strings) are the cleaner, modern alternative to concatenating strings with `+`:

```javascript
// String concatenation (works, but gets hard to read):
gs.log('Incident ' + gr.number + ' has priority ' + gr.priority);

// Template literal (same output, easier to read):
gs.log(`Incident ${gr.number} has priority ${gr.priority}`);
```

## Why dates need a different object entirely

Native JavaScript `Date` objects are tied to whatever time zone the *JavaScript engine itself* is running in. On a ServiceNow server, that's not necessarily the time zone of the instance, and it's definitely not the time zone each individual user has configured in their profile. If you use native `Date` math on a date field, you can produce a timestamp that's correct in the server's time zone but wrong for the user looking at it — a classic, real source of "this date is off by several hours" bugs.

`GlideDateTime` exists specifically to solve that. It's ServiceNow's own date/time object, and it's aware of both the instance's configured time zone and, when relevant, the time zone on the current user's profile, so date math done through it comes out correct for whoever is actually going to read the result.

```javascript
var start = new GlideDateTime(); // "now," in the right time zone
gs.log(start.getDisplayValue()); // formatted for display, e.g. "2026-10-22 09:15:00"

var due = new GlideDateTime();
due.addDaysUTC(5); // move 5 days forward, computed in UTC internally

if (due.after(start)) {
    gs.log('Due date is after the start date');
}
```

`new GlideDateTime()` with no argument gives "now." `.getDisplayValue()` returns a formatted string suitable for showing to a user. `.addDaysUTC(n)` advances the GlideDateTime by `n` days (doing the underlying math in UTC so it's unambiguous, while display still respects the configured time zone). `.before()` and `.after()` compare two GlideDateTime objects and return a boolean.

## Picking the right tool

Use native string methods for anything that's genuinely just text: descriptions, comments, names, URLs. Use `GlideDateTime` for anything that's genuinely a date or time tied to a record — due dates, SLA calculations, "was this created in the last 24 hours." The moment date math touches a real record's date/time field, native `Date` is the wrong tool, because it has no idea what time zone that date is supposed to be interpreted in from the user's perspective.

## Key terms

| Term | Meaning |
|---|---|
| `.substring(start, end)` | Returns the part of a string between two positions |
| Template literal | A backtick-delimited string that allows `${expression}` interpolation instead of `+` concatenation |
| `GlideDateTime` | ServiceNow's own date/time object, aware of the instance's and user's configured time zones |
| `.addDaysUTC(n)` | Advances a `GlideDateTime` by `n` days, computed in UTC |
| `.getDisplayValue()` | Returns a `GlideDateTime` formatted as a string for display |

## Check yourself

A scheduled job computes "5 days from now" using native JavaScript `Date` math and logs the wrong date for users in a different time zone than the server. What's the actual cause of that bug, and which object should the script have used instead?
