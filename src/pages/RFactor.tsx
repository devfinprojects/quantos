// FILE: src/pages/RFactor.tsx
import { useState } from 'react';
import { Search } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

export default function RFactor() {
  const [symbol, setSymbol] = useState('AAPL');
  
  const mockData = [
    { subject: 'Momentum', A: 120, fullMark: 150 },
    { subject: 'Volatility', A: 98, fullMark: 150 },
    { subject: 'Value', A: 86, fullMark: 150 },
    { subject: 'Quality', A: 99, fullMark: 150 },
    { subject: 'Growth', A: 85, fullMark: 150 },
    { subject: 'Liquidity', A: 65, fullMark: 150 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">R-Factor Engine</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">{symbol} Composite Score</h3>
          <div className="h-96 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name={symbol} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-4">Factor Breakdown</h3>
            <div className="space-y-4">
              {mockData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{item.subject}</span>
                    <span className="font-bold text-indigo-600">{item.A}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${(item.A / item.fullMark) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-900 p-6 rounded-xl text-white shadow-lg">
            <div className="text-4xl font-bold mb-1">87</div>
            <div className="text-indigo-200 text-sm mb-4">Composite R-Factor</div>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Strong momentum signals backed by institutional liquidity flow. Volatility remains compressed, suggesting potential breakout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
