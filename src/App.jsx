import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Ticket,
  Target,
} from "lucide-react";

const baseGames = [
  { game: "vs Bulls", opponent: 72, attendance: 15600, price: 48, social: 64, promo: "None", revenue: 748800 },
  { game: "vs Lakers", opponent: 94, attendance: 18900, price: 82, social: 91, promo: "Jersey Night", revenue: 1549800 },
  { game: "vs Heat", opponent: 81, attendance: 17100, price: 61, social: 76, promo: "Student Night", revenue: 1043100 },
  { game: "vs Knicks", opponent: 86, attendance: 17850, price: 68, social: 82, promo: "Sponsor Night", revenue: 1213800 },
  { game: "vs Celtics", opponent: 92, attendance: 18400, price: 77, social: 88, promo: "Rivalry Game", revenue: 1416800 },
  { game: "vs Pistons", opponent: 55, attendance: 13200, price: 36, social: 48, promo: "Discount Night", revenue: 475200 },
];

export default function App() {
  const [discount, setDiscount] = useState(0);
  const [promoBoost, setPromoBoost] = useState(8);
  const [socialBoost, setSocialBoost] = useState(5);

  const data = useMemo(() => {
    return baseGames.map((g) => {
      const demandBoost =
        g.opponent * 0.08 +
        g.social * 0.05 +
        promoBoost * 45 +
        socialBoost * 30 -
        discount * 22;

      const predictedAttendance = Math.round(g.attendance + demandBoost);
      const adjustedPrice = Math.max(20, Math.round(g.price * (1 - discount / 100)));
      const predictedRevenue = predictedAttendance * adjustedPrice;
      const utilization = Math.min(100, Math.round((predictedAttendance / 19000) * 100));

      let recommendation = "Hold Pricing";
      if (utilization > 92) recommendation = "Increase Price";
      if (utilization < 75) recommendation = "Add Promotion";

      return {
        ...g,
        predictedAttendance,
        adjustedPrice,
        predictedRevenue,
        utilization,
        recommendation,
      };
    });
  }, [discount, promoBoost, socialBoost]);

  const totalRevenue = data.reduce((sum, g) => sum + g.predictedRevenue, 0);
  const avgAttendance = Math.round(
    data.reduce((sum, g) => sum + g.predictedAttendance, 0) / data.length
  );
  const avgUtilization = Math.round(
    data.reduce((sum, g) => sum + g.utilization, 0) / data.length
  );
  const avgSocial = Math.round(data.reduce((sum, g) => sum + g.social, 0) / data.length);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-blue-400 font-semibold">Sports Business Intelligence Platform</p>
          <h1 className="text-4xl md:text-6xl font-bold">FanPulse BI</h1>
          <p className="text-slate-300 max-w-3xl">
            Forecast ticket demand, attendance, fan engagement, sponsorship ROI, and revenue
            opportunities using sports business analytics.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard icon={<Ticket />} label="Avg Attendance Forecast" value={avgAttendance.toLocaleString()} />
          <MetricCard icon={<DollarSign />} label="Projected Revenue" value={`$${totalRevenue.toLocaleString()}`} />
          <MetricCard icon={<Users />} label="Arena Utilization" value={`${avgUtilization}%`} />
          <MetricCard icon={<Activity />} label="Fan Engagement Score" value={avgSocial} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-2xl p-5 shadow-xl lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Attendance Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" name="Current Attendance" stroke="#60A5FA" strokeWidth={3} />
                <Line type="monotone" dataKey="predictedAttendance" name="Predicted Attendance" stroke="#22C55E" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Scenario Simulator</h2>

            <Control
              label="Ticket Discount"
              value={discount}
              setValue={setDiscount}
              max={30}
              suffix="%"
            />
            <Control
              label="Promotion Boost"
              value={promoBoost}
              setValue={setPromoBoost}
              max={25}
              suffix="%"
            />
            <Control
              label="Social Campaign Boost"
              value={socialBoost}
              setValue={setSocialBoost}
              max={25}
              suffix="%"
            />

            <div className="mt-5 bg-slate-800 rounded-xl p-4 text-sm text-slate-300">
              Adjust pricing, promotions, and social campaign strength to simulate sports operations decisions.
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Revenue Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Bar dataKey="predictedRevenue" name="Projected Revenue" fill="#38BDF8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Fan Engagement Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="game" stroke="#CBD5E1" />
                <YAxis stroke="#CBD5E1" />
                <Tooltip />
                <Area type="monotone" dataKey="social" name="Engagement Score" stroke="#A78BFA" fill="#7C3AED" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-5 shadow-xl">
          <h2 className="text-xl font-bold mb-4">Dynamic Pricing Recommendations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3">Game</th>
                  <th>Promotion</th>
                  <th>Predicted Attendance</th>
                  <th>Utilization</th>
                  <th>Adjusted Price</th>
                  <th>Projected Revenue</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {data.map((g) => (
                  <tr key={g.game} className="border-b border-slate-800">
                    <td className="py-3 font-semibold">{g.game}</td>
                    <td>{g.promo}</td>
                    <td>{g.predictedAttendance.toLocaleString()}</td>
                    <td>{g.utilization}%</td>
                    <td>${g.adjustedPrice}</td>
                    <td>${g.predictedRevenue.toLocaleString()}</td>
                    <td>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
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
          <Insight title="Best Revenue Game" value="vs Lakers" detail="Highest projected demand from opponent strength, rivalry interest, and social engagement." />
          <Insight title="Best Promotion Opportunity" value="vs Pistons" detail="Lower projected utilization makes this game ideal for discounts or student bundles." />
          <Insight title="Sponsor ROI Focus" value="vs Knicks" detail="Strong social score and attendance projection make this ideal for sponsor activation." />
        </section>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-xl">
      <div className="text-blue-400 mb-3">{icon}</div>
      <p className="text-slate-400 text-sm">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function Control({ label, value, setValue, max, suffix }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold">{value}{suffix}</span>
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

function Insight({ title, value, detail }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-xl">
      <div className="text-green-400 mb-3">
        <Target />
      </div>
      <p className="text-slate-400 text-sm">{title}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
      <p className="text-slate-300 text-sm mt-2">{detail}</p>
    </div>
  );
}
