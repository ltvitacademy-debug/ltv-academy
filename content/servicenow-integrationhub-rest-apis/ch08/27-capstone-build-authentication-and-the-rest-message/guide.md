# Lesson 27 — Capstone: Build Authentication & the REST Message

**Chapter 8 · Capstone: an Enterprise REST Integration · Lesson 27 of 29**

## What you'll learn

- Why OAuth 2.0 Client Credentials fits a server-to-server pull like this one, when Basic Auth and Authorization Code don't
- How an OAuth Entity Profile lets `RESTMessageV2` request and refresh its own bearer token, with no manual header
- How to build the `MeridianHR` REST Message and its `getEmployee` Function against a real API shape
- The real `RESTMessageV2` script that fills in the Function's placeholder and executes the pull
- How the inbound webhook resource from Lesson 26's design hands off into that pull

## Why OAuth 2.0 Client Credentials, specifically

Chapter 3 covered three authentication options: Basic Auth (Lesson 8), OAuth 2.0 (Lesson 9), and
API keys/mutual auth (Lesson 10). Basic Auth sends a username and password on every request —
Meridian HR, like most modern SaaS APIs, doesn't even support it anymore for new integrations.
That leaves OAuth. OAuth 2.0 has more than one grant type, and the one that fits depends on who's
actually making the call. Authorization Code grant exists for flows where a human user logs in
and delegates access — nobody is sitting at a login screen here. This is ServiceNow calling
Meridian HR as itself, a trusted backend system, with no user in the loop at all. That's exactly
the case **Client Credentials** grant exists for: two systems, a client ID and secret, no human
involved.

## Configuring the OAuth Entity Profile

The actual configuration lives in an OAuth Entity Profile record:

```
OAuth Entity Profile: Meridian HR Client Credentials
Grant type:            Client Credentials
Token URL:             https://auth.meridianhr.com/oauth/token
Client ID / Secret:    issued by Meridian HR, stored encrypted
Scope:                 employees.read
```

Once that profile is attached to the REST Message (next section), `RESTMessageV2` handles the
token lifecycle entirely on its own: it requests a token from the Token URL the first time it's
needed, attaches it as a Bearer token on the Authorization header automatically, and requests a
fresh one when the old one expires. None of that token logic needs to appear anywhere in your
script — the whole reason Chapter 3 introduced OAuth as the production-grade choice over Basic
Auth.

## Building the REST Message and its Function

With authentication decided, the REST Message record itself follows the exact pattern from Lessons
4 and 5 — just pointed at Meridian HR's real endpoint:

```
REST Message:    MeridianHR
Function:        getEmployee
HTTP Method:     GET
Endpoint:        https://api.meridianhr.com/v2/employees/${employeeId}
Authentication:  OAuth 2.0 — Meridian HR Client Credentials profile
```

The `${employeeId}` placeholder is filled in from script, exactly the way Lesson 6 filled in
`${city}` — except this time the value comes from the employee ID that arrived in Meridian HR's
webhook, not a hardcoded string.

## The real pull, in script

A Script Include wraps the call so both the webhook handler and, later, Lesson 28's retry logic can
reuse it:

```javascript
var OnboardingSync = Class.create();
OnboardingSync.prototype = {
  initialize: function() {},

  pullEmployeeFromMeridian: function(employeeId) {
    var r = new sn_ws.RESTMessageV2('MeridianHR', 'getEmployee');
    r.setStringParameterNoEscape('employeeId', employeeId);
    r.setRequestHeader('Accept', 'application/json');

    var response = r.execute();
    var httpStatus = response.getStatusCode();
    var body = response.getBody();

    if (httpStatus != 200) {
      throw new Error('Meridian HR returned ' + httpStatus + ': ' + body);
    }
    return JSON.parse(body);
  },

  type: 'OnboardingSync'
};
```

Nothing about OAuth appears in this method — the profile attached to the REST Message record
handles the bearer token, exactly as Chapter 3 promised. The method's only jobs are naming the
Function, filling the placeholder, and reading the result.

## The webhook hands off into the pull

Lesson 26 designed a Scripted REST API resource to receive Meridian HR's thin webhook. Here it is,
calling the Script Include the moment a notification arrives:

```javascript
(function process(request, response) {
  var payload = request.body.data;
  var employeeId = payload.employeeId;

  if (!employeeId) {
    response.setStatus(400);
    return { error: 'Missing employeeId' };
  }

  var sync = new OnboardingSync();
  var employee = sync.pullEmployeeFromMeridian(employeeId);

  response.setStatus(202);
  return { received: true, employeeId: employeeId };
})(request, response);
```

At this capstone's low new-hire volume, pulling the record inline inside the webhook resource is
honest and simple. A much higher-volume HR feed would queue the pull onto an async Business Rule
instead of blocking the webhook response — worth knowing, even though this integration's volume
doesn't require it.

## Key terms

| Term | Meaning |
|---|---|
| OAuth 2.0 Client Credentials | The grant type for server-to-server calls with no human user involved — a client ID and secret only |
| OAuth Entity Profile | The record holding the Token URL, client credentials, and scope that a REST Message attaches for automatic token handling |
| REST Message Function | The specific operation (endpoint, HTTP method, placeholders) within a REST Message — here, `getEmployee` |
| `RESTMessageV2` | The script API used to execute a configured REST Message Function from a Script Include |

## Check yourself

Why does Client Credentials grant fit this integration better than Authorization Code grant, and
what does that tell you about who — or what — is actually making this HTTP call?
