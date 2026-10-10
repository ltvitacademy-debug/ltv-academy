# Lesson 5 — Mock Callouts and Testing

**Chapter 1 · Outbound Integration · Lesson 5 of 23**

## What you'll learn

- Why real callouts are blocked inside Apex test context
- How to implement the `HttpCalloutMock` interface
- How `Test.setMock()` intercepts a callout during a test
- The built-in `StaticResourceCalloutMock` and `MultiStaticResourceCalloutMock` alternatives
- How to write a complete test for callout code with both success and failure paths

## Why you can't just test against the real API

Apex tests never make real callouts, even if the code under test is identical to production code. This is deliberate: tests need to run reliably and repeatedly without depending on a third-party system being up, fast, or returning the same response every time. Salesforce's answer is the `HttpCalloutMock` interface — you write a fake implementation of "what the external system would say," and the platform substitutes it in automatically whenever a callout happens during a test.

## Implementing `HttpCalloutMock`

The interface has exactly one method to implement: `HttpResponse respond(HttpRequest req)`.

```apex
@isTest
global class OrderStatusMock implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"orderId":"ORD-1001","status":"Shipped"}');
        res.setStatusCode(200);
        return res;
    }
}
```

You can inspect the incoming `req` (its endpoint, method, body) inside `respond()` to return different fake responses depending on what was actually requested — useful for testing branching logic that behaves differently for different orders or endpoints.

## Registering the mock with `Test.setMock`

```apex
@isTest
private class OrderStatusClientTest {
    @isTest
    static void testGetOrderStatus_success() {
        Test.setMock(HttpCalloutMock.class, new OrderStatusMock());

        Test.startTest();
        Map<String, Object> result = OrderStatusClient.getOrderStatus('ORD-1001');
        Test.stopTest();

        System.assertEquals('Shipped', result.get('status'));
    }
}
```

Once `Test.setMock(HttpCalloutMock.class, mockInstance)` is called, any real callout attempted for the rest of that test method is intercepted; the mock's `respond()` return value is used instead and no network call happens. If the callout code lives inside a managed package, `Test.setMock` must be called from a test in that same package and namespace — a mock registered from outside the package's namespace won't intercept its callouts.

## Testing failure paths too

A thorough test suite covers more than the happy path — write a second mock (or branch the first one on the request) that returns a non-200 status, and assert that your code's error handling (Lesson 6) does the right thing:

```apex
global class OrderStatusErrorMock implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest req) {
        HttpResponse res = new HttpResponse();
        res.setStatusCode(500);
        res.setBody('{"error":"Internal Server Error"}');
        return res;
    }
}
```

## When you don't need a custom mock class

For a simple, fixed response, Apex provides `StaticResourceCalloutMock`, which reads the response body from a static resource instead of requiring a hand-written class, and `MultiStaticResourceCalloutMock`, which maps different endpoints to different static resources for tests that make more than one distinct callout. Both are still registered the same way, through `Test.setMock(HttpCalloutMock.class, mock)` — they just save you from writing a class when the fake response is static and doesn't need any logic.

## Key terms

| Term | Meaning |
|---|---|
| HttpCalloutMock | The interface implemented to define a fake callout response for tests |
| Test.setMock | Registers a mock so real callouts are intercepted for the rest of that test |
| StaticResourceCalloutMock | Built-in mock that reads a fixed response body from a static resource |
| MultiStaticResourceCalloutMock | Built-in mock mapping multiple endpoints to multiple static resources |

## Lab

Using the `OrderStatusClient` class from Lesson 4, write a complete test class with two test methods: one registering a mock that returns a 200 with a valid JSON body, asserting the parsed status comes back correctly; and one registering a mock that returns a 500, asserting your code either throws the expected exception or returns the expected error indicator. Run both tests in a scratch org or Developer Edition org's Developer Console and confirm both pass, then confirm code coverage registers on `OrderStatusClient`.

## Check yourself

Explain why Apex tests can't make real callouts, and name the one method every `HttpCalloutMock` implementation must provide. Then describe the difference between writing a custom mock class and using `StaticResourceCalloutMock`.
