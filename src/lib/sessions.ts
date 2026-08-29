import type uPlot from "uplot";
import type { DocsEntry } from "./content";

interface RunningXPRow {
    session: number;
    xpEach: number;
    sessionTotal: number;
    runningTotal: number;
    level: number;
    title: string;
}

/**
 * Session Experience dashboard chart
 * @param sessions sessionPages
 * @param count number of sessions
 * @returns [session numbers, xp values]
 */
export function getSessionXPSeries(sessions: DocsEntry[], count = 3): uPlot.AlignedData {
    const sessionNumbers = sessions.map(s => s.data.session!);
    const xpValues = sessions.map(s => s.data.xp!.each);

    return [
        sessionNumbers,
        xpValues
    ];
}

/**
 * Running Experience Table & Recent Experience Chart
 * @param sessions sessionPages
 * @returns runningXP[]
 */
export function getRunningXP(sessions: DocsEntry[]): RunningXPRow[] {
    const runningXP: RunningXPRow[] = [];
    let runningTotal = 0;

    for (const session of sessions) {
        runningTotal = runningTotal + session.data.xp!.each;

        let row = {
            session: session.data.session!,
            xpEach: session.data.xp!.each,
            sessionTotal: session.data.xp!.total,
            runningTotal: runningTotal,
            level: session.data.level!.end,
            title: session.data.title!
        }
        runningXP.push(row);
    }
    return runningXP;
}

/**
 * 
 * @param runningXP getRunningXP output
 * @returns [[session numbers], [running totals]]
 */
export function getRecentXPSeries(runningXP: RunningXPRow[]): uPlot.AlignedData {
    const sessionNum: number[] = [];
    const runningTotal: number[] = [];

    const sessions = runningXP.slice(-3);

    for (const session of sessions) {
        sessionNum.push(session.session);
        runningTotal.push(session.runningTotal);
    }

    return [
        sessionNum,
        runningTotal
    ]
}

/**
 * 
 * @param sessions 
 * @returns 
 */
function getSessionsPerLevel(sessions: DocsEntry[]): Record<number, number> {
    const sessionsPerLevel: Record<number, number> = {};

    for (const session of sessions) {
        const level = session.data.level!.start;
        if (!sessionsPerLevel[level]) {
            sessionsPerLevel[level] = 0;
        }
        sessionsPerLevel[level]++;
    }

    return sessionsPerLevel;
}

/**
 * 
 * @param sessionData 
 * @returns 
 */
export function getSessionsPerLevelSeries(sessionData: DocsEntry[]): uPlot.AlignedData {
    const sessionsPerLevel = getSessionsPerLevel(sessionData);

    const levels: number[] = [];
    const sessions: (number | null)[] = [];

    Object.entries(sessionsPerLevel).forEach(([level, count]) => {
        levels.push(parseInt(level));
        sessions.push(count ? count : null);
    })

    return [
        levels,
        sessions
    ];
}

/**
 * Convert number to string for display of current level
 * @param num Number from 1-20
 * @returns num converted to string
 */
function convert1To20(num: number): string {
  const words = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", 
    "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", 
    "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"
  ];

  return words[num] || 'Unknown';
}

/**
 * 
 * @param runningXP 
 */
export function getCurrentLevel(runningXP: RunningXPRow[], asString: boolean = true): string | number {
    const latestSession = runningXP.at(-1);
    if (latestSession) {
        if (asString) return convert1To20(latestSession.level);
        else return latestSession.level;
    }

    return "Unknown";
}

export function getTreasureItems(sessions: DocsEntry[]) {
    return sessions.flatMap(s => {
        if (s.data.treasureItems)
            return s.data.treasureItems!
        return [];
    });
}

export function getTreasureTotals(sessions: DocsEntry[]) {
    const total = sessions
        .map(session => session.data.treasureTotal ?? 0)
        .reduce((acc, curr) => acc + curr, 0);
    return total;
}

/**
 * Magic Items
 */

export interface MagicItemTierCounts {
    tier: number;
    common: number;
    uncommon: number;
    rare: number;
    very_rare: number;
    legendary: number;
    unknown: number;
    all: number;
}

type Rarity = keyof Omit<MagicItemTierCounts, 'tier' | 'all'>;

export const rarities: Rarity[] = [
    'common',
    'uncommon',
    'rare',
    'very_rare',
    'legendary',
    'unknown'
];

// Mirrors the tier/level bands from the DMG magic item tables (see magicItemsPerLevel).
const TIER_LEVEL_RANGES = [
    { tier: 1, min: 1, max: 4 },
    { tier: 2, min: 5, max: 10 },
    { tier: 3, min: 11, max: 16 },
    { tier: 4, min: 17, max: 20 },
];

// Convert character level to tier level
function getTierForLevel(level: number): number {
    const range = TIER_LEVEL_RANGES.find(r => level >= r.min && level <= r.max);
    return range ? range.tier : TIER_LEVEL_RANGES[TIER_LEVEL_RANGES.length - 1].tier;
}

function normalizeRarity(rarity?: string): Rarity | null {
    if (!rarity) return null;
    const key = rarity.trim().toLowerCase().replace(/\s+/g, '_');
    if (key === 'common' || key === 'uncommon' || key === 'rare' || key === 'very_rare' || key === 'legendary' || key === 'unknown') {
        return key;
    }
    return null;
}

/**
 * Counts magic items actually awarded to the party, bucketed by DMG tier and rarity,
 * so they can be compared against magicItemsPerLevel. Tier is derived from the party's
 * level at the start of the session the treasure was received in.
 * @param sessions sessionPages
 * @returns one row per tier (1-4), each with counts by rarity plus an "all" total
 */
export function getMagicItemsByTier(sessions: DocsEntry[]): MagicItemTierCounts[] {
    const counts: Record<number, MagicItemTierCounts> = {};
    for (const { tier } of TIER_LEVEL_RANGES) {
        counts[tier] = { tier, common: 0, uncommon: 0, rare: 0, very_rare: 0, legendary: 0, unknown: 0, all: 0 };
    }

    for (const session of sessions) {
        const level = session.data.level?.start;
        const items = session.data.treasureItems;
        if (level == null || !items) continue;

        const tier = getTierForLevel(level);
        for (const item of items) {
            const rarityKey = normalizeRarity(item.rarity);
            if (!rarityKey) continue;
            counts[tier][rarityKey]++;
            counts[tier].all++;
        }
    }

    return Object.values(counts);
}