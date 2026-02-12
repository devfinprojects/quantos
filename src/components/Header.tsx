// FILE: src/components/Header.tsx
import { Link } from 'react-router-dom';
import { Bell, Search, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tickers, strategies, or risk factors..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          System Operational
        </div>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <Bell className="h-5 w-5" />
        </button>
        <Link to="/settings" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <Settings className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
