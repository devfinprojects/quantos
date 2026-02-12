import { useEffect, useState } from 'react';
import { MarketService, FearGreedData } from '../services/marketData';
import FearGreedMeter from '../components/FearGreedMeter';
import SectorHeatmap from '../components/SectorHeatmap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function Dashboard() {
  const [fearGreed, setFearGreed] = useState<Record<string, FearGreedData | null>>({
    US: null,
    India: null,
    Crypto: null,
    Gold: null
  });

  useEffect(() => {
    const fetchData = async () => {
      const us = await MarketService.getFearGreedIndex('US');
      const india = await MarketService.getFearGreedIndex('India');
      const crypto = await MarketService.getFearGreedIndex('Crypto');
      const gold = await MarketService.getFearGreedIndex('Gold');
      setFearGreed({ US: us, India: india, Crypto: crypto, Gold: gold });
    };
    fetchData();
  }, []);

  const fiiDiiData = [
    { date: 'Mon', FII: -1200, DII: 1500 },
    { date: 'Tue', FII: -800, DII: 900 },
    { date: 'Wed', FII: 400, DII: -200 },
    { date: 'Thu', FII: -2500, DII: 2100 },
    { date: 'Fri', FII: 1200, DII: 500 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Nifty 50 PE</p>
                <p className="text-xl font-bold text-slate-800">22.45</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Activity className="w-5 h-5" /></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase">India VIX</p>
                <p className="text-xl font-bold text-slate-800">13.20</p>
            </div>
             <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Activity className="w-5 h-5" /></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase">US VIX</p>
                <p className="text-xl font-bold text-slate-800">12.85</p>
            </div>
             <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Activity className="w-5 h-5" /></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Gold PE (Est)</p>
                <p className="text-xl font-bold text-slate-800">28.10</p>
            </div>
             <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600"><DollarSign className="w-5 h-5" /></div>
         </div>
      </div>

      {/* Fear & Greed Section */}
      <h2 className="text-xl font-bold text-slate-800 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
        Market Sentiment & Mood
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fearGreed.US && <FearGreedMeter value={fearGreed.US.value} title="US Market (CNBC)" sentiment={fearGreed.US.sentiment} />}
        {fearGreed.India && <FearGreedMeter value={fearGreed.India.value} title="India Market (Tickertape)" sentiment={fearGreed.India.sentiment} />}
        {fearGreed.Crypto && <FearGreedMeter value={fearGreed.Crypto.value} title="Crypto Market" sentiment={fearGreed.Crypto.sentiment} />}
        {fearGreed.Gold && <FearGreedMeter value={fearGreed.Gold.value} title="Gold Market" sentiment={fearGreed.Gold.sentiment} />}
      </div>

      {/* Heatmap & FII/DII */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorHeatmap />
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">FII / DII Activity Trend</h3>
                <div className="flex space-x-2 text-xs">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span> FII (Net Sell)</span>
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> DII (Net Buy)</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fiiDiiData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        cursor={{fill: '#f1f5f9'}}
                    />
                    <Legend />
                    <Bar dataKey="FII" fill="#ef4444" radius={[4, 4, 0, 0]} name="Foreign Inst." />
                    <Bar dataKey="DII" fill="#22c55e" radius={[4, 4, 0, 0]} name="Domestic Inst." />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
