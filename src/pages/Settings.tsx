import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Save, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const { apiKeys, setApiKey } = useStore();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleShow = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const providers = [
    { key: 'alphaVantage', label: 'Alpha Vantage API Key', placeholder: 'Enter Alpha Vantage Key' },
    { key: 'fmp', label: 'Financial Modeling Prep (FMP) Key', placeholder: 'Enter FMP Key' },
    { key: 'twelveData', label: 'Twelve Data API Key', placeholder: 'Enter Twelve Data Key' },
    { key: 'fred', label: 'FRED (Federal Reserve) API Key', placeholder: 'Enter FRED Key' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
        <p className="text-slate-500">Configure data providers and system preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">API Configuration</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {providers.map((provider) => (
            <div key={provider.key} className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{provider.label}</label>
              <div className="relative">
                <input
                  type={showKeys[provider.key] ? 'text' : 'password'}
                  value={(apiKeys as any)[provider.key]}
                  onChange={(e) => setApiKey(provider.key as any, e.target.value)}
                  placeholder={provider.placeholder}
                  className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <button
                  onClick={() => toggleShow(provider.key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showKeys[provider.key] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Key is stored locally in your browser. Never sent to our servers.
              </p>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </button>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg">
        <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
        <p className="text-indigo-200 text-sm">
          For the most accurate R-Factor scores, we recommend using at least Alpha Vantage and FMP keys. The system automatically prioritizes the best data source for each asset class.
        </p>
      </div>
    </div>
  );
}
