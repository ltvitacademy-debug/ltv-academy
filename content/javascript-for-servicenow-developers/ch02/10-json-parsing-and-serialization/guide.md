# Lesson 10 — JSON Parsing & Serialization

**Chapter 2 · JavaScript for Server-Side Scripting · Lesson 10 of 32**

## What you'll learn

- What JSON actually is, and why it's the universal format for moving structured data between systems
- How `JSON.parse()` turns a JSON string into a real, usable JavaScript object
- How `JSON.stringify()` turns a JavaScript object back into a JSON string
- A realistic server-side use case: reading the body of an inbound REST request
- A preview of the other direction: serializing data to return from a Scripted REST API

## What JSON is, and why it shows up constantly

JSON (JavaScript Object Notation) is a plain-text format for representing structured data — objects, arrays, strings, numbers, booleans, and null — using syntax that looks almost exactly like a JavaScript object literal, but with some stricter rules (keys must be double-quoted, no trailing commas, no functions). Because it's plain text, JSON travels easily over HTTP: it's the de facto standard body format for REST APIs, and ServiceNow's inbound and outbound integrations both speak it constantly.

```javascript
// This is a JSON string — plain text, not a real object yet:
var jsonText = '{"caller":"abel.tuter","priority":1,"short_description":"VPN down"}';
```

Even though that looks like an object, `jsonText` is just a string. You can't do `jsonText.priority` and get `1` — you first have to parse it.

## JSON.parse(): string to object

`JSON.parse()` takes a JSON-formatted string and converts it into a real, usable JavaScript object with actual properties you can read and work with.

```javascript
var jsonText = '{"caller":"abel.tuter","priority":1,"short_description":"VPN down"}';
var requestData = JSON.parse(jsonText);

gs.log(requestData.caller);            // "abel.tuter"
gs.log(requestData.priority);          // 1
gs.log(typeof requestData);            // "object"
```

A very real server-side use case: a Scripted REST API resource receives the body of an inbound POST request as a raw string. Before the script can do anything useful with the caller, priority, or description the external system sent, it has to call `JSON.parse()` on that body to get a working object.

```javascript
// Inside a Scripted REST API resource script:
var requestBody = request.body.dataString; // the raw text of the request body
var payload = JSON.parse(requestBody);

var gr = new GlideRecord('incident');
gr.initialize();
gr.setValue('caller_id', payload.caller);
gr.setValue('priority', payload.priority);
gr.setValue('short_description', payload.short_description);
gr.insert();
```

## JSON.stringify(): object to string

`JSON.stringify()` does the reverse: it takes a real JavaScript object and converts it into a JSON-formatted string, which is exactly what you need when sending data out — to a log, to a response body, to another system.

```javascript
var result = {
    incidentNumber: 'INC0010042',
    status: 'created',
    priority: 1
};

var jsonOut = JSON.stringify(result);
gs.log(jsonOut);
// {"incidentNumber":"INC0010042","status":"created","priority":1}
```

This is the exact mechanism a Scripted REST API uses to send a response back to whatever called it: build a plain object describing the result, `JSON.stringify()` it (or hand the object to the response API, which stringifies it for you), and the caller receives well-formed JSON it can parse on its own end. You'll build full Scripted REST APIs in course 7, IntegrationHub & REST APIs — this is the exact tool you'll be using there.

## Round-tripping data safely

`JSON.parse()` and `JSON.stringify()` are inverses of each other: stringify an object, and parsing that string back gives you an equivalent object. This matters anywhere you need to pass structured data through something that only accepts plain text — a GlideAjax parameter, a scratchpad value, a log entry, an API body.

```javascript
var original = { a: 1, b: [1, 2, 3] };
var roundTripped = JSON.parse(JSON.stringify(original));
gs.log(JSON.stringify(roundTripped) === JSON.stringify(original)); // true
```

## Key terms

| Term | Meaning |
|---|---|
| JSON | A plain-text format for structured data, using JavaScript-object-like syntax with stricter rules |
| `JSON.parse(string)` | Converts a JSON-formatted string into a real JavaScript object |
| `JSON.stringify(object)` | Converts a JavaScript object into a JSON-formatted string |
| Scripted REST API | A ServiceNow feature (covered in depth in course 7) that receives and returns JSON over HTTP |
| Round-trip | Converting data to a string and back without losing or changing its structure |

## Check yourself

An inbound Scripted REST API resource receives a request body as a raw string. Before the script can reference `payload.priority`, what has to happen first, and which built-in method makes that possible?
