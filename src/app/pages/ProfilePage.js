// pages/ProfilePage.js
import React, { useState } from 'react';
import { User, Sparkles, Plus, Download, Camera, Heart, Share2, Bell, X } from 'lucide-react';

const ProfilePage = ({ userFilters = [], onCameraOpen }) => {
  // アクティブタブの状態
  const [activeTab, setActiveTab] = useState('photos');
  // 通知パネルの表示状態
  const [showNotifications, setShowNotifications] = useState(false);
  
  // フォーマット用のヘルパー関数
  const formatNumber = (num) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
  };
  
  // フィルターのスタイルを生成する関数
  const getFilterStyle = (filter) => {
    if (!filter) return {};
    
    return {
      filter: `brightness(${filter.brightness || 100}%) contrast(${filter.contrast || 100}%) saturate(${filter.saturation || 100}%) hue-rotate(${filter.hueRotation || 0}deg) blur(${filter.blur || 0}px)`
    };
  };
  
  // フィルターの背景色を取得する関数
  const getFilterBackground = (index) => {
    const backgrounds = [
      'linear-gradient(135deg, #6366f1, #a855f7)', 
      'linear-gradient(135deg, #f59e0b, #ef4444)',
      'linear-gradient(135deg, #10b981, #3b82f6)',
      'linear-gradient(135deg, #ec4899, #8b5cf6)',
      'linear-gradient(135deg, #0ea5e9, #22d3ee)'
    ];
    
    return backgrounds[index % backgrounds.length];
  };
  
  return (
    <div className="bg-gray-100" style={{ height: "100vh", overflow: "auto" }}>
      {/* プロフィールヘッダー */}
      <div className="bg-white p-4 border-b">
        <div className="max-w-screen-md mx-auto flex items-center">
          <div className="mr-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center bg-gray-200">
                <User size={30} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold mb-1">@your_username</h2>
              <button 
                className="p-2 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="grid grid-cols-3 text-center mb-2">
              <div>
                <p className="font-bold">{userFilters.length}</p>
                <p className="text-xs text-gray-500">フィルター</p>
              </div>
              <div>
                <p className="font-bold">632</p>
                <p className="text-xs text-gray-500">フォロワー</p>
              </div>
              <div>
                <p className="font-bold">215</p>
                <p className="text-xs text-gray-500">フォロー中</p>
              </div>
            </div>
            <button className="w-full bg-gray-200 rounded-md py-1 text-sm font-medium">プロフィールを編集</button>
          </div>
        </div>
        
        <div className="max-w-screen-md mx-auto">
          <p className="mt-3 text-sm">フィルター作成とカメラエフェクトが好きです。オリジナルフィルターを公開中 ✨</p>
        </div>
      </div>
      
      {/* 通知パネル - 表示・非表示の切り替え */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-16">
          <div className="bg-white w-full max-w-screen-md mx-4 rounded-lg overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">最近のアクティビティ</h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowNotifications(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y">
                <div className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">@photo_lover</span> があなたのフィルター 「ミッドナイトブルー」 を使用しました</p>
                    <p className="text-xs text-gray-500 mt-0.5">2時間前</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">@creative_mind</span> があなたのフィルター 「ゴールデンアワー」 をダウンロードしました</p>
                    <p className="text-xs text-gray-500 mt-0.5">5時間前</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <Heart size={18} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">@filter_master</span> があなたのフィルター 「ドリーミーフォグ」 にいいねしました</p>
                    <p className="text-xs text-gray-500 mt-0.5">1日前</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">@travel_pics</span> があなたをフォローしました</p>
                    <p className="text-xs text-gray-500 mt-0.5">2日前</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <Heart size={18} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">@nature_lover</span> があなたのフィルター 「グリーンリーフ」 にいいねしました</p>
                    <p className="text-xs text-gray-500 mt-0.5">3日前</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* マイフィルターセクション */}
      <div className="max-w-screen-md mx-auto p-3">
        <div className="mb-3 flex justify-between items-center">
          <h3 className="font-semibold text-base flex items-center">
            <Sparkles size={16} className="mr-1 text-purple-500" />
            マイフィルター
          </h3>
          <button 
            className="text-purple-600 text-sm font-medium flex items-center"
            onClick={onCameraOpen}
          >
            <Plus size={16} className="mr-1" />
            新規作成
          </button>
        </div>
        
        {userFilters.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {userFilters.map((filter, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                {/* フィルタープレビュー */}
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: getFilterBackground(index)
                    }}
                  >
                    {/* フィルター効果をプレビュー */}
                    <div style={getFilterStyle(filter)}>
                      <Sparkles size={28} className="text-white" />
                    </div>
                  </div>
                  
                  {/* フィルター使用ボタン */}
                  <div className="absolute bottom-2 right-2">
                    <button 
                      className="bg-white text-purple-600 text-xs rounded-full px-2 py-1 flex items-center"
                      onClick={onCameraOpen}
                    >
                      <Camera size={12} className="mr-1" /> 
                      試す
                    </button>
                  </div>
                  
                  {/* 共有ボタン */}
                  <div className="absolute top-2 right-2">
                    <button className="bg-black/30 backdrop-blur-sm text-white rounded-full p-1">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
                
                {/* フィルター情報 */}
                <div className="p-2">
                  <h4 className="font-medium text-sm">{filter.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">{filter.creator}</p>
                    <p className="text-xs flex items-center text-gray-500">
                      <Download size={10} className="mr-1" /> {formatNumber(filter.downloads || 0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 mb-4 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <Sparkles size={28} className="text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">まだフィルターがありません</h3>
            <p className="text-sm text-gray-500 mb-4">最初のフィルターを作成してみましょう！</p>
            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center mx-auto"
              onClick={onCameraOpen}
            >
              <Plus size={18} className="mr-2" />
              フィルターを作成
            </button>
          </div>
        )}
        
        {/* タブ切り替え */}
        <div className="flex border-t border-b py-1 mb-3">
          <button 
            className={`flex-1 py-2 flex justify-center items-center ${activeTab === 'photos' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('photos')}
          >
            <Camera size={18} className="mr-1" />
            <span className="text-sm font-medium">撮影</span>
          </button>
          <button 
            className={`flex-1 py-2 flex justify-center items-center ${activeTab === 'filters' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('filters')}
          >
            <Sparkles size={18} className="mr-1" />
            <span className="text-sm font-medium">フィルター</span>
          </button>
        </div>
        
        {/* 写真タブのコンテンツ */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <Camera size={28} className="text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">写真がまだありません</h3>
            <p className="text-sm text-gray-500 mb-4">自分のフィルターで写真や動画を撮影してみましょう！</p>
            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center mx-auto"
              onClick={onCameraOpen}
            >
              <Camera size={18} className="mr-2" />
              カメラを起動
            </button>
          </div>
        )}
        
        {/* フィルタータブのコンテンツ */}
        {activeTab === 'filters' && (
          <div>
            {userFilters.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {userFilters.map((filter, index) => (
                  <div key={index} className="aspect-square bg-white rounded-md overflow-hidden border border-gray-200">
                    {/* フィルタープレビュー用のグラデーション背景 */}
                    <div 
                      className="w-full h-full flex items-center justify-center relative"
                      style={{ background: getFilterBackground(index) }}
                    >
                      {/* フィルター効果を適用 */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={getFilterStyle(filter)}
                      >
                        <Sparkles size={32} className="text-white" />
                      </div>
                      
                      {/* フィルター情報オーバーレイ */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
                        <p className="text-white text-xs font-medium truncate">{filter.name}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-white/70 text-xs">{filter.creator}</p>
                          <p className="text-white/70 text-xs flex items-center">
                            <Heart size={10} className="mr-1" /> {formatNumber(filter.downloads || 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={28} className="text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1">フィルターがまだありません</h3>
                <p className="text-sm text-gray-500 mb-4">独自のフィルターを作成して共有しましょう！</p>
                <button 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center mx-auto"
                  onClick={onCameraOpen}
                >
                  <Plus size={18} className="mr-2" />
                  フィルターを作成
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;