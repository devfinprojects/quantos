// FILE: src/pages/Options.tsx
import { useState } from 'react';
import { Search, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

const mockChain = [
  { strike: 145, type: 'Call', exp: '2023-12-15', iv: '45%', delta: 0.34, vol: 12000, signal: 'Bullish Breakout' },
  { strike: 130, type: 'Put', exp: '2023-12-15', iv: '52%', delta: -0.28, vol: 8500, signal: 'Vol Crush Potential' },
  { strike: 150, type: 'Call', exp: '2023-12-22', iv: '48%', delta: 0.25, vol: 5400, signal: 'Gamma Squeeze' },
  { strike: 125, type: 'Put', exp: '2024-01-19', iv: '41%', delta: -0.30, vol: 3200, signal: 'Short Premium' },
];

export default function Options() {
  const [ticker, setTicker] = useState('NVDA');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Options Scanner</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">IV Percentile</p>
            <p className="text-2xl font-bold text-slate-900">84%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 rounded-lg text-rose-600">
            <TrendingDown className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Put/Call Ratio</p>
            <p className="text-2xl font-bold text-slate-900">0.82</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Gamma Exposure</p>
            <p className="text-2xl font-bold text-slate-900">$2.4B</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Detected Opportunities</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Strike</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Expiry</th>
                <th className="px-6 py-3">IV</th>
                <th className="px-6 py-3">Delta</th>
                <th className="px-6 py-3">Volume</th>
                <th className="px-6 py-3">Signal</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockChain.map((opt, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">${opt.strike}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${opt.type === 'Call' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {opt.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{opt.exp}</td>
                  <td className="px-6 py-4 text-slate-600">{opt.iv}</td>
                  <td className="px-6 py-4 text-slate-600">{opt.delta}</td>
                  <td className="px-6 py-4 text-slate-600">{opt.vol.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="text-indigo-600 font-medium">{opt.signal}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">Analyze</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
