"use client";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip p-3 bg-gray-800 border border-amber-300">
        <p className="label">{`Score: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
const AreaChartC = ({ record }) => {
  const Data = record.map((item, index) => ({
    index: index + 1,
    score: item.score,
  }));
  return (
    <ResponsiveContainer height={300} width={750}>
      <BarChart
        height={300}
        width={750}
        data={Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="index" />
        <YAxis domain={[40, 100]} />

        <Tooltip content={<CustomTooltip />} />
        <Bar fill="#ffc400" dataKey="score" barSize={50} activeFill="FFFF93" />
      </BarChart>
      {record.length < 1 && (
        <h1 className="text-xl flex justify-center ">
          No record data available.
        </h1>
      )}
    </ResponsiveContainer>
  );
};

export default AreaChartC;
