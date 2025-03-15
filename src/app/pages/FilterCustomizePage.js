// pages/FilterCustomizePage.js - プレビュー画像サイズを調整
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Save, Camera, Image, Sparkles, Sliders, 
  RefreshCw, Layers, Palette, Play, Download, Heart, 
  Share2, X, Check, Plus, Home, User, Sunset, Cloud,
  Moon, Zap, Droplets, Flame, Sun, Snowflake, Search
} from 'lucide-react';
import Link from 'next/link';

const FilterCustomizePage = ({ initialFilter = null, onSave, onBack }) => {
  // サンプル画像
  const sampleImages = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    'https://images.unsplash.com/photo-1513520713578-cf6c8a8a3a15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  ];
  
  // ステート
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filterName, setFilterName] = useState(initialFilter?.name || 'マイフィルター');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [gradientOverlay, setGradientOverlay] = useState('none');
  const [filters, setFilters] = useState({
    brightness: initialFilter?.brightness || 100,
    contrast: initialFilter?.contrast || 100,
    saturate: initialFilter?.saturation || 100,
    sepia: initialFilter?.sepia || 0,
    grayscale: initialFilter?.grayscale || 0,
    blur: initialFilter?.blur || 0,
    hueRotate: initialFilter?.hueRotation || 0,
    invert: initialFilter?.invert || 0,
    opacity: initialFilter?.opacity || 100,
  });

  const nameInputRef = useRef(null);
  
  // 初期フィルターが変更されたとき
  useEffect(() => {
    if (initialFilter) {
      setFilterName(initialFilter.name || 'マイフィルター');
      setFilters({
        brightness: initialFilter.brightness || 100,
        contrast: initialFilter.contrast || 100,
        saturate: initialFilter.saturation || 100,
        sepia: initialFilter.sepia || 0,
        grayscale: initialFilter.grayscale || 0,
        blur: initialFilter.blur || 0,
        hueRotate: initialFilter.hueRotation || 0,
        invert: initialFilter.invert || 0,
        opacity: initialFilter.opacity || 100,
      });
    }
  }, [initialFilter]);
  
  // フィルタープリセット
  const filterPresets = [
    { 
      name: 'ノスタルジック', 
      icon: <Sunset size={20} className="text-orange-500" />,
      values: { brightness: 90, contrast: 110, saturate: 80, sepia: 30, grayscale: 0, blur: 0, hueRotate: 0, invert: 0, opacity: 100 } 
    },
    { 
      name: 'サイバーパンク', 
      icon: <Zap size={20} className="text-purple-500" />,
      values: { brightness: 110, contrast: 130, saturate: 170, sepia: 0, grayscale: 0, blur: 0, hueRotate: 280, invert: 0, opacity: 100 } 
    },
    { 
      name: 'ドリーミー', 
      icon: <Cloud size={20} className="text-blue-400" />,
      values: { brightness: 105, contrast: 90, saturate: 110, sepia: 10, grayscale: 0, blur: 2, hueRotate: 0, invert: 0, opacity: 95 } 
    },
    { 
      name: 'モノクローム', 
      icon: <Moon size={20} className="text-gray-700" />,
      values: { brightness: 100, contrast: 120, saturate: 0, sepia: 0, grayscale: 100, blur: 0, hueRotate: 0, invert: 0, opacity: 100 } 
    },
    { 
      name: 'ネガティブ', 
      icon: <RefreshCw size={20} className="text-indigo-600" />,
      values: { brightness: 100, contrast: 100, saturate: 100, sepia: 0, grayscale: 0, blur: 0, hueRotate: 180, invert: 100, opacity: 100 } 
    },
    { 
      name: 'サンセット', 
      icon: <Sun size={20} className="text-amber-500" />,
      values: { brightness: 105, contrast: 110, saturate: 130, sepia: 20, grayscale: 0, blur: 0, hueRotate: 30, invert: 0, opacity: 100 } 
    },
  ];
  
  // グラデーションオーバーレイのオプション
  const gradientOptions = [
    { id: 'none', name: 'なし', icon: <X size={18} className="text-gray-500" />, className: '' },
    { id: 'rainbow', name: 'レインボー', icon: <Sparkles size={18} className="text-purple-500" />, className: 'rainbow-overlay' },
    { id: 'sunset', name: 'サンセット', icon: <Sunset size={18} className="text-orange-500" />, className: 'sunset-overlay' },
    { id: 'neon', name: 'ネオン', icon: <Zap size={18} className="text-pink-500" />, className: 'neon-overlay' },
    { id: 'cool', name: 'クール', icon: <Snowflake size={18} className="text-blue-500" />, className: 'cool-overlay' },
    { id: 'warm', name: 'ウォーム', icon: <Flame size={18} className="text-red-500" />, className: 'warm-overlay' },
  ];
  
  // 人気のフィルター
  const popularFilters = [
    { 
      name: 'トレンディブルー', 
      creator: '@filter_master', 
      likes: 4523, 
      preview: 'https://images.unsplash.com/photo-1533461502717-83546f485d24?auto=format&fit=crop&w=500&q=60',
      icon: <Droplets size={16} className="text-blue-500" />
    },
    { 
      name: 'サニーバイブ', 
      creator: '@photo_pro', 
      likes: 3897, 
      preview: 'https://images.unsplash.com/photo-1603574670812-d24560880210?auto=format&fit=crop&w=500&q=60',
      icon: <Sun size={16} className="text-amber-500" />
    },
    { 
      name: 'レトロフィルム', 
      creator: '@vintage_vibes', 
      likes: 3245, 
      preview: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=60',
      icon: <Image size={16} className="text-purple-500" />
    },
  ];
  
  // フィルター名編集フォーカス
  useEffect(() => {
    if (isNameEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isNameEditing]);
  
  // フィルター保存のシミュレーション
  const handleSaveFilter = () => {
    setIsSaving(true);
    
    // フィルターオブジェクトの作成
    const newFilter = {
      name: filterName,
      brightness: filters.brightness,
      contrast: filters.contrast,
      saturation: filters.saturate,
      sepia: filters.sepia,
      grayscale: filters.grayscale,
      blur: filters.blur,
      hueRotation: filters.hueRotate,
      invert: filters.invert,
      opacity: filters.opacity,
      gradientOverlay: gradientOverlay,
    };
    
    // 保存処理のシミュレーション
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // 親コンポーネントに通知
      if (onSave) {
        onSave(newFilter);
      }
      
      // 成功メッセージのリセット
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    }, 1000);
  };
  
  // フィルター名編集の確定
  const handleNameSubmit = () => {
    setIsNameEditing(false);
  };
  
  // フィルタープリセットの適用
  const applyPreset = (preset) => {
    setFilters(preset.values);
    setSelectedPreset(preset.name);
    setShowPresets(false);
  };
  
  // フィルターパラメータの更新
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setSelectedPreset(null);
  };
  
  // フィルターをリセット
  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturate: 100,
      sepia: 0,
      grayscale: 0,
      blur: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100
    });
    setGradientOverlay('none');
    setSelectedPreset(null);
  };
  
  // CSSフィルタースタイルの生成
  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${filters.brightness}%) 
        contrast(${filters.contrast}%) 
        saturate(${filters.saturate}%) 
        sepia(${filters.sepia}%) 
        grayscale(${filters.grayscale}%) 
        blur(${filters.blur}px) 
        hue-rotate(${filters.hueRotate}deg)
        invert(${filters.invert}%)
        opacity(${filters.opacity}%)
      `
    };
  };
  
  // グラデーションオーバーレイのクラス名を取得
  const getGradientClass = () => {
    const option = gradientOptions.find(opt => opt.id === gradientOverlay);
    return option ? option.className : '';
  };
  
  // CSS スタイル
  const styles = `
    /* アニメーション */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    /* グラデーションオーバーレイ */
    .rainbow-overlay::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,0,0,0.2), rgba(255,165,0,0.2), rgba(255,255,0,0.2), rgba(0,128,0,0.2), rgba(0,0,255,0.2), rgba(128,0,128,0.2));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .sunset-overlay::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(255,102,0,0.3), rgba(255,0,102,0.2), rgba(51,0,102,0.3));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .neon-overlay::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2), rgba(0,255,0,0.2));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .cool-overlay::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, rgba(0,102,255,0.3), rgba(102,0,255,0.3));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .warm-overlay::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, rgba(255,102,0,0.3), rgba(255,0,0,0.3));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    /* カスタムスライダー */
    input[type="range"] {
      -webkit-appearance: none;
      height: 4px;
      background: rgba(139, 92, 246, 0.2);
      border-radius: 5px;
      background-image: linear-gradient(to right, #8b5cf6, #6366f1);
      background-size: 50% 100%;
      background-repeat: no-repeat;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    
    /* ボタン効果 */
    .btn-effect {
      transition: all 0.2s ease;
    }
    
    .btn-effect:hover {
      transform: translateY(-2px);
    }
    
    .btn-effect:active {
      transform: translateY(0);
    }
    
    /* カード効果 */
    .card-hover {
      transition: all 0.3s ease;
    }
    
    .card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* ページ背景 */
    .page-bg {
      background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.07), transparent 70%),
                radial-gradient(circle at bottom left, rgba(79, 70, 229, 0.05), transparent 70%);
    }
    
    /* スタイリッシュなヘッダー */
    .styled-header {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50 page-bg">
      <style>{styles}</style>
      
      {/* ヘッダー */}
      <header className="styled-header border-b border-gray-200 py-3 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-md mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 hover:bg-gray-100 p-2 rounded-full transition">
              <ArrowLeft className="h-6 w-6 text-gray-800" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              <Sparkles size={20} className="mr-2 text-purple-600" />
              フィルター作成
            </h1>
          </div>
          
          <div>
            <button 
              onClick={handleSaveFilter}
              disabled={isSaving || saveSuccess}
              className={`px-4 py-2 rounded-full flex items-center font-medium transition-all btn-effect
                ${saveSuccess 
                  ? 'bg-green-500 text-white' 
                  : isSaving 
                    ? 'bg-indigo-400 text-white' 
                    : 'bg-purple-600 text-white'}`}
            >
              {saveSuccess ? (
                <>
                  <Check size={18} className="mr-1" />
                  保存完了
                </>
              ) : isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-1" />
                  保存
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-md mx-auto p-4 pb-20">
        {/* フィルター名 */}
        <div className="mb-6 flex items-center">
          {isNameEditing ? (
            <div className="flex w-full">
              <input
                ref={nameInputRef}
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="flex-1 text-xl font-bold px-3 py-2 border-b-2 border-purple-500 focus:outline-none bg-transparent"
                placeholder="フィルター名を入力"
              />
              <button 
                onClick={handleNameSubmit}
                className="ml-2 p-2 bg-purple-600 rounded-full text-white"
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h2 className="text-xl font-bold">{filterName}</h2>
              <button 
                onClick={() => setIsNameEditing(true)}
                className="ml-2 text-gray-500 hover:text-purple-600 p-1"
              >
                <Sliders size={16} />
              </button>
            </div>
          )}
        </div>
        
        {/* プレビュー画像 - サイズを調整 */}
        <div className="mb-6">
          <div className={`relative rounded-xl overflow-hidden shadow-lg mb-3 ${getGradientClass()} mx-auto`} style={{maxWidth: '400px', maxHeight: '400px'}}>
            <img 
              src={sampleImages[selectedImageIndex]} 
              alt="プレビュー画像" 
              style={{
                ...getFilterStyle(),
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'cover'
              }}
              className="aspect-square"
            />
            
            {/* フィルタープリセット表示 */}
            {selectedPreset && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                {filterPresets.find(p => p.name === selectedPreset)?.icon}
                <span className="ml-1">{selectedPreset}</span>
              </div>
            )}
            
            {/* グラデーションオーバーレイの名前表示 */}
            {gradientOverlay !== 'none' && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                {gradientOptions.find(opt => opt.id === gradientOverlay)?.icon}
                <span className="ml-1">{gradientOptions.find(opt => opt.id === gradientOverlay)?.name}</span>
              </div>
            )}
          </div>
          
          {/* サンプル画像選択 */}
          <div className="flex justify-center gap-2">
            {sampleImages.map((src, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden transition
                  ${selectedImageIndex === index ? 'ring-2 ring-purple-500' : 'opacity-70'}`}
              >
                <img src={src} alt={`サンプル${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
            <button className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600">
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        {/* プリセット選択ボタン */}
        <div className="mb-6 flex justify-between">
          <button 
            onClick={() => setShowPresets(!showPresets)}
            className="bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 font-medium flex items-center btn-effect"
          >
            <Sparkles size={18} className="mr-2 text-purple-500" />
            プリセットを使用
          </button>
          
          <button
            onClick={resetFilters}
            className="bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 font-medium flex items-center btn-effect"
          >
            <RefreshCw size={18} className="mr-2 text-purple-500" />
            リセット
          </button>
        </div>
        
        {/* プリセットセレクター（表示・非表示切り替え） */}
        {showPresets && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800 flex items-center">
                <Sparkles size={16} className="mr-2 text-purple-500" />
                フィルタープリセット
              </h3>
              <button onClick={() => setShowPresets(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filterPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={`p-3 text-sm rounded-lg border transition flex items-center
                    ${selectedPreset === preset.name 
                      ? 'bg-purple-50 border-purple-200 text-purple-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-200'}`}
                >
                  <span className="mr-2">{preset.icon}</span> {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* グラデーションオーバーレイセレクター */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <Layers size={16} className="mr-2 text-purple-500" />
            グラデーションオーバーレイ
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {gradientOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setGradientOverlay(option.id)}
                className={`p-3 text-sm rounded-lg border transition flex items-center justify-center
                  ${gradientOverlay === option.id 
                    ? 'bg-purple-50 border-purple-200 text-purple-700' 
                    : 'bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-200'}`}
              >
                <span className="mr-2">{option.icon}</span> {option.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* 詳細調整スライダー */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-gray-100">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center">
            <Palette size={16} className="mr-2 text-purple-500" />
            詳細調整
          </h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">明るさ</label>
                <span className="text-sm font-medium text-purple-600">{filters.brightness}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={filters.brightness} 
                onChange={(e) => handleFilterChange('brightness', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">コントラスト</label>
                <span className="text-sm font-medium text-purple-600">{filters.contrast}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={filters.contrast} 
                onChange={(e) => handleFilterChange('contrast', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">彩度</label>
                <span className="text-sm font-medium text-purple-600">{filters.saturate}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={filters.saturate} 
                onChange={(e) => handleFilterChange('saturate', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">セピア</label>
                <span className="text-sm font-medium text-purple-600">{filters.sepia}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={filters.sepia} 
                onChange={(e) => handleFilterChange('sepia', e.target.value)}
                className="w-full"
              />
            </div>
            
            <button className="text-purple-600 text-sm font-medium flex items-center mt-2">
              <Plus size={16} className="mr-1" />
              すべてのオプションを表示
            </button>
          </div>
        </div>
        
        {/* 人気のフィルター */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center">
            <Heart size={16} className="mr-2 text-purple-500" />
            人気のフィルター
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularFilters.map((filter, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 card-hover">
                <div className="aspect-square overflow-hidden relative">
                  <img src={filter.preview} alt={filter.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                    <div className="flex items-center mb-1">
                      {filter.icon}
                      <h4 className="text-white font-medium truncate ml-1">{filter.name}</h4>
                    </div>
                    <p className="text-white/80 text-xs">{filter.creator}</p>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart size={14} className="text-red-500 mr-1" />
                    <span className="text-xs text-gray-600">{filter.likes.toLocaleString()}</span>
                  </div>
                  <button className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Zap size={12} className="mr-1" />
                    使用する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* 保存成功時の通知トースト */}
      {saveSuccess && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center animate-fadeIn">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center">
            <Check size={18} className="mr-2" />
            フィルターを保存しました
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCustomizePage;