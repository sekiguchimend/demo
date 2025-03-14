// App.js - メインアプリコンポーネント
"use client"
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import CameraPage from './pages/CameraPage';
import { Home, Search, Camera, User } from 'lucide-react';

const App = () => {
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
  
  // フィルター保存時のコールバック
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
  
  // 適切なコンテンツを表示
  const renderContent = () => {
    if (activeScreen === 'login') {
      return <LoginPage onLogin={() => setActiveScreen('main')} />;
    }
    
    if (activeScreen === 'camera') {
      return (
        <CameraPage 
          onBack={() => setActiveScreen('main')} 
          onFilterSave={handleFilterSave}
          userFilters={userFilters}
        />
      );
    }
    
    // メイン画面: タブに応じたページを表示
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-white">
        {/* メインコンテンツ */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'explore' && <ExplorePage />}
          {activeTab === 'profile' && <ProfilePage userFilters={userFilters} onCameraOpen={() => setActiveScreen('camera')} />}
        </div>
        
        {/* 下部タブバー */}
        <div className="bg-white border-t h-16 flex items-center justify-around px-6 shadow-lg">
          <button 
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={24} />
            <span className="text-xs mt-1">ホーム</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeTab === 'explore' ? 'text-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('explore')}
          >
            <Search size={24} />
            <span className="text-xs mt-1">探索</span>
          </button>
          <button 
            className="flex flex-col items-center"
            onClick={() => setActiveScreen('camera')}
          >
            <div className="bg-purple-600 rounded-full p-1.5">
              <Camera size={22} className="text-white" />
            </div>
            <span className="text-xs mt-1">カメラ</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={24} />
            <span className="text-xs mt-1">プロフィール</span>
          </button>
        </div>
      </div>
    );
  };
  
  return renderContent();
};

export default App;