import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

const { bars } = uPlot.paths;

interface SessionExperienceProps {
  xp?: uPlot.AlignedData;
}

const xp_table = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]

export default function RecentXP({ xp }: any) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!chartRef.current) return;

    const opts: uPlot.Options = {
        title: "Recent Experience",

        width: 1200,
        height: 600,

        scales: {
            x: { 
                time: false,
                range: (self, dataMin, dataMax) => {
                    // if data empty/undefined, fall back to default range
                    if (dataMin === undefined || dataMax === undefined) {
                        return [0, 10];
                    }

                    return [dataMin - 0.5, dataMax + 0.5]; // Add padding to the left and right
                }
            },
            y: {
                time: false,
                range: (self, dataMin, dataMax) => {
                    for (const level in xp_table) {
                        const nextMax = parseInt(level);
                        if (dataMax <= nextMax) {
                            return [dataMin, nextMax];
                        }
                    }
                    return [0, dataMax + 500];
                }
            }
        },

        series: [
            {
                label: "Session",
            },
            {
                label: "XP",
                fill: "rgba(123, 23, 23, 0.2)", // Color inside the bars
                stroke: "red",
                width: 1,
                paths: bars?.({
                size: [0.5, 100], // [barWidthFactor, maxBarWidthPixels] 60% of available slot
                align: 0,         // Center the bar over the X-axis tick (Session number)
                }),
            },
        ],

        axes: [
            {
                label: "Session",
                incrs: [1],
                labelFont: "14px 'Share Tech Mono', ui-monospace, monospace",
                size: 30,
                stroke: "rgb(251, 146, 60)",
                font: "12px 'Share Tech Mono', ui-monospace, monospace",
                grid: {
                    stroke: "rgb(251, 146, 60, 0.25)",
                    width: 1,
                },
                ticks: {
                    stroke: "rgb(251, 146, 60, 0.25)",
                    width: 1,
                }
            },
            {
                label: "XP",
                incrs: [50, 500, 1000, 5000],
                labelFont: "14px 'Share Tech Mono', ui-monospace, monospace",
                labelSize: 30,
                stroke: "rgb(251, 146, 60)",
                font: "12px 'Share Tech Mono', ui-monospace, monospace",
                grid: {
                    stroke: "rgb(251, 146, 60, 0.25)",
                    width: 1,
                },
                ticks: {
                    stroke: "rgb(251, 146, 60, 0.5)",
                    width: 1,
                }
            },
        ],
    };

    const data: uPlot.AlignedData = xp ? [
        [...xp[0].slice(-3)], // Session numbers
        [...xp[1].slice(-3)], // XP values
    ] : [];

    const plot = new uPlot(opts, data, chartRef.current);

    return () => plot.destroy();
    }, []);

    return <div ref={chartRef}></div>;
}
