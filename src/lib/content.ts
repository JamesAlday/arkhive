import { getCollection, type CollectionEntry } from 'astro:content';

export type DocsEntry = CollectionEntry<'docs'>;

export async function getDocs(
    filter?: (entry: DocsEntry) => boolean
): Promise<DocsEntry[]> {
    return await getCollection('docs', filter);
}

export async function getSessionPages(): Promise<DocsEntry[]> {
    const pages = await getDocs(page => page.id.startsWith('codex/session/'));

    // Sort pages by session # (defaults to lexicographical sort)
    return pages.sort((a, b) => {
        const sessionA = a.data.session ?? 0;
        const sessionB = b.data.session ?? 0;
        return sessionA - sessionB;
    });
}
