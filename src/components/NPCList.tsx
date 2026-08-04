import React from "react";
import { getCollection } from 'astro:content';

interface NPC {
    id: string;
    name: string;
    role: string;
}

interface NPCListProps {
    npcs: NPC[];
}

const BASE_URL = import.meta.env.BASE_URL;
const npcPages = (await getCollection('docs')).filter(page => page.id.startsWith('codex/npc/'));
const npcLookup = new Map(
npcPages.map(page => [
  page.id,
  page
])
);

export default function NPCList({ npcs }: NPCListProps) {
    return (
        <section className="npc-section">
            <h3>NPCs</h3>
            { (!npcs || npcs.length === 0) && (
                <p className="list-item">No NPCs recorded for this session.</p>
            )}
            {npcs.map((npc: NPC) => {
                const page = npc.id ? npcLookup.get(`codex/npc/${npc.id}`) : undefined;
                return (
                <li className="list-item">
                    {page ? (
                    <>
                        <a href={`${BASE_URL}/${page.id}`} className="text-sf-link hover:underline">
                        {page.data.title ? page.data.title : npc.name}
                        </a>
                        <span>, {npc.role}</span>
                    </>
                    ) : (
                    <span>{npc.name}, {npc.role}</span>
                    )}
                </li>
                );
            })}
            <style>{`
                .npc-section {
                    margin-top: 2rem;
                }
                .list-item { margin-left: 1.5rem;}
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .font-mono { font-family: var(--sl-font-mono); }
                .font-bold { font-weight: 700; }
            `}</style>
        </section>
    )
}