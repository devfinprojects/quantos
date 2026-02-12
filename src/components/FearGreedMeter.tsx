import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FearGreedProps {
  value: number; // 0-100
  title: string;
  sentiment: string;
}

export default function FearGreedMeter({ value, title, sentiment }: FearGreedProps) {
  // Gauge Data: 5 slices
  const data = [
    { name: 'Extreme Fear', value: 20, color: '#ef4444' }, // Red
    { name: 'Fear', value: 25, color: '#f97316' },        // Orange
    { name: 'Neutral', value: 10, color: '#eab308' },     // Yellow
    { name: 'Greed', value: 25, color: '#84cc16' },       // Lime
    { name: 'Extreme Greed', value: 20, color: '#22c55e' }, // Green
  ];

  // Calculate needle rotation
  // 180 degrees total. 0 = left (Extreme Fear), 100 = right (Extreme Greed)
  const rotation = 180 * (value / 100);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
      <h3 className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">{title}</h3>
      
      <div className="relative w-full h-32 flex justify-center overflow-hidden">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%" // Push down to hide bottom half
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Needle */}
        <div 
            className="absolute bottom-0 w-1 h-20 bg-slate-800 origin-bottom rounded-full transition-transform duration-1000 ease-out"
            style={{ 
                left: '50%',
                bottom: '10px', 
                transform: `translateX(-50%) rotate(${rotation - 90}deg)` // -90 offset because 0deg is right
            }}
        >
            <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-0 -left-1.5 border-2 border-white"></div>
        </div>
      </div>

      <div className="text-center mt-2">
        <div className="text-3xl font-bold text-slate-800">{Math.round(value)}</div>
        <div className={`text-sm font-semibold ${
            sentiment.includes('Fear') ? 'text-red-600' :
            sentiment.includes('Greed') ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {sentiment}
        </div>
      </div>
    </div>
  );
}
