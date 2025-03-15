// components/CameraControls.js - カメラコントロールコンポーネント
import React from 'react';
import { Camera, FlipHorizontal, Zap, RefreshCw, Settings } from 'lucide-react';

const CameraControls = ({ 
  isCapturing,
  onCapture, 
  onSwitchCamera, 
  onToggleFilters,
  showFilters,
  filters,
  gradientFilter,
  selectedPreset,
  filterPresets,
  onApplyPreset,
  onFilterChange,
  onGradientChange,
  onResetFilters
}) => {
  return (
    <>
      {/* カメラ操作ボタン */}
      {isCapturing && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 items-center">
          <button 
            onClick={onSwitchCamera} 
            className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg backdrop-blur-sm camera-btn"
            aria-label="カメラを切り替え"
          >
            <FlipHorizontal size={24} />
          </button>
          <button 
            onClick={onCapture} 
            className="relative bg-white p-1 rounded-full shadow-lg camera-btn"
            aria-label="写真を撮影"
          >
            <div className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
          </button>
          <button 
            onClick={onToggleFilters} 
            className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg backdrop-blur-sm camera-btn"
            aria-label="フィルター設定を表示"
          >
            <Zap size={24} />
          </button>
        </div>
      )}

      {/* フィルター設定パネル */}
      {showFilters && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-4 rounded-t-2xl z-20 max-h-[70vh] overflow-y-auto filter-panel">
          <div className="max-w-screen-md mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Settings size={20} className="text-purple-400" />
                フィルター設定
              </h2>
              <button 
                onClick={onResetFilters}
                className="text-purple-400 flex items-center gap-1 hover:text-purple-300 transition"
                aria-label="フィルターをリセット"
              >
                <RefreshCw size={16} />
                リセット
              </button>
            </div>
            
            {/* フィルタープリセット */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-300">
                <Zap size={16} className="text-purple-400" />
                フィルタープリセット
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filterPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onApplyPreset(preset)}
                    className={`p-3 text-sm rounded-lg border ${selectedPreset === preset.name ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                  >
                    <span className="mr-2 text-lg">{preset.icon}</span> {preset.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* グラデーションフィルター */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-300">
                <Zap size={16} className="text-purple-400" />
                グラデーションフィルター
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button 
                  onClick={() => onGradientChange('none')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'none' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  なし
                </button>
                <button 
                  onClick={() => onGradientChange('rainbow')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'rainbow' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  🌈 レインボー
                </button>
                <button 
                  onClick={() => onGradientChange('sunset')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'sunset' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  🌅 サンセット
                </button>
                <button 
                  onClick={() => onGradientChange('neon')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'neon' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  ✨ ネオン
                </button>
                <button 
                  onClick={() => onGradientChange('cool')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'cool' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  ❄️ クール
                </button>
                <button 
                  onClick={() => onGradientChange('warm')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'warm' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  🔥 ウォーム
                </button>
              </div>
            </div>
            
            {/* 詳細調整スライダー */}
            <div className="space-y-5">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-300">
                <Settings size={16} className="text-purple-400" />
                詳細調整
              </h3>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>明るさ</span>
                  <span className="text-purple-400">{filters.brightness}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.brightness} 
                  onChange={(e) => onFilterChange('brightness', e.target.value)}
                  className="w-full"
                  aria-label="明るさの調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>コントラスト</span>
                  <span className="text-purple-400">{filters.contrast}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.contrast} 
                  onChange={(e) => onFilterChange('contrast', e.target.value)}
                  className="w-full"
                  aria-label="コントラストの調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>彩度</span>
                  <span className="text-purple-400">{filters.saturate}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.saturate} 
                  onChange={(e) => onFilterChange('saturate', e.target.value)}
                  className="w-full"
                  aria-label="彩度の調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>セピア</span>
                  <span className="text-purple-400">{filters.sepia}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.sepia} 
                  onChange={(e) => onFilterChange('sepia', e.target.value)}
                  className="w-full"
                  aria-label="セピアの調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>グレースケール</span>
                  <span className="text-purple-400">{filters.grayscale}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.grayscale} 
                  onChange={(e) => onFilterChange('grayscale', e.target.value)}
                  className="w-full"
                  aria-label="グレースケールの調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>ぼかし</span>
                  <span className="text-purple-400">{filters.blur}px</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={filters.blur} 
                  onChange={(e) => onFilterChange('blur', e.target.value)}
                  className="w-full"
                  aria-label="ぼかしの調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>色相回転</span>
                  <span className="text-purple-400">{filters.hueRotate}°</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={filters.hueRotate} 
                  onChange={(e) => onFilterChange('hueRotate', e.target.value)}
                  className="w-full"
                  aria-label="色相回転の調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>ネガティブ</span>
                  <span className="text-purple-400">{filters.invert}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.invert} 
                  onChange={(e) => onFilterChange('invert', e.target.value)}
                  className="w-full"
                  aria-label="ネガティブの調整"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>不透明度</span>
                  <span className="text-purple-400">{filters.opacity}%</span>
                </label>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={filters.opacity} 
                  onChange={(e) => onFilterChange('opacity', e.target.value)}
                  className="w-full"
                  aria-label="不透明度の調整"
                />
              </div>
            </div>
            
            <button 
              onClick={onToggleFilters}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg mt-8 font-medium camera-btn"
            >
              完了
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CameraControls;