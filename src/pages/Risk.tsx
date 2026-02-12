// FILE: src/pages/Risk.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Equity', value: 400 },
  { name: 'Fixed Income', value: 300 },
  { name: 'Commodities', value: 300 },
  { name: 'Cash', value: 200 },
];
const COLORS = ['#6366f1', '#a5b4fc', '#e0e7ff', '#f1f5f9'];

const stressTest = [
  { name: '2008 Crash', loss: -45 },
  { name: 'Covid 2020', loss: -35 },
  { name: 'Rate Hike', loss: -15 },
  { name: 'Tech Burst', loss: -25 },
];

export default function Risk() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Risk Analytics (Aladdin-Lite)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h3 className="text-red-800 text-sm font-medium mb-1">Value at Risk (95%)</h3>
          <p className="text-3xl font-bold text-red-900">$12,450</p>
          <p className="text-red-600 text-sm mt-2">Daily potential loss</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
          <h3 className="text-orange-800 text-sm font-medium mb-1">Max Drawdown</h3>
          <p className="text-3xl font-bold text-orange-900">-18.2%</p>
          <p className="text-orange-600 text-sm mt-2">Historical worst case</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h3 className="text-blue-800 text-sm font-medium mb-1">Beta Exposure</h3>
          <p className="text-3xl font-bold text-blue-900">1.12</p>
          <p className="text-blue-600 text-sm mt-2">vs S&P 500</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Asset Allocation Risk</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Historical Crisis Replay</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stressTest} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="loss" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
