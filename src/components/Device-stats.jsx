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
  "#000000",
  "#1a1a1a",
  "#333333",
  "#4d4d4d",
  "#666666",
  "#808080",
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
    <div className="w-full max-w-xl mx-auto bg-off-white border border-light-gray p-6 rounded-xl shadow-sm text-black">
      <h2 className="text-xl sm:text-2xl font-thin mb-6 text-center">
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
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "0.5rem",
                  color: "#000",
                }}
                itemStyle={{ color: "#000" }}
              />
              <Legend
                iconType="circle"
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-black">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-medium-gray text-sm">
          No device data available.
        </p>
      )}
    </div>
  );
}
