export default function RunningXPTable({ xp }: any) {
    return <div className="ttrpg-table-wrapper">
        <table className="ttrpg-table">
            <thead>
                <tr>
                    <th className="text-center">Sessions</th>
                    <th className="text-right">Session XP</th>
                    <th className="text-right">XP Each</th>
                    <th className="text-right">Running Total</th>
                    <th className="text-center">Level</th>
                    <th className="text-left">Session Title</th>
                </tr>
            </thead>
            <tbody className="bg-sf-bg divide-y divide-gray-200">
                {xp.map((row: any, index: number) => (
                    <tr key={index+1} className="hover:bg-gray-50">
                        <td className="text-center">{row.session}</td>
                        <td className="text-right">{row.sessionTotal?.toLocaleString()}</td>
                        <td className="text-right">{row.xpEach?.toLocaleString()}</td>
                        <td className="text-right">{row.runningTotal?.toLocaleString()}</td>
                        <td className="text-center">{row.level}</td>
                        <td className="text-left">{row.title}</td>
                    </tr>
                ))}
                {/* Total Row */}
                <tr key="total" className="hover:bg-gray-50">
                    <td colSpan={3} className="text-left">Total</td>
                    <td className="text-right">{xp.at(-1).runningTotal?.toLocaleString()}</td>
                    <td className="text-center">{xp.at(-1)?.level}</td>
                    <td className="text-left"></td>
                </tr>
            </tbody>
        </table>	
    </div>	
}