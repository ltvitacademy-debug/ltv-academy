# Lesson 2 — Installing Power BI Desktop

**Chapter 1 · Power BI Fundamentals · Lesson 2 of 5**

## What you'll learn

- The two ways to install Power BI Desktop, and which one to pick
- Why the Microsoft Store version is usually the better default
- What happens during and right after installation
- The minimum system requirements Power BI Desktop needs to run

## Two ways to get Power BI Desktop

Power BI Desktop is free either way. You choose *how* it lands on your computer,
not whether you pay for it.

| Method | Where | Best for |
|---|---|---|
| **Microsoft Store** | [aka.ms/pbidesktopstore](https://aka.ms/pbidesktopstore), or the Download icon inside app.powerbi.com | Most learners and most individual installs |
| **Direct download (.exe)** | [Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=58494) | IT-managed rollouts, locked-down machines, scripted installs |

Both install the exact same, latest version of Power BI Desktop — Microsoft ships
one monthly update, and only the current version is supported. The difference is
entirely about *how the install and updates are managed*:

**Microsoft Store advantages:**
- **Automatic updates** — Windows fetches the new monthly build in the background.
- **Smaller downloads** — the Store only re-downloads the pieces that changed.
- **No admin rights required** — useful on a locked-down work laptop.
- **Built-in language detection** — matches Power BI Desktop's language, and the
  date/number formats it uses, to your Windows language automatically.

**Direct .exe advantages:**
- Works when Store access is blocked by IT policy.
- Supports silent/scripted installs with command-line switches (`-quiet`,
  `ACCEPT_EULA=1`, etc.) — how organizations roll it out to hundreds of machines
  at once.
- Requires administrator rights to install.

**For this course, use the Microsoft Store version** unless your workplace
specifically requires the .exe. It is the simplest path and keeps itself updated.

## Installing from the Microsoft Store

1. Go to [aka.ms/pbidesktopstore](https://aka.ms/pbidesktopstore) — or, if you're
   already signed into the Power BI service at app.powerbi.com, select the
   **Download** icon in the top-right corner and choose **Power BI Desktop** from
   the menu.

   ![The Download menu in the Power BI service, with Power BI Desktop highlighted.](/courses/power-bi/ch01/02-installing-power-bi-desktop/getpbid_downloads.png)
   *From the Power BI service, the Download icon offers Power BI Desktop directly.*

2. On the Power BI Desktop page in the Store, select **Install**.

   ![The Power BI Desktop page in the Microsoft Store, with the Install button highlighted.](/courses/power-bi/ch01/02-installing-power-bi-desktop/getpbid_04.png)
   *One click to Install — Windows handles the rest, including future updates.*

3. Windows downloads and installs it automatically — no setup wizard to click
   through.

## Installing the direct download

1. Go to the [Microsoft Download Center page for Power BI Desktop](https://www.microsoft.com/download/details.aspx?id=58494)
   and select **Download**.
2. Choose **PBIDesktopSetup_x64.exe** (the 64-bit version). The 32-bit build is
   no longer supported — always take 64-bit.

   ![The Download Center's file picker, with the 64-bit Power BI Desktop installer selected.](/courses/power-bi/ch01/02-installing-power-bi-desktop/download-desktop-exe.png)
   *Always choose the 64-bit file — the 32-bit build is no longer supported.*

3. Run the downloaded file. A setup wizard opens; step through it (choose your
   language, accept the license, keep the defaults) to install.

   ![The Power BI Desktop setup wizard's welcome screen, with a language dropdown and Next button.](/courses/power-bi/ch01/02-installing-power-bi-desktop/desktop-install-01.png)
   *The setup wizard — direct-download only. The Store version skips this screen entirely.*

Either path ends the same way: launch Power BI Desktop, and a start screen
appears with **Blank report**, **Excel workbook**, **SQL Server**, and other
options for beginning your first report — which is exactly where Lesson 4 picks
up.

![Power BI Desktop's start screen right after first launch, offering a blank report or a direct data connection.](/courses/power-bi/ch01/02-installing-power-bi-desktop/desktop-splash-screen.png)
*Your first launch. Don't click anything yet — Lesson 3 takes this exact screen apart, piece by piece.*

## Minimum system requirements

Power BI Desktop is not resource-heavy, but it does have real minimums:

- Windows 10 or Windows Server 2016 or later
- .NET 4.7.2 or later
- Microsoft Edge (Internet Explorer is not supported)
- 2 GB RAM available (4 GB+ recommended)
- Display resolution of at least 1440×900 or 1600×900 — some dialogs render
  off-screen below that
- A 1 GHz 64-bit processor or better

If Power BI Desktop ever renders with strange black areas, that's almost always
a Windows display-scaling issue, not a Power BI bug — search Windows for
"blurry" and use **Let Windows fix apps that are blurry**.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Store install | Self-updating install method; no admin rights needed |
| Direct/.exe install | Manually downloaded installer; needed for IT-managed rollouts |
| Silent install | An .exe install run with command-line switches and no on-screen wizard |
| WebView2 | The Microsoft Edge component Power BI Desktop uses to render web content inside the app |

## Lab

1. Install Power BI Desktop using the Microsoft Store method described above.
2. Launch it once, and confirm you see the start screen with **Blank report**,
   **Excel workbook**, and other data-source tiles.
3. On the **Help** ribbon, select **About** and note your installed version
   number — you'll use this to confirm you're current later in the course.

## Check yourself

You're ready for Lesson 3 when Power BI Desktop is installed and open on your
machine, and you can explain to someone else why the Microsoft Store version is
the better default for most people.
