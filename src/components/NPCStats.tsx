import React from "react";
import { getCollection } from 'astro:content';

let npcs: any[] = [];
const sessionPages = (await getCollection('docs')).filter(page => page.id.startsWith('codex/session/'));

export default function NPCStats({ id, data }: any) {
    const npcId = id.replace(/codex\/npc\//g, '');
    const appearances = sessionPages
        .filter(session => 
            session.data.npcs?.some(npc => npc.id === npcId)
        )
        .sort((a, b) => (a.data.session ?? 0) - (b.data.session ?? 0));
    const firstAppearance = appearances[0];
    const latestAppearance = appearances.at(-1);
    const sessionNumbers = appearances.map(s => s.data.session);

    return (
        <section>
            <h3>Details</h3>
            <p>Faction: {data?.faction || "Unknown"}</p>
            <p>Occupation: {data?.occupation || "None Listed"}</p>
            <p>Status: {data?.status || "Unknown"}</p>
            <p>First Appearance: {firstAppearance?.data.session || "Not listed"}</p>
            <p>Latest Appearance: {latestAppearance?.data.session || "Not listed"}</p>
            <p>Appears in: {sessionNumbers.join(", ") || "Not listed"}</p>
        </section>
    )
}