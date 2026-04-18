import fs from "node:fs";
import path from "node:path";

/**
 * Build-time loader for markdown docs. Used by the /docs routes so exec
 * documents ship with the static export and render in the browser with
 * Mailchimp styling.
 */
const DOCS_DIR = path.join(process.cwd(), "docs");
const REPO_URL = "https://github.com/deepakp1308/whatsapp-analytics/blob/main/docs";

export function loadDoc(filename: string) {
  const fullPath = path.join(DOCS_DIR, filename);
  const markdown = fs.readFileSync(fullPath, "utf8");
  return {
    markdown,
    sourceUrl: `${REPO_URL}/${filename}`,
  };
}
