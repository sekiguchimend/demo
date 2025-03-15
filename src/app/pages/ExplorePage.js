// pages/ExplorePage.js
import React from 'react';
import { Search, Download, Sparkles, Zap } from 'lucide-react';

const ExplorePage = () => {
  // フォーマット用のヘルパー関数
  const formatNumber = (num) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
  };
  
  // 人気のフィルター一覧
  const popularFilters = [
    { id: 1, name: "サイバーパンク", creator: "@neon_designer", downloads: 32150 },
    { id: 2, name: "夏の思い出", creator: "@summer_vibes", downloads: 28764 },
    { id: 3, name: "モノクローム＋", creator: "@mono_master", downloads: 19532 },
    { id: 4, name: "アニメスタイル", creator: "@anime_lover", downloads: 15678 }
  ];

  return (
    <div className="bg-gray-100" style={{ height: "100vh", overflow: "auto" }}>
      <div className="sticky top-0 z-10 bg-white p-3 border-b-gray-300  border-b-[1px] w-full">
        <div className="max-w-screen-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg block w-full pl-10 pr-4 p-2.5" 
            placeholder="フィルター、クリエイターを検索..."
          />
        </div>
      </div>
      
      <div className="max-w-screen-md mx-auto p-3">
        <h3 className="font-bold text-lg mb-3">人気のフィルター</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {popularFilters.map((filter, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: index % 2 === 0 ? 
                      'linear-gradient(135deg, #6366f1, #a855f7)' : 
                      'linear-gradient(135deg, #3b82f6, #14b8a6)'
                  }}
                >
                  <Sparkles size={28} className="text-white" />
                </div>
                <div className="absolute bottom-2 right-2">
                  <button className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 flex items-center">
                    <Download size={12} className="mr-1" /> 
                    使う
                  </button>
                </div>
              </div>
              <div className="p-2">
                <h4 className="font-medium text-sm">{filter.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{filter.creator}</p>
                  <p className="text-xs flex items-center text-gray-500">
                    <Download size={10} className="mr-1" /> {formatNumber(filter.downloads)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="font-bold text-lg mb-3">トレンド</h3>
        <div className="bg-white rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-3 border-b pb-3 mb-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Zap size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">今週人気急上昇中の夏フィルター</h4>
              <p className="text-xs text-gray-500">8つの新しいフィルターを探索する</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                <div 
                  className="w-full h-full"
                  style={{
                    background: i % 2 === 0 ? 
                      'linear-gradient(to bottom, #fdba74, #fb923c)' : 
                      'linear-gradient(to bottom, #fde047, #facc15)'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3">新着フィルター</h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: i % 2 === 0 ? 
                      'linear-gradient(135deg, #0ea5e9, #22d3ee)' : 
                      'linear-gradient(135deg, #8b5cf6, #c084fc)'
                  }}
                >
                  <Sparkles size={28} className="text-white" />
                </div>
                <div className="absolute top-2 left-2">
                  <div className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                    NEW
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <button className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 flex items-center">
                    <Download size={12} className="mr-1" /> 
                    使う
                  </button>
                </div>
              </div>
              <div className="p-2">
                <h4 className="font-medium text-sm">新フィルター {i}</h4>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">@creator_{i}</p>
                  <p className="text-xs flex items-center text-gray-500">
                    <Download size={10} className="mr-1" /> {i * 120}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;