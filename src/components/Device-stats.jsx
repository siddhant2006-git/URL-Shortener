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

export default function Device({ stats }) {
  const deviceCount = stats?.reduce((acc, item) => {
    const key = item.device || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const result = Object.entries(deviceCount || {}).map(([device, count]) => ({
    device,
    count,
  }));

  const hasData = result.length > 0 && stats.length > 0;

  return (
    <div className="w-full max-w-xl mx-auto bg-[#11141b] border border-[#2a2d33] p-6 rounded-xl shadow-sm text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Device Usage
      </h2>

      {hasData ? (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={result}
                labelLine={false}
                outerRadius={100}
                label={({ device, percent }) =>
                  `${device} (${(percent * 100).toFixed(0)}%)`
                }
                dataKey="count"
                nameKey="device"
              >
                {result.map((_, index) => (
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
              <Legend
                iconType="circle"
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-white">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm">
          No device data available.
        </p>
      )}
    </div>
  );
}
