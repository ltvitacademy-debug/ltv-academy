# Lesson 15 — Named Credentials and Error Handling

**Chapter 3 · Build: UI and Integration · Lesson 15 of 25**

## What you'll learn

- External Credentials vs. (legacy) Named Credentials, and which this capstone uses
- Named Principal vs. Per-User authentication, and which fits Solstice's integration
- A custom exception hierarchy for the warranty integration
- Retry-and-backoff thinking for a callout that can legitimately fail

## Setting up the Named Credential

Lesson 14's `callout:ApplianceMakers_Warranty` endpoint needs a real Named Credential behind it before it will run. Salesforce's current setup for this separates two pieces that used to be one: an **External Credential**, which holds the authentication parameters (the auth protocol, and where the actual secret lives), and a **Named Credential**, which holds the callout endpoint URL and points at an External Credential for how to authenticate. This two-piece model is the current, recommended approach — the older style that combined endpoint and auth into a single Named Credential definition still exists in some orgs but is deprecated, and this capstone builds the current version:

| Setting | Value |
|---|---|
| External Credential name | `ApplianceMakers_Warranty_Cred` |
| Authentication protocol | Custom (API key in header) |
| Named Credential name | `ApplianceMakers_Warranty` |
| URL | `https://api.appliancemakerswarranty.example.com/v1` |
| External Credential reference | `ApplianceMakers_Warranty_Cred` |

## Named Principal vs. Per-User

An External Credential's **principal** determines whose identity the callout authenticates as. A **Named Principal** means every Solstice user who triggers this callout authenticates as one shared integration identity — appropriate here, since the manufacturer's API doesn't need to know *which Solstice employee* submitted a claim, only that Solstice submitted it. The alternative, **Per-User**, gives each individual user their own stored credential and is the right choice when the external system needs to enforce access per human (for example, if technicians each had their own individual manufacturer login). This integration uses Named Principal, mapped to a permission set assigned to the Service Agent role, so only Service Agents — not every Solstice employee — can trigger a real submission.

## A custom exception hierarchy

Lesson 14 referenced `ManufacturerWarrantyException` without defining it. A custom exception class in Apex just extends the built-in `Exception` class:

```apex
public class ManufacturerWarrantyException extends Exception {}
```

That's genuinely all it needs to be usable with `throw` and `catch`, but this integration benefits from two specific subtypes, since the trigger handler and the Queueable need to react differently depending on *why* the callout failed:

```apex
public class ManufacturerWarrantyTransientException extends ManufacturerWarrantyException {}
public class ManufacturerWarrantyRejectedException extends ManufacturerWarrantyException {}
```

A **transient** failure (a timeout, a 503 from the manufacturer's server being temporarily down) is worth retrying; a **rejected** failure (a 400 because the serial number doesn't exist in the manufacturer's system) will fail again identically no matter how many times you retry it, and should instead update the claim's status to something a Service Agent needs to look at manually.

## Error handling in the Queueable

```apex
public void execute(QueueableContext context) {
    for (Warranty_Claim__c claim : claimsToSubmit) {
        try {
            claim.Manufacturer_Claim_Id__c = ManufacturerWarrantyClient.submitClaim(
                claim.Asset__r.SerialNumber, claim.Claim_Amount__c
            );
            claim.Claim_Status__c = 'Submitted';
        } catch (ManufacturerWarrantyRejectedException e) {
            claim.Claim_Status__c = 'Denied';
        } catch (ManufacturerWarrantyTransientException e) {
            if (attemptsRemaining > 0) {
                System.enqueueJob(new WarrantyClaimSubmissionQueueable(claimIds, attemptsRemaining - 1));
            }
        }
    }
    update claimsToSubmit;
}
```

Catching the two subtypes separately — rather than one broad `catch (Exception e)` — is the whole point of having built them: the handler can make a genuinely different decision (give up and flag for a human vs. retry) based on *which* exception came back, instead of treating every failure identically.

## Retry with a cap, not forever

Re-enqueuing on a transient failure needs a limit — `attemptsRemaining`, decremented on each retry — because an external system that's down for an extended outage shouldn't cause Solstice's org to re-enqueue the same job indefinitely, which would also eventually run into the 24-hour rolling asynchronous Apex limit from Lesson 11. A small, fixed retry cap (two or three attempts) with the failure logged once it's exhausted is standard integration-error-handling practice, here and in real systems.

## Key terms

| Term | Meaning |
|---|---|
| External Credential | Holds the authentication protocol and secret-storage configuration for a callout |
| Named Credential | Holds the callout endpoint URL and references an External Credential for authentication |
| Named Principal | One shared identity used for all users making a given callout |
| Per-User Principal | A separate stored credential per individual user |
| Custom exception subtype | A specific Exception subclass letting calling code react differently to different failure causes |

## Lab

Create the External Credential and Named Credential described above in your scratch org (Setup → Named Credentials). Define `ManufacturerWarrantyException` and its two subtypes, update `ManufacturerWarrantyClient.submitClaim` to throw the appropriate subtype based on status code, and update the Queueable's `execute()` to handle both cases distinctly as shown.

## Check yourself

- What's the difference between an External Credential and a Named Credential in the current Salesforce model?
- Why does this integration use Named Principal rather than Per-User authentication?
- Why does a transient failure get retried while a rejected failure doesn't?
