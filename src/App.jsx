import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  DollarSign,
  Users,
  Activity,
  Ticket,
  TrendingUp,
  Target,
  Trophy,
  Megaphone,
  ShoppingBag,
  BarChart3,
} from "lucide-react";

const games = [
  {
    game: "vs Lakers",
    attendance: 18900,
    revenue: 1549800,
    social: 91,
    merch: 320000,
    sponsor: 210000,
    opponent: "Lakers",
  },
  {
    game: "vs Celtics",
    attendance: 18400,
    revenue: 1416800,
    social: 88,
    merch: 280000,
    sponsor: 194000,
    opponent: "Celtics",
  },
  {
    game: "vs Knicks",
    attendance: 17850,
    revenue: 1213800,
    social: 82,
    merch: 245000,
    sponsor: 182000,
    opponent: "Knicks",
  },
  {
    game: "vs Heat",
    attendance: 17100,
    revenue: 1043100,
    social: 76,
    merch: 201000,
    sponsor: 151000,
    opponent: "Heat",
  },
  {
    game: "vs Bulls",
    attendance: 15600,
    revenue: 748800,
    social: 64,
    merch: 142000,
    sponsor: 118000,
    opponent: "Bulls",
  },
  {
    game: "vs Pistons",
    attendance: 13200,
    revenue: 475200,
    social: 48,
    merch: 97000,
    sponsor: 85000,
    opponent: "Pistons",
  },
];

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

