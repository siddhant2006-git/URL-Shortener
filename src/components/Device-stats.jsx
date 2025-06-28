/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#FF6F91",
];

export default function Device({ stats = [] }) {
  const deviceCount = stats.reduce((acc, item) => {
    const type = item.device || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(deviceCount).map(([device, count]) => ({
    name: device,
    value: count,
  }));

  return (
    <div className="w-full max-w-xl mx-auto bg-[#11141b] border border-[#2a2d33] p-6 rounded-xl shadow-sm text-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Device Usage</h2>
      {chartData.length > 0 ? (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f22",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend iconType="circle" verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-400">No device data available.</p>
      )}
    </div>
  );
}
