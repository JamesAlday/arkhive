import { useEffect, useRef } from "react";
import uPlot, { type AlignedData } from "uplot";
import "uplot/dist/uPlot.min.css";

const opts: uPlot.Options = {
    width: 340,
    height: 180,

    title: "Recent Experience",

    // scales: {
    //     // x: { time: false },
    //     x: {},
    // },

    axes: [
        {
            label: "Session",
        },
        {
            label: "XP",
        },
    ],

    series: [
        {}, // x values

        {
            label: "XP Each",
            stroke: "#50E3C2",
            width: 2,

            points: {
                show: true,
                size: 6,
            },
        },
    ],
};

interface Props {
    data: AlignedData,
}
export default function Dashboard(data: Props) {
    const chartRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!chartRef.current) return;

        const plot = new uPlot(opts, data.data, chartRef.current);

        return () => plot.destroy();
    }, [data]);

    return <div ref={chartRef}></div>;
}