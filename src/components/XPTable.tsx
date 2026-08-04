import React from "react";

interface Encounter {
    encounter: string;
    cr: number | null;
    quantity: number;
    xpEach: number;
    xpTotal: number;
}

interface XP {
    total: number;
    each: number;
    players: number;
}

interface TreasureItem {
    item: string;
    value: number;
}

interface XPTableProps {
  encounters: Encounter[];
  xp: XP;
  treasureItems: TreasureItem[];
  treasureTotal: number;
}

export default function XPTable({ encounters, xp, treasureItems, treasureTotal }: XPTableProps) {
    if (!encounters || encounters.length === 0) {
        return <p className="text-gray-500 italic">No encounters recorded for this session.</p>;
    }
    
    return (
        <section className="xp-section">
            <h3>Encounter Breakdown & Rewards</h3>
            <div className="ttrpg-table-wrapper">
                <table className="ttrpg-table">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-left">Encounter</th>
                            <th className="text-center">CR</th>
                            <th className="text-center">Qty</th>
                            <th className="text-right">XP/ea</th>
                            <th className="text-right">XP/total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {encounters.map((encounter, index) => (
                            <tr key={index+1} className="hover:bg-gray-50">
                                <td className="text-center">{index+1}</td>
                                <td className="text-left">{encounter.encounter}</td>
                                <td className="text-center">{encounter.cr}</td>
                                <td className="text-center">{encounter.quantity}</td>
                                <td className="text-right">{encounter.xpEach?.toLocaleString()}</td>
                                <td className="text-right">{encounter.xpTotal?.toLocaleString()}</td>
                            </tr>
                        ))}
                        {/* Total Row */}
                        <tr className="">
                            <td colSpan={5} className="text-right">Total Session XP:</td>
                            <td className="text-right">{xp.total.toLocaleString()}</td>
                        </tr>
                        <tr className="">
                            <td colSpan={5} className="text-right">Total Session XP:</td>
                            <td className="text-right">{xp.each.toLocaleString()}</td>
                        </tr>
                        <tr className="">
                            <td colSpan={5} className="text-right">Players:</td>
                            <td className="text-right">{xp.players.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {(treasureItems.length > 0 || treasureTotal > 0) && (
            <div className="ttrpg-table-wrapper">
                <table className="ttrpg-table">
                    <thead>
                        <tr>
                            <th className="text-left">Treasure</th>
                            <th className="text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {treasureItems.map((item, index) => (
                            <tr key={index} className="">
                                <td className="text-left">{item.item}</td>
                                <td className="text-right">{item.value}</td>
                            </tr>
                        ))}
                        {/* Total Row */}
                        <tr className="">
                            <td colSpan={2} className="text-right"><strong>Total: </strong>{treasureTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )}
            <style>{`
                .xp-section {
                    margin-top: 2rem;
                }
                .ttrpg-table-wrapper {
                overflow-x: auto;
                margin: 1.5rem 0;
                border: 1px solid var(--sl-color-gray-5);
                border-radius: 0.5rem;
                }
                .ttrpg-table {
                width: 100%;
                border-collapse: collapse;
                font-size: var(--sl-text-sm);
                }
                .ttrpg-table th {
                background-color: var(--sl-color-gray-6);
                color: var(--sl-color-gray-2);
                font-weight: 700;
                padding: 0.75rem 1rem;
                text-transform: uppercase;
                font-size: var(--sl-text-xs);
                border-bottom: 2px solid var(--sl-color-gray-5);
                }
                .ttrpg-table td {
                padding: 0.75rem 1rem;
                color: var(--sl-color-white);
                border-bottom: 1px solid var(--sl-color-gray-5);
                }
                .ttrpg-table tbody tr:hover {
                background-color: var(--sl-color-gray-6);
                }
                .ttrpg-table tfoot td {
                font-weight: 600;
                background-color: var(--sl-color-gray-6);
                color: var(--sl-color-accent-high);
                border-top: 2px solid var(--sl-color-gray-5);
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .font-mono { font-family: var(--sl-font-mono); }
                .font-bold { font-weight: 700; }
            `}</style>
        </section>
    )
}