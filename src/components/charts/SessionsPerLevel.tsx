import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

const { bars } = uPlot.paths;

interface SessionExperienceProps {
  xp?: any[]
}

export default function SessionsPerLevel({ xp }: SessionExperienceProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!chartRef.current) return;

    const sessions: number[] = xp?.[0] || [];
    const levels: number[] = xp?.[1] || [];

    const opts: uPlot.Options = {
        title: "Sessions Per Level",

        width: 600,
        height: 300,

        scales: {
            x: { 
                time: false,
                range: (self, dataMin, dataMax) => {
                    // if data empty/undefined, fall back to default range
                    if (dataMin === undefined || dataMax === undefined) {
                        return [0, 5];
                    }

                    return [dataMin - 1, dataMax + 1]; // Add padding to the left and right
                }
            },
            y: {
                range: (self, dataMin, dataMax) => {
                    // if data empty/undefined, fall back to default range
                    if (dataMin === undefined || dataMax === undefined) {
                        return [0, 5];
                    }

                    return [0, dataMax + 1]; // Add padding to the left and right
                }
            },
        },

        series: [
        {
            label: "Level",
        },
        {
            label: "Sessions",
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
            label: "Level",
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
            label: "Sessions",
            incrs: [1],
            labelFont: "14px 'Share Tech Mono', ui-monospace, monospace",
            labelSize: 50,
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

    const data: uPlot.AlignedData = [
        [...sessions],
        [...levels]
    ];

    const plot = new uPlot(opts, data, chartRef.current);

    return () => plot.destroy();
    }, []);

    return <div ref={chartRef}></div>;
}
