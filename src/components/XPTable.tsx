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
    // if (!encounters || encounters.length === 0) {
    //     return <p className="text-gray-500 italic">No encounters recorded for this session.</p>;
    // }
    
    return (
        <section className="xp-section">
            <h3>Encounter Breakdown & Rewards</h3>
            {encounters.length > 0 && (
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
            ) || 
                <div className="empty-message">
                    No encounters recorded for this session.
                </div>
            }
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

        </section>
    )
}