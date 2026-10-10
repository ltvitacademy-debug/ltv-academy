# Lesson 42 — Working With JSON in Apex

**Chapter 6 · Apex Beyond the Basics · Lesson 42 of 43**

## What you'll learn

- Serializing an Apex object or collection to JSON with `JSON.serialize()` and `JSON.serializePretty()`
- Deserializing JSON into a specific Apex type with `JSON.deserialize()` and `Type.class`
- Deserializing JSON of unknown shape with `JSON.deserializeUntyped()`, and navigating the resulting Map/List structure
- Why `deserializeUntyped` numeric values always come back as `Decimal`
- A realistic use case: parsing a JSON response from an external system after an HTTP callout

## Serializing Apex to JSON

`JSON.serialize()` converts any Apex object — a wrapper class instance, a `List`, a `Map` — into a JSON string. `JSON.serializePretty()` does the same thing with indentation, useful when you actually need to read the output (in a debug log, say) rather than send it over the wire:

```apex
OpportunitySummary summary = new OpportunitySummary();
summary.opportunityName = 'Acme Renewal';
summary.amount = 50000;

String compact = JSON.serialize(summary);
System.debug(compact); // {"opportunityName":"Acme Renewal","amount":50000}

System.debug(JSON.serializePretty(summary)); // same data, indented for reading
```

## Deserializing into a known Apex type

When you know (or control) the shape of the incoming JSON, `JSON.deserialize()` with a `Type.class` literal parses it directly into an instance of your own class:

```apex
String json = '{"opportunityName":"Acme Renewal","amount":50000}';
OpportunitySummary summary = (OpportunitySummary) JSON.deserialize(json, OpportunitySummary.class);
System.debug(summary.amount); // 50000
```

The class acting as the deserialization target needs public (or global) fields whose names match the JSON keys. `JSON.deserialize()` quietly ignores JSON attributes that don't correspond to a field on the target class; `JSON.deserializeStrict()` — mentioned here, covered more precisely in the Reference Guide — instead throws if the JSON contains attributes the target class doesn't have, which is the stricter option when you want to catch a shape mismatch immediately rather than silently ignore it.

## Deserializing unknown shapes

When you're consuming JSON from an external system whose exact shape you don't fully control — or don't want to write a dedicated Apex class just to parse once — `JSON.deserializeUntyped()` parses it into nested, generic `Map<String, Object>` and `List<Object>` structures instead:

```apex
String json = '{"status":"ok","results":[{"id":101,"name":"Widget"},{"id":102,"name":"Gadget"}]}';

Map<String, Object> parsed = (Map<String, Object>) JSON.deserializeUntyped(json);
String status = (String) parsed.get('status');

List<Object> results = (List<Object>) parsed.get('results');
for (Object item : results) {
    Map<String, Object> resultMap = (Map<String, Object>) item;
    Decimal id = (Decimal) resultMap.get('id');
    String name = (String) resultMap.get('name');
    System.debug('Result: ' + id + ' — ' + name);
}
```

Every numeric value deserialized this way — whether the original JSON looked like an integer or had a decimal point — comes back as a `Decimal`, so casting a numeric field to `(Decimal)` (and converting to `Integer` yourself with `.intValue()` if you specifically need a whole number) is the correct, expected pattern, not a workaround for a bug.

## A realistic use case: parsing a callout response

The most common real-world use of `deserializeUntyped` is parsing the body of an HTTP response after an outbound callout to an external API — the exact pattern that comes up anytime Apex integrates with a system whose response shape you're reading, not designing yourself:

```apex
HttpRequest req = new HttpRequest();
req.setEndpoint('https://api.example.com/accounts/123');
req.setMethod('GET');

Http http = new Http();
HttpResponse res = http.send(req);

Map<String, Object> accountData = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
String accountName = (String) accountData.get('name');
```

## Key terms

| Term | Meaning |
|---|---|
| `JSON.serialize()` | Converts an Apex object/collection into a compact JSON string |
| `JSON.deserialize(json, Type.class)` | Parses JSON directly into an instance of a known Apex class |
| `JSON.deserializeUntyped()` | Parses JSON of unknown shape into generic Map/List structures |
| `Decimal` from untyped parsing | Every numeric value from `deserializeUntyped` comes back as a Decimal, regardless of its original JSON form |

## Lab

In the Developer Console's Execute Anonymous window, declare a simple wrapper class with two or three fields, serialize an instance of it with `JSON.serializePretty()` and print the result. Then take a small hardcoded JSON string representing a nested object (an object containing a list of objects, similar to the `results` example above), parse it with `JSON.deserializeUntyped()`, and print each nested value after casting it to the correct type.

## Check yourself

Why does casting a parsed numeric value to `(Decimal)` after `JSON.deserializeUntyped()` matter, even if the original JSON value looked like a whole number? When would you choose `JSON.deserialize()` with a known class over `JSON.deserializeUntyped()`?
