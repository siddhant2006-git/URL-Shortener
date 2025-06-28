/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LocationStats({ stats = [] }) {
  const cityCount = stats.reduce((acc, item) => {
    const city = item.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city: city.length > 15 ? city.slice(0, 12) + "..." : city,
    count,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#11141b] border border-[#2a2d33] p-6 rounded-xl shadow-sm text-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Top Locations</h2>

      {cities.length > 0 ? (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cities.slice(0, 5)}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="city" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f22",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "#ffffff" }}
                itemStyle={{ color: "#00C49F" }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#cbd5e1", fontSize: "0.875rem" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#00C49F"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-400">No location data available.</p>
      )}
    </div>
  );
}
