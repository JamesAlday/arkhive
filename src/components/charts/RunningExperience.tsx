import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

interface RunningExperienceProps {
  xp?: uPlot.AlignedData;
}

export default function RunningExperience({ xp }: RunningExperienceProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const opts: uPlot.Options = {
      title: "Running Total Experience",

      width: 600,
      height: 300,

      scales: {
        x: { time: false },
        y: {
          range: (_plot, _min, max) => [0, (Math.floor(max / 1000) + 1) * 1000],
        },
      },

      series: [
        {
          label: "Session",
        },
        {
          label: "Running XP",
          stroke: "red",
          width: 2,
          points: {
            show: true,
          },
        },
      ],

      axes: [
        {
          label: "Session",
          splits: (_plot, _axisIndex, min, max) => {
            const splits: number[] = [];
            for (let value = Math.ceil(min); value <= max; value++) {
              splits.push(value);
            }
            return splits;
          },
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
          },
        },
        {
          label: "Running XP",
          splits: (_plot, _axisIndex, min, max) => {
            const splits: number[] = [];
            for (let value = Math.ceil(min / 1000) * 1000; value <= max; value += 1000) {
              splits.push(value);
            }
            return splits;
          },
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
          },
        },
      ],
    };

    const data: uPlot.AlignedData = xp || [];
    const plot = new uPlot(opts, data, chartRef.current);

    return () => plot.destroy();
  }, []);

  return <div ref={chartRef}></div>;
}