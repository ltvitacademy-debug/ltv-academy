import fs from "fs";
import path from "path";
import { formatFileSize } from "./resourceVault";
import type { PathResource, PathResourceVaultBank } from "./pathResourceVaultTypes";

export * from "./pathResourceVaultTypes";

export type PathResourceWithFile = PathResource & {
  downloadHref: string; // /downloads/path/<pathSlug>/<fileName>
  fileSizeLabel: string | null; // computed from the real file; null if missing on disk
};

// Path-wide resource metadata lives at content/path-resources/<pathSlug>/
// resource-vault.json. The downloadable files themselves live at
// public/downloads/path/<pathSlug>/ — a dedicated namespace, separate from
// every course's own public/downloads/<courseSlug>/ folder, since a path
// resource isn't owned by any single course.
export function loadPathResources(pathSlug: string): PathResourceWithFile[] {
  const bankPath = path.join(process.cwd(), "content", "path-resources", pathSlug, "resource-vault.json");
  if (!fs.existsSync(bankPath)) return [];

  let bank: PathResourceVaultBank;
  try {
    bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
  } catch {
    return [];
  }
  if (!Array.isArray(bank.resources)) return [];

  return bank.resources.map((r) => {
    // External third-party resource (TryHackMe, AWS Skill Builder, etc.) —
    // nothing hosted on disk, so point the download href straight at it.
    if (r.isExternal && r.url) {
      return { ...r, downloadHref: r.url, fileSizeLabel: null };
    }
    const filePath = path.join(process.cwd(), "public", "downloads", "path", pathSlug, r.fileName ?? "");
    const exists = Boolean(r.fileName) && fs.existsSync(filePath);
    return {
      ...r,
      downloadHref: `/downloads/path/${pathSlug}/${r.fileName ?? ""}`,
      fileSizeLabel: exists ? formatFileSize(fs.statSync(filePath).size) : null,
    };
  });
}

export function hasPathResourceVault(pathSlug: string): boolean {
  return loadPathResources(pathSlug).length > 0;
}

// The "Download All" zip, when one exists, lives at the same convention:
// public/downloads/path/<pathSlug>/<pathSlug>-resource-vault.zip
export function getPathDownloadAllHref(pathSlug: string): string | null {
  const zipPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "path",
    pathSlug,
    `${pathSlug}-resource-vault.zip`
  );
  return fs.existsSync(zipPath) ? `/downloads/path/${pathSlug}/${pathSlug}-resource-vault.zip` : null;
}
