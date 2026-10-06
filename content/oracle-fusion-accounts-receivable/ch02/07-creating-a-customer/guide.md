# Creating a Customer

Now that you know the party/account/site structure, let's walk through what actually happens, step by step, when someone creates a new customer in Oracle Fusion Receivables.

## What you'll learn

- The order of steps in creating a usable customer
- The minimum information Receivables needs before a customer can be billed
- Common choices made at each step and why they matter

## Step by step

1. **Search for an existing party first.** Before creating anything new, Receivables searches the shared party registry by name, tax registration number, or address to avoid creating a duplicate party for an organization that already exists somewhere in the system (perhaps created originally by a Sales or Service user).
2. **Create or select the party.** If no match exists, a new party is created: organization name (or person name), organization type, and tax registration details if applicable.
3. **Add a party site (address).** At least one address is needed — this becomes a candidate for account sites later. Multiple addresses can be added for headquarters, warehouses, or regional offices.
4. **Create the customer account.** This is where the party formally becomes "a customer" in a selling relationship. Key fields include the account number (often auto-generated), the profile class (covered in lesson 9), and the primary salesperson or account owner.
5. **Create account sites and assign site uses.** Pick which party site(s) become account sites for this account, and assign site uses — most importantly Bill-To, and typically Ship-To. A site can carry multiple uses, or different sites can be used for each.
6. **Add contacts (optional but typical).** Named people at the customer — an AP contact for invoice questions, a receiving contact for deliveries — are attached at the party or account level.
7. **Set account-level credit and payment defaults.** Payment terms, credit limit overrides, and statement/dunning preferences can be set at the account level, inherited from the profile class unless overridden.

## The minimum Receivables actually requires

You can create a party and stop there, but you cannot bill anyone until you have: a customer account, at least one account site, and that site carrying a Bill-To use. Everything else — contacts, bank accounts, additional sites — can be added later without disrupting transactions already recorded.

## A worked example

A new prospect, Cascade Outdoor Supply (fictional), signs its first purchase order with Northwind Fixtures Co. The Northwind AR specialist searches the party registry first and finds nothing — Cascade has never transacted with any Northwind entity before. She creates a new organization party, "Cascade Outdoor Supply," adds its warehouse address in Spokane as a party site, creates a customer account "Cascade Outdoor Supply – US" with the standard profile class, and creates one account site from the Spokane address carrying both Bill-To and Ship-To uses. That's enough for Northwind to enter Cascade's first invoice. A billing contact is added afterward once Cascade's accounting department confirms who should receive invoice emails.

## Recap

Creating a customer means searching for an existing party, creating or confirming the party and its address, creating the account, and assigning at least one account site with a Bill-To use. Everything beyond that — contacts, extra sites, bank accounts — rounds out the record but isn't required to bill. Next up, lesson 8: customer accounts, sites, and contacts in more depth.
