import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

interface SessionExperienceProps {
  xp?: uPlot.AlignedData;
}

export default function SessionExperience({ xp }: SessionExperienceProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const opts: uPlot.Options = {
      title: "Session Experience",

      width: 600,
      height: 300,

      scales: {
        x: { time: false },
      },

      series: [
        {
          label: "Session",
        },
        {
          label: "XP",
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

    const data: uPlot.AlignedData = xp || [];

    const plot = new uPlot(opts, data, chartRef.current);

    return () => plot.destroy();
  }, []);

  return <div ref={chartRef}></div>;
}