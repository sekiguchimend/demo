// pages/FilterCustomizePage.js - フィルターとエフェクト機能
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Save, Camera, Image, Sparkles, Sliders, 
  RefreshCw, Layers, Palette, Play, Download, Heart, 
  Share2, X, Check, Plus, Home, User, Sunset, Cloud,
  Moon, Zap, Droplets, Flame, Sun, Snowflake, Search,
  MoreHorizontal, Star, Wand2, Activity, CircleDashed
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
  const [activeTab, setActiveTab] = useState('filter'); // 'filter' または 'effect'
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
  // エフェクトのステート
  const [effects, setEffects] = useState({
    vignette: initialFilter?.effects?.vignette || 0,
    noise: initialFilter?.effects?.noise || 0,
    sharpen: initialFilter?.effects?.sharpen || 0,
    filmGrain: initialFilter?.effects?.filmGrain || 0,
    duotone: initialFilter?.effects?.duotone || 0
  });
  const [selectedEffect, setSelectedEffect] = useState(null);
  // 保存ダイアログのステート
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');

  const nameInputRef = useRef(null);
  const saveTitleInputRef = useRef(null);
  
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
      if (initialFilter.effects) {
        setEffects({
          vignette: initialFilter.effects.vignette || 0,
          noise: initialFilter.effects.noise || 0,
          sharpen: initialFilter.effects.sharpen || 0,
          filmGrain: initialFilter.effects.filmGrain || 0,
          duotone: initialFilter.effects.duotone || 0
        });
      }
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

  // エフェクトプリセット
  const effectPresets = [
    { 
      name: 'ビンテージフィルム', 
      icon: <Camera size={20} className="text-amber-600" />,
      values: { vignette: 35, noise: 15, sharpen: 0, filmGrain: 40, duotone: 20 } 
    },
    { 
      name: 'シャープクリア', 
      icon: <Zap size={20} className="text-blue-500" />,
      values: { vignette: 10, noise: 0, sharpen: 60, filmGrain: 0, duotone: 0 } 
    },
    { 
      name: '映画風', 
      icon: <Play size={20} className="text-red-500" />,
      values: { vignette: 40, noise: 10, sharpen: 20, filmGrain: 30, duotone: 25 } 
    },
    { 
      name: 'ローファイ', 
      icon: <CircleDashed size={20} className="text-purple-500" />,
      values: { vignette: 30, noise: 40, sharpen: 0, filmGrain: 60, duotone: 15 } 
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
  
  // エフェクトの説明
  const effectDescriptions = {
    vignette: "画像の周囲を暗くして、中央に注目を集めます",
    noise: "古い写真のようなノイズを追加します",
    sharpen: "画像をシャープにして、細部をより鮮明にします",
    filmGrain: "フィルム写真のような粒状感を追加します",
    duotone: "二色のカラーパレットで画像に色合いを加えます"
  };
  
  // フィルター名編集フォーカス
  useEffect(() => {
    if (isNameEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isNameEditing]);
  
  // 保存ダイアログが表示されたときにフォーカス
  useEffect(() => {
    if (showSaveDialog && saveTitleInputRef.current) {
      saveTitleInputRef.current.focus();
      // 初期タイトルをフィルター名に設定
      setSaveTitle(filterName);
    }
  }, [showSaveDialog, filterName]);
  
  // 保存ダイアログを表示
  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };
  
  // フィルター保存のシミュレーション
  const handleSaveFilter = () => {
    // タイトルが空の場合はデフォルト値を使用
    const finalTitle = saveTitle.trim() || filterName;
    
    setIsSaving(true);
    setShowSaveDialog(false);
    
    // フィルターオブジェクトの作成
    const newFilter = {
      name: filterName,
      title: finalTitle,
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
      effects: { ...effects }
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

  // エフェクトプリセットの適用
  const applyEffectPreset = (preset) => {
    setEffects(preset.values);
    setSelectedEffect(preset.name);
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

  // エフェクトパラメータの更新
  const handleEffectChange = (effectName, value) => {
    setEffects(prev => ({
      ...prev,
      [effectName]: value
    }));
    setSelectedEffect(null);
  };
  
  // フィルターをリセット
  const resetFilters = () => {
    if (activeTab === 'filter') {
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
    } else {
      setEffects({
        vignette: 0,
        noise: 0,
        sharpen: 0,
        filmGrain: 0,
        duotone: 0
      });
      setSelectedEffect(null);
    }
  };
  
  // CSSフィルタースタイルの生成
  const getFilterStyle = () => {
    // ビネット効果用の追加スタイル
    const vignetteStyle = effects.vignette > 0 ? {
      boxShadow: `inset 0 0 ${effects.vignette * 2}px rgba(0,0,0,${effects.vignette / 100 * 0.8})`
    } : {};
    
    // フィルムグレイン用のスタイル
    const filmGrainClass = effects.filmGrain > 0 ? 'film-grain' : '';
    
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
        ${effects.sharpen > 0 ? `contrast(${100 + effects.sharpen * 0.2}%) brightness(${100 + effects.sharpen * 0.1}%)` : ''}
        ${effects.noise > 0 ? `contrast(${100 + effects.noise * 0.05}%)` : ''}
        ${effects.duotone > 0 ? `sepia(${effects.duotone * 0.2}%)` : ''}
      `,
      ...vignetteStyle,
      // カスタムフィルター適用時のスタイル
      className: `${filmGrainClass} ${effects.duotone > 0 ? 'duotone-effect' : ''}`
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
    
    /* フィルムグレイン効果 */
    .film-grain {
      position: relative;
    }
    
    .film-grain::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4xIi8+PC9zdmc+');
      pointer-events: none;
      mix-blend-mode: overlay;
      opacity: 0.8;
      border-radius: 0.5rem;
    }
    
    /* デュオトーン効果 */
    .duotone-effect {
      position: relative;
    }
    
    .duotone-effect::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(42, 27, 161, 0.2), rgba(210, 29, 133, 0.2));
      pointer-events: none;
      mix-blend-mode: color;
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
    
    /* モーダルオーバーレイ */
    .modal-overlay {
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(3px);
    }
    
    /* タブスタイル */
    .tab-active {
      color: #8b5cf6;
      border-bottom: 2px solid #8b5cf6;
    }
    
    .tab-inactive {
      color: #6b7280;
      border-bottom: 2px solid transparent;
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
              onClick={handleSaveClick}
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
            <div className={`${effects.filmGrain > 0 ? 'film-grain' : ''} ${effects.duotone > 0 ? 'duotone-effect' : ''} h-full w-full`}>
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
            </div>
            
            {/* フィルタープリセット表示 */}
            {selectedPreset && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                {filterPresets.find(p => p.name === selectedPreset)?.icon}
                <span className="ml-1">{selectedPreset}</span>
              </div>
            )}
            
            {/* エフェクトプリセット表示 */}
            {selectedEffect && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                {effectPresets.find(p => p.name === selectedEffect)?.icon}
                <span className="ml-1">{selectedEffect}</span>
              </div>
            )}
            
            {/* グラデーションオーバーレイの名前表示 */}
            {gradientOverlay !== 'none' && !selectedEffect && (
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
        
        {/* タブ切り替え */}
        <div className="flex mb-6 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('filter')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeTab === 'filter' ? 'tab-active' : 'tab-inactive'}`}
          >
            <div className="flex items-center justify-center">
              <Sliders size={18} className="mr-2" />
              フィルター
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('effect')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeTab === 'effect' ? 'tab-active' : 'tab-inactive'}`}
          >
            <div className="flex items-center justify-center">
              <Wand2 size={18} className="mr-2" />
              エフェクト
            </div>
          </button>
        </div>
        
        {/* プリセット選択ボタン */}
        <div className="mb-6 flex justify-between">
          <button 
            onClick={() => setShowPresets(!showPresets)}
            className="bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 font-medium flex items-center btn-effect"
          >
            <Sparkles size={18} className="mr-2 text-purple-500" />
            {activeTab === 'filter' ? 'プリセットを使用' : 'エフェクトプリセット'}
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
        {showPresets && activeTab === 'filter' && (
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
        
        {/* エフェクトプリセットセレクター */}
        {showPresets && activeTab === 'effect' && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800 flex items-center">
                <Wand2 size={16} className="mr-2 text-purple-500" />
                エフェクトプリセット
              </h3>
              <button onClick={() => setShowPresets(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {effectPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyEffectPreset(preset)}
                  className={`p-3 text-sm rounded-lg border transition flex items-center
                    ${selectedEffect === preset.name 
                      ? 'bg-purple-50 border-purple-200 text-purple-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-200'}`}
                >
                  <span className="mr-2">{preset.icon}</span> {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* フィルター設定 */}
        {activeTab === 'filter' && (
          <>
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
                フィルター調整
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
                
                <button 
                  className="text-purple-600 text-sm font-medium flex items-center mt-2"
                  onClick={() => setActiveTab('effect')}
                >
                  <Wand2 size={16} className="mr-1" />
                  エフェクトを編集する
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* エフェクト設定 */}
        {activeTab === 'effect' && (
          <div className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center">
              <Wand2 size={16} className="mr-2 text-purple-500" />
              エフェクト調整
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">ビネット効果</label>
                  <span className="text-sm font-medium text-purple-600">{effects.vignette}%</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{effectDescriptions.vignette}</p>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={effects.vignette} 
                  onChange={(e) => handleEffectChange('vignette', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">ノイズ</label>
                  <span className="text-sm font-medium text-purple-600">{effects.noise}%</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{effectDescriptions.noise}</p>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={effects.noise} 
                  onChange={(e) => handleEffectChange('noise', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">シャープネス</label>
                  <span className="text-sm font-medium text-purple-600">{effects.sharpen}%</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{effectDescriptions.sharpen}</p>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={effects.sharpen} 
                  onChange={(e) => handleEffectChange('sharpen', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">フィルムグレイン</label>
                  <span className="text-sm font-medium text-purple-600">{effects.filmGrain}%</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{effectDescriptions.filmGrain}</p>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={effects.filmGrain} 
                  onChange={(e) => handleEffectChange('filmGrain', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">デュオトーン</label>
                  <span className="text-sm font-medium text-purple-600">{effects.duotone}%</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{effectDescriptions.duotone}</p>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={effects.duotone} 
                  onChange={(e) => handleEffectChange('duotone', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <button 
                className="text-purple-600 text-sm font-medium flex items-center mt-2"
                onClick={() => setActiveTab('filter')}
              >
                <Sliders size={16} className="mr-1" />
                フィルターを編集する
              </button>
            </div>
          </div>
        )}
        
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
      
      {/* 保存ダイアログ - タイトル入力機能 */}
      {showSaveDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay">
          <div className="bg-white rounded-lg shadow-xl p-5 w-full max-w-md animate-fadeIn">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Save size={18} className="mr-2 text-purple-600" />
                フィルターを保存
              </h3>
              <button 
                onClick={() => setShowSaveDialog(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タイトルを入力してください
              </label>
              <input
                ref={saveTitleInputRef}
                type="text"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none"
                placeholder="例: 夏の思い出フィルター"
              />
              <p className="text-xs text-gray-500 mt-2">
                タイトルを入力せずに保存すると、フィルター名「{filterName}」が使用されます
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveFilter}
                className="flex-1 py-2 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 flex items-center justify-center"
              >
                <Save size={18} className="mr-2" />
                保存する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCustomizePage;