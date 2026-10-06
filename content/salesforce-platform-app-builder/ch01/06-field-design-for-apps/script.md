Chapter one ends here. We've modeled the data and built the object — this lesson is about the individual fields that live inside it, and why the type you pick for each one matters more than it looks like it should.

Ask four questions for every field you create. What type does this data actually need — text, number, picklist, formula? What constraints apply — required, unique, a length limit? Who's allowed to edit it, via field-level security? And who even sees it, based on where it sits on the page layout?

Here's Warranty_Claim__c's fields, decided deliberately. Claim Number: Auto Number, formatted CLM dash five digits. Claim Date: a required Date field. Status: a Picklist with exactly four valid values. Resolution Notes: a Long Text Area, not required. And Total Claimed: a Roll-Up Summary field, summing the line items automatically.

Text is not a neutral default — it's the choice that enforces the least. Free text lets every typo become a stored value. A picklist only accepts values you defined. A formula field can never drift out of sync with the inputs it's calculated from. And a roll-up summary is always correct, because nobody has to remember to update it by hand.

That closes out the data side of this chapter: objects, relationships, and now fields, all chosen on purpose. Chapter two moves to the interface — starting with page layouts and compact layouts, the first thing a user actually sees.
