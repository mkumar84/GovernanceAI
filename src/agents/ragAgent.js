import { regulatoryCorpus } from "../knowledge/regulatoryCorpus";

/**
 * Retrieves the most relevant regulatory chunks for a given domain and keywords.
 * Uses keyword overlap scoring — no external vector DB required.
 */
export function retrieveChunks(domain, keywords = [], topK = 5) {
  const scored = regulatoryCorpus
    .filter(chunk => !domain || chunk.domain === domain)
    .map(chunk => {
      const overlap = keywords.filter(k =>
        chunk.keywords.some(ck =>
          ck.toLowerCase().includes(k.toLowerCase()) ||
          k.toLowerCase().includes(ck.toLowerCase())
        )
      ).length;
      return { ...chunk, score: overlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

/**
 * Retrieves chunks across ALL domains — used for cross-domain queries
 * like the orchestrator summary and the knowledge base search.
 */
export function retrieveAllDomains(keywords = [], topK = 6) {
  const scored = regulatoryCorpus
    .map(chunk => {
      const overlap = keywords.filter(k =>
        chunk.keywords.some(ck =>
          ck.toLowerCase().includes(k.toLowerCase()) ||
          k.toLowerCase().includes(ck.toLowerCase())
        )
      ).length;
      return { ...chunk, score: overlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

/**
 * Searches corpus by free text — used by the Knowledge Base page.
 */
export function searchCorpus(query = "") {
  if (!query.trim()) return regulatoryCorpus;
  const q = query.toLowerCase();
  return regulatoryCorpus.filter(chunk =>
    chunk.title.toLowerCase().includes(q) ||
    chunk.text.toLowerCase().includes(q) ||
    chunk.source.toLowerCase().includes(q) ||
    chunk.keywords.some(k => k.toLowerCase().includes(q))
  );
}

/**
 * Formats retrieved chunks into a string for injection into agent prompts.
 */
export function buildRagContext(chunks) {
  if (!chunks || chunks.length === 0) return "No specific regulatory guidance retrieved.";
  return chunks
    .map(c => `[${c.source}]\n${c.title}\n${c.text}`)
    .join("\n\n---\n\n");
}

/**
 * Returns all unique regulatory sources in the corpus.
 */
export function getAllSources() {
  return [...new Set(regulatoryCorpus.map(c => c.source))];
}

/**
 * Returns all unique domains.
 */
export function getAllDomains() {
  return [...new Set(regulatoryCorpus.map(c => c.domain))];
}
