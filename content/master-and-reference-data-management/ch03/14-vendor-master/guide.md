# Lesson 14 — Vendor Master

**Chapter 3 · Master Data Domains · Lesson 14 of 25**

## What you'll learn

- What belongs in a vendor (supplier) master record
- Why vendor master quality is a fraud-prevention control, not just a data-hygiene concern
- How vendor onboarding and screening connect to the master record
- Vendor segmentation, and why not every supplier needs the same scrutiny

## What a vendor master record holds

A **vendor master** (also called a supplier master) is the authoritative record of every external party an organization pays for goods or services. It mirrors customer master in structure — party model, addresses, tax identifiers, contacts — but the attributes that matter most are different, because the relationship runs the other direction: money flows *out*.

A usable vendor record carries: a unique vendor ID, legal name and tax identification number, remittance (payment) address versus physical address, banking details for electronic payment, payment terms, vendor type or category (goods, services, contractor), and status (active, on hold, blocked). That banking and payment-terms data is why vendor master sits closer to financial controls than most other master domains.

## Vendor master as a fraud-prevention control

Vendor master data quality isn't just about avoiding duplicate mailing lists — it's a documented fraud vector. **Duplicate vendor fraud** happens when a fraudster (sometimes an insider) creates a second vendor record for a legitimate supplier but with different banking details, then redirects a payment run to the fraudulent bank account. A well-governed vendor master with strict duplicate checking before a new vendor is approved, and change-control on existing bank details, is a primary defense against this.

This is also where **sanctions and compliance screening** enters master data work. Before a vendor master record goes live, many organizations screen the legal name against government watch lists (such as OFAC's Specially Designated Nationals list in the U.S.) to confirm the organization isn't prohibited from doing business with that party. That screening step is a governance control layered directly onto the vendor-master creation process — not a separate activity disconnected from the data.

## Vendor onboarding and the master record

**Vendor onboarding** is the structured process of collecting a new supplier's information, verifying it (tax ID validation, banking verification, sanctions screening, sometimes a credit check), and only then activating the vendor master record for use in purchasing and payment. Treating onboarding as a gate on the master record — rather than letting any employee create a vendor ad hoc in the moment they need to issue a purchase order — is what makes the fraud controls above actually work. A vendor record created outside that gate is a known weak point auditors look for specifically.

## Vendor segmentation

Not every vendor warrants the same level of scrutiny or management attention. Organizations typically segment vendors by criticality and spend: a strategic vendor supplying a critical raw material gets a dedicated relationship owner, deeper risk monitoring, and performance scorecards; a one-time vendor for office supplies gets a lighter-weight record and no ongoing review. Vendor master data should capture that segment so downstream processes — approval workflows, risk review cadence — can apply different rules automatically instead of treating every supplier identically.

## Key terms

| Term | Meaning |
|---|---|
| Vendor master | The authoritative record of every external party an organization pays for goods or services |
| Duplicate vendor fraud | Creating a second record for a real vendor with altered banking details to redirect a payment |
| Sanctions screening | Checking a vendor's legal name against government watch lists before approving the relationship |
| Vendor segmentation | Classifying vendors by criticality and spend to apply different levels of oversight |

## Lab

If you've ever submitted an invoice, been paid as a contractor, or watched a small business owner describe their supplier-payment process, list every piece of information they had to provide before getting paid for the first time (tax ID, banking details, address, etc.). Map each item to a vendor-master attribute from this lesson, and identify which one piece of information, if changed later without verification, would be the most dangerous to accept unchecked.

## Check yourself

Explain duplicate vendor fraud in your own words, and describe one specific governance control on the vendor master record that would make this type of fraud harder to carry out.
