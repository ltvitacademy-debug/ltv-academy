# Rebuilds the "Download All" zip for a career-path Resource Vault.
#
# The Path Resource Vault feature itself needs zero code changes per path -
# lib/pathResourceVault.ts and app/app/path-resources/[path]/page.tsx
# discover a path's vault purely from the filesystem:
#   content/path-resources/<pathSlug>/resource-vault.json   (metadata, hand-authored per path)
#   public/downloads/path/<pathSlug>/<fileName>.png          (the real files)
#   public/downloads/path/<pathSlug>/<pathSlug>-resource-vault.zip  (optional "Download All", built by this script)
#
# This script only automates the one purely mechanical, identical-every-time
# step: zipping up whatever files currently sit in a path's download folder
# (everything except any existing .zip) into the Download All convention
# lib/pathResourceVault.ts's getPathDownloadAllHref() expects. It does NOT
# write resource-vault.json or pick descriptions/relatedCourseSlugs - that
# part is inherently bespoke per infographic and stays a manual/Claude step.
#
# Usage:
#   .\scripts\build-path-resource-vault-zip.ps1 -PathSlug sql-server-database-administrator
#   .\scripts\build-path-resource-vault-zip.ps1 -PathSlug azure-fabric-data-engineer,aws-data-engineer

param(
    [Parameter(Mandatory = $true)]
    [string[]]$PathSlug
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

foreach ($slug in $PathSlug) {
    $dir = Join-Path $repoRoot "public\downloads\path\$slug"
    if (-not (Test-Path $dir)) {
        Write-Warning "Skipping $slug - no folder at $dir. Create it and add the resource files first."
        continue
    }

    $files = Get-ChildItem -Path $dir -File | Where-Object { $_.Extension -ne ".zip" }
    if ($files.Count -eq 0) {
        Write-Warning "Skipping $slug - $dir has no non-zip files to package."
        continue
    }

    $zipPath = Join-Path $dir "$slug-resource-vault.zip"
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    Compress-Archive -Path $files.FullName -DestinationPath $zipPath

    $sizeMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 1)
    Write-Output "Built $slug-resource-vault.zip ($($files.Count) files, $sizeMb MB)"
}
