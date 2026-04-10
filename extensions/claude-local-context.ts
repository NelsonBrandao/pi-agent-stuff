/**
 * CLAUDE.local.md Context Extension
 *
 * Loads CLAUDE.local.md files from the current working directory and ancestor
 * directories, appending their contents to the system prompt as project context.
 *
 * This mirrors how pi's built-in resource loader discovers AGENTS.md / CLAUDE.md
 * files, but for the local variant that is typically gitignored.
 *
 * Replaces the APPEND_SYSTEM.md approach of telling the agent to read the file
 * at runtime — instead the content is injected directly into the system prompt.
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join, sep } from "node:path";

interface ContextFile {
  path: string;
  content: string;
}

/**
 * Walk from `startDir` up to the filesystem root, collecting CLAUDE.local.md
 * files. Returns them in root-first order (outermost ancestor first) so that
 * more-specific (deeper) instructions appear last and can override.
 */
function discoverLocalContextFiles(startDir: string): ContextFile[] {
  const files: ContextFile[] = [];
  const seen = new Set<string>();
  const root = resolve("/");

  let currentDir = resolve(startDir);

  while (true) {
    const candidate = join(currentDir, "CLAUDE.local.md");

    if (!seen.has(candidate) && existsSync(candidate)) {
      try {
        const content = readFileSync(candidate, "utf-8").trim();
        if (content) {
          files.unshift({ path: candidate, content });
        }
      } catch {
        // Skip unreadable files
      }
      seen.add(candidate);
    }

    if (currentDir === root) break;
    const parentDir = resolve(currentDir, "..");
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return files;
}

export default function claudeLocalContext(pi: ExtensionAPI) {
  pi.on("before_agent_start", async (event, ctx) => {
    const localFiles = discoverLocalContextFiles(ctx.cwd);

    if (localFiles.length === 0) return;

    let section = "\n\n# Local Context (CLAUDE.local.md)\n\n";
    for (const { path: filePath, content } of localFiles) {
      section += `## ${filePath}\n\n${content}\n\n`;
    }

    return {
      systemPrompt: event.systemPrompt + section,
    };
  });
}
