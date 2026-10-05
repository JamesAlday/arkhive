import type { NPC } from "../content.config";
import { getSessionPages } from "../lib/content";

const sessionPages = await getSessionPages();

type NPCStatsProps = {
    id: string;
    data: NPC;
};

export default function NPCStats({ id, data }: NPCStatsProps) {
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
            <p>Aliases: {data.aliases?.join(", ") || "Not listed"}</p>
            <p>Species: {data.species || "Not listed"}</p>
            <p>Gender: {data.gender || "Not listed"}</p>
            <p>Faction: {data.faction || "Not listed"}</p>
            <p>Occupation: {data.occupation || "Not listed"}</p>
            <p>Status: {data.status || "Not listed"}</p>
            <p>First Appearance: {firstAppearance?.data.session || "Not listed"}</p>
            <p>Latest Appearance: {latestAppearance?.data.session || "Not listed"}</p>
            <p>Appears in: {sessionNumbers.join(", ") || "Not listed"}</p>
        </section>
    )
}