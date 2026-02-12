import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

const data = [
  { name: 'Technology', size: 120, fill: '#22c55e' }, // Green
  { name: 'Healthcare', size: 80, fill: '#ef4444' },  // Red
  { name: 'Financials', size: 70, fill: '#4ade80' },  // Light Green
  { name: 'Cons. Disc', size: 60, fill: '#f87171' },  // Light Red
  { name: 'Comm. Svcs', size: 50, fill: '#16a34a' },
  { name: 'Industrials', size: 45, fill: '#dcfce7' },
  { name: 'Cons. Stap', size: 40, fill: '#fee2e2' },
  { name: 'Energy', size: 35, fill: '#b91c1c' },
  { name: 'Utilities', size: 30, fill: '#fca5a5' },
  { name: 'Real Estate', size: 25, fill: '#86efac' },
  { name: 'Materials', size: 20, fill: '#fca5a5' },
];

const CustomContent = (props: any) => {
  const { x, y, width, height, name, size } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: props.fill,
          stroke: '#fff',
          strokeWidth: 2,
        }}
      />
      {width > 30 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#1e293b"
          fontSize={12}
          fontWeight="bold"
        >
          {name}
        </text>
      )}
       {width > 30 && height > 50 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 16}
          textAnchor="middle"
          fill="#334155"
          fontSize={10}
        >
          {size > 50 ? '+1.2%' : '-0.8%'}
        </text>
      )}
    </g>
  );
};

export default function SectorHeatmap() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Sector Rotation Heatmap</h3>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomContent />}
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