export default function App() {
  const [discount, setDiscount] = useState(0);
  const [promoBoost, setPromoBoost] = useState(10);
  const [socialBoost, setSocialBoost] = useState(8);

  const forecastData = useMemo(() => {
    return games.map((g) => {
      const predictedAttendance = Math.round(
        g.attendance +
          promoBoost * 55 +
          socialBoost * 40 -
          discount * 20
      );

      const adjustedRevenue = Math.round(
        predictedAttendance * ((g.revenue / g.attendance) * (1 - discount / 100))
      );

      const utilization = Math.min(
        100,
        Math.round((predictedAttendance / 19000) * 100)
      );

      let recommendation = "Hold Pricing";

      if (utilization > 95) recommendation = "Increase Price";
      if (utilization < 75) recommendation = "Add Promotion";

      return {
        ...g,
        predictedAttendance,
        adjustedRevenue,
        utilization,
        recommendation,
      };
    });
  }, [discount, promoBoost, socialBoost]);

  const totalRevenue = forecastData.reduce(
    (acc, g) => acc + g.adjustedRevenue,
    0
  );

  const avgAttendance = Math.round(
    forecastData.reduce((acc, g) => acc + g.predictedAttendance, 0) /
      forecastData.length
  );

  const avgEngagement = Math.round(
    forecastData.reduce((acc, g) => acc + g.social, 0) /
      forecastData.length
  );

  const avgUtilization = Math.round(
    forecastData.reduce((acc, g) => acc + g.utilization, 0) /
      forecastData.length
  );

  const sponsorData = [
    { name: "Arena Sponsor", value: 35 },
    { name: "Jersey Sponsor", value: 28 },
    { name: "Digital Campaigns", value: 22 },
    { name: "Game Activations", value: 15 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 hidden lg:block">
        <h1 className="text-3xl font-bold mb-2">FanPulse BI</h1>
        <p className="text-slate-400 text-sm mb-8">
          Sports Business Intelligence Platform
        </p>

        <nav className="space-y-3">
          <SidebarItem icon={<BarChart3 size={18} />} label="Executive Dashboard" />
          <SidebarItem icon={<Ticket size={18} />} label="Attendance Forecasting" />
          <SidebarItem icon={<DollarSign size={18} />} label="Revenue Analytics" />
          <SidebarItem icon={<Megaphone size={18} />} label="Sponsor ROI" />
          <SidebarItem icon={<ShoppingBag size={18} />} label="Merchandise Demand" />
          <SidebarItem icon={<TrendingUp size={18} />} label="Fan Engagement" />
        </nav>

        <div className="mt-10 bg-slate-800 rounded-2xl p-4">
          <h3 className="font-semibold mb-2">Dataset Sources</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• NBA Games Dataset (Kaggle)</li>
            <li>• Sports Attendance Dataset</li>
            <li>• NBA Social Metrics Dataset</li>
            <li>• Simulated Ticket Pricing Data</li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div>
          <p className="text-blue-400 font-semibold">
            Sports Business Intelligence Platform
          </p>
          <h1 className="text-5xl font-bold mt-2">Executive Dashboard</h1>
          <p className="text-slate-400 mt-3 max-w-3xl">
            Forecast attendance, ticket demand, sponsorship ROI, merchandise
            sales, and fan engagement using predictive sports business analytics.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            icon={<Ticket />}
            label="Avg Attendance Forecast"
            value={avgAttendance.toLocaleString()}
          />
          <MetricCard
            icon={<DollarSign />}
            label="Projected Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
          />
          <MetricCard
            icon={<Users />}
            label="Arena Utilization"
            value={`${avgUtilization}%`}
          />
          <MetricCard
            icon={<Activity />}
            label="Fan Engagement"
            value={avgEngagement}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-2xl p-5 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">
              Attendance Forecasting
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Current Attendance"
                />
                <Line
                  type="monotone"
                  dataKey="predictedAttendance"
                  stroke="#22C55E"
                  strokeWidth={3}
                  name="Predicted Attendance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <h2 className="text-xl font-bold mb-5">Scenario Simulator</h2>

            <SliderControl
              label="Ticket Discount"
              value={discount}
              setValue={setDiscount}
              max={30}
            />

            <SliderControl
              label="Promotion Boost"
              value={promoBoost}
              setValue={setPromoBoost}
              max={25}
            />

            <SliderControl
              label="Social Campaign Boost"
              value={socialBoost}
              setValue={setSocialBoost}
              max={25}
            />

            <div className="mt-5 bg-slate-800 rounded-xl p-4 text-sm text-slate-300">
              Simulate pricing adjustments, marketing campaigns, and promotions
              to evaluate revenue and attendance outcomes.
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-5">
            <h2 className="text-xl font-bold mb-4">
              Revenue Forecast
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Bar
                  dataKey="adjustedRevenue"
                  fill="#38BDF8"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <h2 className="text-xl font-bold mb-4">
              Fan Engagement Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="social"
                  stroke="#8B5CF6"
                  fill="#7C3AED"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-5">
            <h2 className="text-xl font-bold mb-4">
              Sponsorship ROI Breakdown
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sponsorData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {sponsorData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <h2 className="text-xl font-bold mb-4">
              Merchandise Demand
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Bar
                  dataKey="merch"
                  fill="#10B981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-4">
            Dynamic Pricing Recommendations
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-slate-400">
                <tr>
                  <th className="py-3">Game</th>
                  <th>Attendance Forecast</th>
                  <th>Utilization</th>
                  <th>Revenue Forecast</th>
                  <th>Recommendation</th>
                </tr>
              </thead>

              <tbody>
                {forecastData.map((g) => (
                  <tr
                    key={g.game}
                    className="border-b border-slate-800"
                  >
                    <td className="py-3 font-semibold">{g.game}</td>
                    <td>{g.predictedAttendance.toLocaleString()}</td>
                    <td>{g.utilization}%</td>
                    <td>${g.adjustedRevenue.toLocaleString()}</td>
                    <td>
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        {g.recommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            icon={<Trophy />}
            title="Highest Revenue Projection"
            value="vs Lakers"
            detail="Strong rivalry interest and social engagement create the highest projected ticket demand."
          />

          <InsightCard
            icon={<Target />}
            title="Best Promotion Opportunity"
            value="vs Pistons"
            detail="Lower attendance projection makes this matchup ideal for discount campaigns."
          />

          <InsightCard
            icon={<TrendingUp />}
            title="Top Engagement Matchup"
            value="vs Celtics"
            detail="Social engagement metrics indicate strong digital campaign performance potential."
          />
        </section>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition cursor-pointer">
      <div className="text-blue-400">{icon}</div>
      <span>{label}</span>
    </div>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-5">
      <div className="text-blue-400 mb-3">{icon}</div>
      <p className="text-slate-400 text-sm">{label}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function SliderControl({ label, value, setValue, max }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>

      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function InsightCard({ icon, title, value, detail }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-5">
      <div className="text-green-400 mb-3">{icon}</div>
      <p className="text-slate-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className="text-slate-300 text-sm mt-3">{detail}</p>
    </div>
  );
}
