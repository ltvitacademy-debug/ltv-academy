# Lesson 4 — HTTP Callouts With Apex

**Chapter 1 · Outbound Integration · Lesson 4 of 23**

## What you'll learn

- The three classes that make up every Apex HTTP callout: `Http`, `HttpRequest`, `HttpResponse`
- How to set a method, headers, body, and timeout on a request
- How to read a status code and body off a response, and parse JSON safely
- A complete, real GET and POST example using a Named Credential
- Common mistakes that cause a working-looking callout to fail

## The three core classes

Every Apex HTTP callout uses the same three classes from the Apex Developer Guide:

- **`HttpRequest`** — build the outgoing request: `setEndpoint(url)`, `setMethod('GET'|'POST'|'PUT'|'PATCH'|'DELETE')`, `setHeader(name, value)`, `setBody(string)`, `setTimeout(milliseconds)`.
- **`Http`** — the class that actually performs the callout: `new Http().send(request)` returns an `HttpResponse`.
- **`HttpResponse`** — read the result: `getStatusCode()`, `getStatus()`, `getBody()`, `getHeader(name)`.

## A real GET example

```apex
public class OrderStatusClient {
    public static Map<String, Object> getOrderStatus(String orderId) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Order_System/orders/' + orderId);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(10000);

        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            return (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        }
        throw new CalloutException('Unexpected status: ' + res.getStatusCode());
    }
}
```

Note the endpoint uses the `callout:Order_System` Named Credential syntax from Lesson 3 rather than a literal URL — that's the pattern you should default to for any real integration.

## A real POST example

```apex
public class OrderStatusClient {
    public static void updateOrderStatus(String orderId, String newStatus) {
        Map<String, Object> payload = new Map<String, Object>{
            'orderId' => orderId,
            'status' => newStatus
        };

        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Order_System/orders/' + orderId + '/status');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(payload));

        HttpResponse res = http.send(req);
        if (res.getStatusCode() != 200 && res.getStatusCode() != 204) {
            throw new CalloutException('Update failed: ' + res.getStatusCode() + ' ' + res.getBody());
        }
    }
}
```

`JSON.serialize()` turns a Map (or any Apex object) into a JSON string for the request body; `JSON.deserializeUntyped()` turns a JSON response body back into nested Maps and Lists you can navigate with casts. For a known, stable response shape, you can also deserialize directly into a typed Apex wrapper class with `JSON.deserialize(jsonString, MyWrapperClass.class)`, which gives compile-time safety at the cost of needing a class that matches the JSON shape exactly.

## Common mistakes

- **Forgetting `setMethod`.** An `HttpRequest` defaults to no method set, which throws a runtime error — always set it explicitly.
- **Not setting `Content-Type`.** Many APIs reject a POST/PUT body silently or with a 415 if the header doesn't declare `application/json`.
- **Treating "no exception" as "it worked."** A callout can complete without throwing `CalloutException` while the remote system returns a 4xx or 5xx status in the body — always check `getStatusCode()` (Lesson 6 covers this in depth).
- **Hard-coding the endpoint and secret.** Using a literal URL and an inline API key instead of a Named Credential defeats the whole point of Lesson 3 and leaves secrets visible in code and logs.

## Key terms

| Term | Meaning |
|---|---|
| HttpRequest | The Apex class used to build an outgoing callout's method, headers, body, and timeout |
| Http | The Apex class whose `send()` method performs the callout and returns a response |
| HttpResponse | The Apex class used to read a callout's status code, headers, and body |
| JSON.serialize / JSON.deserializeUntyped | Standard Apex methods for converting between Apex objects and JSON strings |

## Lab

In a free Developer Edition or scratch org, write an anonymous Apex script (Developer Console → Debug → Open Execute Anonymous Window) that calls out to a free public test API that doesn't require a Named Credential for a quick experiment — use `https://jsonplaceholder.typicode.com/todos/1` as the literal endpoint just for this one practice exercise (you'll still need to add it under Remote Site Settings first, since it isn't behind a Named Credential). Build the `HttpRequest`, send it with `Http`, and `System.debug()` both the status code and the parsed JSON body. Then rewrite the same call using a real Named Credential pointed at that same URL instead of the literal string, to practice the pattern you'll use for the rest of this course.

## Check yourself

Without looking back, write the three lines of Apex needed to build and send a GET request to `callout:My_Credential/accounts`. Then explain why checking `getStatusCode()` matters even when no exception was thrown.
