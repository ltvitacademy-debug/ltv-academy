Lesson 4 modeled the warranty-claims app on paper. Now let's build it for real — starting with the custom object itself, then the relationship that connects it to Asset.

Every custom object starts the same way: Object Manager, then the Create menu, then Custom Object. Two clicks, and you're naming the thing you modeled on paper.

Here's what a finished custom object looks like running in production — an Energy Audit record. It has its own icon, its own custom fields like Annual Energy Usage, and a lookup back to a standard Account. Reuse and customization, side by side on one record.

Before you build the relationship field, decide the type. A lookup: the child record survives if the parent is deleted, and its sharing is independent. A master-detail: the child is deleted along with the parent, it inherits the parent's sharing, and — critically — roll-up summary fields become possible. Pick master-detail only when the child genuinely can't exist without the parent.

For Warranty_Claim__c: create the object with its label, plural label, and API name. Add a new field, type Master-Detail Relationship. Set Related To as Asset. Save — and a Warranty Claims related list now appears automatically on every Asset record.

That's an object and its relationship, built end to end. Next lesson: choosing the right field type for every piece of data that object actually needs to hold.
