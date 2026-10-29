# Lesson 25 — Writing a Security Control as Code

**Chapter 7 · Engineering Security Controls, Not Just Operating Them · Lesson 25 of 32**

## What you'll learn

- Why a security control — a Conditional Access policy, an Azure Policy, a GPO baseline — deserves
  the same source-controlled home as application code, not a one-off change made by hand
- How to capture a control as versioned configuration: Terraform for cloud-native policies, a GPO
  backup for on-prem baselines
- Why peer review before a control goes live catches mistakes that a solo manual change never would
- Why version history gives you a real rollback, instead of hoping you remember what the policy used
  to say

## A control is a decision. The decision belongs in a file.

Every chapter so far has taught you to *build* a control: a Conditional Access policy in Chapter 1,
an MFA rollout in Chapter 2, a GPO baseline in Chapter 4. This chapter asks a different question —
once you know what the control should say, how do you make that change safely, repeatably, and
visibly to the rest of the team? The answer is the same one the automation course reached for
scripts: a security control is a decision about how the organization is protected, and that decision
belongs in a **file in a repository**, not in a setting someone clicked through once in a portal and
nobody can reconstruct.

## Capturing a cloud policy as code

Azure AD Conditional Access policies and Azure Policy definitions can both be expressed as Terraform
resources instead of portal clicks:

```
resource "azuread_conditional_access_policy" "require_mfa_admins" {
  display_name = "Require MFA for admin roles"
  state        = "enabled"

  conditions {
    users {
      included_roles = [data.azuread_directory_role.global_admin.object_id]
    }
    applications { included_applications = ["All"] }
  }

  grant_controls {
    operator          = "OR"
    built_in_controls  = ["mfa"]
  }
}
```

That block *is* the policy. Anyone can read it, diff it, and see exactly which role it targets and
what it requires — no tribal knowledge of "go to this blade, check this box" required.

## Peer review before the control goes live

Putting the policy in a pull request means a second person reviews the change before it's applied —
the same discipline Chapter 7 of the automation course taught for scripts, now applied to the control
itself:

```
# Pull request #58 — require_mfa_admins.tf
- included_roles = [data.azuread_directory_role.global_admin.object_id]
+ included_roles = [
+   data.azuread_directory_role.global_admin.object_id,
+   data.azuread_directory_role.privileged_role_admin.object_id,
+ ]
```

A reviewer sees the diff and asks: should Privileged Role Administrator require MFA too? That
question gets answered before the policy is enabled, not after an auditor asks why it wasn't covered.

## Rollback: the GPO baseline case

On-prem controls get the same treatment with `Backup-GPO` and `Import-GPO`. Before changing a GPO
baseline, back it up; if the change causes problems, restore the exact prior state instead of
reconstructing it from memory:

```
Backup-GPO -Name "Workstation-Baseline" -Path "\\fileserver\gpo-backups"
Import-GPO -BackupId <guid> -Path "\\fileserver\gpo-backups" -TargetName "Workstation-Baseline"
```

`Backup-GPO` saves a point-in-time snapshot of every setting in the GPO; `Import-GPO` restores that
exact snapshot back onto a GPO by its backup ID. That's a real rollback — not a guess at what the
settings used to be.

## Key terms

| Term | Meaning |
|---|---|
| Control as code | Expressing a security control (CA policy, Azure Policy, GPO) as versioned configuration instead of a manual portal change |
| `azuread_conditional_access_policy` | The Terraform resource that defines a Conditional Access policy declaratively |
| Pull request (PR) review | A second person examining a proposed control change before it's merged and applied |
| `Backup-GPO` / `Import-GPO` | PowerShell cmdlets that snapshot a GPO's settings and restore a specific snapshot back |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: what does a security control gain
by living in a Git repository as Terraform or a GPO backup, that it doesn't get from a one-off change
made directly in a portal or the GPO console?
