import React from "react";

import { magicItemsPerLevel } from '../lib/magicitems';
import {  rarities, type MagicItemTierCounts } from '../lib/sessions';

interface TreasureItem {
    item: string;
    value: number;
    rarity?: string;
}

interface MagicItemsTableProps {
    currentLevel: number;
    treasureItems: TreasureItem[];
    partyItemsPerTier: MagicItemTierCounts[];
}

export default function MagicItemsTable({ currentLevel, treasureItems, partyItemsPerTier }: MagicItemsTableProps) {
    const snakeToTitleCase = (str: string) => str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const partyByTier = new Map(partyItemsPerTier.map(row => [row.tier, row]));
    const partyClass = (party: number, row: number) => {
        if (party < row) {
            return "lessItems";
        }
        else if (party > row) {
            return "moreItems";
        }
        else if (party === row) {
            return "exactItems";
        }
        else return "";
    }
    
    return (
        <>
        <style>{`
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th:not(:first-child), 
            td:not(:first-child) {
                border-left: 1px solid #fb923c;
            }
            .currentTier {
                background-color: gray;
            }
            .lessItems {
                color: red !important;
            }
            .exactItems {
                color: green !important;
            }
            .moreItems {
                color: black !important;
            }
        `}
        </style>
        <div className="ttrpg-table-wrapper">
            <table className="ttrpg-table">
                <thead>
                    <tr>
                        <td>Tier</td>
                        <td>Levels</td>
                        {rarities.map((rarity) => {
                            return (
                               <td colSpan={rarity == "unknown" ? 1 : 2}>{snakeToTitleCase(rarity)}</td>
                            )
                        })}
                        <td colSpan={2}>All Items</td>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr>
                        {[...Array(8)].map((_, index) => (
                            <>
                                {(index !== 6) ? <td>{(index > 0) ? "DMG" : ""}</td> : ""}
                                <td>{(index > 0) ? "Party" : ""}</td>
                            </>
                        ))}
                    </tr>
                    {magicItemsPerLevel.map((row, index) => {
                        const party = partyByTier.get(row.tier);
                        const currentTier = currentLevel >= row.levels.min && currentLevel <= row.levels.max;
                        return (
                        <tr key={index} className={currentTier ? "currentTier" : ""}>
                            <td className="text-left">{row.tier}</td>
                            <td className="text-right">{row.levels.min} - {row.levels.max}</td>
                            {rarities.filter(r => r !== "unknown").map((rarity) => {
                                let key: keyof typeof row = rarity;
                                return (
                                    <>
                                        <td>{row[key]}</td>
                                        <td className={partyClass(party?.[rarity] || 0, row[rarity])}>{party?.[rarity] ?? 0}</td>
                                    </>
                                )
                            })}
                            <td>{party?.unknown ?? 0}</td>
                            <td>{row.all}</td>
                            <td className={partyClass(party?.all || 0, row.all)}>{party?.all ?? 0}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}