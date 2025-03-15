// App.js - メインアプリコンポーネント
"use client"

import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import CameraPage from './pages/CameraPage';
import FilterCustomizePage from './pages/FilterCustomizePage';
import { Home, Search, Camera, User, Sparkles } from 'lucide-react';

const App = () => {
  // 画面状態: 'login', 'main', 'camera', 'filter-customize'
  const [activeScreen, setActiveScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('home');
  const [userFilters, setUserFilters] = useState([
    {
      id: 1,
      name: "ミッドナイトブルー",
      creator: "@your_username",
      downloads: 345,
      brightness: 90,
      contrast: 120,
      saturation: 110,
      hueRotation: 240,
      blur: 0
    },
    {
      id: 2,
      name: "ゴールデンアワー",
      creator: "@your_username",
      downloads: 218,
      brightness: 110,
      contrast: 105,
      saturation: 130,
      hueRotation: 30,
      blur: 0
    },
    {
      id: 3,
      name: "ドリーミーフォグ",
      creator: "@your_username",
      downloads: 127,
      brightness: 105,
      contrast: 90,
      saturation: 80,
      hueRotation: 0,
      blur: 2
    }
  ]);
  
  // 編集中のフィルター（新規作成または既存のフィルター編集）
  const [editingFilter, setEditingFilter] = useState(null);
  
  // Noto Sansフォントの適用
  useEffect(() => {
    // Google Fontsからの読み込み
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // フォントをbodyに適用
    document.body.style.fontFamily = "'Noto Sans JP', sans-serif";
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.WebkitFontSmoothing = 'antialiased';
    document.body.style.MozOsxFontSmoothing = 'grayscale';
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // フィルター保存時のコールバック（カメラページから）
  const handleFilterSave = (newFilter) => {
    const filterWithId = {
      ...newFilter,
      id: userFilters.length + 1,
      downloads: 0
    };
    setUserFilters(prev => [filterWithId, ...prev]);
    setActiveScreen('main');
    setActiveTab('profile'); // プロフィールタブに自動で移動
  };
  
  // フィルターカスタマイズページからのフィルター保存
  const handleCustomFilterSave = (newFilter) => {
    if (editingFilter && editingFilter.id) {
      // 既存フィルターの更新
      setUserFilters(prev => 
        prev.map(filter => 
          filter.id === editingFilter.id 
            ? { ...filter, ...newFilter, id: editingFilter.id } 
            : filter
        )
      );
    } else {
      // 新規フィルターの追加
      const filterWithId = {
        ...newFilter,
        id: userFilters.length + 1,
        creator: "@your_username",
        downloads: 0
      };
      setUserFilters(prev => [filterWithId, ...prev]);
    }
    
    // 編集状態をリセットしてプロフィールページに戻る
    setEditingFilter(null);
    setActiveScreen('main');
    setActiveTab('profile');
  };
  
  // フィルター編集画面を開く
  const handleEditFilter = (filter) => {
    setEditingFilter(filter);
    setActiveScreen('filter-customize');
  };
  
  // 新規フィルター作成画面を開く
  const handleCreateFilter = () => {
    setEditingFilter(null); // 編集フィルターをリセット（新規作成モード）
    setActiveScreen('filter-customize');
  };
  
  // フッターコンポーネント（全画面共通）
  // App.js - 最高品質のフッターコンポーネント
  
  // 高度なフッターコンポーネント（アニメーションとモダンなデザイン）
 // 改善されたフッターコンポーネント

 // 改善されたフッターコンポーネント

const AppFooter = () => {
  // アクティブなアイコンのインジケーター位置を計算 - 各ボタンIDに基づく正確な配置
  const getIndicatorElement = () => {
    if (activeScreen === 'login') return null;
    
    if (activeScreen === 'camera') return 'camera-btn';
    if (activeScreen === 'filter-customize') return 'filter-btn';
    
    // メイン画面の場合
    if (activeScreen === 'main') {
      if (activeTab === 'home') return 'home-btn';
      if (activeTab === 'explore') return 'explore-btn';
      if (activeTab === 'profile') return 'profile-btn';
    }
    
    return 'camera-btn'; // デフォルト
  };
  
  // DOM参照用のRef
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: '50%',
    width: '10%',
    opacity: 0
  });
  
  // 位置を更新する関数
  const updateIndicatorPosition = () => {
    const activeElementId = getIndicatorElement();
    if (!activeElementId) {
      setIndicatorStyle({...indicatorStyle, opacity: 0});
      return;
    }
    
    const element = document.getElementById(activeElementId);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const parentRect = element.parentElement.getBoundingClientRect();
      
      // 要素の中央位置を計算
      const elementCenter = elementRect.left + elementRect.width / 2;
      const relativePosition = (elementCenter - parentRect.left) / parentRect.width * 100;
      
      setIndicatorStyle({
        left: `${relativePosition}%`,
        width: `${Math.min(elementRect.width * 0.6, 40)}px`,
        opacity: 1
      });
    }
  };
  
  // 画面やタブが変更されたときにインジケーターを更新
  useEffect(() => {
    // DOMの準備ができてから位置を計算
    const timer = setTimeout(updateIndicatorPosition, 50);
    // リサイズイベントでも位置を更新
    window.addEventListener('resize', updateIndicatorPosition);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [activeScreen, activeTab]);

  return (
    <>
      {/* 背景ブラー効果 - より高級感のあるデザイン */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/5 backdrop-blur-md z-10" />
      
      {/* グラデーション境界線 */}
      <div className="fixed bottom-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-10" />
      
      {/* メインフッター */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 py-2 flex items-center justify-around px-6 fixed bottom-0 left-0 right-0 z-20"
           style={{
             boxShadow: '0 -5px 20px rgba(0,0,0,0.03)',
           }}
      >
        {/* アクティブインジケーター - DOM位置に基づく正確な配置 */}
        <div 
          className="absolute top-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ 
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
            transform: 'translateX(-50%)', // 常に中央揃え
            boxShadow: '0 1px 5px rgba(139, 92, 246, 0.5)'
          }}
        />
        
        {/* フッターボタン - 高さを固定してテキストサイズの影響を軽減 */}
        <button 
          id="home-btn"
          className={`flex flex-col items-center justify-between h-12 relative group transition-all duration-200 ease-in-out
                    ${activeTab === 'home' && activeScreen === 'main' ? 'text-purple-600 scale-105' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('home');
            setActiveScreen('main');
          }}
        >
          <div className={`p-1.5 rounded-full transition-all duration-200 
                        ${activeTab === 'home' && activeScreen === 'main' 
                            ? 'bg-purple-100' 
                            : 'group-hover:bg-purple-50'}`}>
            <Home 
              size={22} 
              strokeWidth={activeTab === 'home' && activeScreen === 'main' ? 2.5 : 2} 
              className={`transition-all duration-200 ${activeTab === 'home' && activeScreen === 'main' ? '' : 'group-hover:text-purple-500'}`}
            />
          </div>
          <span className={`text-xs transition-opacity duration-200 
                        ${activeTab === 'home' && activeScreen === 'main' 
                            ? 'font-medium' 
                            : 'group-hover:text-purple-500'}`}>
            ホーム
          </span>
        </button>
        
        
        <button 
          id="filter-btn"
          className={`flex flex-col items-center justify-between h-12 relative group transition-all duration-200 ease-in-out
                    ${activeScreen === 'filter-customize' ? 'text-purple-600 scale-105' : 'text-gray-500'}`}
          onClick={() => {
            setEditingFilter(null);
            setActiveScreen('filter-customize');
          }}
        >
          <div className={`p-1.5 rounded-full transition-all duration-200
                        ${activeScreen === 'filter-customize' 
                            ? 'bg-purple-100' 
                            : 'group-hover:bg-purple-50'}`}>
            <Sparkles 
              size={22} 
              strokeWidth={activeScreen === 'filter-customize' ? 2.5 : 2}
              className={`transition-all duration-200 ${activeScreen === 'filter-customize' ? '' : 'group-hover:text-purple-500'}`} 
            />
          </div>
          <span className={`text-xs transition-opacity duration-200
                        ${activeScreen === 'filter-customize' 
                            ? 'font-medium' 
                            : 'group-hover:text-purple-500'}`}>
            フィルター
          </span>
        </button>
        {/* カメラボタン - 高さを固定して一貫性を保つ */}
       {/* カメラボタン - 高さを固定して一貫性を保つ */}
       <button 
          id="camera-btn"
          className="flex flex-col items-center justify-between h-16 relative -mt-7 group" 
          onClick={() => setActiveScreen('camera')}
        >
          <div className={`relative overflow-hidden rounded-full transition-all duration-300 ease-out w-14 h-14 flex items-center justify-center
                          ${activeScreen === 'camera' 
                              ? 'ring-2 ring-purple-300 scale-105' 
                              : 'hover:scale-105'}`}
              style={{ boxShadow: '0 5px 15px rgba(124, 58, 237, 0.4)' }}
          >
            {/* インナーグロー効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600" />
            
            {/* パルスエフェクト - カメラ選択時のみ表示。アニメーションを調整 */}
            {activeScreen === 'camera' && (
              <div className="absolute inset-0 bg-white rounded-full opacity-10 pulse-subtle" />
            )}
            
            {/* メインカメラアイコン */}
            <Camera 
              size={28} 
              className="text-white relative z-10" 
              strokeWidth={activeScreen === 'camera' ? 2.5 : 2}
            />
          </div>
          <span className={`text-xs transition-all duration-200
                        ${activeScreen === 'camera' 
                            ? 'text-purple-600 font-medium' 
                            : 'text-gray-500 group-hover:text-purple-500'}`}>
            カメラ
          </span>
        </button>
        
        <button 
          id="explore-btn"
          className={`flex flex-col items-center justify-between h-12 relative group transition-all duration-200 ease-in-out
                    ${activeTab === 'explore' && activeScreen === 'main' ? 'text-purple-600 scale-105' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('explore');
            setActiveScreen('main');
          }}
        >
          <div className={`p-1.5 rounded-full transition-all duration-200
                        ${activeTab === 'explore' && activeScreen === 'main' 
                            ? 'bg-purple-100' 
                            : 'group-hover:bg-purple-50'}`}>
            <Search 
              size={22} 
              strokeWidth={activeTab === 'explore' && activeScreen === 'main' ? 2.5 : 2}
              className={`transition-all duration-200 ${activeTab === 'explore' && activeScreen === 'main' ? '' : 'group-hover:text-purple-500'}`} 
            />
          </div>
          <span className={`text-xs transition-opacity duration-200
                        ${activeTab === 'explore' && activeScreen === 'main' 
                            ? 'font-medium' 
                            : 'group-hover:text-purple-500'}`}>
            探索
          </span>
        </button>
        <button 
          id="profile-btn"
          className={`flex flex-col items-center justify-between h-12 relative group transition-all duration-200 ease-in-out
                    ${activeTab === 'profile' && activeScreen === 'main' ? 'text-purple-600 scale-105' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('profile');
            setActiveScreen('main');
          }}
        >
          <div className={`p-1.5 rounded-full transition-all duration-200
                        ${activeTab === 'profile' && activeScreen === 'main' 
                            ? 'bg-purple-100' 
                            : 'group-hover:bg-purple-50'}`}>
            <User 
              size={22} 
              strokeWidth={activeTab === 'profile' && activeScreen === 'main' ? 2.5 : 2}
              className={`transition-all duration-200 ${activeTab === 'profile' && activeScreen === 'main' ? '' : 'group-hover:text-purple-500'}`} 
            />
          </div>
          <span className={`text-xs transition-opacity duration-200
                        ${activeTab === 'profile' && activeScreen === 'main' 
                            ? 'font-medium' 
                            : 'group-hover:text-purple-500'}`}>
            プロフィール
          </span>
        </button>
      </div>
      
      {/* グローバルスタイル */}
      <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        .pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};


  
  // 適切なコンテンツを表示
  const renderContent = () => {
    // ログイン画面の場合はフッターなし
    if (activeScreen === 'login') {
      return <LoginPage onLogin={() => setActiveScreen('main')} />;
    }
    
    // カメラ画面
    if (activeScreen === 'camera') {
      return (
        <div className="min-h-screen flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-auto pb-16">
            <CameraPage 
              onBack={() => setActiveScreen('main')}
              onFilterSave={handleFilterSave}
              userFilters={userFilters}
            />
          </div>
          <AppFooter />
        </div>
      );
    }
    
    // フィルターカスタマイズ画面
    if (activeScreen === 'filter-customize') {
      return (
        <div className="min-h-screen flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-auto pb-16">
            <FilterCustomizePage 
              initialFilter={editingFilter}
              onSave={handleCustomFilterSave}
              onBack={() => {
                setEditingFilter(null);
                setActiveScreen('main');
                setActiveTab('profile');
              }}
            />
          </div>
          <AppFooter />
        </div>
      );
    }
    
    // メイン画面: タブに応じたページを表示
    return (
      <div className="min-h-screen flex flex-col overflow-hidden bg-gray-50">
        {/* メインコンテンツ */}
        <div className="flex-1 overflow-auto pb-16">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'explore' && <ExplorePage />}
          {activeTab === 'profile' && (
            <ProfilePage 
              userFilters={userFilters} 
              onCameraOpen={() => setActiveScreen('camera')} 
              onEditFilter={handleEditFilter}
              onCreateFilter={handleCreateFilter}
            />
          )}
        </div>
        <AppFooter />
      </div>
    );
  };
  
  return renderContent();
};

export default App;