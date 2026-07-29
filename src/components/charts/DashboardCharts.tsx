import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export default function Dashboard() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const opts: uPlot.Options = {
      title: "Recent Experience",

      width: 400,
      height: 200,

      series: [
        {},
        {
          label: "XP",
          stroke: "cyan",
          width: 2,
          points: {
            show: true,
          },
        },
      ],

      axes: [
        {
          label: "Session",
        },
        {
          label: "XP",
        },
      ],
    };

    const data: uPlot.AlignedData = [
      new Float64Array([1, 2, 3]),
      new Float64Array([0, 250, 600]),
    ];

    const plot = new uPlot(opts, data, chartRef.current);

    return () => plot.destroy();
  }, []);

  return <div ref={chartRef}></div>;
}