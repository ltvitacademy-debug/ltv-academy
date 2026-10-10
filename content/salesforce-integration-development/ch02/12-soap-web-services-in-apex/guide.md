# Lesson 12 — SOAP Web Services in Apex

**Chapter 2 · Inbound Integration · Lesson 12 of 23**

## What you'll learn

- How the `webservice` keyword exposes an Apex method as a custom SOAP operation
- The requirements on a class and method for `webservice` to work at all
- How an external developer gets the WSDL needed to consume your service
- Why this mechanism still matters despite being legacy
- How it compares to Apex REST for a new integration decision

## The `webservice` keyword

Before Apex REST existed, Salesforce's way to expose custom Apex logic to an external system was the `webservice` keyword on a method, publishing it as a custom SOAP operation:

```apex
global class MyWebService {
    webservice static Id makeContact(String lastName, Account a) {
        Contact c = new Contact(LastName = lastName, AccountId = a.Id);
        insert c;
        return c.Id;
    }
}
```

Per the Apex Developer Guide, this lets an Apex class method be published as a custom SOAP web service operation, so an external application can invoke it to perform an action in Salesforce.

## The requirements

Two firm requirements apply:

- The method marked `webservice` must be **static**.
- The class containing it must be declared **global**.

The keyword itself is case-insensitive (you'll see it written `webService` or `webservice` in different code — both work), but it can only be applied to a method; it cannot be used when defining a class, an interface, an interface's members, or a trigger.

## Getting the WSDL

A SOAP consumer needs a WSDL (Web Services Description Language) document describing exactly what operations exist and what parameters and types they expect, so its SOAP client code can be generated correctly. For a custom Apex SOAP web service, you generate this yourself: in Setup, go to Apex Classes, open the class containing your `webservice` method, and click **Generate WSDL**. You hand that generated WSDL file to whoever is building the external system's SOAP client — their tooling reads it and builds a matching client automatically, the same way Salesforce generated server-side code from the method signature.

## Why this still matters

Most new inbound integration work in 2026 reasonably favors Apex REST (Lesson 8) — REST/JSON is simpler to consume, easier to debug, and what most modern systems speak natively. But SOAP web services in Apex still matter for a specific, real reason: a meaningful number of older enterprise systems — legacy ERPs, older integration middleware, some government and healthcare systems — were built against SOAP and have no practical path to switching protocols. If your integration requirement is "this existing system can only speak SOAP," the `webservice` keyword is still the correct, supported tool for exposing Salesforce logic to it, not a workaround to avoid.

## Apex REST vs Apex SOAP, decided

A quick comparison for a new integration decision: if the external caller can speak REST/JSON at all, prefer Apex REST — it's simpler, has clean HTTP-verb semantics, and is what the rest of this course assumes. Reach for the `webservice` keyword only when the caller is a legacy system that genuinely cannot consume REST/JSON and requires a SOAP contract instead. You won't build many new SOAP services going forward, but you will encounter and maintain existing ones, so recognizing the pattern matters even if you rarely write new code this way.

## Key terms

| Term | Meaning |
|---|---|
| webservice keyword | Marks a static Apex method as a custom SOAP web service operation |
| Generate WSDL | The Setup action on an Apex class that produces the WSDL document for external SOAP clients |
| WSDL | Web Services Description Language — describes a SOAP service's operations, parameters, and types |
| Legacy SOAP justification | SOAP web services remain the right tool specifically for callers that cannot consume REST/JSON |

## Lab

In a free Developer Edition or scratch org, create the `MyWebService` class above (or a similar one of your own design) with a `global` class and a `webservice static` method. In Setup, open Apex Classes, find your class, and click **Generate WSDL** — download the resulting file and open it in a text editor. Identify, in the raw WSDL XML, the operation name, its input parameters, and its return type, and confirm they match your method's signature exactly.

## Check yourself

State the two firm requirements on a class and method for the webservice keyword to work. Then explain, without looking back, a real scenario where building a new SOAP web service would still be the right choice over Apex REST in 2026.
