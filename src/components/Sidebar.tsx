// FILE: src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, ShieldAlert, Binary } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/r-factor', label: 'R-Factor Engine', icon: BarChart2 },
  { path: '/options', label: 'Options Scanner', icon: Binary },
  { path: '/risk', label: 'Risk Analytics', icon: ShieldAlert },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tighter text-indigo-400">QUANT<span className="text-white">OS</span></h1>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-colors group",
                isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">JD</div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-slate-500">Portfolio Mgr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
