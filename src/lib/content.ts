import { getCollection, type CollectionEntry } from 'astro:content';

export type DocsEntry = CollectionEntry<'docs'>;

export async function getDocs(
    filter?: (entry: DocsEntry) => boolean
): Promise<DocsEntry[]> {
    return await getCollection('docs', filter);
}

export async function getSessionPages(): Promise<DocsEntry[]> {
    return await getDocs(page => page.id.startsWith('codex/session/'));
}
