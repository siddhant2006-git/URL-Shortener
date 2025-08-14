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
    <div className="w-full max-w-3xl mx-auto text-black p-6 rounded-xl shadow-md bg-gray-50 border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-thin mb-6 text-center">
        Top Locations
      </h2>

      {cities.length > 0 ? (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cities.slice(0, 5)}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <XAxis
                dataKey="city"
                tick={{ fill: "#4b5563", fontSize: 12 }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "0.5rem",
                  color: "#000",
                }}
                labelStyle={{ color: "#000" }}
                itemStyle={{ color: "#00C49F" }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#6b7280", fontSize: "0.875rem" }}
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
        <div className="flex flex-col items-center justify-center gap-2 py-20">
          <p className="text-gray-500 text-center">
            No location data available.
          </p>
        </div>
      )}
    </div>
  );
}
