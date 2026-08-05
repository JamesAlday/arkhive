import { getCollection } from 'astro:content';

export async function getDocs() {
    return (await getCollection('docs'))
}

export async function getSessionPages() {
    return (await getDocs())
    .filter(page => page.id.startsWith('codex/session/'));
}
