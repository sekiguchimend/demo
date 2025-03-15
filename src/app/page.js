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
  const AppFooter = () => (
    <div className="bg-white border-t-gray-300 border-t-[1px] py-2 flex items-center justify-around px-4 shadow-sm fixed bottom-0 left-0 right-0">
      <button 
        className={`flex flex-col items-center ${activeTab === 'home' && activeScreen === 'main' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}
        onClick={() => {
          setActiveTab('home');
          setActiveScreen('main');
        }}
      >
        <Home size={22} strokeWidth={activeTab === 'home' && activeScreen === 'main' ? 2.5 : 2} />
        <span className="text-xs mt-1">ホーム</span>
      </button>
      
      <button 
        className={`flex flex-col items-center ${activeTab === 'explore' && activeScreen === 'main' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}
        onClick={() => {
          setActiveTab('explore');
          setActiveScreen('main');
        }}
      >
        <Search size={22} strokeWidth={activeTab === 'explore' && activeScreen === 'main' ? 2.5 : 2} />
        <span className="text-xs mt-1">探索</span>
      </button>
      
      <button 
        className="flex flex-col items-center"
        onClick={() => setActiveScreen('camera')}
      >
        <div className={`bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-2 shadow-md transition transform hover:scale-105 ${activeScreen === 'camera' ? 'ring-2 ring-purple-300' : ''}`}>
          <Camera size={20} className="text-white" />
        </div>
        <span className={`text-xs mt-1 ${activeScreen === 'camera' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>カメラ</span>
      </button>
      
      <button 
        className={`flex flex-col items-center ${activeScreen === 'filter-customize' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}
        onClick={() => {
          setEditingFilter(null);
          setActiveScreen('filter-customize');
        }}
      >
        <Sparkles size={22} strokeWidth={activeScreen === 'filter-customize' ? 2.5 : 2} />
        <span className="text-xs mt-1">フィルター</span>
      </button>
      
      <button 
        className={`flex flex-col items-center ${activeTab === 'profile' && activeScreen === 'main' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}
        onClick={() => {
          setActiveTab('profile');
          setActiveScreen('main');
        }}
      >
        <User size={22} strokeWidth={activeTab === 'profile' && activeScreen === 'main' ? 2.5 : 2} />
        <span className="text-xs mt-1">プロフィール</span>
      </button>
    </div>
  );
  
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