# Lesson 10 — Testing Callouts With Mocks

**Chapter 2 · Testing Well · Lesson 10 of 18**

## What you'll learn

- Why a real Apex test can never make a real HTTP callout
- How to implement the `HttpCalloutMock` interface and register it with `Test.setMock`
- Testing both the success response and failure/timeout responses from an external system
- Alternatives built into the platform: `StaticResourceCalloutMock` and `MultiStaticResourceCalloutMock`

## Tests cannot make real callouts

Apex test methods are not allowed to make actual outbound HTTP callouts — calling `Http.send()` (or any callout) from inside a test method without a mock registered throws a `CalloutException`. This is a deliberate platform restriction, and it's a good one: a test suite that depended on a real external API being reachable and returning the exact response you expect would be slow, flaky, and would break the moment that external system had any downtime, rate limit, or unrelated change. Instead, Salesforce gives you a way to substitute a **fake** response for any callout your code under test makes, so the exact same Apex code runs in the test, but the actual network call never happens.

## Implementing HttpCalloutMock

The core mechanism is a class implementing the `HttpCalloutMock` interface, which requires one method — `respond(HttpRequest req)` — returning the fake `HttpResponse` you want your code to receive:

```apex
@isTest
public class WeatherApiMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
        System.assertEquals('GET', req.getMethod());
        System.assertEquals('https://api.example.com/weather', req.getEndpoint());

        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"temp": 72, "conditions": "Sunny"}');
        res.setStatusCode(200);
        return res;
    }
}
```

Then, in the test method, register the mock with `Test.setMock` before calling the code under test:

```apex
@isTest
static void fetchesCurrentWeatherOnSuccess() {
    Test.setMock(HttpCalloutMock.class, new WeatherApiMock());

    Test.startTest();
    WeatherService.Result result = WeatherService.getCurrentWeather();
    Test.stopTest();

    Assert.areEqual(72, result.temperature, 'Should parse the temperature from the mocked response');
}
```

From the perspective of `WeatherService.getCurrentWeather()`, nothing about the callout looks different — it builds and sends an `HttpRequest` exactly as it would in production. The only difference is that `Test.setMock` intercepts that call and routes it to `WeatherApiMock.respond()` instead of actually going over the network.

## Testing failure, not just success

Because the mock class is just ordinary Apex, you can build a second mock (or branch the same mock based on the request) that returns an error status, a malformed body, or simulates a timeout response — proving your code's error handling, not just its happy path:

```apex
@isTest
public class WeatherApiFailureMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
        HttpResponse res = new HttpResponse();
        res.setStatusCode(503);
        res.setBody('Service Unavailable');
        return res;
    }
}

@isTest
static void handlesServiceUnavailableGracefully() {
    Test.setMock(HttpCalloutMock.class, new WeatherApiFailureMock());

    Test.startTest();
    WeatherService.Result result = WeatherService.getCurrentWeather();
    Test.stopTest();

    Assert.isTrue(result.hadError, 'A 503 response should be surfaced as an error, not silently ignored');
}
```

This is exactly the kind of negative-path testing from Lesson 7, applied specifically to integration code — proving that a flaky or down external system doesn't take your Apex down with it.

## Built-in alternatives for static responses

For callouts that return a fixed, known response body you'd rather not hardcode as a Java-style string inside Apex, Salesforce provides `StaticResourceCalloutMock`, which loads the response body from a Static Resource you upload, and lets you set the status code and headers on the mock before registering it with `Test.setMock`. `MultiStaticResourceCalloutMock` extends the same idea to map different endpoints to different static-resource responses within one mock, useful when the code under test calls more than one distinct external endpoint in a single transaction. One restriction worth knowing: if the class making the callout lives inside a managed package, the `Test.setMock` call registering its mock must come from a test method in that same package and namespace.

## Key terms

| Term | Meaning |
|---|---|
| `HttpCalloutMock` | The interface a mock class implements, with a `respond(HttpRequest)` method returning a fake `HttpResponse` |
| `Test.setMock(HttpCalloutMock.class, mockInstance)` | Registers a mock so any callout made during the test is intercepted and answered by the mock instead of a real network call |
| `StaticResourceCalloutMock` | A built-in mock that returns a response body loaded from an uploaded Static Resource |
| `CalloutException` | The exception thrown if test code attempts a real callout without a mock registered |

## Lab

Write an Apex class with a method that makes an HTTP callout to any endpoint (it never needs to actually succeed, since you'll always run it mocked) and parses a JSON field from the response. Write two test methods: one using an `HttpCalloutMock` implementation that returns a successful 200 response with a realistic JSON body, asserting the parsed result; and a second test using a mock that returns a 500 response, asserting your code handles that failure without throwing an unhandled exception.

## Check yourself

Can you explain why Apex test methods are not allowed to make real outbound HTTP callouts, and what exception is thrown if you try? Can you describe the two pieces required to mock a callout successfully — the interface you implement and the method you call to register it?
